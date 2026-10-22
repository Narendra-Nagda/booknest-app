import React, { useState } from 'react';
import API from './api';

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      setMessage('Registration successful! You can now log in.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', color: '#fff' }}>
      <h2>Register for BookNest</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', background: '#2a2a2a', color: '#fff' }} />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', background: '#2a2a2a', color: '#fff' }} />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', background: '#2a2a2a', color: '#fff' }} />
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Register</button>
      </form>
      {message && <p style={{ marginTop: '15px', color: '#4dabf7' }}>{message}</p>}
      <button onClick={onSwitchToLogin} style={{ marginTop: '15px', background: 'none', border: 'none', color: '#4dabf7', cursor: 'pointer', textDecoration: 'underline' }}>
        Already have an account? Login here
      </button>
    </div>
  );
};

export default Register;