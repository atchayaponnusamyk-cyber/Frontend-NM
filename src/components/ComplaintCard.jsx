import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

function ComplaintCard({ complaint, linkPrefix }) {
  const navigate = useNavigate();
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 12 }}>
      <h4 style={{ margin: '0 0 8px' }}>{complaint.title}</h4>
      <p style={{ margin: '0 0 8px', color: '#555' }}>{complaint.category}</p>
      <StatusBadge status={complaint.status} />
      <button
        onClick={() => navigate(`${linkPrefix}/${complaint.id}`)}
        style={{ float: 'right', padding: '4px 12px', cursor: 'pointer' }}>
        View
      </button>
    </div>
  );
}
export default ComplaintCard;