import { useEffect, useState } from 'react';
import { getAssignedComplaints } from '../../api/staffApi';
import ComplaintCard from '../../components/ComplaintCard';
import { useAuth } from '../../context/AuthContext';

function StaffDashboard() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    getAssignedComplaints().then(res => setComplaints(res.data)).catch(console.error);
  }, []);

  const stats = [
    ['Total Assigned', complaints.length, '#1a1a2e'],
    ['In Progress', complaints.filter(c => c.status === 'IN_PROGRESS').length, '#7D3F00'],
    ['Resolved', complaints.filter(c => c.status === 'RESOLVED').length, '#155724'],
  ];

  return (
    <div style={{ padding: 30 }}>
      <h2>Welcome, {user?.name}</h2>
      <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
        {stats.map(([label, val, color]) => (
          <div key={label} style={{ flex: 1, background: color, color: 'white', padding: 20, borderRadius: 8, textAlign: 'center' }}>
            <h3 style={{ margin: 0 }}>{val}</h3>
            <p style={{ margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>
      <h3>My Assigned Complaints</h3>
      {complaints.length === 0 && <p>No complaints assigned yet.</p>}
      {complaints.slice(0, 5).map(c => (
        <ComplaintCard key={c.id} complaint={c} linkPrefix="/staff/complaints" />
      ))}
    </div>
  );
}
export default StaffDashboard;