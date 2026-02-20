import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      padding: '0 30px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 'bold', fontSize: 16
        }}>G</div>
        <span style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>
          GrievanceApp
        </span>
      </div>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {!user && <>
          <Link to="/login" style={{
            color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
            padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
            transition: 'background 0.2s'
          }}>Login</Link>
          <Link to="/register" style={{
            color: 'white', textDecoration: 'none',
            padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)'
          }}>Register</Link>
        </>}

        {user?.role === 'USER' && <>
          <Link to="/user/dashboard" style={navLink}>Dashboard</Link>
          <Link to="/user/complaints/new" style={navLink}>Submit Complaint</Link>
          <Link to="/user/complaints" style={navLink}>My Complaints</Link>
        </>}

        {user?.role === 'ADMIN' && <>
          <Link to="/admin/dashboard" style={navLink}>Dashboard</Link>
          <Link to="/admin/complaints" style={navLink}>All Complaints</Link>
          <Link to="/admin/staff" style={navLink}>Staff List</Link>
        </>}

        {user?.role === 'STAFF' && <>
          <Link to="/staff/dashboard" style={navLink}>Dashboard</Link>
          <Link to="/staff/complaints" style={navLink}>My Assigned</Link>
        </>}

        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 8 }}>
            <div style={{
              color: 'rgba(255,255,255,0.85)', fontSize: 13,
              background: 'rgba(255,255,255,0.1)',
              padding: '6px 12px', borderRadius: 20
            }}>
              👤 {user.name}
            </div>
            <button onClick={handleLogout} style={{
              color: 'white', background: 'rgba(239,68,68,0.8)',
              border: 'none', padding: '8px 16px',
              borderRadius: 8, fontSize: 13, fontWeight: 500
            }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

const navLink = {
  color: 'rgba(255,255,255,0.85)',
  textDecoration: 'none',
  padding: '8px 14px',
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 500,
  transition: 'background 0.2s'
};

export default Navbar;