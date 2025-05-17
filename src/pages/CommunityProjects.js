// src/pages/CommunityProjects.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  getDocs
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
  const [editingProject, setEditingProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
          const fetched = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setProjects(fetched);
        });
        return unsubscribeFirestore;
      } else {
        setProjects([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to post a project.');
      return;
    }

    if (editingProject) {
      const projectDoc = doc(db, 'projects', editingProject.id);
      await updateDoc(projectDoc, { title, desc });
    } else {
      await addDoc(collection(db, 'projects'), {
        title,
        desc,
        userEmail: user.email,
        createdAt: serverTimestamp()
      });
    }

    setTitle('');
    setDesc('');
    setEditingProject(null);
  };

  const handleEditProject = (proj) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setDesc(proj.desc || proj.description);
  };

  const handleDeleteProject = async (proj) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${proj.title}"?`);
    if (!confirmDelete) return;

    try {
      const projectDocRef = doc(db, 'projects', proj.id);
      await deleteDoc(projectDocRef);

      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(fetched);
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project.');
    }
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
            display: 'inline-block',
          }}
        >
          ← Back to Menu
        </button>

        <h1 className="text-2xl font-semibold mb-6 text-center">🏘️ Community Projects</h1>

        <form onSubmit={handleAddProject} style={{ marginBottom: '32px' }}>
          <div className="learning-card">
            <h2 className="mb-3">📤 {editingProject ? "Edit Project" : "Submit a New Project"}</h2>
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
            <button type="submit" className="btn-primary" style={{ marginTop: '12px' }}>
              {editingProject ? "Update Project" : "Post Project"}
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-6">
          {projects.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">No community projects yet.</p>
          ) : (
            projects.map((proj) => (
              <div key={proj.id} className="learning-card">
                <h3 style={{ fontWeight: '600', marginBottom: '4px' }}>{proj.title}</h3>
                <p style={{ color: '#444', fontSize: '14px', marginBottom: '6px' }}>
                  {proj.desc || proj.description}
                </p>
                {proj.userEmail && (
                  <p className="text-sm text-gray-500 mb-2">
                    Posted by <span className="font-semibold">{proj.userEmail}</span> •{' '}
                    {proj.createdAt?.seconds
                      ? moment.unix(proj.createdAt.seconds).fromNow()
                      : 'Just now'}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleEditProject(proj)}
                    style={{
                      background: '#ffe58f',
                      color: '#ad6800',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '14px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(proj)}
                    style={{
                      background: '#ffccc7',
                      color: '#cf1322',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '14px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunityProjects;
