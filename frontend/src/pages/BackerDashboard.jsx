import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function BackerDashboard() {
  const { user } = useAuth();
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/contributions/my')
      .then(r => setContributions(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalContributed = contributions.reduce((sum, c) => sum + c.amount, 0);

  const stats = [
    { label: 'Total Invested', value: `$${totalContributed.toLocaleString()}`, color: '#00d4aa', icon: '💰' },
    { label: 'Projects Backed', value: new Set(contributions.map(c => c.project?._id)).size, color: '#8b5cf6', icon: '📊' },
    { label: 'Contributions', value: contributions.length, color: '#f59e0b', icon: '✨' },
  ];

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
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(50px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div className="px-8 py-14 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-16" style={{ animation: 'slideUp 0.7s ease-out' }}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ 
                    fontSize: '24px', 
                    filter: 'drop-shadow(0 0 15px rgba(0, 212, 170, 0.7))'
                  }}>💼</span>
                  <span style={{ color: '#00d4aa' }} className="text-xs uppercase tracking-widest font-bold">Your Portfolio</span>
                </div>
                <h1 style={{ 
                  fontFamily: 'Syne, sans-serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #00d4aa 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '3rem',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                }} className="">My Portfolio</h1>
                <p style={{ color: '#a0aec0' }} className="text-base mt-3 font-medium">Welcome back, <span className="text-white font-bold">{user?.name}</span></p>
              </div>
              <Link to="/projects"
                style={{
                  background: 'linear-gradient(135deg, #00d4aa 0%, #06b6d4 100%)',
                  color: '#000a0a',
                  boxShadow: '0 20px 50px rgba(0, 212, 170, 0.35)',
                }}
                className="px-8 py-4 rounded-xl font-bold text-sm hover:shadow-lg transition-all">
                🚀 Browse Projects
              </Link>
            </div>
            <div style={{
              height: '2px',
              background: 'linear-gradient(90deg, #00d4aa 0%, #06b6d4 50%, transparent 100%)',
              marginTop: '20px',
            }} />
          </div>

          {/* Premium Stats Grid */}
          <div className="grid grid-cols-3 gap-5 mb-16">
            {stats.map((s, idx) => (
              <div 
                key={s.label}
                style={{
                  background: `linear-gradient(135deg, rgba(20, 35, 50, 0.94) 0%, rgba(15, 30, 45, 0.80) 100%)`,
                  border: `1.5px solid rgba(0, 212, 170, 0.20)`,
                  backdropFilter: 'blur(30px)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: `slideUp 0.7s ease-out ${idx * 0.09}s both`,
                }}
                className="p-8 rounded-2xl text-center group cursor-pointer"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.50)';
                  e.currentTarget.style.boxShadow = `0 40px 80px rgba(0, 212, 170, 0.25), inset 0 0 80px rgba(0, 212, 170, 0.12)`;
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(25, 40, 55, 0.98) 0%, rgba(20, 35, 50, 0.90) 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.20)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(20, 35, 50, 0.94) 0%, rgba(15, 30, 45, 0.80) 100%)';
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>{s.icon}</div>
                <div style={{ 
                  color: s.color, 
                  fontFamily: 'Syne, sans-serif', 
                  textShadow: `0 0 30px ${s.color}70`,
                  fontSize: '2.5rem',
                }} className="font-black">{s.value}</div>
                <div style={{ color: '#a0aec0' }} className="text-xs mt-3 uppercase tracking-wider font-bold">{s.label}</div>
                <div style={{ height: '3px', background: `linear-gradient(90deg, ${s.color}50, transparent)`, borderRadius: '2px', marginTop: '12px' }} />
              </div>
            ))}
          </div>

          {/* Contributions Section Header */}
          <div className="flex items-center justify-between mb-10" style={{ animation: 'slideInRight 0.7s ease-out 0.15s both' }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="font-black text-2xl">📈 Contribution History</h2>
          </div>

          {/* Contributions List */}
          {loading ? (
            <div className="text-center py-32">
              <div style={{ fontSize: '48px', marginBottom: '16px', animation: 'pulse 1.5s ease-in-out infinite' }}>⏳</div>
              <div style={{ color: '#a0aec0' }} className="text-lg font-medium">Loading your contributions...</div>
            </div>
          ) : contributions.length === 0 ? (
            <div style={{
              background: `linear-gradient(135deg, rgba(20, 35, 50, 0.94) 0%, rgba(15, 30, 45, 0.80) 100%)`,
              border: '2px dashed rgba(0, 212, 170, 0.30)',
              backdropFilter: 'blur(30px)',
              animation: 'slideUp 0.7s ease-out 0.2s both',
            }} className="rounded-2xl p-20 text-center">
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>💎</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-black mb-3">No Contributions Yet</h2>
              <p style={{ color: '#a0aec0' }} className="mb-8 text-base font-medium">Start backing innovative projects and become part of the future</p>
              <Link to="/projects"
                style={{
                  background: 'linear-gradient(135deg, #00d4aa 0%, #06b6d4 100%)',
                  color: '#000a0a',
                  boxShadow: '0 20px 50px rgba(0, 212, 170, 0.35)',
                }}
                className="px-8 py-4 rounded-xl font-bold text-sm inline-block hover:shadow-lg transition-all">
                🚀 Explore Projects
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {contributions.map((c, idx) => (
                <div
                  key={c._id}
                  style={{
                    background: `linear-gradient(135deg, rgba(20, 35, 50, 0.96) 0%, rgba(15, 30, 45, 0.85) 100%)`,
                    border: '1.5px solid rgba(0, 212, 170, 0.18)',
                    backdropFilter: 'blur(25px)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `slideUp 0.7s ease-out ${idx * 0.06}s both`,
                  }}
                  className="rounded-2xl p-8 group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 50px 100px rgba(0, 212, 170, 0.18), inset 0 0 80px rgba(0, 212, 170, 0.10)';
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.40)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(25, 40, 55, 0.98) 0%, rgba(20, 35, 50, 0.92) 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.18)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(20, 35, 50, 0.96) 0%, rgba(15, 30, 45, 0.85) 100%)';
                  }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <Link to={`/projects/${c.project?._id}`}
                            style={{ color: '#00d4aa' }}
                            className="font-black text-xl hover:opacity-80 transition-all">
                        {c.project?.title || 'Project'}
                      </Link>
                      <div className="flex gap-4 text-xs text-gray-400 mt-3 flex-wrap">
                        <span className="flex items-center gap-2">🏷️ {c.project?.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-2">🔗 TXN: {c.transactionId}</span>
                        <span>•</span>
                        <span className="flex items-center gap-2">📅 {new Date(c.createdAt).toLocaleDateString()}</span>
                      </div>
                      {c.message && (
                        <div style={{
                          background: 'rgba(0, 212, 170, 0.12)',
                          border: '1px solid rgba(0, 212, 170, 0.25)',
                          borderRadius: '10px',
                          padding: '10px 14px',
                          marginTop: '12px',
                        }}>
                          <p style={{ color: '#cbd5e1', fontSize: '13px' }}>💬 "{c.message}"</p>
                        </div>
                      )}
                    </div>

                    <div className="text-right ml-8">
                      <div style={{ 
                        color: '#00d4aa', 
                        fontFamily: 'Syne, sans-serif',
                        fontSize: '2rem',
                      }} className="font-black">+${c.amount.toLocaleString()}</div>
                      <div style={{ 
                        color: '#10b981',
                        background: 'rgba(16, 185, 129, 0.20)',
                        border: '1px solid rgba(16, 185, 129, 0.40)',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        marginTop: '8px',
                        display: 'inline-block',
                        letterSpacing: '0.05em',
                      }} className="">✓ {c.status?.toUpperCase()}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{
                    height: '3px',
                    background: 'linear-gradient(90deg, rgba(0, 212, 170, 0.3), transparent)',
                    borderRadius: '2px',
                  }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}