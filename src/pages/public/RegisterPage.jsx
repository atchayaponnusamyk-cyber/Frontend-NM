import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/authApi';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name', icon: '👤' },
    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter your email', icon: '📧' },
    { key: 'password', label: 'Password', type: 'password', placeholder: 'Create a password', icon: '🔒' },
    { key: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm your password', icon: '🔒' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
    }}>
      <div style={{
        background: 'white', borderRadius: 20, padding: '48px 40px',
        width: '100%', maxWidth: 440,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: 24
          }}>📋</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: 6 }}>Create Account</h2>
          <p style={{ color: '#6b7280', fontSize: 14 }}>Register as a new user</p>
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
          {fields.map(f => (
            <div key={f.key} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                {f.icon} {f.label}
              </label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                required
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: 14 }}
              />
            </div>
          ))}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '13px', marginTop: 8,
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            color: 'white', borderRadius: 10, fontSize: 15,
            fontWeight: 600, border: 'none'
          }}>
            {loading ? 'Creating Account...' : 'Create Account →'}
          </button>
        </form>

        {/* Footer */}
        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#6b7280' }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;