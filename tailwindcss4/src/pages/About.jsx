// pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
export default function About() {
  const features = [
    {
      title: "AI-Powered Tutoring",
      description: "EduTutor uses advanced language models to provide accurate and helpful explanations on any academic subject.",
      icon: "🤖"
    },
    {
      title: "Multiple Input Methods",
      description: "Get answers through voice recognition, image uploads, or traditional text input - whichever is most convenient for you.",
      icon: "🎙️"
    },
    {
      title: "Subject Expertise",
      description: "From mathematics to literature, our platform covers a wide range of academic disciplines with specialized knowledge.",
      icon: "🧠"
    },
    {
      title: "24/7 Availability",
      description: "Learn on your schedule with round-the-clock access to educational assistance whenever inspiration strikes.",
      icon: "⏰"
    }
  ];

  return (<div>    
          <Navbar/>

    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">About EduTutor</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            EduTutor is built to assist students with personalized AI-powered answers via voice, image, or text. 
            It supports a wide variety of subjects and uses Groq's language model to generate intelligent, friendly responses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h2>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 bg-indigo-600 text-white">
            <h2 className="text-2xl font-bold">Our Mission</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed">
              At EduTutor, we believe that quality education should be accessible to everyone. Our mission is to leverage the latest advancements in artificial intelligence to create a learning companion that can assist students of all ages in their educational journey.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Whether you're struggling with a difficult concept, need help with homework, or are curious to learn something new, EduTutor is designed to provide clear, accurate, and helpful explanations tailored to your needs.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              We're constantly improving our platform based on user feedback and the latest developments in AI technology to ensure that EduTutor remains a valuable resource for learners everywhere.
            </p>
          </div>
        </div>
      </div>
    </div></div>
  );
}