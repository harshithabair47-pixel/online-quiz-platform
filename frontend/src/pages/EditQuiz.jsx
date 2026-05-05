import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import API from '../utils/api';

export default function EditQuiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/quizzes/${id}`).then(({ data }) => setQuiz(data));
  }, [id]);

  const handleSave = async () => {
    await API.put(`/quizzes/${id}`, quiz);
    navigate('/quizzes');
  };

  if (!quiz) return <div style={{ color: '#cdd6f4', padding: '40px' }}>Loading...</div>;

  return (
    <div style={{ display: 'flex', background: '#181825', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '40px', color: '#cdd6f4', maxWidth: '800px' }}>
        <h1 style={{ color: '#a78bfa', marginBottom: '24px' }}>Edit Quiz</h1>
        <input value={quiz.title} onChange={e => setQuiz({ ...quiz, title: e.target.value })}
          style={inputStyle} placeholder="Title" />
        <textarea value={quiz.description} onChange={e => setQuiz({ ...quiz, description: e.target.value })}
          style={{ ...inputStyle, height: '80px' }} placeholder="Description" />

        {quiz.questions.map((q, qi) => (
          <div key={qi} style={{ background: '#313244', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
            <p style={{ color: '#a78bfa' }}>Question {qi + 1}</p>
            <input value={q.questionText} style={inputStyle}
              onChange={e => {
                const qs = [...quiz.questions];
                qs[qi].questionText = e.target.value;
                setQuiz({ ...quiz, questions: qs });
              }} />
          </div>
        ))}

        <button onClick={handleSave} style={{
          padding: '10px 24px', background: '#a78bfa', color: '#fff',
          border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
        }}>Update Quiz</button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px', marginBottom: '12px', background: '#1e1e2e',
  border: '1px solid #45475a', borderRadius: '8px', color: '#cdd6f4',
  fontSize: '14px', boxSizing: 'border-box'
};