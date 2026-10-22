import React, { useState } from 'react';
import API from './api';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      onLoginSuccess(res.data.user, res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed. Try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', color: '#fff' }}>
      <h2>Login to BookNest</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          required 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', background: '#2a2a2a', color: '#fff' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
          required 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', background: '#2a2a2a', color: '#fff' }}
        />
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Login</button>
      </form>
      {message && <p style={{ marginTop: '15px', color: '#ff6b6b' }}>{message}</p>}
    </div>
  );
};

export default Login;
