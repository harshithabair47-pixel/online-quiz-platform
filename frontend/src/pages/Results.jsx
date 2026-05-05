import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../utils/api';

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    API.get('/results').then(({ data }) => setResults(data));
  }, []);

  return (
    <div style={{ display: 'flex', background: '#181825', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '40px', color: '#cdd6f4' }}>
        <h1 style={{ color: '#a78bfa', marginBottom: '32px' }}>Quiz Results</h1>
        {results.length === 0 ? (
          <p style={{ color: '#6c7086' }}>No results submitted yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#313244' }}>
                {['Student Name', 'Quiz', 'Score', 'Percentage', 'Date'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#a78bfa' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map(r => (
                <tr key={r._id} style={{ borderBottom: '1px solid #313244' }}>
                  <td style={{ padding: '12px 16px' }}>{r.userName}</td>
                  <td style={{ padding: '12px 16px' }}>{r.quizId?.title || 'N/A'}</td>
                  <td style={{ padding: '12px 16px' }}>{r.score}/{r.total}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      color: (r.score / r.total) >= 0.6 ? '#a6e3a1' : '#f38ba8',
                      fontWeight: 'bold'
                    }}>
                      {Math.round((r.score / r.total) * 100)}%
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#6c7086', fontSize: '13px' }}>
                    {new Date(r.submittedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}