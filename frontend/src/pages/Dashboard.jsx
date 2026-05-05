import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ quizzes: 0, results: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [q, r] = await Promise.all([API.get('/quizzes'), API.get('/results')]);
      setStats({ quizzes: q.data.length, results: r.data.length });
    };
    fetchStats();
  }, []);

  return (
    <div style={{ display: 'flex', background: '#181825', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '40px', color: '#cdd6f4' }}>
        <h1 style={{ color: '#a78bfa', marginBottom: '32px' }}>Admin Dashboard</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            { label: 'Total Quizzes', value: stats.quizzes, icon: '📝', color: '#a78bfa' },
            { label: 'Total Results', value: stats.results, icon: '🏆', color: '#89dceb' },
            { label: 'Active Admin', value: '1', icon: '👤', color: '#a6e3a1' },
          ].map(card => (
            <div key={card.label} style={{
              background: '#313244', borderRadius: '12px', padding: '28px',
              borderLeft: `4px solid ${card.color}`
            }}>
              <div style={{ fontSize: '32px' }}>{card.icon}</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: card.color }}>
                {card.value}
              </div>
              <div style={{ color: '#6c7086', marginTop: '4px' }}>{card.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}