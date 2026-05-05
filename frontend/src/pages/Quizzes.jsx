import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import API from '../utils/api';

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { fetchQuizzes(); }, []);

  const fetchQuizzes = async () => {
    const { data } = await API.get('/quizzes');
    setQuizzes(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this quiz?')) {
      await API.delete(`/quizzes/${id}`);
      fetchQuizzes();
    }
  };

  return (
    <div style={{ display: 'flex', background: '#181825', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '40px', color: '#cdd6f4' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ color: '#a78bfa' }}>All Quizzes</h1>
          <Link to="/quizzes/create" style={{
            background: '#a78bfa', color: '#fff', padding: '10px 20px',
            borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold'
          }}>+ Create Quiz</Link>
        </div>
        {quizzes.length === 0 ? (
          <p style={{ color: '#6c7086' }}>No quizzes yet. Create your first one!</p>
        ) : quizzes.map(quiz => (
          <div key={quiz._id} style={{
            background: '#313244', borderRadius: '12px', padding: '20px',
            marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: 0, color: '#cdd6f4' }}>{quiz.title}</h3>
              <p style={{ margin: '4px 0 0', color: '#6c7086', fontSize: '14px' }}>
                {quiz.questions?.length || 0} questions • {quiz.isActive ? '🟢 Active' : '🔴 Inactive'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => navigate(`/quizzes/edit/${quiz._id}`)} style={{
                padding: '8px 16px', background: '#89dceb', border: 'none',
                borderRadius: '6px', cursor: 'pointer', color: '#1e1e2e', fontWeight: 'bold'
              }}>Edit</button>
              <button onClick={() => handleDelete(quiz._id)} style={{
                padding: '8px 16px', background: '#f38ba8', border: 'none',
                borderRadius: '6px', cursor: 'pointer', color: '#fff', fontWeight: 'bold'
              }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}