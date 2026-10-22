import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div style={{ background: '#121212', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {isRegistering ? (
        <Register onSwitchToLogin={() => setIsRegistering(false)} />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Login onLoginSuccess={handleLoginSuccess} />
          <button 
            onClick={() => setIsRegistering(true)} 
            style={{ background: 'none', border: 'none', color: '#4dabf7', cursor: 'pointer', textDecoration: 'underline', marginTop: '15px' }}
          >
            Need an account? Register here
          </button>
        </div>
      )}
    </div>
  );
}

export default App;