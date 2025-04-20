// src/pages/SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthManager from '../classes/AuthManager';
import '../styles.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const user = await AuthManager.signIn(email, password);
      setMessage(`Hello, ${user.email}!`);
      navigate('/menu');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* 🌿 App Title on top */}
        <h1 className="text-2xl font-semibold mb-4 text-center">
          🌿 Rural Empower App
        </h1>

        <h2>🔐 Log In</h2>

        <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="btn-primary">
            Log In
          </button>
        </form>

        {message && <p className="signup">{message}</p>}

        <p className="signup">
          Don't have an account?{' '}
          <span
            style={{ color: '#007aff', cursor: 'pointer' }}
            onClick={() => navigate('/signup')}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
