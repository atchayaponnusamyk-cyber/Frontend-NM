import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/authApi';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 30, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" type="text" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <input placeholder="Email" type="email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <input placeholder="Password" type="password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <input placeholder="Confirm Password" type="password" value={form.confirmPassword}
          onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
          required style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#1a1a2e', color: 'white', border: 'none', cursor: 'pointer' }}>
          Register
        </button>
      </form>
      <p style={{ marginTop: 16, textAlign: 'center' }}>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
}
export default RegisterPage;