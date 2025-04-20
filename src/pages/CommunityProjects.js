// src/pages/CommunityProjects.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function CommunityProjects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(fetched);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to post a project.');
      return;
    }

    await addDoc(collection(db, 'projects'), {
      title,
      desc,
      userEmail: user.email,
      createdAt: serverTimestamp()
    });

    setTitle('');
    setDesc('');
  };

  return (
    <div className="login-wrapper">
      <div className="login-card" style={{ padding: '32px 24px' }}>
        {/* 🔙 Back to Menu Button */}
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
            display: 'inline-block',
          }}
        >
          ← Back to Menu
        </button>

        <h1 className="text-2xl font-semibold mb-6 text-center">🏘️ Community Projects</h1>

        {/* 📤 Submit Project Form */}
        <form onSubmit={handleAddProject} style={{ marginBottom: '32px' }}>
          <div className="learning-card">
            <h2 className="mb-3">📤 Submit a New Project</h2>
            <input
              type="text"
              placeholder="Project Title"
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Project Description"
              className="textarea-field"
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ marginTop: '12px' }}
            >
              Post Project
            </button>
          </div>
        </form>

        {/* 📋 Display Projects */}
        <div className="flex flex-col gap-6">
          {projects.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">No community projects yet.</p>
          ) : (
            projects.map((proj) => (
              <div key={proj.id} className="learning-card">
                <h3 style={{ fontWeight: '600', marginBottom: '4px' }}>{proj.title}</h3>
                <p style={{ color: '#444', fontSize: '14px', marginBottom: '6px' }}>{proj.desc}</p>
                <p className="text-sm text-gray-500">
                  Posted by <span className="font-semibold">{proj.userEmail}</span> •{' '}
                  {proj.createdAt?.seconds
                    ? moment.unix(proj.createdAt.seconds).fromNow()
                    : 'Just now'}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunityProjects;
