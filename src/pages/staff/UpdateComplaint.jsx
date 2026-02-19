import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getComplaintById } from '../../api/complaintApi';
import { updateComplaintStatus } from '../../api/staffApi';
import StatusBadge from '../../components/StatusBadge';

function UpdateComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [form, setForm] = useState({ status: '', message: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    getComplaintById(id).then(res => {
      setComplaint(res.data);
      setForm(prev => ({ ...prev, status: res.data.status }));
    }).catch(console.error);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateComplaintStatus(id, form);
      navigate('/staff/complaints');
    } catch (err) {
      setError('Update failed. Try again.');
    }
  };

  if (!complaint) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 30 }}>
      <h2>{complaint.title}</h2>
      <p>{complaint.description}</p>
      <p><strong>Category:</strong> {complaint.category}</p>
      <p><strong>Current Status:</strong> <StatusBadge status={complaint.status} /></p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <label><strong>Update Status:</strong></label>
        <select value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
          style={{ display: 'block', width: '100%', padding: 8, marginBottom: 12, marginTop: 6 }}>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>

        <label><strong>Add Message:</strong></label>
        <textarea value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          placeholder="Describe what you did..."
          rows={4} style={{ display: 'block', width: '100%', padding: 8, marginBottom: 12, marginTop: 6 }} />

        <button type="submit"
          style={{ padding: '10px 30px', background: '#1a1a2e', color: 'white', border: 'none', cursor: 'pointer' }}>
          Submit Update
        </button>
      </form>
    </div>
  );
}
export default UpdateComplaint;
