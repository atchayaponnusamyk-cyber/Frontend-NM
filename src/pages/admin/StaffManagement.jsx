import { useEffect, useState } from 'react';
import { getAllStaff } from '../../api/adminApi';

function StaffManagement() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    getAllStaff().then(res => setStaff(res.data)).catch(console.error);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>Staff Management</h2>
      {staff.length === 0 && <p>No staff found.</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            {['Name', 'Email', 'Assigned Complaints'].map(h => (
              <th key={h} style={{ padding: 10, textAlign: 'left', border: '1px solid #ddd' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {staff.map(s => (
            <tr key={s.id}>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>{s.name}</td>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>{s.email}</td>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>{s.assignedCount ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default StaffManagement;