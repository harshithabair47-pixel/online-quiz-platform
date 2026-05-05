import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import API from '../utils/api';

const emptyQuestion = () => ({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });

export default function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([emptyQuestion()]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const updateQuestion = (i, field, value) => {
    const updated = [...questions];
    updated[i][field] = value;
    setQuestions(updated);
  };

  const updateOption = (qi, oi, value) => {
    const updated = [...questions];
    updated[qi].options[oi] = value;
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    if (!title) return setError('Title is required');
    try {
      await API.post('/quizzes', { title, description, questions });
      navigate('/quizzes');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating quiz');
    }
  };

  return (
    <div style={{ display: 'flex', background: '#181825', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '40px', color: '#cdd6f4', maxWidth: '800px' }}>
        <h1 style={{ color: '#a78bfa', marginBottom: '24px' }}>Create New Quiz</h1>
        {error && <p style={{ color: '#f38ba8' }}>{error}</p>}
        <input placeholder="Quiz Title" value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
        <textarea placeholder="Description (optional)" value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ ...inputStyle, height: '80px', resize: 'vertical' }} />

        <h3 style={{ color: '#89dceb', marginTop: '24px' }}>Questions</h3>
        {questions.map((q, qi) => (
          <div key={qi} style={{ background: '#313244', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
            <p style={{ color: '#a78bfa', fontWeight: 'bold', marginBottom: '8px' }}>Question {qi + 1}</p>
            <input placeholder="Question text" value={q.questionText}
              onChange={e => updateQuestion(qi, 'questionText', e.target.value)} style={inputStyle} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {q.options.map((opt, oi) => (
                <input key={oi} placeholder={`Option ${oi + 1}`} value={opt}
                  onChange={e => updateOption(qi, oi, e.target.value)} style={inputStyle} />
              ))}
            </div>
            <select value={q.correctAnswer}
              onChange={e => updateQuestion(qi, 'correctAnswer', e.target.value)}
              style={{ ...inputStyle, marginTop: '8px' }}>
              <option value="">Select Correct Answer</option>
              {q.options.filter(o => o).map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}

        <button onClick={() => setQuestions([...questions, emptyQuestion()])} style={{
          padding: '10px 20px', background: '#313244', color: '#a78bfa',
          border: '1px dashed #a78bfa', borderRadius: '8px', cursor: 'pointer', marginRight: '12px'
        }}>+ Add Question</button>

        <button onClick={handleSubmit} style={{
          padding: '10px 24px', background: '#a78bfa', color: '#fff',
          border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
        }}>Save Quiz</button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px', marginBottom: '12px', background: '#1e1e2e',
  border: '1px solid #45475a', borderRadius: '8px', color: '#cdd6f4',
  fontSize: '14px', boxSizing: 'border-box'
};