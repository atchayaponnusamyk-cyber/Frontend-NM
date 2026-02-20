import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getComplaintById } from '../../api/complaintApi';
import { updateComplaintStatus } from '../../api/staffApi';

function UpdateComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [form, setForm] = useState({ status: '', message: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const statusColors = {
    OPEN:        { bg: '#FFF3CD', text: '#856404' },
    ASSIGNED:    { bg: '#CCE5FF', text: '#004085' },
    IN_PROGRESS: { bg: '#FFE5CC', text: '#7D3F00' },
    RESOLVED:    { bg: '#D4EDDA', text: '#155724' },
    CLOSED:      { bg: '#E2E3E5', text: '#383D41' },
  };

  useEffect(() => {
    getComplaintById(id).then(res => {
      setComplaint(res.data);
      setForm(prev => ({ ...prev, status: res.data.status }));
    }).catch(console.error);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateComplaintStatus(id, form);
      navigate('/staff/complaints');
    } catch (err) {
      setError('Update failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!complaint) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', color: '#6b7280' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
        <p>Loading complaint details...</p>
      </div>
    </div>
  );

  const s = statusColors[complaint.status] || { bg: '#eee', text: '#333' };

  return (
    <div style={{ padding: '30px', maxWidth: 800, margin: '0 auto' }}>

      {/* Back Button */}
      <button onClick={() => navigate('/staff/complaints')} style={{
        background: 'transparent', border: 'none',
        color: '#4f46e5', fontSize: 14, fontWeight: 500,
        marginBottom: 20, padding: 0, cursor: 'pointer'
      }}>
        ← Back to My Complaints
      </button>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e, #4f46e5)',
        borderRadius: 16, padding: '28px 32px', marginBottom: 24
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ color: 'white', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              {complaint.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
              📁 {complaint.category} • 📅 {new Date(complaint.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span style={{
            background: s.bg, color: s.text,
            padding: '6px 16px', borderRadius: 20,
            fontSize: 13, fontWeight: 600
          }}>
            {complaint.status}
          </span>
        </div>
      </div>

      {/* Complaint Description */}
      <div style={{
        background: 'white', borderRadius: 16, padding: 28,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: 24
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 12 }}>
          📄 Complaint Description
        </h3>
        <p style={{ color: '#4b5563', lineHeight: 1.7, fontSize: 15 }}>
          {complaint.description}
        </p>
      </div>

      {/* Previous Updates */}
      {complaint.updates?.length > 0 && (
        <div style={{
          background: 'white', borderRadius: 16, padding: 28,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: 24
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 20 }}>
            🕐 Previous Updates
          </h3>
          {complaint.updates.map((u, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 14, flexShrink: 0
              }}>
                {i + 1}
              </div>
              <div style={{
                flex: 1, background: '#f9fafb', borderRadius: 12,
                padding: '14px 18px', border: '1px solid #f3f4f6'
              }}>
                <p style={{ color: '#1a1a2e', fontSize: 14, marginBottom: 6 }}>{u.message}</p>
                <p style={{ color: '#9ca3af', fontSize: 12 }}>
                  {new Date(u.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Form */}
      <div style={{
        background: 'white', borderRadius: 16, padding: 28,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        border: '2px solid #eef2ff'
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 20 }}>
          ✏️ Update Complaint Status
        </h3>

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
          {/* Status */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
              Update Status
            </label>
            <select value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 10,
                border: '1.5px solid #e5e7eb', fontSize: 14, background: 'white'
              }}>
              <option value="IN_PROGRESS">🔄 IN_PROGRESS — Currently working on it</option>
              <option value="RESOLVED">✅ RESOLVED — Issue has been fixed</option>
            </select>
          </div>

          {/* Message */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
              Update Message
            </label>
            <textarea
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder="Describe what action you took or current progress..."
              rows={5}
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 10,
                border: '1.5px solid #e5e7eb', fontSize: 14, resize: 'vertical'
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="button" onClick={() => navigate('/staff/complaints')} style={{
              flex: 1, padding: '13px', borderRadius: 10,
              background: '#f3f4f6', color: '#374151',
              fontWeight: 600, fontSize: 14, border: 'none'
            }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={{
              flex: 2, padding: '13px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              color: 'white', borderRadius: 10,
              fontSize: 15, fontWeight: 600, border: 'none'
            }}>
              {loading ? 'Updating...' : 'Submit Update →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateComplaint;