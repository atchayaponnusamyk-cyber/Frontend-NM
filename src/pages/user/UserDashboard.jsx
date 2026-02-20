import { useEffect, useState } from 'react';
import { getMyComplaints } from '../../api/complaintApi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyComplaints().then(res => setComplaints(res.data)).catch(console.error);
  }, []);

  const total = complaints.length;
  const open = complaints.filter(c => c.status === 'OPEN').length;
  const resolved = complaints.filter(c => c.status === 'RESOLVED').length;

  const statusColors = {
    OPEN:        { bg: '#FFF3CD', text: '#856404' },
    ASSIGNED:    { bg: '#CCE5FF', text: '#004085' },
    IN_PROGRESS: { bg: '#FFE5CC', text: '#7D3F00' },
    RESOLVED:    { bg: '#D4EDDA', text: '#155724' },
    CLOSED:      { bg: '#E2E3E5', text: '#383D41' },
  };

  return (
    <div style={{ padding: '30px', maxWidth: 1100, margin: '0 auto' }}>

      {/* Welcome Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e, #4f46e5)',
        borderRadius: 16, padding: '28px 32px', marginBottom: 28,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
            Welcome back, {user?.name} 👋
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
            Track and manage your complaints here
          </p>
        </div>
        <button onClick={() => navigate('/user/complaints/new')} style={{
          background: 'white', color: '#4f46e5', padding: '12px 24px',
          borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none'
        }}>
          + New Complaint
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 28 }}>
        {[
          { label: 'Total Complaints', value: total, icon: '📋', color: '#4f46e5', bg: '#eef2ff' },
          { label: 'Open', value: open, icon: '🟡', color: '#856404', bg: '#FFF3CD' },
          { label: 'Resolved', value: resolved, icon: '✅', color: '#155724', bg: '#D4EDDA' },
        ].map(card => (
          <div key={card.label} style={{
            background: 'white', borderRadius: 16, padding: '24px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            borderLeft: `4px solid ${card.color}`
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: card.color }}>{card.value}</div>
            <div style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Complaints */}
      <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a2e' }}>Recent Complaints</h3>
          <button onClick={() => navigate('/user/complaints')} style={{
            background: '#eef2ff', color: '#4f46e5', padding: '8px 16px',
            borderRadius: 8, fontWeight: 500, fontSize: 13, border: 'none'
          }}>
            View All →
          </button>
        </div>

        {complaints.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
            <p style={{ fontSize: 16 }}>No complaints yet</p>
            <p style={{ fontSize: 13, marginTop: 6 }}>Click "New Complaint" to submit one</p>
          </div>
        ) : (
          complaints.slice(0, 5).map(c => {
            const s = statusColors[c.status] || { bg: '#eee', text: '#333' };
            return (
              <div key={c.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px', borderRadius: 12, marginBottom: 10,
                background: '#f9fafb', border: '1px solid #f3f4f6'
              }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 15, color: '#1a1a2e', marginBottom: 4 }}>{c.title}</p>
                  <p style={{ fontSize: 13, color: '#6b7280' }}>{c.category} • {new Date(c.createdAt).toLocaleDateString()}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ background: s.bg, color: s.text, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                    {c.status}
                  </span>
                  <button onClick={() => navigate(`/user/complaints/${c.id}`)} style={{
                    background: '#4f46e5', color: 'white', padding: '6px 14px',
                    borderRadius: 8, fontSize: 13, border: 'none', fontWeight: 500
                  }}>
                    View
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default UserDashboard;