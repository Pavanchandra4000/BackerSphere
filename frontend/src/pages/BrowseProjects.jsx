import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const CATEGORIES = ['All', 'Technology', 'Health', 'Education', 'Environment', 'Art', 'Social Impact', 'Finance', 'Other'];

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

export default function BrowseProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState('newest');

  // ✅ FIX 3: useCallback so fetchProjects can be reused across multiple useEffects
  const fetchProjects = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== 'All') params.set('category', category);
    if (search) params.set('search', search);
    if (sort !== 'newest') params.set('sort', sort);

    axios.get(`/api/projects?${params}`)
      .then(r => setProjects(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category, search, sort]);

  // Fetch on mount and when filters change
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ✅ FIX 4: Re-fetch when tab gets focus (updates funding after backer contributes)
  useEffect(() => {
    const handleFocus = () => fetchProjects();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchProjects]);

  // ✅ FIX 5: Auto-refresh every 30 seconds so funded amount raises in real time
  useEffect(() => {
    const interval = setInterval(fetchProjects, 30000);
    return () => clearInterval(interval);
  }, [fetchProjects]);

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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(50px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes shimmer {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>

      <div className="px-8 py-14 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-16" style={{ animation: 'slideUp 0.7s ease-out' }}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ 
                    fontSize: '24px', 
                    filter: 'drop-shadow(0 0 15px rgba(0, 212, 170, 0.7))'
                  }}>🚀</span>
                  <span style={{ color: '#00d4aa' }} className="text-xs uppercase tracking-widest font-bold">Discover & Fund</span>
                </div>
                <h1 style={{ 
                  fontFamily: 'Syne, sans-serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #00d4aa 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '3.5rem',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                }} className="">Browse Projects</h1>
                <p style={{ color: '#a0aec0' }} className="text-base mt-3 font-medium">Explore innovative ideas and back the future</p>
              </div>
            </div>
            <div style={{
              height: '2px',
              background: 'linear-gradient(90deg, #00d4aa 0%, #06b6d4 50%, transparent 100%)',
              marginTop: '20px',
            }} />
          </div>

          {/* Search & Filter Section */}
          <div className="mb-12" style={{ animation: 'slideUp 0.7s ease-out 0.1s both' }}>
            {/* Search Bar */}
            <div className="mb-6">
              <div style={{
                background: `linear-gradient(135deg, rgba(18, 32, 48, 0.96) 0%, rgba(13, 28, 42, 0.88) 100%)`,
                border: `2px solid rgba(0, 212, 170, 0.25)`,
                backdropFilter: 'blur(30px)',
                borderRadius: '16px',
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 20px 50px rgba(0, 212, 170, 0.15)',
                transition: 'all 0.3s ease-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.50)';
                e.currentTarget.style.boxShadow = '0 30px 70px rgba(0, 212, 170, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.25)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 212, 170, 0.15)';
              }}>
                <span style={{ fontSize: '20px', marginRight: '12px' }}>🔍</span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    outline: 'none',
                    width: '100%',
                    padding: '16px 0',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                  className="placeholder-gray-500"
                  placeholder="Search innovative projects..." />
              </div>
            </div>

            {/* Sort & Filter Controls */}
            <div className="flex gap-4 mb-8 flex-wrap items-center">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{
                  background: `linear-gradient(135deg, rgba(18, 32, 48, 0.96) 0%, rgba(13, 28, 42, 0.88) 100%)`,
                  border: `2px solid rgba(0, 212, 170, 0.25)`,
                  color: '#a0aec0',
                  backdropFilter: 'blur(30px)',
                  boxShadow: '0 10px 30px rgba(0, 212, 170, 0.10)',
                }}
                className="px-6 py-3 rounded-xl text-sm font-bold focus:outline-none focus:border-teal-500 transition-all cursor-pointer"
              >
                <option value="newest">⭐ Newest First</option>
                <option value="funding">💰 Most Funded</option>
              </select>

              <div style={{ color: '#6b7280', fontSize: '12px' }}>
                {projects.length} {projects.length === 1 ? 'project' : 'projects'} found
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((c, idx) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  style={{
                    background: category === c 
                      ? 'linear-gradient(135deg, #00d4aa 0%, #06b6d4 100%)' 
                      : 'rgba(20, 35, 50, 0.8)',
                    color: category === c ? '#000a0a' : '#a0aec0',
                    border: category === c ? 'none' : '1.5px solid rgba(0, 212, 170, 0.25)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: category === c ? '0 10px 30px rgba(0, 212, 170, 0.25)' : 'none',
                    transition: 'all 0.3s ease-out',
                    animation: `slideUp 0.7s ease-out ${0.15 + idx * 0.03}s both`,
                  }}
                  className="px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide cursor-pointer"
                  onMouseEnter={(e) => {
                    if (category !== c) {
                      e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.50)';
                      e.currentTarget.style.background = 'rgba(0, 212, 170, 0.12)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (category !== c) {
                      e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.25)';
                      e.currentTarget.style.background = 'rgba(20, 35, 50, 0.8)';
                    }
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="text-center py-32">
              <div style={{ fontSize: '48px', marginBottom: '16px', animation: 'pulse 1.5s ease-in-out infinite' }}>⏳</div>
              <div style={{ color: '#a0aec0' }} className="text-lg font-medium">Loading amazing projects...</div>
            </div>
          ) : projects.length === 0 ? (
            <div style={{
              background: `linear-gradient(135deg, rgba(20, 35, 50, 0.94) 0%, rgba(15, 30, 45, 0.80) 100%)`,
              border: '2px dashed rgba(0, 212, 170, 0.30)',
              backdropFilter: 'blur(30px)',
              animation: 'slideUp 0.7s ease-out 0.2s both',
            }} className="rounded-2xl p-20 text-center">
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-black mb-3">No Projects Found</h2>
              <p style={{ color: '#a0aec0' }} className="mb-8 text-base font-medium">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p, idx) => {
                return (
                  <Link
                    key={p._id}
                    to={`/projects/${p._id}`}
                    style={{
                      background: `linear-gradient(135deg, rgba(20, 35, 50, 0.96) 0%, rgba(15, 30, 45, 0.85) 100%)`,
                      border: '1.5px solid rgba(0, 212, 170, 0.18)',
                      backdropFilter: 'blur(25px)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      animation: `slideUp 0.7s ease-out ${idx * 0.06}s both`,
                    }}
                    className="rounded-2xl overflow-hidden group h-full flex flex-col"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.40)';
                      e.currentTarget.style.boxShadow = '0 50px 100px rgba(0, 212, 170, 0.18), inset 0 0 80px rgba(0, 212, 170, 0.10)';
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(25, 40, 55, 0.98) 0%, rgba(20, 35, 50, 0.92) 100%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.18)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(20, 35, 50, 0.96) 0%, rgba(15, 30, 45, 0.85) 100%)';
                    }}
                  >
                    {/* Image Section */}
                    {p.coverImage ? (
                      <img src={p.coverImage} alt={p.title} className="w-full h-48 object-cover" />
                    ) : (
                      <div style={{
                        background: `linear-gradient(135deg, ${
                          p.category === 'Technology' ? '#00d4aa' :
                          p.category === 'Health' ? '#10b981' :
                          p.category === 'Education' ? '#8b5cf6' :
                          p.category === 'Environment' ? '#06b6d4' : '#f59e0b'
                        }15, ${
                          p.category === 'Technology' ? '#00d4aa' :
                          p.category === 'Health' ? '#10b981' :
                          p.category === 'Education' ? '#8b5cf6' :
                          p.category === 'Environment' ? '#06b6d4' : '#f59e0b'
                        }05)`,
                        height: 192,
                      }} className="flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                        {p.category === 'Technology' ? '💻' : p.category === 'Health' ? '🏥' :
                         p.category === 'Education' ? '📚' : p.category === 'Environment' ? '🌱' : 
                         p.category === 'Art' ? '🎨' : p.category === 'Finance' ? '💳' : '✦'}
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-7 flex flex-col flex-1">
                      <span style={{
                        background: 'rgba(0, 212, 170, 0.15)',
                        border: '1px solid rgba(0, 212, 170, 0.35)',
                        color: '#00d4aa',
                      }} className="text-xs px-3 py-1.5 rounded-full font-bold w-fit uppercase tracking-wide">{p.category}</span>

                      <h3 style={{ color: '#ffffff' }} className="font-black text-lg mt-3 mb-2 line-clamp-2 group-hover:text-teal-300 transition-colors">
                        {p.title}
                      </h3>
                      <p style={{ color: '#cbd5e1' }} className="text-sm line-clamp-2 mb-6 flex-1">{p.description}</p>

                      {/* Progress Bar */}
                      <div>
                        <div style={{
                          background: 'rgba(0, 212, 170, 0.12)',
                          height: 8,
                          borderRadius: 4,
                          overflow: 'hidden',
                          marginBottom: '10px',
                        }}>
                          <div style={{
                            background: `linear-gradient(90deg, #00d4aa 0%, #06b6d4 100%)`,
                            width: barWidth(p.currentFunding, p.fundingGoal),
                            height: '100%',
                            borderRadius: 4,
                            boxShadow: '0 0 15px rgba(0, 212, 170, 0.5)',
                            transition: 'width 0.3s ease-out',
                          }} />
                        </div>

                        {/* Stats */}
                        <div className="flex justify-between items-center">
                          <div>
                            <div style={{ color: '#00d4aa', fontFamily: 'Syne, sans-serif' }} className="font-black text-lg">
                              {formatPct(p.currentFunding, p.fundingGoal)}
                            </div>
                            <div style={{ color: '#6b7280' }} className="text-xs">Funded</div>
                          </div>
                          <div className="text-right">
                            <div style={{ color: '#cbd5e1' }} className="font-semibold text-sm">
                              ${p.currentFunding?.toLocaleString()} raised
                            </div>
                            <div style={{ color: '#6b7280' }} className="text-xs">
                              of ${p.fundingGoal?.toLocaleString()} goal
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}