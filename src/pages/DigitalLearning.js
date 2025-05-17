import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const topics = [
  {
    id: 1,
    title: '📱 Introduction to Smartphones',
    description: 'Learn the basic functions of a smartphone.',
    driveLink: 'https://drive.google.com/file/d/1DhjqUFQQsbk-GxC92aIWLdwOhA1pqfYs/view?usp=drive_link',
  },
  {
    id: 2,
    title: '🔒 Internet Safety',
    description: 'Stay safe online by learning best practices.',
    driveLink: 'https://drive.google.com/file/d/1boMLF22Hp65lJIH3LlhEObtcmK1GEcLr/view?usp=sharing',
  },
  {
    id: 3,
    title: '💬 Using Messaging Apps',
    description: 'Master WhatsApp, Telegram and more.',
    driveLink: 'https://drive.google.com/file/d/1eTuQSHmB8jU-AkR7msVLoCU0AFKJeeoJ/view?usp=sharing',
  },
];

function DigitalLearning() {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <div className="login-card" style={{ padding: '32px 24px' }}>
        <button
          onClick={() => navigate('/menu')}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#007aff',
            fontWeight: '600',
            fontSize: '14px',
            marginBottom: '20px',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          ← Back to Menu
        </button>

        <h1 className="text-2xl font-semibold mb-6 text-center">📘 Digital Skill Learning</h1>

        <div className="flex flex-col gap-4">
          {topics.map((topic) => (
            <div key={topic.id} className="learning-card">
              <h2>{topic.title}</h2>
              <p style={{ marginBottom: '12px' }}>{topic.description}</p>

              <button
                className="btn-primary"
                onClick={() => window.open(topic.driveLink, '_blank')}
              >
                🔗 Open via Google Drive
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DigitalLearning;
