import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/', label: '📊 Dashboard' },
  { path: '/quizzes', label: '📝 Quizzes' },
  { path: '/results', label: '🏆 Results' },
];

export default function Sidebar() {
  const { logout, user } = useAuth();
  const location = useLocation();

  return (
    <div style={{
      width: '240px', minHeight: '100vh', background: '#1e1e2e',
      color: '#fff', display: 'flex', flexDirection: 'column', padding: '24px 16px'
    }}>
      <h2 style={{ color: '#a78bfa', marginBottom: '32px', fontSize: '18px' }}>
        🎯 QuizAdmin
      </h2>
      <nav style={{ flex: 1 }}>
        {navItems.map(item => (
          <Link key={item.path} to={item.path} style={{
            display: 'block', padding: '12px 16px', marginBottom: '8px',
            borderRadius: '8px', textDecoration: 'none', color: '#cdd6f4',
            background: location.pathname === item.path ? '#313244' : 'transparent',
            fontWeight: location.pathname === item.path ? 'bold' : 'normal'
          }}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div style={{ borderTop: '1px solid #313244', paddingTop: '16px' }}>
        <p style={{ fontSize: '13px', color: '#6c7086', marginBottom: '8px' }}>
          👤 {user?.name}
        </p>
        <button onClick={logout} style={{
          width: '100%', padding: '10px', background: '#f38ba8',
          color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer'
        }}>
          Logout
        </button>
      </div>
    </div>
  );
}