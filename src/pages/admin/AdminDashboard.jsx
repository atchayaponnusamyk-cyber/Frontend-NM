import { useEffect, useState } from 'react';
import { getAllComplaints } from '../../api/adminApi';

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    getAllComplaints().then(res => setComplaints(res.data)).catch(console.error);
  }, []);

  const stats = [
    ['Total', complaints.length, '#1a1a2e'],
    ['Open', complaints.filter(c => c.status === 'OPEN').length, '#856404'],
    ['In Progress', complaints.filter(c => c.status === 'IN_PROGRESS').length, '#7D3F00'],
    ['Resolved', complaints.filter(c => c.status === 'RESOLVED').length, '#155724'],
  ];

  return (
    <div style={{ padding: 30 }}>
      <h2>Admin Dashboard</h2>
      <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
        {stats.map(([label, val, color]) => (
          <div key={label} style={{ flex: 1, background: color, color: 'white', padding: 20, borderRadius: 8, textAlign: 'center' }}>
            <h3 style={{ margin: 0 }}>{val}</h3>
            <p style={{ margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>
      <h3>Recent Complaints</h3>
      {complaints.length === 0 && <p>No complaints found.</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            {['Title', 'Category', 'Status', 'Date'].map(h => (
              <th key={h} style={{ padding: 10, textAlign: 'left', border: '1px solid #ddd' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {complaints.slice(0, 5).map(c => (
            <tr key={c.id}>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>{c.title}</td>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>{c.category}</td>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>{c.status}</td>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default AdminDashboard;