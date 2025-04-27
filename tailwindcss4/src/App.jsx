// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Tutor from './pages/Tutor';
import Subjects from './pages/Subjects';
import './index.css';
import MathPlayground from './pages/MathPlayground'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/quiz" element={<MathPlayground />} />  
      </Routes>
    </Router>
  );
}

export default App;
