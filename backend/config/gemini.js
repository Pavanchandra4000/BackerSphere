const https = require('https');

const evaluateProject = async (projectData) => {
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY is missing from .env file!');
    return fallback('GEMINI_API_KEY is not set in .env file');
  }

  console.log('🔑 API Key found:', process.env.GEMINI_API_KEY.substring(0, 8) + '...');

  const prompt = `You are a brutally honest crowdfunding investment analyst. You MUST score projects strictly.

SCORING GUIDE — follow this exactly:
- WEAK projects (vague, buzzwords only, tiny team, impossible timeline, no traction): score 0-6 per dimension
- MEDIUM projects (decent idea, some detail, reasonable team/timeline): score 7-12 per dimension
- STRONG projects (detailed, proven traction, experienced team, realistic goals): score 13-20 per dimension (or max for that dimension)

RED FLAGS — if any apply, ALL scores must stay in 0-6 range:
- Team of 1-3 people for extremely complex tech (space, hardware, biotech)
- Timeline under 6 months for complex platforms or physical products
- Vague description with buzzwords but no real substance
- Funding goal unrealistically low for the scope
- No evidence of validation, traction, or prior experience
- Claims to "disrupt entire industries" with no credible plan

GREEN FLAGS — required to score 13+ per dimension:
- Team of 5+ with relevant domain expertise mentioned
- Detailed roadmap with milestones
- Proven traction: customers, pilots, partnerships, revenue
- Realistic funding goal for the scope described
- Clear problem with validated demand

Project to evaluate:
- Title: ${projectData.title}
- Description: ${projectData.description}
- Category: ${projectData.category}
- Funding Goal: $${projectData.fundingGoal}
- Team Size: ${projectData.teamSize}
- Timeline: ${projectData.timeline}

Score each dimension honestly. Weak = low scores. Strong = high scores. No middle ground for clearly bad projects.
Return ONLY this exact JSON with no other text:
{
  "marketDemand": { "score": NUMBER_0_TO_20 },
  "teamCredibility": { "score": NUMBER_0_TO_15 },
  "timelineAndBudget": { "score": NUMBER_0_TO_15 },
  "problemSolutionFit": { "score": NUMBER_0_TO_20 },
  "executionFeasibility": { "score": NUMBER_0_TO_15 },
  "growthPotential": { "score": NUMBER_0_TO_15 },
  "explanation": "2-3 sentence critical analysis"
}`;

  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 500,
      thinkingConfig: {
        thinkingBudget: 0
      }
    }
  });

  try {
    console.log('\n🔄 Trying model: gemini-2.5-flash');

    const rawText = await makeRequest('gemini-2.5-flash', body);
    console.log('📩 Raw response:', rawText);

    const cleaned = rawText
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response: ' + cleaned);

    const evaluation = JSON.parse(jsonMatch[0]);

    if (!evaluation.marketDemand || typeof evaluation.marketDemand.score !== 'number') throw new Error('marketDemand missing');
    if (!evaluation.teamCredibility || typeof evaluation.teamCredibility.score !== 'number') throw new Error('teamCredibility missing');
    if (!evaluation.timelineAndBudget || typeof evaluation.timelineAndBudget.score !== 'number') throw new Error('timelineAndBudget missing');
    if (!evaluation.problemSolutionFit || typeof evaluation.problemSolutionFit.score !== 'number') throw new Error('problemSolutionFit missing');
    if (!evaluation.executionFeasibility || typeof evaluation.executionFeasibility.score !== 'number') throw new Error('executionFeasibility missing');
    if (!evaluation.growthPotential || typeof evaluation.growthPotential.score !== 'number') throw new Error('growthPotential missing');
    if (typeof evaluation.explanation !== 'string') throw new Error('explanation missing');

    // Clamp each dimension to its max
    evaluation.marketDemand.score       = Math.max(0, Math.min(20, evaluation.marketDemand.score));
    evaluation.teamCredibility.score    = Math.max(0, Math.min(15, evaluation.teamCredibility.score));
    evaluation.timelineAndBudget.score  = Math.max(0, Math.min(15, evaluation.timelineAndBudget.score));
    evaluation.problemSolutionFit.score = Math.max(0, Math.min(20, evaluation.problemSolutionFit.score));
    evaluation.executionFeasibility.score = Math.max(0, Math.min(15, evaluation.executionFeasibility.score));
    evaluation.growthPotential.score    = Math.max(0, Math.min(15, evaluation.growthPotential.score));

    const feasibilityScore    = calculateFeasibilityScore(evaluation);
    const successProbability  = calculateSuccessProbability(evaluation);

    console.log('\n🔍 DIMENSION SCORES:');
    console.log(`   Market Demand:         ${evaluation.marketDemand.score}/20`);
    console.log(`   Team Credibility:      ${evaluation.teamCredibility.score}/15`);
    console.log(`   Timeline & Budget:     ${evaluation.timelineAndBudget.score}/15`);
    console.log(`   Problem-Solution Fit:  ${evaluation.problemSolutionFit.score}/20`);
    console.log(`   Execution Feasibility: ${evaluation.executionFeasibility.score}/15`);
    console.log(`   Growth Potential:      ${evaluation.growthPotential.score}/15`);
    console.log('\n✅ Evaluation successful!');
    console.log(`   Feasibility Score:     ${feasibilityScore}/100`);
    console.log(`   Success Probability:   ${successProbability}/100`);
    console.log(`   Explanation: ${evaluation.explanation}`);

    return { feasibilityScore, successProbability, explanation: evaluation.explanation };

  } catch (err) {
    console.error('❌ Evaluation failed:', err.message);
    return fallback(err.message);
  }
};

