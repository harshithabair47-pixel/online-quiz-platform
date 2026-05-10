import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [userName, setUserName] = useState('');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    API.get(`/quizzes/${id}`).then(({ data }) => setQuiz(data));
  }, [id]);

  const handleSubmit = async () => {
    if (!userName) return alert('Please enter your name!');
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++;
    });
    await API.post('/results', {
      quizId: id,
      userName,
      score: correct,
      total: quiz.questions.length
    });
    setScore(correct);
    setSubmitted(true);
  };

  if (!quiz) return (
    <div style={{ minHeight: '100vh', background: '#181825', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cdd6f4' }}>
      Loading...
    </div>
  );

  if (submitted) return (
    <div style={{ minHeight: '100vh', background: '#181825', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#313244', borderRadius: '16px', padding: '48px', textAlign: 'center', color: '#cdd6f4' }}>
        <div style={{ fontSize: '64px' }}>🎉</div>
        <h2 style={{ color: '#a78bfa', fontSize: '28px' }}>Quiz Submitted!</h2>
        <p style={{ fontSize: '18px', marginTop: '16px' }}>Your Score:</p>
        <div style={{ fontSize: '72px', fontWeight: 'bold', color: score / quiz.questions.length >= 0.6 ? '#a6e3a1' : '#f38ba8' }}>
          {score}/{quiz.questions.length}
        </div>
        <p style={{ color: '#6c7086', marginTop: '8px' }}>
          {Math.round((score / quiz.questions.length) * 100)}% — {score / quiz.questions.length >= 0.6 ? '✅ Passed!' : '❌ Try Again'}
        </p>
      </div>
    </div>
  );

  if (!started) return (
    <div style={{ minHeight: '100vh', background: '#181825', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#313244', borderRadius: '16px', padding: '48px', textAlign: 'center', color: '#cdd6f4', width: '400px' }}>
        <div style={{ fontSize: '48px' }}>📝</div>
        <h2 style={{ color: '#a78bfa', margin: '16px 0' }}>{quiz.title}</h2>
        <p style={{ color: '#6c7086', marginBottom: '24px' }}>{quiz.questions.length} Questions</p>
        <input
          placeholder="Enter your name"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          style={{ width: '100%', padding: '12px', background: '#1e1e2e', border: '1px solid #45475a', borderRadius: '8px', color: '#cdd6f4', fontSize: '16px', marginBottom: '16px', boxSizing: 'border-box' }}
        />
        <button onClick={() => { if (!userName) return alert('Enter your name!'); setStarted(true); }}
          style={{ width: '100%', padding: '14px', background: '#a78bfa', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}>
          Start Quiz 🚀
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#181825', padding: '40px 20px', color: '#cdd6f4' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ color: '#a78bfa', marginBottom: '8px' }}>{quiz.title}</h2>
        <p style={{ color: '#6c7086', marginBottom: '32px' }}>👤 {userName}</p>

        {quiz.questions.map((q, qi) => (
          <div key={qi} style={{ background: '#313244', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '16px' }}>
              Q{qi + 1}. {q.questionText}
            </p>
            {q.options.filter(o => o).map((opt, oi) => (
              <div key={oi} onClick={() => setAnswers({ ...answers, [qi]: opt })}
                style={{
                  padding: '12px 16px', marginBottom: '8px', borderRadius: '8px', cursor: 'pointer',
                  background: answers[qi] === opt ? '#a78bfa' : '#1e1e2e',
                  color: answers[qi] === opt ? '#fff' : '#cdd6f4',
                  border: `1px solid ${answers[qi] === opt ? '#a78bfa' : '#45475a'}`,
                  transition: 'all 0.2s'
                }}>
                {opt}
              </div>
            ))}
          </div>
        ))}

        <button onClick={handleSubmit}
          style={{ width: '100%', padding: '16px', background: '#a6e3a1', color: '#1e1e2e', border: 'none', borderRadius: '8px', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold', marginTop: '16px' }}>
          Submit Quiz ✅
        </button>
      </div>
    </div>
  );
}