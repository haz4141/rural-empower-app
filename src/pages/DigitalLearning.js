import React, { useEffect, useState } from 'react';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const topics = [
  {
    id: 1,
    title: '📱 Introduction to Smartphones',
    description: 'Learn the basic functions of a smartphone.',
    filename: 'smartphone_basics.pdf',
  },
  {
    id: 2,
    title: '🔒 Internet Safety',
    description: 'Stay safe online by learning best practices.',
    filename: 'internet_safety.pdf',
  },
  {
    id: 3,
    title: '💬 Using Messaging Apps',
    description: 'Master WhatsApp, Telegram and more.',
    filename: 'messaging_apps.pdf',
  },
];

function DigitalLearning() {
  const navigate = useNavigate();
  const [availableFiles, setAvailableFiles] = useState({});

  useEffect(() => {
    (async () => {
      const result = {};
      for (const topic of topics) {
        try {
          await Filesystem.stat({
            path: topic.filename,
            directory: Directory.Documents,
          });
          result[topic.filename] = true;
        } catch (e) {
          result[topic.filename] = false;
        }
      }
      setAvailableFiles(result);
    })();
  }, []);

  const copyFromAssets = async (filename) => {
    try {
      const response = await fetch(`/assets/pdfs/${filename}`);
      const blob = await response.blob();
      const base64 = await convertBlobToBase64(blob);

      await Filesystem.writeFile({
        path: filename,
        data: base64,
        directory: Directory.Documents,
      });

      alert(`✅ '${filename}' saved for offline use.`);
      setAvailableFiles((prev) => ({ ...prev, [filename]: true }));
    } catch (err) {
      console.error('Save failed:', err);
      alert('❌ Failed to save file for offline use.');
    }
  };

  const openPDF = async (filename) => {
    try {
      const uri = await Filesystem.getUri({
        directory: Directory.Documents,
        path: filename,
      });

      window.open(uri.uri, '_blank');
    } catch (err) {
      console.error('Open failed:', err);
      alert('❌ Failed to open PDF file.');
    }
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.readAsDataURL(blob);
    });
  };

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

              {availableFiles[topic.filename] ? (
                <button
                  className="btn-primary"
                  onClick={() => openPDF(topic.filename)}
                >
                  📂 Open Offline
                </button>
              ) : (
                <button
                  className="btn-primary"
                  onClick={() => copyFromAssets(topic.filename)}
                >
                  📥 Save for Offline Use
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DigitalLearning;
