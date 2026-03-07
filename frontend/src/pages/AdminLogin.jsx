import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password, true);
      toast.success('Admin access granted');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url('https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=2000&q=80')`,
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
            rgba(10, 13, 26, 0.87) 0%, 
            rgba(10, 18, 35, 0.85) 25%,
            rgba(8, 25, 45, 0.86) 50%,
            rgba(10, 13, 26, 0.87) 75%,
            rgba(10, 13, 26, 0.88) 100%
          ),
          radial-gradient(circle at 25% 40%, rgba(0, 212, 170, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 75% 70%, rgba(6, 182, 212, 0.10) 0%, transparent 50%)
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

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 25px rgba(0, 212, 170, 0.15); }
          50% { box-shadow: 0 0 40px rgba(0, 212, 170, 0.25); }
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
            }}>⚙</div>
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
            }}>Admin Access</h1>
            <p style={{ color: '#a0aec0', fontSize: '14px', fontWeight: 500 }}>Restricted to authorized personnel only</p>
            <div style={{
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(0, 212, 170, 0.4), transparent)',
              marginTop: '18px',
            }} />
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="space-y-8" style={{ animation: 'slideUp 0.8s ease-out 0.2s both' }}>

            {/* Email Field - Enhanced */}
            <div>
              <label style={{ color: '#00d4aa' }} className="block text-xs font-black mb-3 uppercase tracking-widest">
                Email Address
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: `linear-gradient(135deg, rgba(8, 12, 24, 0.98) 0%, rgba(10, 18, 32, 0.92) 100%)`,
                border: `2px solid ${focusedInput === 'email' ? 'rgba(0, 212, 170, 0.70)' : 'rgba(0, 212, 170, 0.30)'}`,
                borderRadius: '16px',
                padding: '0 18px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: focusedInput === 'email' ? '0 0 40px rgba(0, 212, 170, 0.35), inset 0 0 30px rgba(0, 212, 170, 0.12)' : 'none',
              }}>
                <span style={{ fontSize: '22px', marginRight: '12px', filter: 'drop-shadow(0 0 8px rgba(0, 212, 170, 0.5))' }}>📧</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  required
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    outline: 'none',
                    width: '100%',
                    padding: '16px 0',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                  placeholder="admin@backersphere.com"
                  className="placeholder-gray-500"
                />
              </div>
            </div>

            {/* Password Field - Enhanced */}
            <div>
              <label style={{ color: '#00d4aa' }} className="block text-xs font-black mb-3 uppercase tracking-widest">
                Password
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: `linear-gradient(135deg, rgba(8, 12, 24, 0.98) 0%, rgba(10, 18, 32, 0.92) 100%)`,
                border: `2px solid ${focusedInput === 'password' ? 'rgba(0, 212, 170, 0.70)' : 'rgba(0, 212, 170, 0.30)'}`,
                borderRadius: '16px',
                padding: '0 18px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: focusedInput === 'password' ? '0 0 40px rgba(0, 212, 170, 0.35), inset 0 0 30px rgba(0, 212, 170, 0.12)' : 'none',
              }}>
                <span style={{ fontSize: '22px', marginRight: '12px', filter: 'drop-shadow(0 0 8px rgba(0, 212, 170, 0.5))' }}>🔐</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  required
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    outline: 'none',
                    width: '100%',
                    padding: '16px 0',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                  placeholder="••••••••••"
                  className="placeholder-gray-500"
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
                  Authenticating...
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span>🔓</span>
                  Access Admin Panel
                </div>
              )}
            </button>

            {/* Security Notice */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.15) 0%, rgba(6, 182, 212, 0.10) 100%)',
              border: '1.5px solid rgba(0, 212, 170, 0.35)',
              borderRadius: '12px',
              padding: '14px 16px',
              marginTop: '24px',
              backdropFilter: 'blur(20px)',
            }}>
              <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
                🔒 <strong>Encrypted Connection</strong> • This login is encrypted and monitored. Unauthorized access attempts are logged and reported.
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

        {/* Footer Info */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          animation: 'slideUp 0.8s ease-out 0.3s both',
        }}>
          <p style={{ color: '#a0aec0', fontSize: '14px', fontWeight: 600 }}>
            BackerSphere X • Admin Control Center
          </p>
          <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '8px', fontWeight: 500 }}>
            Powered by Gemini AI • Enterprise Security Grade
          </p>
        </div>
      </div>
    </div>
  );
}