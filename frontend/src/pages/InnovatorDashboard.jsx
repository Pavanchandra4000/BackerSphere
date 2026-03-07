import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

// ✅ FIX 1: Accurate percentage — shows 0.25% instead of 0% for small amounts
const formatPct = (current, goal) => {
  if (!goal || goal === 0) return '0%';
  const pct = (current / goal) * 100;
  if (pct === 0) return '0%';
  if (pct < 1) return pct.toFixed(2) + '%';
  if (pct < 10) return pct.toFixed(1) + '%';
  return Math.round(pct) + '%';
};

// ✅ FIX 2: Minimum visible bar width so any funded project always shows a bar
const barWidth = (current, goal) => {
  if (!goal || goal === 0 || current === 0) return '0%';
  const pct = (current / goal) * 100;
  return Math.min(Math.max(pct, 1.5), 100) + '%';
};

const ScoreBadge = ({ label, score }) => {
  const color = score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444';
  return (
    <div className="flex items-center gap-3">
      <span style={{ color: '#a0aec0' }} className="text-xs font-bold uppercase tracking-wide">{label}</span>
      <div style={{ background: 'rgba(0, 212, 170, 0.10)', width: 100, height: 6, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ background: color, width: `${score}%`, height: '100%', borderRadius: 3, transition: 'width 1s', boxShadow: `0 0 10px ${color}50` }} />
      </div>
      <span style={{ color, fontFamily: 'Syne, sans-serif' }} className="text-sm font-black">{score}</span>
    </div>
  );
};

const statusColors = { 
  pending: { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.40)' },
  approved: { color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.40)' },
  rejected: { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.40)' }
};

