import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitComplaint } from '../../api/complaintApi';

function SubmitComplaint() {
  const [form, setForm] = useState({ title: '', description: '', category: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categories = ['Technical', 'Billing', 'Service', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitComplaint(form);
      navigate('/user/complaints');
    } catch (err) {
      setError('Submission failed. Try again.');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 30, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Submit Complaint</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <textarea placeholder="Description" value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required rows={5} style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <select value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          required style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}>
          <option value="">Select Category</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <button type="submit" style={{ width: '100%', padding: 10, background: '#1a1a2e', color: 'white', border: 'none', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
}
export default SubmitComplaint;