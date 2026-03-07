import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'backer' });
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await register(form.name, form.email, form.password, form.role);
      toast.success(`Welcome, ${user.name}! Account created.`);
      navigate(`/${user.role}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
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
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
          radial-gradient(circle at 25% 40%, rgba(0, 212, 170, 0.10) 0%, transparent 50%),
          radial-gradient(circle at 75% 70%, rgba(6, 182, 212, 0.08) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Animated Glow Orbs */}
      <div style={{
        position: 'fixed',
        top: '-30%',
        left: '-10%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 212, 170, 0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
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
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.14) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
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
        zIndex: 0,
        opacity: 0.4,
      }} />

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
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

        input {
          background: none !important;
          border: none !important;
        }

        input::placeholder {
          color: rgba(107, 114, 128, 0.7);
        }
      `}</style>

      {/* Main Content */}
      <div className="px-4 relative z-10">
        <div style={{
          width: '100%',
          maxWidth: 500,
          background: `linear-gradient(135deg, rgba(18, 32, 48, 0.98) 0%, rgba(13, 28, 42, 0.88) 100%)`,
          border: '2px solid rgba(0, 212, 170, 0.30)',
          backdropFilter: 'blur(35px)',
          animation: 'slideUp 0.8s ease-out',
          boxShadow: '0 60px 120px rgba(0, 212, 170, 0.18), inset 0 0 80px rgba(0, 212, 170, 0.10)'
        }}
        className="p-12 rounded-3xl relative overflow-hidden">

          {/* Decorative Top Border */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(0, 212, 170, 0.6), transparent)',
          }} />

          {/* Header Section */}
          <div className="text-center mb-12" style={{ animation: 'slideUp 0.8s ease-out 0.1s both' }}>
            <div style={{
              fontSize: '52px',
              marginBottom: '20px',
              filter: 'drop-shadow(0 0 25px rgba(0, 212, 170, 0.8))',
              animation: 'pulse 2s ease-in-out infinite'
            }}>🌟</div>
            <h1 style={{
              fontFamily: 'Syne, sans-serif',
              background: 'linear-gradient(135deg, #ffffff 0%, #00d4aa 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '2.8rem',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              marginBottom: '12px',
              lineHeight: '1.2',
            }}>Join Us Today</h1>
            <p style={{ color: '#a0aec0', fontSize: '14px', fontWeight: 500 }}>Create your BackerSphere X account</p>
            <div style={{
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(0, 212, 170, 0.4), transparent)',
              marginTop: '18px',
            }} />
          </div>

          {/* Role Selector */}
          <div className="grid grid-cols-2 gap-4 mb-10" style={{ animation: 'slideUp 0.8s ease-out 0.15s both' }}>
            {[
              { id: 'backer', icon: '💰', label: 'Backer', desc: 'Support Projects' },
              { id: 'innovator', icon: '🚀', label: 'Innovator', desc: 'Build Impact' }
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setForm({ ...form, role: r.id })}
                style={{
                  border: form.role === r.id ? '2px solid rgba(0, 212, 170, 0.70)' : '2px solid rgba(0, 212, 170, 0.25)',
                  background: form.role === r.id 
                    ? 'linear-gradient(135deg, rgba(0, 212, 170, 0.15) 0%, rgba(6, 182, 212, 0.10) 100%)' 
                    : 'transparent',
                  color: form.role === r.id ? '#00d4aa' : '#a0aec0',
                  boxShadow: form.role === r.id ? '0 0 30px rgba(0, 212, 170, 0.25)' : 'none',
                  backdropFilter: 'blur(15px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                className="py-4 rounded-xl text-center font-bold uppercase tracking-wide"
                onMouseEnter={(e) => {
                  if (form.role !== r.id) {
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.50)';
                    e.currentTarget.style.background = 'rgba(0, 212, 170, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (form.role !== r.id) {
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.25)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>{r.icon}</div>
                <div className="text-sm">{r.label}</div>
                <div style={{ color: form.role === r.id ? '#00d4aa' : '#6b7280', fontSize: '10px', marginTop: '4px', opacity: 0.8 }}>{r.desc}</div>
              </button>
            ))}
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="space-y-6" style={{ animation: 'slideUp 0.8s ease-out 0.2s both' }}>

            {/* Name Field */}
            <div>
              <label style={{ color: '#00d4aa' }} className="block text-xs font-black mb-3 uppercase tracking-widest">
                Full Name
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: 'transparent',
                border: `2px solid ${focusedInput === 'name' ? 'rgba(0, 212, 170, 0.70)' : 'rgba(0, 212, 170, 0.30)'}`,
                borderRadius: '16px',
                padding: '0 18px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: focusedInput === 'name' ? '0 0 40px rgba(0, 212, 170, 0.35), inset 0 0 30px rgba(0, 212, 170, 0.12)' : 'none',
              }}>
                <span style={{ fontSize: '20px', marginRight: '12px' }}>👤</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('name')}
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
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label style={{ color: '#00d4aa' }} className="block text-xs font-black mb-3 uppercase tracking-widest">
                Email Address
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: 'transparent',
                border: `2px solid ${focusedInput === 'email' ? 'rgba(0, 212, 170, 0.70)' : 'rgba(0, 212, 170, 0.30)'}`,
                borderRadius: '16px',
                padding: '0 18px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: focusedInput === 'email' ? '0 0 40px rgba(0, 212, 170, 0.35), inset 0 0 30px rgba(0, 212, 170, 0.12)' : 'none',
              }}>
                <span style={{ fontSize: '20px', marginRight: '12px' }}>📧</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('email')}
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
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label style={{ color: '#00d4aa' }} className="block text-xs font-black mb-3 uppercase tracking-widest">
                Password (Min 6 characters)
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: 'transparent',
                border: `2px solid ${focusedInput === 'password' ? 'rgba(0, 212, 170, 0.70)' : 'rgba(0, 212, 170, 0.30)'}`,
                borderRadius: '16px',
                padding: '0 18px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: focusedInput === 'password' ? '0 0 40px rgba(0, 212, 170, 0.35), inset 0 0 30px rgba(0, 212, 170, 0.12)' : 'none',
              }}>
                <span style={{ fontSize: '20px', marginRight: '12px' }}>🔐</span>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  required
                  minLength={6}
                  style={{
                    color: '#ffffff',
                    outline: 'none',
                    width: '100%',
                    padding: '16px 0',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#00d4aa',
                    cursor: 'pointer',
                    fontSize: '18px',
                    marginLeft: '8px',
                  }}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
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
                  Creating account...
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span>✨</span>
                  Create Account
                </div>
              )}
            </button>

            {/* Links */}
            <div className="text-center">
              <p style={{ color: '#a0aec0', fontSize: '14px' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#00d4aa', fontWeight: 700 }} className="hover:text-cyan-400 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </form>

          {/* Bottom Border */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(0, 212, 170, 0.4), transparent)',
          }} />
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          animation: 'slideUp 0.8s ease-out 0.3s both',
        }}>
          <p style={{ color: '#6b7280', fontSize: '12px', fontWeight: 500 }}>
            🔒 Your data is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}