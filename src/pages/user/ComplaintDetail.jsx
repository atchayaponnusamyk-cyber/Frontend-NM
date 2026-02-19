import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComplaintById } from '../../api/complaintApi';
import { submitFeedback } from '../../api/feedbackApi';
import StatusBadge from '../../components/StatusBadge';

function ComplaintDetail() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [feedback, setFeedback] = useState({ rating: 5, comment: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getComplaintById(id).then(res => setComplaint(res.data)).catch(console.error);
  }, [id]);

  const handleFeedback = async (e) => {
    e.preventDefault();
    try {
      await submitFeedback(id, feedback);
      setSubmitted(true);
      setComplaint(prev => ({ ...prev, feedback: true }));
    } catch (err) {
      alert('Feedback submission failed');
    }
  };

  if (!complaint) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 20 }}>
      <h2>{complaint.title}</h2>
      <p>{complaint.description}</p>
      <p><strong>Category:</strong> {complaint.category}</p>
      <p><strong>Status:</strong> <StatusBadge status={complaint.status} /></p>
      {complaint.assignedStaff && (
        <p><strong>Assigned to:</strong> {complaint.assignedStaff}</p>
      )}

      <h3>Updates Timeline</h3>
      {complaint.updates?.length > 0 ? complaint.updates.map((u, i) => (
        <div key={i} style={{ borderLeft: '3px solid #ccc', paddingLeft: 12, marginBottom: 10 }}>
          <p>{u.message}</p>
          <small>{new Date(u.timestamp).toLocaleString()}</small>
        </div>
      )) : <p>No updates yet.</p>}

      {complaint.status === 'RESOLVED' && !complaint.feedback && !submitted && (
        <form onSubmit={handleFeedback} style={{ marginTop: 30, background: '#f9f9f9', padding: 20, borderRadius: 8 }}>
          <h3>Submit Feedback</h3>
          <label><strong>Rating (1-5):</strong></label>
          <input type="number" min="1" max="5" value={feedback.rating}
            onChange={e => setFeedback({ ...feedback, rating: e.target.value })}
            style={{ width: 60, marginLeft: 10, marginBottom: 10, padding: 6 }} />
          <br />
          <textarea placeholder="Your comment..." value={feedback.comment}
            onChange={e => setFeedback({ ...feedback, comment: e.target.value })}
            rows={4} style={{ width: '100%', marginBottom: 10, padding: 8 }} />
          <button type="submit" style={{ padding: '8px 20px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
            Submit Feedback
          </button>
        </form>
      )}
      {submitted && (
        <p style={{ color: 'green', marginTop: 20 }}>✅ Feedback submitted! Thank you.</p>
      )}
    </div>
  );
}
export default ComplaintDetail;