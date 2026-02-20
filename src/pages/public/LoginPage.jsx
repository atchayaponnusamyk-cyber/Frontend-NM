import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(form);
      authLogin(res.data);
      if (res.data.role === 'USER') navigate('/user/dashboard');
      else if (res.data.role === 'ADMIN') navigate('/admin/dashboard');
      else if (res.data.role === 'STAFF') navigate('/staff/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
    }}>
      <div style={{
        background: 'white', borderRadius: 20, padding: '48px 40px',
        width: '100%', maxWidth: 420,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: 24
          }}>🔐</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: 6 }}>Welcome Back</h2>
          <p style={{ color: '#6b7280', fontSize: 14 }}>Login to your account</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca',
            color: '#dc2626', padding: '12px 16px', borderRadius: 10,
            fontSize: 14, marginBottom: 20, textAlign: 'center'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Email Address
            </label>
            <input
              type="email" placeholder="Enter your email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: 14 }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password" placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: 14 }}
            />
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '13px',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            color: 'white', borderRadius: 10, fontSize: 15,
            fontWeight: 600, border: 'none'
          }}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>

        {/* Footer */}
        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#6b7280' }}>
          No account?{' '}
          <a href="/register" style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>
            Register here
          </a>
        </p>

        {/* Test Credentials */}
        <div style={{ marginTop: 24, background: '#f8faff', borderRadius: 10, padding: 16, border: '1px solid #e0e7ff' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#4f46e5', marginBottom: 8 }}>Test Credentials:</p>
          {[
            { role: 'User', email: 'user@test.com', pass: 'user123' },
            { role: 'Admin', email: 'admin@test.com', pass: 'admin123' },
            { role: 'Staff', email: 'staff@test.com', pass: 'staff123' },
          ].map(c => (
            <div key={c.role} style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>
              <strong>{c.role}:</strong> {c.email} / {c.pass}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;