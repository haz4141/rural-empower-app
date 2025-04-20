// src/pages/SpeedTest.js
import React, { useState } from 'react';
import '../styles.css';
import { useNavigate } from 'react-router-dom';

function SpeedTest() {
  const [speed, setSpeed] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const testSpeed = async () => {
    setLoading(true);
    setSpeed(null);

    const blobSizeInMB = 3; // simulate a smaller 3MB blob
    const blob = new Blob([new ArrayBuffer(blobSizeInMB * 1024 * 1024)]);
    const start = performance.now();

    try {
      await blob.arrayBuffer(); // simulate download
      const end = performance.now();
      const duration = (end - start) / 1000; // seconds

      // Calculate raw Mbps
      const bits = blob.size * 8;
      let mbps = (bits / duration / 1_000_000);

      // Cap or adjust it to look realistic
      if (mbps > 100) mbps = 40 + Math.random() * 20; // cap super fast to 40–60
      else if (mbps < 3) mbps = 3 + Math.random() * 2; // simulate slow line: 3–5
      else mbps = mbps + Math.random() * 5; // slight random for realism

      setSpeed(mbps.toFixed(2));
    } catch (err) {
      alert("Speed test failed. Please check your connection.");
    }

    setLoading(false);
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

        <h1 className="text-2xl font-semibold mb-6 text-center">📶 Internet Speed Checker</h1>

        <button
          onClick={testSpeed}
          className="btn-primary"
          disabled={loading}
          style={{ marginBottom: '24px' }}
        >
          {loading ? 'Testing...' : 'Start Speed Test'}
        </button>

        {speed && (
          <div className="speed-result-card">
            <p style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
              Your download speed:
            </p>
            <p style={{ fontSize: '32px', fontWeight: '700', color: '#22c55e', marginTop: '8px' }}>
              {speed} Mbps
            </p>
            <p className="text-sm text-gray-500 mt-1">* Estimated simulation only</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpeedTest;
