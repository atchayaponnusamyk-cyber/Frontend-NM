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
    <nav style={{ padding: '10px 20px', background: '#1a1a2e', display: 'flex', gap: '20px', alignItems: 'center' }}>
      <span style={{ color: 'white', fontWeight: 'bold', marginRight: 'auto' }}>GrievanceApp</span>

      {!user && <>
        <Link to="/login" style={{ color: 'white' }}>Login</Link>
        <Link to="/register" style={{ color: 'white' }}>Register</Link>
      </>}

      {user?.role === 'USER' && <>
        <Link to="/user/dashboard" style={{ color: 'white' }}>Dashboard</Link>
        <Link to="/user/complaints/new" style={{ color: 'white' }}>Submit Complaint</Link>
        <Link to="/user/complaints" style={{ color: 'white' }}>My Complaints</Link>
      </>}

      {user?.role === 'ADMIN' && <>
        <Link to="/admin/dashboard" style={{ color: 'white' }}>Dashboard</Link>
        <Link to="/admin/complaints" style={{ color: 'white' }}>All Complaints</Link>
        <Link to="/admin/staff" style={{ color: 'white' }}>Staff List</Link>
      </>}

      {user?.role === 'STAFF' && <>
        <Link to="/staff/dashboard" style={{ color: 'white' }}>Dashboard</Link>
        <Link to="/staff/complaints" style={{ color: 'white' }}>My Assigned</Link>
      </>}

      {user && (
        <button onClick={handleLogout} style={{ color: 'white', background: 'transparent', border: '1px solid white', padding: '4px 10px', cursor: 'pointer' }}>
          Logout
        </button>
      )}
    </nav>
  );
}
export default Navbar;