import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import InnovatorDashboard from './pages/InnovatorDashboard';
import BackerDashboard from './pages/BackerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SubmitProject from './pages/SubmitProject';
import BrowseProjects from './pages/BrowseProjects';
import ProjectDetails from './pages/ProjectDetails';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-dark flex items-center justify-center text-primary text-xl">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={user ? <Navigate to={`/${user.role}`} /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to={`/${user.role}`} /> : <Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/projects" element={<BrowseProjects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/innovator" element={<ProtectedRoute allowedRoles={['innovator']}><InnovatorDashboard /></ProtectedRoute>} />
        <Route path="/innovator/submit" element={<ProtectedRoute allowedRoles={['innovator']}><SubmitProject /></ProtectedRoute>} />
        <Route path="/backer" element={<ProtectedRoute allowedRoles={['backer']}><BackerDashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-dark font-body text-white">
          <AppRoutes />
          <ToastContainer position="bottom-right" theme="dark" />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
