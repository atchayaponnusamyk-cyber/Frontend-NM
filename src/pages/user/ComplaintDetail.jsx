import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getComplaintById } from '../../api/complaintApi';
import { submitFeedback } from '../../api/feedbackApi';

function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [feedback, setFeedback] = useState({ rating: 5, comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const statusColors = {
    OPEN:        { bg: '#FFF3CD', text: '#856404' },
    ASSIGNED:    { bg: '#CCE5FF', text: '#004085' },
    IN_PROGRESS: { bg: '#FFE5CC', text: '#7D3F00' },
    RESOLVED:    { bg: '#D4EDDA', text: '#155724' },
    CLOSED:      { bg: '#E2E3E5', text: '#383D41' },
  };

  useEffect(() => {
    getComplaintById(id).then(res => setComplaint(res.data)).catch(console.error);
  }, [id]);

  const handleFeedback = async (e) => {
    e.preventDefault();
    try {
      await submitFeedback(id, feedback);
      setSubmitted(true);
      setComplaint(prev => ({ ...prev, feedback: true, status: 'CLOSED' }));
    } catch (err) {
      alert('Feedback submission failed');
    }
  };

  if (!complaint) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', color: '#6b7280' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
        <p>Loading complaint details...</p>
      </div>
    </div>
  );

  const s = statusColors[complaint.status] || { bg: '#eee', text: '#333' };

  return (
    <div style={{ padding: '30px', maxWidth: 800, margin: '0 auto' }}>

      {/* Back Button */}
      <button onClick={() => navigate('/user/complaints')} style={{
        background: 'transparent', border: 'none', color: '#4f46e5',
        fontSize: 14, fontWeight: 500, marginBottom: 20, padding: 0
      }}>
        ← Back to My Complaints
      </button>

      {/* Complaint Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e, #4f46e5)',
        borderRadius: 16, padding: '28px 32px', marginBottom: 24
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ color: 'white', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              {complaint.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
              📁 {complaint.category} • 📅 {new Date(complaint.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span style={{
            background: s.bg, color: s.text,
            padding: '6px 16px', borderRadius: 20,
            fontSize: 13, fontWeight: 600
          }}>
            {complaint.status}
          </span>
        </div>
      </div>

      {/* Complaint Details */}
      <div style={{
        background: 'white', borderRadius: 16, padding: 28,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: 24
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 12 }}>
          📄 Description
        </h3>
        <p style={{ color: '#4b5563', lineHeight: 1.7, fontSize: 15 }}>
          {complaint.description}
        </p>

        {complaint.assignedStaff && (
          <div style={{
            marginTop: 20, padding: '12px 16px',
            background: '#eef2ff', borderRadius: 10,
            display: 'flex', alignItems: 'center', gap: 10
          }}>
            <span style={{ fontSize: 20 }}>👨‍💼</span>
            <div>
              <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 2 }}>Assigned Staff</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#4f46e5' }}>{complaint.assignedStaff}</p>
            </div>
          </div>
        )}
      </div>

      {/* Updates Timeline */}
      <div style={{
        background: 'white', borderRadius: 16, padding: 28,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: 24
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 20 }}>
          🕐 Updates Timeline
        </h3>
        {complaint.updates?.length > 0 ? (
          complaint.updates.map((u, i) => (
            <div key={i} style={{
              display: 'flex', gap: 16, marginBottom: 20
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 14, flexShrink: 0
              }}>
                {i + 1}
              </div>
              <div style={{
                flex: 1, background: '#f9fafb', borderRadius: 12,
                padding: '14px 18px', border: '1px solid #f3f4f6'
              }}>
                <p style={{ color: '#1a1a2e', fontSize: 14, marginBottom: 6 }}>{u.message}</p>
                <p style={{ color: '#9ca3af', fontSize: 12 }}>
                  {new Date(u.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#9ca3af' }}>
            <p>No updates yet. Check back later.</p>
          </div>
        )}
      </div>

      {/* Feedback Form */}
      {complaint.status === 'RESOLVED' && !complaint.feedback && !submitted && (
        <div style={{
          background: 'white', borderRadius: 16, padding: 28,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          border: '2px solid #D4EDDA'
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#155724', marginBottom: 6 }}>
            ⭐ Submit Your Feedback
          </h3>
          <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>
            Your complaint has been resolved. Please rate our service.
          </p>

          <form onSubmit={handleFeedback}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 10 }}>
                Rating
              </label>
              <div style={{ display: 'flex', gap: 10 }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} type="button"
                    onClick={() => setFeedback({ ...feedback, rating: star })}
                    style={{
                      width: 44, height: 44, borderRadius: '50%', border: 'none',
                      fontSize: 20, cursor: 'pointer',
                      background: feedback.rating >= star ? '#fbbf24' : '#f3f4f6'
                    }}>
                    ⭐
                  </button>
                ))}
                <span style={{ alignSelf: 'center', fontSize: 14, color: '#6b7280', marginLeft: 8 }}>
                  {feedback.rating}/5
                </span>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                Comment
              </label>
              <textarea
                placeholder="Share your experience..."
                value={feedback.comment}
                onChange={e => setFeedback({ ...feedback, comment: e.target.value })}
                rows={4}
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 10,
                  border: '1.5px solid #e5e7eb', fontSize: 14, resize: 'vertical'
                }}
              />
            </div>

            <button type="submit" style={{
              width: '100%', padding: '13px',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: 'white', borderRadius: 10, fontSize: 15,
              fontWeight: 600, border: 'none'
            }}>
              Submit Feedback ⭐
            </button>
          </form>
        </div>
      )}

      {submitted && (
        <div style={{
          background: '#D4EDDA', border: '1px solid #c3e6cb',
          borderRadius: 16, padding: 24, textAlign: 'center'
        }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🎉</div>
          <p style={{ color: '#155724', fontWeight: 600, fontSize: 16 }}>
            Feedback submitted successfully!
          </p>
          <p style={{ color: '#155724', fontSize: 14, marginTop: 6 }}>
            Thank you for your response.
          </p>
        </div>
      )}
    </div>
  );
}

export default ComplaintDetail;