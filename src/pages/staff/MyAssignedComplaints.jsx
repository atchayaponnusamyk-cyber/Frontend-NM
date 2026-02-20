import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssignedComplaints } from '../../api/staffApi';

function MyAssignedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAssignedComplaints().then(res => setComplaints(res.data)).catch(console.error);
  }, []);

  const statusColors = {
    OPEN:        { bg: '#FFF3CD', text: '#856404' },
    ASSIGNED:    { bg: '#CCE5FF', text: '#004085' },
    IN_PROGRESS: { bg: '#FFE5CC', text: '#7D3F00' },
    RESOLVED:    { bg: '#D4EDDA', text: '#155724' },
    CLOSED:      { bg: '#E2E3E5', text: '#383D41' },
  };

  return (
    <div style={{ padding: '30px', maxWidth: 1100, margin: '0 auto' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e, #4f46e5)',
        borderRadius: 16, padding: '28px 32px', marginBottom: 28
      }}>
        <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
          📋 My Assigned Complaints
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
          View and update all complaints assigned to you
        </p>
      </div>

      {/* Table Card */}
      <div style={{
        background: 'white', borderRadius: 16, padding: 24,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
      }}>
        {complaints.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
            <p style={{ fontSize: 16, fontWeight: 500 }}>No complaints assigned yet</p>
            <p style={{ fontSize: 13, marginTop: 6 }}>Check back later</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Title', 'Category', 'Status', 'Date Assigned', 'Action'].map(h => (
                  <th key={h} style={{
                    padding: '14px 16px', textAlign: 'left',
                    fontSize: 13, fontWeight: 600, color: '#6b7280',
                    borderBottom: '2px solid #f3f4f6'
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {complaints.map(c => {
                const s = statusColors[c.status] || { bg: '#eee', text: '#333' };
                return (
                  <tr key={c.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 500, color: '#1a1a2e', fontSize: 14 }}>
                      {c.title}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#6b7280', fontSize: 14 }}>
                      {c.category}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        background: s.bg, color: s.text,
                        padding: '4px 12px', borderRadius: 20,
                        fontSize: 12, fontWeight: 600
                      }}>
                        {c.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#6b7280', fontSize: 14 }}>
                      {new Date(c.assignedAt || c.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <button onClick={() => navigate(`/staff/complaints/${c.id}`)} style={{
                        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                        color: 'white', padding: '7px 16px',
                        borderRadius: 8, fontSize: 13,
                        fontWeight: 500, border: 'none'
                      }}>
                        Update →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MyAssignedComplaints;