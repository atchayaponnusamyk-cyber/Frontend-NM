import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(form);
      authLogin(res.data);
      if (res.data.role === 'USER') navigate('/user/dashboard');
      else if (res.data.role === 'ADMIN') navigate('/admin/dashboard');
      else if (res.data.role === 'STAFF') navigate('/staff/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check credentials.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 30, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" type="email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <input placeholder="Password" type="password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#1a1a2e', color: 'white', border: 'none', cursor: 'pointer' }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: 16, textAlign: 'center' }}>
        No account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}
export default LoginPage;