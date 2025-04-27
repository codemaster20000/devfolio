import React, { useState, useRef } from 'react';
import { Mic, Square } from 'lucide-react'; // Importing icons

const VoiceInput = ({ onTranscript }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    if (!recognitionRef.current) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setListening(false);
      };
    }

    if (!listening) {
      recognitionRef.current.start();
      setListening(true);
    } else {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  return (
    <div>
      <button onClick={toggleListening} className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white">
        {listening ? <Square size={28} /> : <Mic size={28} />}
      </button>
    </div>
  );
};

export default VoiceInput;
