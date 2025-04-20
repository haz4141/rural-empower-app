// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MainMenu from './pages/MainMenu';
import DigitalLearning from './pages/DigitalLearning';
import Assessment from './pages/Assessment';
import CommunityProjects from './pages/CommunityProjects';
import SpeedTest from './pages/SpeedTest';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/menu" element={<MainMenu />} />
          <Route path="/learn" element={<DigitalLearning />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/community" element={<CommunityProjects />} />
          <Route path="/speed" element={<SpeedTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
