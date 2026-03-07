import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CATEGORIES = ['Technology', 'Health', 'Education', 'Environment', 'Art', 'Social Impact', 'Finance', 'Other'];

export default function SubmitProject() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [form, setForm] = useState({
    title: '', description: '', category: 'Technology',
    fundingGoal: '', teamSize: '', timeline: '', coverImage: '', deadline: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.description.length < 50) {
      return toast.error('Description must be at least 50 characters');
    }
    setLoading(true);
    try {
      await axios.post('/api/projects', {
        ...form,
        fundingGoal: Number(form.fundingGoal),
        teamSize: Number(form.teamSize)
      });
      toast.success('🚀 Project submitted! AI evaluation in progress...');
      navigate('/innovator');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

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

        input, textarea, select {
          background: none !important;
          border: none !important;
        }

        input::placeholder, textarea::placeholder {
          color: rgba(107, 114, 128, 0.7);
        }
      `}</style>

      <div className="px-8 py-14 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-14" style={{ animation: 'slideUp 0.7s ease-out' }}>
            <div className="flex items-center gap-3 mb-4">
              <span style={{ 
                fontSize: '24px', 
                filter: 'drop-shadow(0 0 15px rgba(0, 212, 170, 0.7))',
                animation: 'pulse 2s ease-in-out infinite'
              }}>🚀</span>
              <span style={{ color: '#00d4aa' }} className="text-xs uppercase tracking-widest font-bold">Launch Your Innovation</span>
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
            }} className="">Submit a Project</h1>
            <p style={{ color: '#a0aec0' }} className="text-base mt-3 font-medium">Fill in the details below. Google Gemini AI will evaluate your project automatically.</p>
            <div style={{
              height: '2px',
              background: 'linear-gradient(90deg, #00d4aa 0%, #06b6d4 50%, transparent 100%)',
              marginTop: '20px',
            }} />
          </div>

          {/* AI Evaluation Info Box */}
          <div
            style={{
              background: `linear-gradient(135deg, rgba(0, 212, 170, 0.15) 0%, rgba(6, 182, 212, 0.10) 100%)`,
              border: '1.5px solid rgba(0, 212, 170, 0.35)',
              backdropFilter: 'blur(25px)',
              animation: 'slideUp 0.7s ease-out 0.1s both',
            }}
            className="rounded-2xl p-6 mb-12 flex gap-4"
          >
            <div style={{ fontSize: '32px', filter: 'drop-shadow(0 0 10px rgba(0, 212, 170, 0.6))' }}>✦</div>
            <div>
              <p style={{ color: '#00d4aa', fontFamily: 'Syne, sans-serif' }} className="font-black uppercase tracking-wide mb-2">
                AI-Powered Evaluation
              </p>
              <p style={{ color: '#cbd5e1' }} className="text-sm leading-relaxed">
                After submission, Gemini AI will score your project on feasibility and success probability to assist admin review and increase your chances of funding.
              </p>
            </div>
          </div>

          {/* Form Container */}
          <div
            style={{
              background: `linear-gradient(135deg, rgba(20, 35, 50, 0.96) 0%, rgba(15, 30, 45, 0.85) 100%)`,
              border: '1.5px solid rgba(0, 212, 170, 0.18)',
              backdropFilter: 'blur(25px)',
              animation: 'slideUp 0.7s ease-out 0.15s both',
            }}
            className="rounded-2xl p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Project Title */}
              <div>
                <label style={{ color: '#00d4aa' }} className="block text-xs font-black mb-3 uppercase tracking-widest">
                  Project Title *
                </label>
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  background: 'transparent',
                  border: `2px solid ${focusedInput === 'title' ? 'rgba(0, 212, 170, 0.70)' : 'rgba(0, 212, 170, 0.30)'}`,
                  borderRadius: '16px',
                  padding: '0 18px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: focusedInput === 'title' ? '0 0 40px rgba(0, 212, 170, 0.35), inset 0 0 30px rgba(0, 212, 170, 0.12)' : 'none',
                }}>
                  <span style={{ fontSize: '20px', marginRight: '12px' }}>💡</span>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    onFocus={() => setFocusedInput('title')}
                    onBlur={() => setFocusedInput(null)}
                    required
                    minLength={5}
                    maxLength={120}
                    style={{
                      color: '#ffffff',
                      outline: 'none',
                      width: '100%',
                      padding: '16px 0',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                    placeholder="An inspiring project title..."
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ color: '#00d4aa' }} className="block text-xs font-black mb-3 uppercase tracking-widest">
                  Description * (Min 50 characters)
                </label>
                <div style={{
                  position: 'relative',
                  background: 'transparent',
                  border: `2px solid ${focusedInput === 'description' ? 'rgba(0, 212, 170, 0.70)' : 'rgba(0, 212, 170, 0.30)'}`,
                  borderRadius: '16px',
                  padding: '14px 18px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: focusedInput === 'description' ? '0 0 40px rgba(0, 212, 170, 0.35), inset 0 0 30px rgba(0, 212, 170, 0.12)' : 'none',
                }}>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    onFocus={() => setFocusedInput('description')}
                    onBlur={() => setFocusedInput(null)}
                    required
                    rows={5}
                    style={{
                      color: '#ffffff',
                      outline: 'none',
                      width: '100%',
                      fontSize: '16px',
                      fontWeight: '500',
                      resize: 'none',
                    }}
                    placeholder="Describe your project, its goals, impact, and why it deserves funding..."
                  />
                </div>
                <div style={{ color: '#6b7280', textAlign: 'right', fontSize: '12px', marginTop: '8px' }}>
                  {form.description.length} / 50+ characters
                </div>
              </div>

              {/* Category & Funding Goal */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label style={{ color: '#00d4aa' }} className="block text-xs font-black mb-3 uppercase tracking-widest">
                    Category *
                  </label>
                  <div style={{
                    background: 'transparent',
                    border: `2px solid ${focusedInput === 'category' ? 'rgba(0, 212, 170, 0.70)' : 'rgba(0, 212, 170, 0.30)'}`,
                    borderRadius: '16px',
                    padding: '0 18px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: focusedInput === 'category' ? '0 0 40px rgba(0, 212, 170, 0.35), inset 0 0 30px rgba(0, 212, 170, 0.12)' : 'none',
                  }}>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput('category')}
                      onBlur={() => setFocusedInput(null)}
                      style={{
                        color: '#ffffff',
                        outline: 'none',
                        width: '100%',
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                      }}
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ color: '#00d4aa' }} className="block text-xs font-black mb-3 uppercase tracking-widest">
                    Funding Goal ($) *
                  </label>
                  <div style={{
                    background: 'transparent',
                    border: `2px solid ${focusedInput === 'fundingGoal' ? 'rgba(0, 212, 170, 0.70)' : 'rgba(0, 212, 170, 0.30)'}`,
                    borderRadius: '16px',
                    padding: '0 18px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: focusedInput === 'fundingGoal' ? '0 0 40px rgba(0, 212, 170, 0.35), inset 0 0 30px rgba(0, 212, 170, 0.12)' : 'none',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '10px' }}>💰</span>
                    <input
                      name="fundingGoal"
                      type="number"
                      value={form.fundingGoal}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput('fundingGoal')}
                      onBlur={() => setFocusedInput(null)}
                      required
                      min={100}
                      style={{
                        color: '#ffffff',
                        outline: 'none',
                        width: '100%',
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                      }}
                      placeholder="e.g. 50000"
                    />
                  </div>
                </div>
              </div>

              {/* Team Size & Timeline */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label style={{ color: '#00d4aa' }} className="block text-xs font-black mb-3 uppercase tracking-widest">
                    Team Size *
                  </label>
                  <div style={{
                    background: 'transparent',
                    border: `2px solid ${focusedInput === 'teamSize' ? 'rgba(0, 212, 170, 0.70)' : 'rgba(0, 212, 170, 0.30)'}`,
                    borderRadius: '16px',
                    padding: '0 18px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: focusedInput === 'teamSize' ? '0 0 40px rgba(0, 212, 170, 0.35), inset 0 0 30px rgba(0, 212, 170, 0.12)' : 'none',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '10px' }}>👥</span>
                    <input
                      name="teamSize"
                      type="number"
                      value={form.teamSize}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput('teamSize')}
                      onBlur={() => setFocusedInput(null)}
                      required
                      min={1}
                      style={{
                        color: '#ffffff',
                        outline: 'none',
                        width: '100%',
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                      }}
                      placeholder="e.g. 4"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ color: '#00d4aa' }} className="block text-xs font-black mb-3 uppercase tracking-widest">
                    Timeline *
                  </label>
                  <div style={{
                    background: 'transparent',
                    border: `2px solid ${focusedInput === 'timeline' ? 'rgba(0, 212, 170, 0.70)' : 'rgba(0, 212, 170, 0.30)'}`,
                    borderRadius: '16px',
                    padding: '0 18px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: focusedInput === 'timeline' ? '0 0 40px rgba(0, 212, 170, 0.35), inset 0 0 30px rgba(0, 212, 170, 0.12)' : 'none',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '10px' }}>📅</span>
                    <input
                      name="timeline"
                      value={form.timeline}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput('timeline')}
                      onBlur={() => setFocusedInput(null)}
                      required
                      style={{
                        color: '#ffffff',
                        outline: 'none',
                        width: '100%',
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                      }}
                      placeholder="e.g. 12 months"
                    />
                  </div>
                </div>
              </div>

              {/* Cover Image & Deadline */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label style={{ color: '#00d4aa' }} className="block text-xs font-black mb-3 uppercase tracking-widest">
                    Cover Image URL
                  </label>
                  <div style={{
                    background: 'transparent',
                    border: `2px solid ${focusedInput === 'coverImage' ? 'rgba(0, 212, 170, 0.70)' : 'rgba(0, 212, 170, 0.30)'}`,
                    borderRadius: '16px',
                    padding: '0 18px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: focusedInput === 'coverImage' ? '0 0 40px rgba(0, 212, 170, 0.35), inset 0 0 30px rgba(0, 212, 170, 0.12)' : 'none',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '10px' }}>🖼️</span>
                    <input
                      name="coverImage"
                      value={form.coverImage}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput('coverImage')}
                      onBlur={() => setFocusedInput(null)}
                      style={{
                        color: '#ffffff',
                        outline: 'none',
                        width: '100%',
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                      }}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label style={{ color: '#00d4aa' }} className="block text-xs font-black mb-3 uppercase tracking-widest">
                    Campaign Deadline
                  </label>
                  <div style={{
                    background: 'transparent',
                    border: `2px solid ${focusedInput === 'deadline' ? 'rgba(0, 212, 170, 0.70)' : 'rgba(0, 212, 170, 0.30)'}`,
                    borderRadius: '16px',
                    padding: '0 18px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: focusedInput === 'deadline' ? '0 0 40px rgba(0, 212, 170, 0.35), inset 0 0 30px rgba(0, 212, 170, 0.12)' : 'none',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '10px' }}>⏰</span>
                    <input
                      name="deadline"
                      type="date"
                      value={form.deadline}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput('deadline')}
                      onBlur={() => setFocusedInput(null)}
                      style={{
                        color: '#ffffff',
                        outline: 'none',
                        width: '100%',
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading 
                    ? 'linear-gradient(135deg, rgba(0, 212, 170, 0.6) 0%, rgba(6, 182, 212, 0.5) 100%)' 
                    : 'linear-gradient(135deg, #00d4aa 0%, #06b6d4 100%)',
                  color: '#000a0a',
                  border: 'none',
                  boxShadow: loading ? '0 15px 40px rgba(0, 212, 170, 0.25)' : '0 25px 60px rgba(0, 212, 170, 0.45)',
                  width: '100%',
                  padding: '18px',
                  borderRadius: '14px',
                  fontSize: '16px',
                  fontWeight: 800,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  marginTop: '32px',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 35px 80px rgba(0, 212, 170, 0.55)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 212, 170, 0.45)';
                  }
                }}
                className="uppercase"
              >
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>⏳</span>
                    Submitting...
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <span>🚀</span>
                    Submit Project for AI Evaluation
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}