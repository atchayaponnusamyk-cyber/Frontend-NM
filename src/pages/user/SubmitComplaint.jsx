import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitComplaint } from '../../api/complaintApi';

function SubmitComplaint() {
  const [form, setForm] = useState({ title: '', description: '', category: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = ['Technical', 'Billing', 'Service', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitComplaint(form);
      navigate('/user/complaints');
    } catch (err) {
      setError('Submission failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: 700, margin: '0 auto' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e, #4f46e5)',
        borderRadius: 16, padding: '28px 32px', marginBottom: 28
      }}>
        <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
          📝 Submit a Complaint
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
          Fill in the details below and we will get back to you shortly
        </p>
      </div>

      {/* Form Card */}
      <div style={{
        background: 'white', borderRadius: 16, padding: 32,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
      }}>
        {error && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca',
            color: '#dc2626', padding: '12px 16px', borderRadius: 10,
            fontSize: 14, marginBottom: 20
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Title */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
              Complaint Title *
            </label>
            <input
              type="text"
              placeholder="Brief title of your complaint"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 10,
                border: '1.5px solid #e5e7eb', fontSize: 14
              }}
            />
          </div>

          {/* Category */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
              Category *
            </label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              required
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 10,
                border: '1.5px solid #e5e7eb', fontSize: 14, background: 'white'
              }}
            >
              <option value="">Select a category</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
              Description *
            </label>
            <textarea
              placeholder="Describe your complaint in detail..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              required
              rows={6}
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 10,
                border: '1.5px solid #e5e7eb', fontSize: 14, resize: 'vertical'
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="button" onClick={() => navigate('/user/complaints')} style={{
              flex: 1, padding: '13px', borderRadius: 10, fontSize: 15,
              fontWeight: 600, background: '#f3f4f6', color: '#374151', border: 'none'
            }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={{
              flex: 2, padding: '13px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              color: 'white', borderRadius: 10, fontSize: 15,
              fontWeight: 600, border: 'none'
            }}>
              {loading ? 'Submitting...' : 'Submit Complaint →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitComplaint;