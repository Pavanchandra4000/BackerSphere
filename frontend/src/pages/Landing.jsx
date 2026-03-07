import { Link } from 'react-router-dom';
import { useState } from 'react';

/* ══════════════════════════════════════════
   CATEGORY EXPLORER
══════════════════════════════════════════ */
const CATEGORY_IMAGES = [
  { name: 'Technology',  icon: '⚡', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=340&fit=crop', color: '#00d4aa' },
  { name: 'Health',      icon: '🧬', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=340&fit=crop', color: '#06b6d4' },
  { name: 'Education',   icon: '📚', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=340&fit=crop', color: '#8b5cf6' },
  { name: 'Environment', icon: '🌱', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=340&fit=crop', color: '#22c55e' },
  { name: 'Art',         icon: '🎨', img: 'https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=600&h=340&fit=crop', color: '#ec4899' },
  { name: 'Social Impact',icon:'🤝', img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=340&fit=crop', color: '#f59e0b' },
];

function CategoryExplorer() {
  const [hovered, setHovered] = useState(null);
  return (
    <section style={{ position: 'relative', padding: '100px 32px', overflow: 'hidden' }}>
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&h=900&fit=crop"
        alt="bg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.07 }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0a0d1a 0%, rgba(10,13,26,0.88) 50%, #0a0d1a 100%)' }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(0,212,170,0.06) 0%, transparent 55%), radial-gradient(circle at 85% 50%, rgba(139,92,246,0.06) 0%, transparent 55%)',
      }} />
      <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ color: '#00d4aa', fontSize: 11, letterSpacing: '0.2em', fontWeight: 700, textTransform: 'uppercase' }}>
            ✦ Explore by Category
          </span>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 900, color: '#f9fafb', marginTop: 14, marginBottom: 12, lineHeight: 1.1,
          }}>
            Find Your Kind of Innovation
          </h2>
          <p style={{ color: '#6b7280', fontSize: 15, maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            Every category is AI-evaluated. Dive into the space that excites you most.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {CATEGORY_IMAGES.map((cat) => (
            <Link
              key={cat.name}
              to={`/projects?category=${cat.name}`}
              onMouseEnter={() => setHovered(cat.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                textDecoration: 'none', position: 'relative',
                borderRadius: 20, overflow: 'hidden', display: 'block',
                aspectRatio: '16/9',
                border: `1px solid ${hovered === cat.name ? cat.color + '60' : '#1a2332'}`,
                transition: 'all 0.35s',
                transform: hovered === cat.name ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hovered === cat.name ? `0 24px 60px ${cat.color}22` : '0 4px 24px rgba(0,0,0,0.4)',
              }}
            >
              <img src={cat.img} alt={cat.name} style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                transition: 'transform 0.5s',
                transform: hovered === cat.name ? 'scale(1.08)' : 'scale(1)',
              }} />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, #060810f0 0%, #060810aa 40%, transparent 75%)` }} />
              <div style={{
                position: 'absolute', inset: 0, background: cat.color,
                opacity: hovered === cat.name ? 0.15 : 0, transition: 'opacity 0.35s',
              }} />
              <div style={{ position: 'absolute', bottom: 16, left: 18, right: 18 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{cat.icon}</div>
                    <div style={{
                      fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, color: '#f9fafb',
                    }}>{cat.name}</div>
                  </div>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: hovered === cat.name ? cat.color : 'rgba(255,255,255,0.08)',
                    border: `1px solid ${hovered === cat.name ? cat.color : 'rgba(255,255,255,0.15)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: hovered === cat.name ? '#0a0d1a' : '#9ca3af', fontSize: 14,
                    transition: 'all 0.3s',
                  }}>→</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   WHY AI VETTING
══════════════════════════════════════════ */
function WhyAIVetting() {
  return (
    <section style={{ position: 'relative', padding: '0 32px 100px', borderTop: '1px solid #1a2332' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', paddingTop: 100 }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{ color: '#00d4aa', fontSize: 11, letterSpacing: '0.2em', fontWeight: 700, textTransform: 'uppercase' }}>
            ✦ Why AI Vetting?
          </span>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 900, color: '#f9fafb', marginTop: 14, marginBottom: 0, lineHeight: 1.1,
          }}>
            Smarter Than Traditional Platforms
          </h2>
        </div>

        {/* Image 1 — AI Evaluation */}
        <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', marginBottom: 20 }}>
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=500&fit=crop"
            alt="AI evaluation in action"
            style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #060810f0 0%, #06081066 50%, transparent 80%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(0,212,170,0.18), transparent)' }} />
          <div style={{
            position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0,212,170,0.3)', borderRadius: 99,
            padding: '7px 18px', display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap',
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#00d4aa', boxShadow: '0 0 8px #00d4aa' }} />
            <span style={{ color: '#00d4aa', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em' }}>AI-Powered Evaluation</span>
          </div>
          <div style={{
            position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
            width: '55%', minWidth: 340,
          }}>
            <div style={{
              background: 'rgba(0,212,170,0.1)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0,212,170,0.25)', borderRadius: 16, padding: '16px 22px', textAlign: 'center',
            }}>
              <div style={{ color: '#00d4aa', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 6 }}>🤖 GEMINI AI INSIGHT</div>
              <p style={{ color: '#e5e7eb', fontSize: 13, lineHeight: 1.65, margin: 0 }}>
                "Evaluation is objective, instant, and completely bias-free."
              </p>
            </div>
          </div>
        </div>

        {/* Image 2 — Backer Community */}
        <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=500&fit=crop"
            alt="Team collaborating on innovation"
            style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #060810f0 0%, #06081055 50%, transparent 80%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(245,158,11,0.14), transparent)' }} />
          <div style={{
            position: 'absolute', top: 20, right: 20,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(245,158,11,0.35)', borderRadius: 99,
            padding: '7px 18px', display: 'flex', alignItems: 'center', gap: 7,
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }} />
            <span style={{ color: '#f59e0b', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em' }}>Where Ideas Become Reality</span>
          </div>
          <div style={{
            position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
            width: '55%', minWidth: 340,
          }}>
            <div style={{
              background: 'rgba(245,158,11,0.1)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(245,158,11,0.25)', borderRadius: 16, padding: '16px 22px', textAlign: 'center',
            }}>
              <div style={{ color: '#f59e0b', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 6 }}>🚀 BACKER COMMUNITY</div>
              <p style={{ color: '#e5e7eb', fontSize: 13, lineHeight: 1.65, margin: 0 }}>
                "Great teams and bold backers come together — powered by trust and transparency."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   HOW IT WORKS
══════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { step: '01', title: 'Submit Your Project', desc: 'Innovators submit their idea with goals, timeline, and team details.', icon: '📝' },
    { step: '02', title: 'AI Evaluation',        desc: 'Gemini AI scores feasibility and success probability instantly.',     icon: '🤖' },
    { step: '03', title: 'Admin Review',          desc: 'Admin uses AI insights to approve or reject — then backers fund it.', icon: '✅' },
  ];
  return (
    <section style={{ position: 'relative', padding: '100px 32px', borderTop: '1px solid #1a2332', overflow: 'hidden' }}>
      {/* Background image with overlay */}
      <img
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=800&fit=crop"
        alt="bg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.06 }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0a0d1a, rgba(10,13,26,0.92), #0a0d1a)' }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ color: '#00d4aa', fontSize: 11, letterSpacing: '0.2em', fontWeight: 700, textTransform: 'uppercase' }}>✦ The Process</span>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 900, color: '#f9fafb', marginTop: 14, marginBottom: 0, lineHeight: 1.1,
          }}>
            How BackerSphere X Works
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, position: 'relative' }}>
          {/* Connector line */}
          <div style={{
            position: 'absolute', top: 44, left: '17%', right: '17%', height: 1,
            background: 'linear-gradient(90deg, transparent, #00d4aa44, transparent)',
          }} />

          {steps.map((s, i) => (
            <div key={s.step} style={{
              background: 'rgba(15,22,35,0.9)', backdropFilter: 'blur(12px)',
              border: '1px solid #1a2332', borderRadius: 24, padding: '36px 28px',
              textAlign: 'center', position: 'relative',
            }}>
              {/* Icon circle */}
              <div style={{
                width: 56, height: 56, borderRadius: '50%', margin: '0 auto 24px',
                background: 'rgba(0,212,170,0.1)', border: '1.5px solid rgba(0,212,170,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>
                {s.icon}
              </div>
              <div style={{
                fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 800,
                color: '#00d4aa', letterSpacing: '0.1em', marginBottom: 12, opacity: 0.5,
              }}>{s.step}</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 17, fontWeight: 800, color: '#f9fafb', marginBottom: 12 }}>
                {s.title}
              </h3>
              <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CTA — Full-width cinematic section
══════════════════════════════════════════ */
function CTASection() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid #1a2332' }}>
      {/* Full background image */}
      <img
        src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1800&h=900&fit=crop"
        alt="CTA background"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {/* Layered overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,8,16,0.82)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,212,170,0.14), transparent)' }} />
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(#00d4aa 1px, transparent 1px), linear-gradient(90deg, #00d4aa 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      <div style={{
        position: 'relative', padding: '72px 32px',
        textAlign: 'center', maxWidth: 680, margin: '0 auto',
      }}>
        {/* Floating badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 22,
          background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.3)',
          borderRadius: 99, padding: '6px 16px',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4aa', boxShadow: '0 0 8px #00d4aa' }} />
          <span style={{ color: '#00d4aa', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em' }}>JOIN THE MOVEMENT</span>
        </div>

        <h2 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(30px, 4vw, 48px)',
          fontWeight: 900, lineHeight: 1.05, letterSpacing: '-1px',
          color: '#ffffff', marginBottom: 14,
        }}>
          Ready to Back<br />
          <span style={{ color: '#00d4aa', textShadow: '0 0 50px rgba(0,212,170,0.45)' }}>Great Ideas?</span>
        </h2>

        <p style={{
          color: 'rgba(209,213,219,0.75)', fontSize: 15, lineHeight: 1.75,
          maxWidth: 460, margin: '0 auto 32px',
        }}>
          Join thousands of backers supporting AI-vetted innovations. Every project you fund has been scored for success by Google Gemini.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" style={{
            background: '#00d4aa', color: '#0a0d1a', textDecoration: 'none',
            padding: '14px 32px', borderRadius: 13, fontWeight: 900, fontSize: 15,
            boxShadow: '0 0 36px rgba(0,212,170,0.4), 0 6px 24px rgba(0,0,0,0.3)',
            fontFamily: 'Syne, sans-serif', letterSpacing: '0.02em',
          }}>
            Join as a Backer →
          </Link>
          <Link to="/register?role=innovator" style={{
            background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.18)', color: '#f9fafb', textDecoration: 'none',
            padding: '14px 32px', borderRadius: 13, fontWeight: 700, fontSize: 15,
            fontFamily: 'Syne, sans-serif',
          }}>
            Submit a Project
          </Link>
        </div>

        {/* Bottom pills */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
          {['🤖 Gemini AI Evaluated', '🔒 Secure Fund Holding', '🌍 Global Community'].map(pill => (
            <div key={pill} style={{
              background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 99,
              padding: '6px 14px', color: '#6b7280', fontSize: 11, fontWeight: 500,
            }}>
              {pill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   MAIN LANDING
══════════════════════════════════════════ */
export default function Landing() {
  return (
    <div style={{ background: '#0a0d1a', fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen">

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', minHeight: '95vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&h=1000&fit=crop"
          alt="hero background"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,8,16,0.78)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 55% at 50% 65%, rgba(0,212,170,0.13), transparent)' }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.035,
          backgroundImage: 'linear-gradient(#00d4aa 1px, transparent 1px), linear-gradient(90deg, #00d4aa 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 220, background: 'linear-gradient(to bottom, transparent, #0a0d1a)' }} />

        <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px', maxWidth: 880, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 30,
            background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.35)',
            borderRadius: 99, padding: '8px 20px',
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#00d4aa', boxShadow: '0 0 10px #00d4aa' }} />
            <span style={{ color: '#00d4aa', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em' }}>AI-POWERED CROWDFUNDING PLATFORM</span>
          </div>

          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(52px, 8vw, 92px)',
            fontWeight: 900, lineHeight: 0.98, letterSpacing: '-3px',
            color: '#ffffff', marginBottom: 28,
          }}>
            Fund the Future.<br />
            <span style={{ color: '#00d4aa', textShadow: '0 0 80px rgba(0,212,170,0.6)' }}>Backed by AI.</span>
          </h1>

          <p style={{
            color: 'rgba(209,213,219,0.82)', fontSize: 19, lineHeight: 1.8,
            maxWidth: 560, margin: '0 auto 40px', fontWeight: 400,
          }}>
            BackerSphere X uses Google Gemini to evaluate every project for feasibility and success potential.
            Smarter funding decisions. Better outcomes.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{
              background: '#00d4aa', color: '#0a0d1a', textDecoration: 'none',
              padding: '16px 36px', borderRadius: 15, fontWeight: 900, fontSize: 16,
              fontFamily: 'Syne, sans-serif',
              boxShadow: '0 0 40px rgba(0,212,170,0.4)',
            }}>
              Start a Project →
            </Link>
            <Link to="/projects" style={{
              background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.14)', color: '#f9fafb', textDecoration: 'none',
              padding: '16px 36px', borderRadius: 15, fontWeight: 700, fontSize: 16,
              fontFamily: 'Syne, sans-serif',
            }}>
              Browse Projects
            </Link>
          </div>

          <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.35 }}>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, #00d4aa)' }} />
            <span style={{ color: '#00d4aa', fontSize: 10, letterSpacing: '0.2em', fontWeight: 700 }}>SCROLL</span>
          </div>
        </div>
      </section>

      {/* ── CATEGORY EXPLORER ── */}
      <CategoryExplorer />

      {/* ── WHY AI VETTING ── */}
      <WhyAIVetting />

      {/* ── HOW IT WORKS ── */}
      <HowItWorks />

      {/* ── CTA ── */}
      <CTASection />

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #1a2332', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ color: '#374151', fontSize: 13, margin: 0 }}>
          © 2024 BackerSphere X · Powered by Google Gemini AI
        </p>
      </footer>
    </div>
  );
}