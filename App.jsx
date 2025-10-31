import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import Skills from './pages/Skills';
import Tasks from './pages/Tasks';
import Applications from './pages/Applications';
import Feedback from './pages/Feedback';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<div className="text-center py-10">Welcome to SB Freelance Dashboard</div>} />
          <Route path="/users" element={<Users />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </div>
  );
}
