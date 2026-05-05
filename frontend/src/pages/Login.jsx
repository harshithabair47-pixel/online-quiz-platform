import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister ? { ...form, name: form.name } : form;
      const { data } = await API.post(endpoint, payload);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#1e1e2e', display: 'flex',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#313244', padding: '40px', borderRadius: '16px',
        width: '380px', color: '#cdd6f4'
      }}>
        <h2 style={{ color: '#a78bfa', marginBottom: '24px', textAlign: 'center' }}>
          🎯 QuizAdmin {isRegister ? 'Register' : 'Login'}
        </h2>
        {error && <p style={{ color: '#f38ba8', marginBottom: '12px' }}>{error}</p>}
        {isRegister && (
          <input placeholder="Full Name" value={form.name || ''}
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={inputStyle} />
        )}
        <input placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={inputStyle} />
        <input type="password" placeholder="Password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          style={inputStyle} />
        <button onClick={handleSubmit} style={btnStyle}>
          {isRegister ? 'Register' : 'Login'}
        </button>
        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#6c7086' }}>
          {isRegister ? 'Already have account?' : "Don't have account?"}{' '}
          <span onClick={() => setIsRegister(!isRegister)}
            style={{ color: '#a78bfa', cursor: 'pointer' }}>
            {isRegister ? 'Login' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px', marginBottom: '16px',
  background: '#1e1e2e', border: '1px solid #45475a', borderRadius: '8px',
  color: '#cdd6f4', fontSize: '14px', boxSizing: 'border-box'
};
const btnStyle = {
  width: '100%', padding: '12px', background: '#a78bfa',
  color: '#fff', border: 'none', borderRadius: '8px',
  fontSize: '16px', cursor: 'pointer', fontWeight: 'bold'
};