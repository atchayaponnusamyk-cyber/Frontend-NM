import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <h1>Online Complaint & Grievance System</h1>
      <p>Submit and track your complaints easily.</p>
      <button onClick={() => navigate('/login')} style={{ margin: 10, padding: '10px 30px', fontSize: 16 }}>Login</button>
      <button onClick={() => navigate('/register')} style={{ margin: 10, padding: '10px 30px', fontSize: 16 }}>Register</button>
    </div>
  );
}
export default LandingPage;