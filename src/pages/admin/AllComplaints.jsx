import { useEffect, useState } from 'react';
import { getAllComplaints, assignComplaint, getAllStaff } from '../../api/adminApi';

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
    if (!selectedStaff) return alert('Please select a staff member');
    try {
      await assignComplaint(modal.id, selectedStaff);
      setComplaints(prev => prev.map(c => c.id === modal.id ? { ...c, status: 'ASSIGNED' } : c));
      setModal(null);
    } catch (err) {
      alert('Assignment failed. Try again.');
    }
  };

  const filtered = filter ? complaints.filter(c => c.status === filter) : complaints;

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
          📋 All Complaints
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
          Manage and assign complaints to staff members
        </p>
      </div>

      {/* Filter */}
      <div style={{
        background: 'white', borderRadius: 16, padding: '16px 24px',
        marginBottom: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'center', gap: 16
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Filter by Status:</span>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{
          padding: '8px 14px', borderRadius: 8, border: '1.5px solid #e5e7eb',
          fontSize: 14, color: '#374151', background: 'white', width: 200
        }}>
          <option value="">All Status</option>
          {['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <span style={{ fontSize: 13, color: '#6b7280' }}>
          Showing {filtered.length} complaints
        </span>
      </div>

      {/* Table */}
      <div style={{
        background: 'white', borderRadius: 16, padding: 24,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
      }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
            <p>No complaints found</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Title', 'Category', 'Status', 'Date', 'Action'].map(h => (
                  <th key={h} style={{
                    padding: '14px 16px', textAlign: 'left',
                    fontSize: 13, fontWeight: 600, color: '#6b7280',
                    borderBottom: '2px solid #f3f4f6'
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
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
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <button onClick={() => { setModal(c); setSelectedStaff(''); }} style={{
                        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                        color: 'white', padding: '7px 16px',
                        borderRadius: 8, fontSize: 13,
                        fontWeight: 500, border: 'none'
                      }}>
                        Assign
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Assign Modal */}
      {modal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: 'white', borderRadius: 20, padding: 36,
            width: '100%', maxWidth: 420,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 6 }}>
              Assign Complaint
            </h3>
            <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 24 }}>
              📋 {modal.title}
            </p>

            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
              Select Staff Member
            </label>
            <select value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)} style={{
              width: '100%', padding: '12px 14px', borderRadius: 10,
              border: '1.5px solid #e5e7eb', fontSize: 14,
              background: 'white', marginBottom: 24
            }}>
              <option value="">Choose a staff member</option>
              {staffList.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setModal(null)} style={{
                flex: 1, padding: '12px', borderRadius: 10,
                background: '#f3f4f6', color: '#374151',
                fontWeight: 600, fontSize: 14, border: 'none'
              }}>
                Cancel
              </button>
              <button onClick={handleAssign} style={{
                flex: 2, padding: '12px', borderRadius: 10,
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                color: 'white', fontWeight: 600, fontSize: 14, border: 'none'
              }}>
                Confirm Assign →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllComplaints;