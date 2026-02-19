import { useEffect, useState } from 'react';
import { getAllComplaints, assignComplaint, getAllStaff } from '../../api/adminApi';
import StatusBadge from '../../components/StatusBadge';

function AllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [filter, setFilter] = useState('');
  const [modal, setModal] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState('');

  useEffect(() => {
    getAllComplaints().then(res => setComplaints(res.data)).catch(console.error);
    getAllStaff().then(res => setStaffList(res.data)).catch(console.error);
  }, []);

  const handleAssign = async () => {
    if (!selectedStaff) return alert('Select a staff member');
    try {
      await assignComplaint(modal.id, selectedStaff);
      setComplaints(prev => prev.map(c => c.id === modal.id ? { ...c, status: 'ASSIGNED' } : c));
      setModal(null);
    } catch (err) {
      alert('Assignment failed. Try again.');
    }
  };

  const filtered = filter ? complaints.filter(c => c.status === filter) : complaints;

  return (
    <div style={{ padding: 30 }}>
      <h2>All Complaints</h2>
      <select value={filter} onChange={e => setFilter(e.target.value)}
        style={{ marginBottom: 16, padding: 8 }}>
        <option value="">All Status</option>
        {['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            {['Title', 'Category', 'Status', 'Date', 'Action'].map(h => (
              <th key={h} style={{ padding: 10, textAlign: 'left', border: '1px solid #ddd' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id}>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>{c.title}</td>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>{c.category}</td>
              <td style={{ padding: 10, border: '1px solid #ddd' }}><StatusBadge status={c.status} /></td>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: 10, border: '1px solid #ddd' }}>
                <button onClick={() => { setModal(c); setSelectedStaff(''); }}
                  style={{ padding: '4px 12px', cursor: 'pointer' }}>
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: 30, borderRadius: 8, minWidth: 320 }}>
            <h3>Assign: {modal.title}</h3>
            <select value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)}
              style={{ width: '100%', padding: 8, marginBottom: 16 }}>
              <option value="">Select Staff Member</option>
              {staffList.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleAssign}
                style={{ padding: '8px 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                Confirm
              </button>
              <button onClick={() => setModal(null)}
                style={{ padding: '8px 20px', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default AllComplaints;