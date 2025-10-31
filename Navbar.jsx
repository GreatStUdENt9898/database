import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
  return (
    <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-bold">SB Freelance</div>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/users" className="hover:underline">Users</Link>
          <Link to="/skills" className="hover:underline">Skills</Link>
          <Link to="/tasks" className="hover:underline">Tasks</Link>
          <Link to="/applications" className="hover:underline">Applications</Link>
          <Link to="/feedback" className="hover:underline">Feedback</Link>
        </div>
      </div>
    </nav>
  );
}
