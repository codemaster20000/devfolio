// pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
export default function Home() {
  const features = [
    {
      title: "Voice Recognition",
      description: "Ask questions naturally using your voice",
      icon: "🎙️"
    },
    {
      title: "Image Processing",
      description: "Upload images of problems for instant solutions",
      icon: "📷"
    },
    {
      title: "Multiple Subjects",
      description: "Get help with Math, Science, History and more",
      icon: "📚"
    },
    {
      title: "AI-Powered",
      description: "Get intelligent answers using advanced language models",
      icon: "🤖"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <Navbar />
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            Your Personal <span className="text-indigo-600">AI Tutor</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto">
            Get answers to your academic questions instantly using voice, text, or images.
            EduTutor is your intelligent learning companion for any subject.
          </p>
          <div className="mt-10 flex justify-center">
            <Link to="/tutor" className="px-8 py-3 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 shadow-md transition duration-300">
              Try Tutor Now
            </Link>
            <Link to="/subjects" className="ml-4 px-8 py-3 text-base font-medium rounded-md text-indigo-600 bg-white border border-indigo-600 hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 shadow-md transition duration-300">
              Explore Subjects
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">How EduTutor Helps You Learn</h2>
            <p className="mt-4 text-lg text-gray-500">
              Powerful tools and features designed to make learning easier and more accessible.
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-indigo-50 rounded-lg p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Ready to boost your learning?
            </h2>
            <p className="mt-3 max-w-md text-lg text-indigo-200">
              Start using EduTutor today and experience the future of education.
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <Link to="/tutor" className="px-5 py-3 rounded-md shadow bg-white text-indigo-600 font-medium hover:bg-indigo-50 transition duration-300">
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}