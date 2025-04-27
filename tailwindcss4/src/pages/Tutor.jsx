import { motion } from 'framer-motion';
import VoiceInput from '../components/VoiceInput';
import ImageInput from '../components/ImageInput';
import { getAIResponse } from '../api/groq';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../components/Navbar';
import { useState } from 'react';

export default function Tutor() {
  const [chat, setChat] = useState([]);
  const [subject, setSubject] = useState('General');
  const [textInput, setTextInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranscript = async (text) => {
    const currentSubject = subject;
    const id = uuidv4();
    const prompt = `You are an expert tutor. 
Explain the following ${currentSubject} problem step-by-step in simple language.
Problem: ${text}`;

    const newEntry = {
      id,
      question: text,
      subject: currentSubject,
      answer: 'Thinking...',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChat((prev) => [...prev, newEntry]);
    setLoading(true);

    try {
      const aiResponse = await getAIResponse(prompt);

      setChat((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, answer: aiResponse } : entry
        )
      );
    } catch (error) {
      setChat((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, answer: "Sorry, I couldn't process that request. Please try again." } : entry
        )
      );
      console.error('AI Response Error:', error);
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (textInput.trim()) {
      handleTranscript(textInput);
      setTextInput('');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 pt-6 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-3xl font-bold text-center text-indigo-800 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            📚 Interactive Learning Assistant
          </motion.h1>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Subject and Input Controls */}
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              <div className="space-y-4">
                {/* Subject selector */}
                <div className="flex items-center">
                  <label className="font-medium text-gray-700 flex items-center">
                    <span className="mr-2">Subject:</span>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option value="General">General</option>
                      <option value="Math">Math</option>
                      <option value="History">History</option>
                      <option value="Science">Science</option>
                      <option value="Geography">Geography</option>
                      <option value="Literature">Literature</option>
                    </select>
                  </label>
                </div>

                {/* Input area with buttons */}
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Type your question here..."
                      className="flex-1 h-12 px-4 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="p-3 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                        title="Voice input"
                        onClick={() => {}}
                      >
                        <VoiceInput onTranscript={handleTranscript} />
                      </button>
                      
                      <button
                        type="button"
                        className="p-3 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                        title="Image input"
                        onClick={() => {}}
                      >
                        <ImageInput onExtractedText={handleTranscript} />
                      </button>
                      
                      <button
                        type="submit"
                        disabled={loading}
                        className="h-12 px-6 bg-indigo-600 text-white text-lg font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 transition-colors"
                      >
                        {loading ? 'Sending...' : 'Ask'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Chat Area */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Conversation</h2>

              <div className="space-y-4">
                {chat.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>Your conversation will appear here. Ask something to get started!</p>
                  </div>
                ) : (
                  chat.map((entry) => (
                    <motion.div
                      key={entry.id}
                      className="rounded-lg overflow-hidden border border-gray-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-4 bg-indigo-50">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start">
                            <div className="bg-indigo-100 rounded-full p-2 mr-3">
                              <span className="text-lg">👤</span>
                            </div>
                            <div>
                              <p className="font-medium">
                                You <span className="text-xs text-gray-500">({entry.subject})</span>
                              </p>
                              <p className="text-gray-800 mt-1">{entry.question}</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{entry.timestamp}</span>
                        </div>
                      </div>

                      <div className="p-4 bg-white">
                        <div className="flex items-start">
                          <div className="bg-indigo-600 rounded-full p-2 mr-3">
                            <span className="text-lg text-white">🤖</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">EduTutor</p>
                            <div className="text-gray-800 mt-1 prose prose-sm max-w-none">
                              {entry.answer === 'Thinking...' ? (
                                <div className="flex items-center space-x-2">
                                  <span>Thinking</span>
                                  <span className="animate-pulse">.</span>
                                  <span className="animate-pulse animation-delay-200">.</span>
                                  <span className="animate-pulse animation-delay-400">.</span>
                                </div>
                              ) : (
                                <div className="explanation space-y-2">
                                  <h2 className="font-bold text-indigo-700 mb-2">Step-by-Step Solution:</h2>
                                  {entry.answer.split('\n').map((line, index) => (
                                    line.trim().startsWith('**Step') ? (
                                      <h3 key={index} className="font-semibold text-indigo-600">{line.replace(/\*\*/g, '')}</h3>
                                    ) : (
                                      <p key={index}>{line}</p>
                                    )
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}