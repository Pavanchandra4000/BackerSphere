import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

// ✅ FIX 1: Accurate percentage — no Math.round() so 0.25% shows as 0.25% not 0%
const formatPct = (current, goal) => {
  if (!goal || goal === 0) return '0%';
  const pct = (current / goal) * 100;
  if (pct === 0) return '0%';
  if (pct < 1) return pct.toFixed(2) + '%';
  if (pct < 10) return pct.toFixed(1) + '%';
  return Math.round(pct) + '%';
};

// ✅ FIX 2: Minimum visible bar width so any funded project shows a bar
const barWidth = (current, goal) => {
  if (!goal || goal === 0 || current === 0) return '0%';
  const pct = (current / goal) * 100;
  return Math.min(Math.max(pct, 1.5), 100) + '%';
};

export default function ProjectDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [contributing, setContributing] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  // ✅ FIX 3: useCallback so fetchProject can be reused across multiple useEffects
  const fetchProject = useCallback(() => {
    setLoading(true);
    axios.get(`/api/projects/${id}`)
      .then(r => setProject(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch on mount
  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  // ✅ FIX 4: Re-fetch when tab gets focus (updates funding after backer contributes)
  useEffect(() => {
    const handleFocus = () => fetchProject();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchProject]);

  // ✅ FIX 5: Auto-refresh every 30 seconds so funded amount raises in real time
  useEffect(() => {
    const interval = setInterval(fetchProject, 30000);
    return () => clearInterval(interval);
  }, [fetchProject]);

  const handleContribute = async () => {
    if (!amount || Number(amount) <= 0) return toast.error('Please enter a valid amount');
    setContributing(true);
    try {
      await axios.post('/api/contributions', { projectId: id, amount: Number(amount), message });
      toast.success(`🎉 Thanks for backing $${amount}!`);
      setAmount('');
      setMessage('');
      // Refresh project
      fetchProject();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Contribution failed');
    } finally {
      setContributing(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0d1a' }}>
      <div style={{ color: '#a0aec0', fontSize: '18px', animation: 'pulse 1.5s ease-in-out infinite' }}>⏳ Loading...</div>
    </div>
  );
  if (!project) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0d1a' }}>
      <div style={{ color: '#a0aec0' }}>Project not found</div>
    </div>
  );

  const daysLeft = project.deadline ? Math.max(0, Math.ceil((new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24))) : null;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=2000&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Premium Multi-Layer Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          linear-gradient(135deg, 
            rgba(10, 13, 26, 0.88) 0%, 
            rgba(10, 18, 35, 0.86) 25%,
            rgba(8, 25, 45, 0.87) 50%,
            rgba(10, 13, 26, 0.88) 75%,
            rgba(10, 13, 26, 0.89) 100%
          ),
          radial-gradient(circle at 25% 40%, rgba(0, 212, 170, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 75% 70%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Animated Glow Orbs */}
      <div style={{
        position: 'fixed',
        top: '-30%',
        left: '-10%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 212, 170, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        filter: 'blur(80px)',
        animation: 'float 28s ease-in-out infinite',
      }} />
      <div style={{
        position: 'fixed',
        bottom: '-20%',
        right: '-10%',
        width: '700px',
        height: '700px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        filter: 'blur(90px)',
        animation: 'float 32s ease-in-out infinite reverse',
      }} />

      {/* Subtle Grid Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `linear-gradient(rgba(0, 212, 170, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 170, 0.015) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.4,
      }} />

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(50px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        input {
          background: none !important;
          border: none !important;
        }

        textarea {
          background: none !important;
          border: none !important;
        }

        input::placeholder, textarea::placeholder {
          color: rgba(107, 114, 128, 0.7);
        }
      `}</style>

      <div className="px-8 py-14 relative z-10">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="col-span-2">
              {/* Project Image */}
              {project.coverImage ? (
                <img src={project.coverImage} alt={project.title} className="w-full h-72 object-cover rounded-2xl mb-8" style={{ animation: 'slideUp 0.7s ease-out' }} />
              ) : (
                <div style={{
                  background: `linear-gradient(135deg, ${
                    project.category === 'Technology' ? '#00d4aa' :
                    project.category === 'Health' ? '#10b981' :
                    project.category === 'Education' ? '#8b5cf6' :
                    project.category === 'Environment' ? '#06b6d4' : '#f59e0b'
                  }15, ${
                    project.category === 'Technology' ? '#00d4aa' :
                    project.category === 'Health' ? '#10b981' :
                    project.category === 'Education' ? '#8b5cf6' :
                    project.category === 'Environment' ? '#06b6d4' : '#f59e0b'
                  }05)`,
                  height: 288,
                  animation: 'slideUp 0.7s ease-out'
                }} className="rounded-2xl mb-8 flex items-center justify-center text-6xl">
                  {project.category === 'Technology' ? '💻' : project.category === 'Health' ? '🏥' :
                   project.category === 'Education' ? '📚' : project.category === 'Environment' ? '🌱' : '✦'}
                </div>
              )}

              {/* Category Badge */}
              <span style={{
                background: 'rgba(0, 212, 170, 0.15)',
                border: '1px solid rgba(0, 212, 170, 0.35)',
                color: '#00d4aa',
                animation: 'slideUp 0.7s ease-out 0.1s both'
              }} className="text-xs px-4 py-2 rounded-full mb-6 inline-block font-bold uppercase tracking-wide">{project.category}</span>

              {/* Title & Details */}
              <h1 style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '2.5rem',
                animation: 'slideUp 0.7s ease-out 0.15s both'
              }} className="font-black mb-4 text-white">{project.title}</h1>
              
              <p style={{ color: '#a0aec0', animation: 'slideUp 0.7s ease-out 0.2s both' }} className="text-base font-medium mb-8">
                by <span className="text-white font-bold">{project.innovator?.name}</span>
              </p>

              {/* Description */}
              <p style={{ color: '#cbd5e1', animation: 'slideUp 0.7s ease-out 0.25s both' }} className="leading-relaxed text-base mb-10">
                {project.description}
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-3 gap-5">
                {[
                  { label: 'Team Size', value: `${project.teamSize} people`, icon: '👥' },
                  { label: 'Timeline', value: project.timeline, icon: '📅' },
                  { label: 'Category', value: project.category, icon: '🏷️' },
                ].map((s, idx) => (
                  <div
                    key={s.label}
                    style={{
                      background: `linear-gradient(135deg, rgba(20, 35, 50, 0.94) 0%, rgba(15, 30, 45, 0.80) 100%)`,
                      border: '1.5px solid rgba(0, 212, 170, 0.18)',
                      backdropFilter: 'blur(25px)',
                      animation: `slideUp 0.7s ease-out ${0.3 + idx * 0.05}s both`,
                    }}
                    className="p-6 rounded-2xl text-center group cursor-pointer transition-all"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.40)';
                      e.currentTarget.style.boxShadow = '0 40px 80px rgba(0, 212, 170, 0.15), inset 0 0 80px rgba(0, 212, 170, 0.08)';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.18)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icon}</div>
                    <div style={{ color: '#ffffff' }} className="font-bold text-sm">{s.value}</div>
                    <div style={{ color: '#6b7280' }} className="text-xs mt-2">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Funding Card */}
              <div
                style={{
                  background: `linear-gradient(135deg, rgba(20, 35, 50, 0.96) 0%, rgba(15, 30, 45, 0.85) 100%)`,
                  border: '1.5px solid rgba(0, 212, 170, 0.25)',
                  backdropFilter: 'blur(25px)',
                  animation: 'slideInRight 0.7s ease-out',
                  boxShadow: '0 30px 60px rgba(0, 212, 170, 0.15), inset 0 0 60px rgba(0, 212, 170, 0.08)',
                }}
                className="p-8 rounded-2xl"
              >
                <div style={{ color: '#00d4aa', fontFamily: 'Syne, sans-serif', fontSize: '2.5rem' }} className="font-black mb-2">
                  ${(project.currentFunding || 0).toLocaleString()}
                </div>
                <div style={{ color: '#a0aec0' }} className="text-sm mb-6 font-medium">pledged of ${(project.fundingGoal || 0).toLocaleString()} goal</div>

                {/* Progress Bar */}
                <div style={{
                  background: 'rgba(0, 212, 170, 0.12)',
                  height: 12,
                  borderRadius: 6,
                  overflow: 'hidden',
                  marginBottom: '14px',
                }}>
                  <div style={{
                    background: 'linear-gradient(90deg, #00d4aa 0%, #06b6d4 100%)',
                    width: barWidth(project.currentFunding, project.fundingGoal),
                    height: '100%',
                    borderRadius: 6,
                    boxShadow: '0 0 20px rgba(0, 212, 170, 0.5)',
                    transition: 'width 0.3s ease-out',
                  }} />
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div style={{ color: '#00d4aa', fontFamily: 'Syne, sans-serif' }} className="font-black text-lg">{formatPct(project.currentFunding, project.fundingGoal)}</div>
                    <div style={{ color: '#6b7280' }} className="text-xs">Funded</div>
                  </div>
                  {daysLeft !== null && (
                    <div className="text-right">
                      <div style={{ color: '#f59e0b', fontFamily: 'Syne, sans-serif' }} className="font-black text-lg">{daysLeft}</div>
                      <div style={{ color: '#6b7280' }} className="text-xs">Days Left</div>
                    </div>
                  )}
                </div>

                <div style={{ borderTop: '1px solid rgba(0, 212, 170, 0.15)', paddingTop: '16px', color: '#a0aec0' }} className="text-sm font-medium">
                  {project.backers?.length || 0} backers supporting this project
                </div>
              </div>

              {/* Contribute Form */}
              {user?.role === 'backer' && (
                <div
                  style={{
                    background: `linear-gradient(135deg, rgba(20, 35, 50, 0.96) 0%, rgba(15, 30, 45, 0.85) 100%)`,
                    border: '1.5px solid rgba(0, 212, 170, 0.25)',
                    backdropFilter: 'blur(25px)',
                    animation: 'slideInRight 0.7s ease-out 0.1s both',
                  }}
                  className="p-8 rounded-2xl"
                >
                  <h3 style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }} className="font-black text-lg mb-6">Back This Project</h3>

                  {/* Amount Input */}
                  <div className="mb-5">
                    <label style={{ color: '#00d4aa' }} className="text-xs font-black uppercase tracking-widest mb-2 block">Amount ($)</label>
                    <div style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      background: 'transparent',
                      border: `2px solid ${focusedInput === 'amount' ? 'rgba(0, 212, 170, 0.70)' : 'rgba(0, 212, 170, 0.30)'}`,
                      borderRadius: '14px',
                      padding: '0 16px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: focusedInput === 'amount' ? '0 0 40px rgba(0, 212, 170, 0.35), inset 0 0 30px rgba(0, 212, 170, 0.12)' : 'none',
                    }}>
                      <span style={{ fontSize: '18px', marginRight: '10px', filter: 'drop-shadow(0 0 8px rgba(0, 212, 170, 0.5))' }}>💵</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        onFocus={() => setFocusedInput('amount')}
                        onBlur={() => setFocusedInput(null)}
                        min={1}
                        style={{
                          color: '#ffffff',
                          outline: 'none',
                          width: '100%',
                          padding: '14px 0',
                          fontSize: '16px',
                          fontWeight: '500',
                        }}
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="mb-6">
                    <label style={{ color: '#00d4aa' }} className="text-xs font-black uppercase tracking-widest mb-2 block">Message (Optional)</label>
                    <div style={{
                      position: 'relative',
                      background: 'transparent',
                      border: `2px solid ${focusedInput === 'message' ? 'rgba(0, 212, 170, 0.70)' : 'rgba(0, 212, 170, 0.30)'}`,
                      borderRadius: '14px',
                      padding: '12px 16px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: focusedInput === 'message' ? '0 0 40px rgba(0, 212, 170, 0.35), inset 0 0 30px rgba(0, 212, 170, 0.12)' : 'none',
                    }}>
                      <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onFocus={() => setFocusedInput('message')}
                        onBlur={() => setFocusedInput(null)}
                        rows={3}
                        style={{
                          color: '#ffffff',
                          outline: 'none',
                          width: '100%',
                          fontSize: '14px',
                          fontWeight: '500',
                          resize: 'none',
                        }}
                        placeholder="Share why you're backing this project..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleContribute}
                    disabled={contributing}
                    style={{
                      background: contributing 
                        ? 'linear-gradient(135deg, rgba(0, 212, 170, 0.6) 0%, rgba(6, 182, 212, 0.5) 100%)' 
                        : 'linear-gradient(135deg, #00d4aa 0%, #06b6d4 100%)',
                      color: '#000a0a',
                      border: 'none',
                      boxShadow: contributing ? '0 15px 40px rgba(0, 212, 170, 0.25)' : '0 20px 50px rgba(0, 212, 170, 0.40)',
                      width: '100%',
                      padding: '16px',
                      borderRadius: '12px',
                      fontSize: '15px',
                      fontWeight: 800,
                      cursor: contributing ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease-out',
                      letterSpacing: '0.05em',
                    }}
                    onMouseEnter={(e) => {
                      if (!contributing) {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 30px 70px rgba(0, 212, 170, 0.50)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!contributing) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 212, 170, 0.40)';
                      }
                    }}
                  >
                    {contributing ? '⏳ Processing...' : `💳 Back for $${amount || '...'}`}
                  </button>
                </div>
              )}

              {/* AI Evaluation */}
              {project.aiEvaluation?.feasibilityScore !== null && (
                <div
                  style={{
                    background: `linear-gradient(135deg, rgba(10, 13, 26, 0.96) 0%, rgba(10, 18, 35, 0.88) 100%)`,
                    border: '1.5px solid rgba(0, 212, 170, 0.35)',
                    backdropFilter: 'blur(25px)',
                    boxShadow: '0 0 40px rgba(0, 212, 170, 0.12), inset 0 0 40px rgba(0, 212, 170, 0.08)',
                    animation: 'slideInRight 0.7s ease-out 0.2s both',
                  }}
                  className="p-6 rounded-2xl"
                >
                  <p style={{ color: '#00d4aa', textShadow: '0 0 20px rgba(0, 212, 170, 0.5)' }} className="text-xs font-black uppercase tracking-widest mb-5">
                    ✦ Gemini AI Analysis
                  </p>
                  {[
                    { label: 'Feasibility', score: project.aiEvaluation.feasibilityScore },
                    { label: 'Success Prob.', score: project.aiEvaluation.successProbability }
                  ].map(s => {
                    const color = s.score >= 70 ? '#10b981' : s.score >= 40 ? '#f59e0b' : '#ef4444';
                    return (
                      <div key={s.label} className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span style={{ color: '#a0aec0' }} className="text-xs font-bold uppercase tracking-wide">{s.label}</span>
                          <span style={{ color, fontFamily: 'Syne, sans-serif' }} className="font-black text-sm">{s.score}/100</span>
                        </div>
                        <div style={{
                          background: 'rgba(0, 212, 170, 0.10)',
                          height: 8,
                          borderRadius: 4,
                          overflow: 'hidden',
                        }}>
                          <div style={{
                            background: color,
                            width: `${s.score}%`,
                            height: '100%',
                            borderRadius: 4,
                            boxShadow: `0 0 15px ${color}50`,
                            transition: 'width 0.3s ease-out',
                          }} />
                        </div>
                      </div>
                    );
                  })}
                  <div style={{ borderTop: '1px solid rgba(0, 212, 170, 0.20)', paddingTop: '12px' }}>
                    <p style={{ color: '#cbd5e1' }} className="text-xs leading-relaxed">{project.aiEvaluation.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}