import { useEffect, useState } from 'react';
import { getAllStaff } from '../../api/adminApi';

function StaffManagement() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    getAllStaff().then(res => setStaff(res.data)).catch(console.error);
  }, []);

  return (
    <div style={{ padding: '30px', maxWidth: 1100, margin: '0 auto' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e, #4f46e5)',
        borderRadius: 16, padding: '28px 32px', marginBottom: 28
      }}>
        <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
          👨‍💼 Staff Management
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
          View all staff members and their assigned complaints
        </p>
      </div>

      {/* Staff Cards */}
      {staff.length === 0 ? (
        <div style={{
          background: 'white', borderRadius: 16, padding: '60px 24px',
          textAlign: 'center', color: '#9ca3af',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>👥</div>
          <p style={{ fontSize: 16, fontWeight: 500 }}>No staff members found</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 28 }}>
            {staff.map(s => (
              <div key={s.id} style={{
                background: 'white', borderRadius: 16, padding: 24,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                borderTop: '4px solid #4f46e5'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: 20, fontWeight: 700
                  }}>
                    {s.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 16, color: '#1a1a2e' }}>{s.name}</p>
                    <p style={{ fontSize: 13, color: '#6b7280' }}>{s.email}</p>
                  </div>
                </div>
                <div style={{
                  background: '#eef2ff', borderRadius: 10,
                  padding: '12px 16px', display: 'flex',
                  justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span style={{ fontSize: 13, color: '#4f46e5', fontWeight: 500 }}>
                    Assigned Complaints
                  </span>
                  <span style={{
                    background: '#4f46e5', color: 'white',
                    width: 28, height: 28, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700
                  }}>
                    {s.assignedCount ?? 0}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Staff Table */}
          <div style={{
            background: 'white', borderRadius: 16, padding: 24,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1a1a2e', marginBottom: 20 }}>
              Staff Details
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Name', 'Email', 'Assigned Complaints', 'Status'].map(h => (
                    <th key={h} style={{
                      padding: '14px 16px', textAlign: 'left',
                      fontSize: 13, fontWeight: 600, color: '#6b7280',
                      borderBottom: '2px solid #f3f4f6'
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staff.map(s => (
                  <tr key={s.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: '50%',
                          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'white', fontSize: 13, fontWeight: 700
                        }}>
                          {s.name.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 500, color: '#1a1a2e', fontSize: 14 }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#6b7280', fontSize: 14 }}>
                      {s.email}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        background: '#eef2ff', color: '#4f46e5',
                        padding: '4px 12px', borderRadius: 20,
                        fontSize: 13, fontWeight: 600
                      }}>
                        {s.assignedCount ?? 0} complaints
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        background: '#D4EDDA', color: '#155724',
                        padding: '4px 12px', borderRadius: 20,
                        fontSize: 12, fontWeight: 600
                      }}>
                        ● Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default StaffManagement;