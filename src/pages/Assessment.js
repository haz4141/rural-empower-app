// src/pages/Assessment.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import '../styles.css';

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is a secure way to protect your online account?",
    options: [
      "Use the same password everywhere",
      "Share your password with friends",
      "Use a strong, unique password",
      "Use your birthdate as a password"
    ],
    answer: 2
  },
  {
    id: 2,
    question: "What does the 'Reply All' button do in email?",
    options: [
      "Replies only to the sender",
      "Deletes the email",
      "Sends your reply to everyone in the email thread",
      "Marks it as spam"
    ],
    answer: 2
  }
];

function Assessment() {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const navigate = useNavigate();

  const handleOptionChange = (questionId, selectedOptionIndex) => {
    if (!submitted) {
      setUserAnswers({ ...userAnswers, [questionId]: selectedOptionIndex });
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.answer) {
        score++;
      }
    });
    return score;
  };

  const generateCertificate = () => {
    const score = calculateScore();
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [600, 400],
    });

    doc.setDrawColor(180);
    doc.setLineWidth(4);
    doc.rect(20, 20, 560, 360);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.text("Certificate of Completion", 300, 80, { align: "center" });

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text("This certificate is proudly presented to", 300, 120, { align: "center" });

    doc.setFontSize(22);
    doc.setFont('times', 'italic');
    doc.text("Participant", 300, 155, { align: "center" });

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text("For successfully passing the Digital Literacy Assessment", 300, 190, { align: "center" });
    doc.text(`Score: ${score} / ${quizQuestions.length}`, 300, 215, { align: "center" });

    const today = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(`Issued by: Rural Empower App`, 60, 320);
    doc.text(`Date: ${today}`, 60, 340);

    doc.setLineWidth(0.5);
    doc.line(440, 310, 560, 310);
    doc.text("Authorized Signature", 500, 325, { align: "center" });

    doc.save("Digital-Certificate.pdf");
    alert("📄 Certificate downloaded to your device.");
  };

  const score = calculateScore();
  const showBadge = score >= quizQuestions.length * 0.8;

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <button onClick={() => navigate('/menu')} style={{
          background: 'transparent',
          border: 'none',
          color: '#007aff',
          fontWeight: '600',
          fontSize: '14px',
          marginBottom: '20px',
          cursor: 'pointer',
          textAlign: 'left'
        }}>
          ← Back to Menu
        </button>

        <h2 style={{ marginBottom: '24px' }}>🧪 Digital Literacy Quiz</h2>

        {quizQuestions.map((q) => (
          <div key={q.id} style={{ marginBottom: '24px', textAlign: 'left' }}>
            <p style={{ fontWeight: '700', fontSize: '17px', marginBottom: '10px' }}>{q.question}</p>
            {q.options.map((option, idx) => (
              <div
                key={idx}
                className={`quiz-option ${userAnswers[q.id] === idx ? 'selected' : ''}`}
                onClick={() => handleOptionChange(q.id, idx)}
                style={{ pointerEvents: submitted ? 'none' : 'auto', opacity: submitted ? 0.7 : 1 }}
              >
                {option}
              </div>
            ))}
          </div>
        ))}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="btn-primary"
            style={{ marginTop: '10px' }}
          >
            Submit Quiz
          </button>
        ) : (
          <>
            <p className="signup" style={{ marginTop: '20px', fontWeight: 'bold' }}>
              Your score: {score} / {quizQuestions.length}
            </p>

            {showBadge && (
              <>
                <div
                  style={{
                    background: '#fffbe6',
                    border: '1px solid #ffe58f',
                    padding: '12px',
                    borderRadius: '12px',
                    marginTop: '16px'
                  }}
                >
                  <p style={{ color: '#ad6800', fontWeight: '600' }}>🏅 Congratulations!</p>
                  <p>You passed and earned a Digital Badge!</p>
                </div>

                <button
                  onClick={generateCertificate}
                  className="btn-primary"
                  style={{ marginTop: '20px' }}
                >
                  📄 Download Certificate
                </button>
              </>
            )}

            <div style={{ marginTop: '30px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>
                📤 Upload your digital task screenshot
              </h3>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setScreenshot(e.target.files[0]);
                  setUploadStatus(null);
                }}
              />

              {screenshot && (
                <>
                  <p className="signup" style={{ marginTop: '10px', color: 'green' }}>
                    ✅ File selected: {screenshot.name}
                  </p>

                  <button
                    className="btn-primary"
                    style={{ marginTop: '12px' }}
                    onClick={() => {
                      setUploadStatus('uploading');
                      setTimeout(() => {
                        setUploadStatus('success');
                      }, 1500);
                    }}
                  >
                    Submit to Teacher
                  </button>
                </>
              )}

              {uploadStatus === 'uploading' && (
                <p className="signup" style={{ color: '#007aff', marginTop: '12px' }}>
                  ⏳ Uploading file to the teacher...
                </p>
              )}

              {uploadStatus === 'success' && (
                <p className="signup" style={{ color: 'green', marginTop: '12px' }}>
                  ✅ File successfully submitted to the teacher. (Simulated)
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Assessment;