// ─── SCORING CALCULATION ───────────────────────────────────────────────────
// Total max raw score = 20+15+15+20+15+15 = 100
// We map this directly to 0-100 with NO base offset
// Weak project scores 0-35 of 100 raw → final 0-35
// Medium project scores 35-75 of 100 raw → final 35-75
// Strong project scores 75-95 of 100 raw → final 75-95

const calculateFeasibilityScore = (evaluation) => {
  // Max possible = 20+15+15+20+15+15 = 100 — maps directly to 0-100
  const raw =
    (evaluation.marketDemand?.score       || 0) +   // max 20
    (evaluation.teamCredibility?.score    || 0) +   // max 15
    (evaluation.timelineAndBudget?.score  || 0) +   // max 15
    (evaluation.problemSolutionFit?.score || 0) +   // max 20
    (evaluation.executionFeasibility?.score || 0) + // max 15
    (evaluation.growthPotential?.score    || 0);    // max 15
  // raw is already 0-100, just return it directly
  return Math.max(0, Math.min(100, Math.round(raw)));
};

const calculateSuccessProbability = (evaluation) => {
  // Weight team and execution more heavily for success prediction
  // Normalise to 0-100
  const weighted =
    (evaluation.marketDemand?.score       || 0) * (20 / 20) +  // full weight
    (evaluation.teamCredibility?.score    || 0) * (20 / 15) +  // boosted — team matters most
    (evaluation.timelineAndBudget?.score  || 0) * (10 / 15) +  // reduced
    (evaluation.problemSolutionFit?.score || 0) * (18 / 20) +  // slightly reduced
    (evaluation.executionFeasibility?.score || 0) * (22 / 15) + // boosted — execution is critical
    (evaluation.growthPotential?.score    || 0) * (10 / 15);   // reduced

  // weighted max = 20 + 20 + 10 + 18 + 22 + 10 = 100
  return Math.max(0, Math.min(100, Math.round(weighted)));
};

// ─── HTTP Request ─────────────────────────────────────────────────────────────
const makeRequest = (modelName, body) => {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`   HTTP Status: ${res.statusCode}`);
        if (res.statusCode !== 200) {
          try {
            const errBody = JSON.parse(data);
            return reject(new Error(`HTTP ${res.statusCode}: ${errBody?.error?.message || data}`));
          } catch {
            return reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        }
        try {
          const parsed = JSON.parse(data);
          console.log('   Finish reason:', parsed?.candidates?.[0]?.finishReason);
          const parts = parsed?.candidates?.[0]?.content?.parts;
          if (!parts || parts.length === 0) return reject(new Error('API returned empty parts'));
          const responseParts = parts.filter(p => !p.thought);
          const textParts = responseParts.length > 0 ? responseParts : parts;
          const responseText = textParts.map(p => p.text || '').join('').trim();
          if (!responseText) return reject(new Error('API returned empty content'));
          resolve(responseText);
        } catch (e) {
          reject(new Error('Could not parse API response: ' + e.message));
        }
      });
    });

    req.on('error', err => reject(new Error(`Network error: ${err.message}`)));
    req.setTimeout(60000, () => { req.destroy(); reject(new Error('Request timed out after 60 seconds')); });
    req.write(body);
    req.end();
  });
};

// ─── Fallback ─────────────────────────────────────────────────────────────────
const fallback = (reason) => ({
  feasibilityScore: 50,
  successProbability: 50,
  explanation: `AI evaluation could not be completed. Manual review recommended. Reason: ${reason}`
});

module.exports = { evaluateProject };
