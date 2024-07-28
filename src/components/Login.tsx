import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface LoginProps {
  setToken: (token: string) => void;
  setUsername: (username: string) => void;
  setShowLogin: (show: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setToken, setUsername, setShowLogin }) => {
  const [username, setUsernameState] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error message
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, { username, password });
      setToken(response.data.token);
      setUsername(username);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.status === 400) {
        setError('Invalid username or password.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '300px', textAlign: 'center' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsernameState(e.target.value)}
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" style={{ display: 'block', width: '50%', margin: '0 auto', padding: '6px 0', fontSize: '16px' }}>Login</button>
        </form>
        <p style={{ marginTop: '10px' }}>
          Don't have an account?{' '}
          <button onClick={() => setShowLogin(false)} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>Register</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
