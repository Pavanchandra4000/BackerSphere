import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const dashboardLink = user ? `/${user.role}` : null;

  return (
    <nav style={{ background: 'rgba(10,13,26,0.95)', borderBottom: '1px solid #1f2937', backdropFilter: 'blur(12px)' }}
         className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="font-display text-xl font-bold" style={{ color: '#00d4aa' }}>
        BackerSphere<span style={{ color: '#f59e0b' }}>X</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/projects" className="text-gray-300 hover:text-white transition-colors text-sm">Browse</Link>

        {user ? (
          <>
            <Link to={dashboardLink} className="text-gray-300 hover:text-white transition-colors text-sm">Dashboard</Link>
            {user.role === 'innovator' && (
              <Link to="/innovator/submit" className="text-gray-300 hover:text-white transition-colors text-sm">+ Submit</Link>
            )}
            <span className="text-gray-500 text-sm">{user.name}</span>
            <button onClick={handleLogout}
              style={{ border: '1px solid #1f2937', color: '#9ca3af' }}
              className="px-4 py-1.5 rounded-lg text-sm hover:border-red-500 hover:text-red-400 transition-all">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-300 hover:text-white transition-colors text-sm">Login</Link>
            <Link to="/register"
              style={{ background: '#00d4aa', color: '#0a0d1a' }}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
