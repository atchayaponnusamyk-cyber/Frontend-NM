import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      
      {/* Hero Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '40px 20px', textAlign: 'center' }}>
        
        {/* Badge */}
        <div style={{ background: 'rgba(79,70,229,0.3)', border: '1px solid rgba(79,70,229,0.5)', color: '#a5b4fc', padding: '6px 18px', borderRadius: 20, fontSize: 13, fontWeight: 500, marginBottom: 24 }}>
          IBM Hackathon 2025-26
        </div>

        {/* Title */}
        <h1 style={{ color: 'white', fontSize: 48, fontWeight: 700, lineHeight: 1.2, marginBottom: 20, maxWidth: 700 }}>
          Online Complaint &
          <span style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> Grievance </span>
          Redressal System
        </h1>

        {/* Subtitle */}
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 18, maxWidth: 500, lineHeight: 1.7, marginBottom: 40 }}>
          Submit, track and resolve complaints efficiently. A transparent system for users, admins and staff.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 60 }}>
          <button onClick={() => navigate('/login')} style={{
            padding: '14px 36px', fontSize: 16, fontWeight: 600,
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            color: 'white', borderRadius: 10, border: 'none',
            boxShadow: '0 4px 20px rgba(79,70,229,0.4)'
          }}>
            Login to Portal
          </button>
          <button onClick={() => navigate('/register')} style={{
            padding: '14px 36px', fontSize: 16, fontWeight: 600,
            background: 'transparent',
            color: 'white', borderRadius: 10,
            border: '2px solid rgba(255,255,255,0.3)'
          }}>
            Create Account
          </button>
        </div>

        {/* Feature Cards */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 900 }}>
          {[
            { icon: '📝', title: 'Submit Complaints', desc: 'Easily submit and track your complaints in real time' },
            { icon: '⚡', title: 'Fast Resolution', desc: 'Admin assigns complaints to staff for quick resolution' },
            { icon: '📊', title: 'Live Tracking', desc: 'Track complaint status from OPEN to CLOSED instantly' },
            { icon: '⭐', title: 'Give Feedback', desc: 'Rate the resolution and help improve the system' },
          ].map((f) => (
            <div key={f.title} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16, padding: '24px 20px',
              width: 200, textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ color: 'white', fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Status Flow */}
        <div style={{ marginTop: 50, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: 'OPEN', color: '#856404', bg: '#FFF3CD' },
            { label: 'ASSIGNED', color: '#004085', bg: '#CCE5FF' },
            { label: 'IN PROGRESS', color: '#7D3F00', bg: '#FFE5CC' },
            { label: 'RESOLVED', color: '#155724', bg: '#D4EDDA' },
            { label: 'CLOSED', color: '#383D41', bg: '#E2E3E5' },
          ].map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: s.bg, color: s.color, padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 600 }}>
                {s.label}
              </span>
              {i < 4 && <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>→</span>}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default LandingPage;