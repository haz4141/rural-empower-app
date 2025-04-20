// src/pages/MainMenu.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import '../styles.css';

const MainMenu = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      alert('Failed to sign out.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          🌿 Rural Empower App
        </h1>

        <div className="flex flex-col gap-4">
          <button onClick={() => navigate("/learn")} className="menu-button">
            <h2>📘 Digital Skill Learning</h2>
            <p>Learn how to use apps, internet tools, and more.</p>
          </button>

          <button onClick={() => navigate("/assessment")} className="menu-button">
            <h2>🧪 Digital Literacy Assessment</h2>
            <p>Take quizzes and upload digital tasks.</p>
          </button>

          <button onClick={() => navigate("/community")} className="menu-button">
            <h2>🏘️ Community Projects</h2>
            <p>View and post about rural development efforts.</p>
          </button>

          <button onClick={() => navigate("/speed")} className="menu-button">
            <h2>📶 Internet Speed Checker</h2>
            <p>Test internet speed in your area.</p>
          </button>
        </div>

        {/* 🔒 Sign Out button */}
        <button onClick={handleSignOut} className="signout-button">
          🚪 Sign Out
        </button>

        <p className="text-sm text-gray-500 mt-6">
          Empowering Rural Communities 🚀
        </p>
      </div>
    </div>
  );
};

export default MainMenu;
