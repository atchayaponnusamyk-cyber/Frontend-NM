function StatusBadge({ status }) {
  const colors = {
    OPEN:        { bg: '#FFF3CD', text: '#856404' },
    ASSIGNED:    { bg: '#CCE5FF', text: '#004085' },
    IN_PROGRESS: { bg: '#FFE5CC', text: '#7D3F00' },
    RESOLVED:    { bg: '#D4EDDA', text: '#155724' },
    CLOSED:      { bg: '#E2E3E5', text: '#383D41' },
  };
  const style = colors[status] || { bg: '#eee', text: '#333' };
  return (
    <span style={{
      background: style.bg, color: style.text,
      padding: '3px 10px', borderRadius: '12px',
      fontWeight: 'bold', fontSize: '13px'
    }}>
      {status}
    </span>
  );
}
export default StatusBadge;