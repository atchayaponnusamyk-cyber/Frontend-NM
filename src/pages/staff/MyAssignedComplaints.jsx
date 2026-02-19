import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssignedComplaints } from '../../api/staffApi';
import StatusBadge from '../../components/StatusBadge';

function MyAssignedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAssignedComplaints().then(res => setComplaints(res.data)).catch(console.error);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>My Assigned Complaints</h2>
      {complaints.length === 0 && <p>No complaints assigned yet.</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            {['Title', 'Status', 'Date Assigned', 'Action'].map(h => (
              <th key={h} style={{ padding: 10, textAlign: 'left', border: '1px solid #ddd' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {complaints.map(c => (
            <tr key={c.id}>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>{c.title}</td>
              <td style={{ padding: 10, border: '1px solid #ddd' }}><StatusBadge status={c.status} /></td>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>{new Date(c.assignedAt || c.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>
                <button onClick={() => navigate(`/staff/complaints/${c.id}`)}
                  style={{ cursor: 'pointer', padding: '4px 12px' }}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default MyAssignedComplaints;