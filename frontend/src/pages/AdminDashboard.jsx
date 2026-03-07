import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ScoreBar = ({ score }) => {
  const color = score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444';
  return (
    <div className="flex items-center gap-2">
      <div style={{ background: 'rgba(255, 255, 255, 0.08)', width: 80, height: 5, borderRadius: 3 }}>
        <div style={{ 
          background: color, 
          width: `${score}%`, 
          height: '100%', 
          borderRadius: 3, 
          boxShadow: `0 0 15px ${color}70`,
          transition: 'all 0.6s ease-out'
        }} />
      </div>
      <span style={{ color }} className="text-xs font-bold">{score}</span>
    </div>
  );
};

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [actionNote, setActionNote] = useState('');
  const [actionTarget, setActionTarget] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchProjects();
  }, [filter]);

  const fetchStats = () => {
    axios.get('/api/admin/stats').then(r => setStats(r.data)).catch(console.error);
  };

  const fetchProjects = () => {
    setLoading(true);
    axios.get(`/api/admin/projects?status=${filter}`)
      .then(r => setProjects(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleDecision = async (id, decision) => {
    try {
      await axios.patch(`/api/admin/projects/${id}/${decision}`, { adminNote: actionNote });
      toast.success(`Project ${decision}d successfully`);
      setActionTarget(null);
      setActionNote('');
      fetchProjects();
      fetchStats();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`/api/admin/projects/${id}`);
      setProjects(prev => prev.filter(p => p._id !== id));
      setConfirmDeleteId(null);
      toast.success('Project deleted successfully.');
      fetchStats();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete project.');
    } finally {
      setDeletingId(null);
    }
  };

  const statsList = stats ? [
    { label: 'Total Projects', value: stats.totalProjects, color: '#00d4aa', icon: '📊' },
    { label: 'Pending Review', value: stats.pendingProjects, color: '#f59e0b', icon: '⏳' },
    { label: 'Approved', value: stats.approvedProjects, color: '#10b981', icon: '✓' },
    { label: 'Rejected', value: stats.rejectedProjects, color: '#ef4444', icon: '✗' },
    { label: 'Total Users', value: stats.totalUsers, color: '#8b5cf6', icon: '👥' },
    { label: 'Total Funded', value: `$${(stats.totalFunding || 0).toLocaleString()}`, color: '#06b6d4', icon: '💰' },
  ] : [];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url('https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=2000&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
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

      {/* Ambient Light Effects */}
      <div style={{
        position: 'fixed',
        top: '-30%',
        left: '-15%',
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

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(50px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 25px rgba(0, 212, 170, 0.15); }
          50% { box-shadow: 0 0 40px rgba(0, 212, 170, 0.25); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>

      <div className="px-8 py-14 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Futuristic Header */}
          <div className="mb-16" style={{ animation: 'slideUp 0.7s ease-out' }}>
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ 
                    fontSize: '28px', 
                    filter: 'drop-shadow(0 0 15px rgba(0, 212, 170, 0.7))',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}>⚙</span>
                  <span style={{ color: '#00d4aa' }} className="text-xs uppercase tracking-widest font-bold">Admin Control Center</span>
                </div>
                <h1 style={{ 
                  fontFamily: 'Syne, sans-serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #00d4aa 50%, #06b6d4 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '4rem',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: '1.1',
                }} className="">BackerSphere X</h1>
                <p style={{ color: '#a0aec0' }} className="text-base mt-4 font-medium">Enterprise Project Management & AI Evaluation System</p>
              </div>

              {/* Status Card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.18) 0%, rgba(6, 182, 212, 0.14) 100%)',
                border: '1.5px solid rgba(0, 212, 170, 0.35)',
                borderRadius: '18px',
                padding: '22px 32px',
                backdropFilter: 'blur(25px)',
                animation: 'glow 3s ease-in-out infinite',
              }}>
                <div style={{ color: '#00d4aa', fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em' }}>SYSTEM STATUS</div>
                <div className="flex items-center gap-3 mt-3">
                  <span style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#00d4aa',
                    boxShadow: '0 0 12px #00d4aa, 0 0 25px rgba(0, 212, 170, 0.5)',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }} />
                  <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 700 }}>Live & Active</div>
                </div>
              </div>
            </div>

            {/* Decorative Line */}
            <div style={{
              height: '2px',
              background: 'linear-gradient(90deg, #00d4aa 0%, #06b6d4 50%, transparent 100%)',
              borderRadius: '1px',
            }} />
          </div>

          {/* Premium Stats Grid */}
          {stats && (
            <div className="grid grid-cols-6 gap-5 mb-14">
              {statsList.map((s, idx) => (
                <div 
                  key={s.label}
                  style={{
                    background: `linear-gradient(135deg, rgba(20, 35, 50, 0.94) 0%, rgba(15, 30, 45, 0.80) 100%)`,
                    border: `1.5px solid rgba(0, 212, 170, 0.20)`,
                    backdropFilter: 'blur(30px)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `slideUp 0.7s ease-out ${idx * 0.09}s both`,
                  }}
                  className="p-7 rounded-2xl text-center group cursor-pointer relative overflow-hidden"
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
                  <div style={{ fontSize: '42px', marginBottom: '12px' }}>{s.icon}</div>
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
          )}

          {/* Filter Tabs */}
          <div className="flex gap-4 mb-12 flex-wrap" style={{ animation: 'slideInRight 0.7s ease-out 0.15s both' }}>
            {['pending', 'approved', 'rejected', 'all'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  background: filter === f 
                    ? `linear-gradient(135deg, rgba(0, 212, 170, 1) 0%, rgba(6, 182, 212, 0.95) 100%)` 
                    : 'rgba(20, 35, 50, 0.8)',
                  color: filter === f ? '#000a0a' : '#a0aec0',
                  border: filter === f ? '1.5px solid rgba(0, 212, 170, 0.5)' : '1.5px solid rgba(0, 212, 170, 0.25)',
                  boxShadow: filter === f ? '0 20px 50px rgba(0, 212, 170, 0.35)' : 'none',
                  backdropFilter: 'blur(25px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                className="px-8 py-3 rounded-xl text-sm font-bold capitalize"
              >
                {f}
              </button>
            ))}
          </div>

          {/* Projects List */}
          {loading ? (
            <div className="text-center py-32">
              <div style={{ fontSize: '56px', marginBottom: '20px', animation: 'pulse 1.5s ease-in-out infinite' }}>⏳</div>
              <div style={{ color: '#a0aec0' }} className="text-lg font-medium">Loading projects...</div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-32">
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📭</div>
              <div style={{ color: '#a0aec0' }} className="text-lg font-medium">No {filter} projects found</div>
            </div>
          ) : (
            <div className="space-y-5">
              {projects.map((p, idx) => (
                <div
                  key={p._id}
                  style={{
                    background: `linear-gradient(135deg, rgba(20, 35, 50, 0.96) 0%, rgba(15, 30, 45, 0.85) 100%)`,
                    border: '1.5px solid rgba(0, 212, 170, 0.18)',
                    backdropFilter: 'blur(25px)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `slideUp 0.7s ease-out ${idx * 0.06}s both`,
                  }}
                  className="rounded-2xl p-9 group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 60px 120px rgba(0, 212, 170, 0.18), inset 0 0 100px rgba(0, 212, 170, 0.10)';
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

                  <div className="flex items-start justify-between mb-7">
                    <div className="flex-1">
                      <h3 style={{ color: '#ffffff' }} className="font-black text-2xl mb-3">{p.title}</h3>
                      <div className="flex gap-5 text-xs text-gray-400 flex-wrap">
                        <span className="flex items-center gap-2">👤 {p.innovator?.name}</span>
                        <span>•</span>
                        <span className="flex items-center gap-2">🏷️ {p.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-2">🎯 ${p.fundingGoal?.toLocaleString()}</span>
                        <span>•</span>
                        <span className="flex items-center gap-2">👥 Team: {p.teamSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 ml-8">
                      <span style={{
                        color: p.status === 'approved' ? '#10b981' : p.status === 'rejected' ? '#ef4444' : '#f59e0b',
                        background: p.status === 'approved' ? 'rgba(16, 185, 129, 0.30)' : p.status === 'rejected' ? 'rgba(239, 68, 68, 0.30)' : 'rgba(245, 158, 11, 0.30)',
                        border: `1.5px solid ${p.status === 'approved' ? 'rgba(16, 185, 129, 0.60)' : p.status === 'rejected' ? 'rgba(239, 68, 68, 0.60)' : 'rgba(245, 158, 11, 0.60)'}`,
                        boxShadow: `0 0 30px ${p.status === 'approved' ? '#10b98150' : p.status === 'rejected' ? '#ef444450' : '#f59e0b50'}`,
                        backdropFilter: 'blur(15px)',
                      }} className="px-5 py-2.5 rounded-full text-xs font-bold capitalize">
                        {p.status}
                      </span>

                      {/* Delete Button */}
                      {confirmDeleteId === p._id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">Confirm?</span>
                          <button
                            onClick={() => handleDelete(p._id)}
                            disabled={deletingId === p._id}
                            style={{
                              background: `linear-gradient(135deg, #ef4444 0%, #dc2626 100%)`,
                              color: 'white',
                              boxShadow: '0 15px 40px rgba(239, 68, 68, 0.50)',
                            }}
                            className="px-5 py-2 rounded-lg text-xs font-bold disabled:opacity-60 transition-all"
                          >
                            {deletingId === p._id ? '⏳' : '✓ Yes'}
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            style={{ background: 'rgba(31, 41, 55, 0.95)', color: '#a0aec0', border: '1.5px solid rgba(75, 85, 99, 0.7)' }}
                            className="px-5 py-2 rounded-lg text-xs font-bold transition-all"
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
                          className="px-5 py-2 rounded-lg text-xs font-bold hover:border-red-500 hover:bg-red-500/25"
                        >
                          🗑 Delete
                        </button>
                      )}
                    </div>
                  </div>

                  <p style={{ color: '#cbd5e1' }} className="text-sm mb-7 leading-relaxed">{p.description}</p>

                  {/* AI Evaluation Section */}
                  {p.aiEvaluation?.feasibilityScore !== null ? (
                    <div style={{
                      background: `linear-gradient(135deg, rgba(10, 13, 26, 0.96) 0%, rgba(10, 18, 35, 0.88) 100%)`,
                      border: '1.5px solid rgba(0, 212, 170, 0.35)',
                      boxShadow: '0 0 60px rgba(0, 212, 170, 0.18), inset 0 0 60px rgba(0, 212, 170, 0.10)',
                      backdropFilter: 'blur(25px)',
                    }} className="rounded-2xl p-7 mb-7">
                      <p style={{ color: '#00d4aa', textShadow: '0 0 25px rgba(0, 212, 170, 0.6)' }} className="text-xs font-black uppercase tracking-widest mb-6">
                        ✦ Gemini AI Evaluation
                      </p>
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <div style={{ color: '#a0aec0' }} className="text-xs mb-3 uppercase tracking-wide font-bold">Feasibility Score</div>
                          <ScoreBar score={p.aiEvaluation.feasibilityScore} />
                        </div>
                        <div>
                          <div style={{ color: '#a0aec0' }} className="text-xs mb-3 uppercase tracking-wide font-bold">Success Probability</div>
                          <ScoreBar score={p.aiEvaluation.successProbability} />
                        </div>
                      </div>
                      <div style={{ borderTop: '1px solid rgba(0, 212, 170, 0.20)' }} className="pt-5">
                        <p style={{ color: '#cbd5e1' }} className="text-xs leading-relaxed">{p.aiEvaluation.explanation}</p>
                      </div>
                    </div>
                  ) : (
                    <div style={{ color: '#f59e0b' }} className="text-sm mb-7 font-medium">⏳ AI evaluation in progress...</div>
                  )}

                  {/* Action Buttons */}
                  {p.status === 'pending' && (
                    <div>
                      {actionTarget === p._id ? (
                        <div className="flex gap-3 items-center">
                          <input
                            value={actionNote}
                            onChange={e => setActionNote(e.target.value)}
                            style={{
                              background: 'rgba(10, 13, 26, 0.96)',
                              border: '1.5px solid rgba(0, 212, 170, 0.30)',
                              color: 'white',
                              backdropFilter: 'blur(20px)',
                            }}
                            className="flex-1 px-6 py-3 rounded-xl text-sm focus:outline-none focus:border-teal-500 transition-all"
                            placeholder="Admin note (optional)..."
                          />
                          <button
                            onClick={() => handleDecision(p._id, 'approve')}
                            style={{
                              background: `linear-gradient(135deg, #10b981 0%, #059669 100%)`,
                              color: 'white',
                              boxShadow: '0 15px 40px rgba(16, 185, 129, 0.50)',
                            }}
                            className="px-7 py-3 rounded-xl text-sm font-bold transition-all"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => handleDecision(p._id, 'reject')}
                            style={{
                              background: `linear-gradient(135deg, #ef4444 0%, #dc2626 100%)`,
                              color: 'white',
                              boxShadow: '0 15px 40px rgba(239, 68, 68, 0.50)',
                            }}
                            className="px-7 py-3 rounded-xl text-sm font-bold transition-all"
                          >
                            ✗ Reject
                          </button>
                          <button
                            onClick={() => { setActionTarget(null); setActionNote(''); }}
                            style={{ color: '#a0aec0' }}
                            className="text-sm font-medium hover:text-white transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActionTarget(p._id)}
                          style={{
                            border: '1.5px solid rgba(0, 212, 170, 0.40)',
                            color: '#a0aec0',
                            background: 'rgba(0, 212, 170, 0.12)',
                            backdropFilter: 'blur(20px)',
                          }}
                          className="px-7 py-3 rounded-xl text-sm font-bold hover:border-teal-500 hover:text-white hover:bg-teal-500/25"
                        >
                          🔍 Review & Decide
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}