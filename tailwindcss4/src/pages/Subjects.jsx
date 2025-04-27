// pages/Subjects.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';


export default function Subjects() {
  const subjects = [
    {
      category: "Math",
      topics: ["Algebra", "Geometry", "Calculus"],
      icon: "➗",
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
      hoverColor: "hover:bg-blue-50"
    },
    {
      category: "History",
      topics: ["Ancient", "Medieval", "Modern"],
      icon: "🏛️",
      color: "bg-amber-100",
      iconColor: "text-amber-600",
      borderColor: "border-amber-200",
      hoverColor: "hover:bg-amber-50"
    },
    {
      category: "Science",
      topics: ["Physics", "Chemistry", "Biology"],
      icon: "🔬",
      color: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
      hoverColor: "hover:bg-green-50"
    },
    {
      category: "Literature",
      topics: ["Poetry", "Prose", "Analysis"],
      icon: "📚",
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
      hoverColor: "hover:bg-purple-50"
    },
    {
      category: "Geography",
      topics: ["Physical", "Human", "Maps"],
      icon: "🌎",
      color: "bg-teal-100",
      iconColor: "text-teal-600",
      borderColor: "border-teal-200",
      hoverColor: "hover:bg-teal-50"
    },
    {
      category: "Languages",
      topics: ["Grammar", "Vocabulary", "Composition"],
      icon: "🗣️",
      color: "bg-red-100",
      iconColor: "text-red-600",
      borderColor: "border-red-200",
      hoverColor: "hover:bg-red-50"
    }
  ];

  return ( <div>      <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Subjects Covered</h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore our comprehensive range of subjects and topics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.category}
              className={`rounded-xl shadow-sm border ${subject.borderColor} overflow-hidden transition-all duration-300 ${subject.hoverColor}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className={`p-6 ${subject.color}`}>
                <div className="flex items-center">
                  <div className={`text-3xl ${subject.iconColor} mr-4`}>{subject.icon}</div>
                  <h2 className="text-xl font-semibold text-gray-900">{subject.category}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-2">
                  {subject.topics.map((topic) => (
                    <li key={topic} className="flex items-center">
                      <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {topic}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/tutor" 
                  state={{ subject: subject.category }}
                  className="mt-6 inline-flex items-center text-indigo-600 hover:text-indigo-700"
                >
                  Get help with {subject.category}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div></div>
  
    </div>
  );
}