// src/pages/SignUp.js
import React, { useState } from 'react';
import AuthManager from '../classes/AuthManager';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const user = await AuthManager.signUp(email, password);
      setMessage(`Welcome, ${user.email}! Account created.`);
      navigate('/menu');
    } catch (error) {
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>✍️ Create Account</h2>

        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-primary">
            Create Account
          </button>
        </form>

        {message && (
          <p className="text-sm text-green-600 mt-4">{message}</p>
        )}

        <p className="signup">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#007aff',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              padding: 0,
            }}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

