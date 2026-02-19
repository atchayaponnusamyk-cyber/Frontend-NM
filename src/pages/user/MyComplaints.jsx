import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyComplaints } from '../../api/complaintApi';
import StatusBadge from '../../components/StatusBadge';

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyComplaints().then(res => setComplaints(res.data)).catch(console.error);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>My Complaints</h2>
      {complaints.length === 0 && <p>No complaints found.</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            {['Title', 'Category', 'Status', 'Date', 'Action'].map(h => (
              <th key={h} style={{ padding: 10, textAlign: 'left', border: '1px solid #ddd' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {complaints.map(c => (
            <tr key={c.id}>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>{c.title}</td>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>{c.category}</td>
              <td style={{ padding: 10, border: '1px solid #ddd' }}><StatusBadge status={c.status} /></td>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>
                <button onClick={() => navigate(`/user/complaints/${c.id}`)}
                  style={{ cursor: 'pointer', padding: '4px 12px' }}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default MyComplaints;