export default function InnovatorDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // ✅ FIX 3: useCallback so fetchProjects can be reused across multiple useEffects
  const fetchProjects = useCallback(() => {
    axios.get('/api/projects/my/projects')
      .then(r => setProjects(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ✅ FIX 4: Re-fetch when tab gets focus (so funding raises after backer contributes)
  useEffect(() => {
    const handleFocus = () => fetchProjects();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchProjects]);

  // ✅ FIX 5: Auto-refresh every 30 seconds so funded amount updates in real time
  useEffect(() => {
    const interval = setInterval(fetchProjects, 30000);
    return () => clearInterval(interval);
  }, [fetchProjects]);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects(prev => prev.filter(p => p._id !== id));
      setConfirmDeleteId(null);
      toast.success('Project deleted successfully.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete project.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=2000&q=80')`,
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
                    filter: 'drop-shadow(0 0 15px rgba(0, 212, 170, 0.7))',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}>💡</span>
                  <span style={{ color: '#00d4aa' }} className="text-xs uppercase tracking-widest font-bold">Your Innovation</span>
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
                }} className="">My Projects</h1>
                <p style={{ color: '#a0aec0' }} className="text-base mt-3 font-medium">Welcome back, <span className="text-white font-bold">{user?.name}</span></p>
              </div>
              <Link to="/innovator/submit"
                style={{
                  background: 'linear-gradient(135deg, #00d4aa 0%, #06b6d4 100%)',
                  color: '#000a0a',
                  boxShadow: '0 20px 50px rgba(0, 212, 170, 0.35)',
                }}
                className="px-8 py-4 rounded-xl font-bold text-sm hover:shadow-lg transition-all">
                + Submit Project
              </Link>
            </div>
            <div style={{
              height: '2px',
              background: 'linear-gradient(90deg, #00d4aa 0%, #06b6d4 50%, transparent 100%)',
              marginTop: '20px',
            }} />
          </div>

          {/* Projects List */}
          {loading ? (
            <div className="text-center py-32">
              <div style={{ fontSize: '48px', marginBottom: '16px', animation: 'pulse 1.5s ease-in-out infinite' }}>⏳</div>
              <div style={{ color: '#a0aec0' }} className="text-lg font-medium">Loading your projects...</div>
            </div>
          ) : projects.length === 0 ? (
            <div style={{
              background: `linear-gradient(135deg, rgba(20, 35, 50, 0.94) 0%, rgba(15, 30, 45, 0.80) 100%)`,
              border: '2px dashed rgba(0, 212, 170, 0.30)',
              backdropFilter: 'blur(30px)',
              animation: 'slideUp 0.7s ease-out 0.2s both',
            }} className="rounded-2xl p-20 text-center">
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🚀</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-black mb-3">No Projects Yet</h2>
              <p style={{ color: '#a0aec0' }} className="mb-8 text-base font-medium">Submit your first innovative project and let AI evaluate it</p>
              <Link to="/innovator/submit"
                style={{
                  background: 'linear-gradient(135deg, #00d4aa 0%, #06b6d4 100%)',
                  color: '#000a0a',
                  boxShadow: '0 20px 50px rgba(0, 212, 170, 0.35)',
                }}
                className="px-8 py-4 rounded-xl font-bold text-sm inline-block hover:shadow-lg transition-all">
                Submit Your First Project
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {projects.map((p, idx) => {
                const status = p.status || 'pending';
                const statusInfo = statusColors[status];
                return (
                  <div
                    key={p._id}
                    style={{
                      background: `linear-gradient(135deg, rgba(20, 35, 50, 0.96) 0%, rgba(15, 30, 45, 0.85) 100%)`,
                      border: '1.5px solid rgba(0, 212, 170, 0.18)',
                      backdropFilter: 'blur(25px)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      animation: `slideUp 0.7s ease-out ${idx * 0.06}s both`,
                    }}
                    className="rounded-2xl p-8 group"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.40)';
                      e.currentTarget.style.boxShadow = '0 50px 100px rgba(0, 212, 170, 0.18), inset 0 0 80px rgba(0, 212, 170, 0.10)';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(25, 40, 55, 0.98) 0%, rgba(20, 35, 50, 0.92) 100%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.18)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(20, 35, 50, 0.96) 0%, rgba(15, 30, 45, 0.85) 100%)';
                    }}
                  >

                    {/* Header - Title & Status */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 style={{ color: '#ffffff' }} className="font-black text-2xl mb-3">{p.title}</h3>
                        <span style={{
                          background: 'rgba(0, 212, 170, 0.15)',
                          border: '1px solid rgba(0, 212, 170, 0.35)',
                          color: '#00d4aa',
                        }} className="text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wide">{p.category}</span>
                      </div>

                      <div className="flex items-center gap-3 ml-8">
                        <span style={{
                          color: statusInfo.color,
                          background: statusInfo.bg,
                          border: `1.5px solid ${statusInfo.border}`,
                          boxShadow: `0 0 20px ${statusInfo.color}30`,
                          backdropFilter: 'blur(10px)',
                        }} className="px-4 py-2 rounded-full text-xs font-bold capitalize">
                          {status}
                        </span>

                        {/* Delete Button */}
                        {confirmDeleteId === p._id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">Confirm?</span>
                            <button
                              onClick={() => handleDelete(p._id)}
                              disabled={deletingId === p._id}
                              style={{
                                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                color: 'white',
                                boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4)',
                              }}
                              className="px-4 py-2 rounded-lg text-xs font-bold disabled:opacity-60 transition-all"
                            >
                              {deletingId === p._id ? '⏳' : '✓ Yes'}
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              style={{ background: 'rgba(31, 41, 55, 0.95)', color: '#a0aec0', border: '1.5px solid rgba(75, 85, 99, 0.7)' }}
                              className="px-4 py-2 rounded-lg text-xs font-bold transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteId(p._id)}
                            style={{
                              border: '1.5px solid rgba(239, 68, 68, 0.50)',
                              color: '#ef4444',
                              background: 'rgba(239, 68, 68, 0.12)',
                            }}
                            className="px-4 py-2 rounded-lg text-xs font-bold hover:border-red-500 hover:bg-red-500/25"
                          >
                            🗑 Delete
                          </button>
                        )}
                      </div>
                    </div>

                    {/* ✅ FIXED: Funding Progress Section */}
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: '#a0aec0' }} className="text-xs font-bold uppercase tracking-wide">Funding Progress</span>
                        <span style={{ color: '#cbd5e1' }} className="text-sm font-semibold">
                          ${p.currentFunding?.toLocaleString() || 0} / ${p.fundingGoal?.toLocaleString()}
                        </span>
                      </div>
                      <div style={{
                        background: 'rgba(0, 212, 170, 0.10)',
                        height: 10,
                        borderRadius: 5,
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          background: 'linear-gradient(90deg, #00d4aa 0%, #06b6d4 100%)',
                          width: barWidth(p.currentFunding, p.fundingGoal), // ✅ FIXED: visible bar even for small amounts
                          height: '100%',
                          borderRadius: 5,
                          boxShadow: '0 0 20px rgba(0, 212, 170, 0.5)',
                          transition: 'width 0.3s ease-out',
                        }} />
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span style={{ color: '#00d4aa', fontFamily: 'Syne, sans-serif' }} className="font-black text-lg">
                          {formatPct(p.currentFunding, p.fundingGoal)} {/* ✅ FIXED: shows 0.25% not 0% */}
                        </span>
                        <span style={{ color: '#6b7280' }} className="text-xs">Funded</span>
                      </div>
                    </div>

                    {/* AI Evaluation Section */}
                    {p.aiEvaluation?.feasibilityScore !== null ? (
                      <div style={{
                        background: `linear-gradient(135deg, rgba(10, 13, 26, 0.96) 0%, rgba(10, 18, 35, 0.88) 100%)`,
                        border: '1.5px solid rgba(0, 212, 170, 0.35)',
                        boxShadow: '0 0 40px rgba(0, 212, 170, 0.12), inset 0 0 40px rgba(0, 212, 170, 0.08)',
                        backdropFilter: 'blur(20px)',
                      }} className="rounded-2xl p-6 mb-6">
                        <p style={{ color: '#00d4aa', textShadow: '0 0 20px rgba(0, 212, 170, 0.5)' }} className="text-xs font-black uppercase tracking-widest mb-5">
                          ✦ Gemini AI Evaluation
                        </p>
                        <div className="space-y-4 mb-5">
                          <ScoreBadge label="Feasibility" score={p.aiEvaluation.feasibilityScore} />
                          <ScoreBadge label="Success Prob." score={p.aiEvaluation.successProbability} />
                        </div>
                        {p.aiEvaluation.explanation && (
                          <div style={{ borderTop: '1px solid rgba(0, 212, 170, 0.20)' }} className="pt-5">
                            <p style={{ color: '#cbd5e1' }} className="text-xs leading-relaxed">{p.aiEvaluation.explanation}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{
                        background: `linear-gradient(135deg, rgba(10, 13, 26, 0.96) 0%, rgba(10, 18, 35, 0.88) 100%)`,
                        border: '1.5px solid rgba(0, 212, 170, 0.35)',
                        backdropFilter: 'blur(20px)',
                      }} className="rounded-2xl p-6 mb-6 text-center">
                        <span style={{ color: '#f59e0b', animation: 'pulse 1.5s ease-in-out infinite' }}>⏳</span>
                        <p style={{ color: '#a0aec0' }} className="text-sm mt-2 font-medium">AI evaluation in progress...</p>
                      </div>
                    )}

                    {/* Admin Note Section */}
                    {p.adminNote && (
                      <div style={{
                        background: 'rgba(245, 158, 11, 0.12)',
                        border: '1.5px solid rgba(245, 158, 11, 0.35)',
                        backdropFilter: 'blur(15px)',
                      }} className="rounded-2xl p-5">
                        <p style={{ color: '#f59e0b' }} className="text-xs font-black uppercase tracking-wide mb-2">📋 Admin Review</p>
                        <p style={{ color: '#cbd5e1' }} className="text-sm leading-relaxed">{p.adminNote}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}