import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface RegisterProps {
  setShowLogin: (show: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setShowLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/users/register`, { username, password });
      alert('User registered successfully');
      setShowLogin(true); // Automatically navigate to login after registration
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '300px', textAlign: 'center' }}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ display: 'block', width: '100%', height: '16px', marginBottom: '20px', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ display: 'block', width: '100%', height: '16px', marginBottom: '20px', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ display: 'block', width: '100%', height: '16px', marginBottom: '20px', padding: '8px' }}
            />
          </div>
          <button type="submit" style={{ display: 'block', width: '50%', margin: '0 auto', padding: '6px 0', fontSize: '16px' }}>Register</button>
        </form>
        <p style={{ marginTop: '10px' }}>
          Already have an account?{' '}
          <button onClick={() => setShowLogin(true)} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
