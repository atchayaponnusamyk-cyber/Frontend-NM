import { useEffect, useState } from 'react';
import { getMyComplaints } from '../../api/complaintApi';
import ComplaintCard from '../../components/ComplaintCard';
import { useAuth } from '../../context/AuthContext';

function UserDashboard() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    getMyComplaints().then(res => setComplaints(res.data)).catch(console.error);
  }, []);

  const total = complaints.length;
  const open = complaints.filter(c => c.status === 'OPEN').length;
  const resolved = complaints.filter(c => c.status === 'RESOLVED').length;

  return (
    <div style={{ padding: 30 }}>
      <h2>Welcome, {user?.name}</h2>
      <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
        {[['Total', total, '#1a1a2e'], ['Open', open, '#856404'], ['Resolved', resolved, '#155724']].map(([label, val, color]) => (
          <div key={label} style={{ flex: 1, background: color, color: 'white', padding: 20, borderRadius: 8, textAlign: 'center' }}>
            <h3 style={{ margin: 0 }}>{val}</h3>
            <p style={{ margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>
      <h3>Recent Complaints</h3>
      {complaints.length === 0 && <p>No complaints yet.</p>}
      {complaints.slice(0, 5).map(c => (
        <ComplaintCard key={c.id} complaint={c} linkPrefix="/user/complaints" />
      ))}
    </div>
  );
}
export default UserDashboard;