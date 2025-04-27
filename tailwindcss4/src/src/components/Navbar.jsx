// components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-500';
  };
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">Edu</span>
              <span className="text-2xl font-bold text-gray-700">Tutor</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link to="/" className={`flex items-center px-2 py-2 text-sm font-medium ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/tutor" className={`flex items-center px-2 py-2 text-sm font-medium ${isActive('/tutor')}`}>
              Tutor
            </Link>
            <Link to="/subjects" className={`flex items-center px-2 py-2 text-sm font-medium ${isActive('/subjects')}`}>
              Subjects
            </Link>
            <Link to="/about" className={`flex items-center px-2 py-2 text-sm font-medium ${isActive('/about')}`}>
              About
            </Link>
            <Link to="/contact" className={`flex items-center px-2 py-2 text-sm font-medium ${isActive('/contact')}`}>
              Contact
            </Link>
            <Link to="/Quiz" className={`flex items-center px-2 py-2 text-sm font-medium ${isActive('/Quiz')}`}>
            Quiz
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}