import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

export default function MathPlayground() {
  // Game states
  const [currentGame, setCurrentGame] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);
  const [problem, setProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Game definitions
  const games = [
    { 
      id: 'speedMath', 
      name: 'Speed Math', 
      description: 'Solve as many math problems as you can before time runs out!',
      icon: '⚡'
    },
    { 
      id: 'mathMaster', 
      name: 'Math Master', 
      description: 'Test your skills with progressively harder challenges',
      icon: '🧠'
    },
    { 
      id: 'numberNinja', 
      name: 'Number Ninja', 
      description: 'Slice through equations with lightning speed',
      icon: '🥷'
    },
    { 
      id: 'algebraAdventure', 
      name: 'Algebra Adventure', 
      description: 'Solve for X in this exciting journey',
      icon: '🧮'
    },
  ];

  // Timer effect
  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
    
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // Start a new game
  const startGame = (gameId) => {
    setCurrentGame(gameId);
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(60);
    setStreak(0);
    setFeedback(null);
    generateProblem(gameId);
  };

  // End the current game
  const endGame = () => {
    setIsPlaying(false);
    if (score > highScore) {
      setHighScore(score);
    }
    setGameHistory(prev => [...prev, { 
      game: games.find(g => g.id === currentGame).name, 
      score, 
      date: new Date().toLocaleString() 
    }]);
  };

  // Generate a new math problem based on the current game and difficulty
  const generateProblem = (gameId) => {
    const gameProblem = gameId || currentGame;
    let newProblem = { question: '', answer: 0 };
    
    const difficultyFactors = {
      easy: { max: 10, operations: ['+', '-'] },
      medium: { max: 20, operations: ['+', '-', '*'] },
      hard: { max: 50, operations: ['+', '-', '*', '/'] }
    };
    
    const factor = difficultyFactors[difficulty];
    
    switch (gameProblem) {
      case 'speedMath':
        const num1 = Math.floor(Math.random() * factor.max) + 1;
        const num2 = Math.floor(Math.random() * factor.max) + 1;
        const operation = factor.operations[Math.floor(Math.random() * factor.operations.length)];
        
        switch (operation) {
          case '+':
            newProblem.question = `${num1} + ${num2} = ?`;
            newProblem.answer = num1 + num2;
            break;
          case '-':
            // Ensure no negative answers
            const [larger, smaller] = num1 >= num2 ? [num1, num2] : [num2, num1];
            newProblem.question = `${larger} - ${smaller} = ?`;
            newProblem.answer = larger - smaller;
            break;
          case '*':
            newProblem.question = `${num1} × ${num2} = ?`;
            newProblem.answer = num1 * num2;
            break;
          case '/':
            // Ensure we get whole number answers
            const divisor = Math.max(1, Math.floor(Math.random() * 10));
            const dividend = divisor * Math.floor(Math.random() * 10);
            newProblem.question = `${dividend} ÷ ${divisor} = ?`;
            newProblem.answer = dividend / divisor;
            break;
          default:
            break;
        }
        break;
      
      case 'mathMaster':
        // Similar to speedMath but with more complex operations based on current streak
        let complexity = Math.min(Math.floor(streak / 5), 2); // Increases complexity as streak grows
        const masterNum1 = Math.floor(Math.random() * (factor.max * (complexity + 1))) + 1;
        const masterNum2 = Math.floor(Math.random() * (factor.max * (complexity + 1))) + 1;
        
        if (streak > 10) {
          // For higher streaks, create more complex problems
          const masterNum3 = Math.floor(Math.random() * factor.max) + 1;
          newProblem.question = `${masterNum1} + ${masterNum2} × ${masterNum3} = ?`;
          newProblem.answer = masterNum1 + (masterNum2 * masterNum3);
        } else {
          newProblem.question = `${masterNum1} × ${masterNum2} = ?`;
          newProblem.answer = masterNum1 * masterNum2;
        }
        break;
      
      case 'numberNinja':
        // Missing number problems
        const ninjaNum1 = Math.floor(Math.random() * factor.max) + 1;
        const ninjaNum2 = Math.floor(Math.random() * factor.max) + 1;
        const ninjaResult = ninjaNum1 + ninjaNum2;
        
        // Randomly decide which number to hide
        const hidePosition = Math.floor(Math.random() * 3);
        
        if (hidePosition === 0) {
          newProblem.question = `? + ${ninjaNum2} = ${ninjaResult}`;
          newProblem.answer = ninjaNum1;
        } else if (hidePosition === 1) {
          newProblem.question = `${ninjaNum1} + ? = ${ninjaResult}`;
          newProblem.answer = ninjaNum2;
        } else {
          newProblem.question = `${ninjaNum1} + ${ninjaNum2} = ?`;
          newProblem.answer = ninjaResult;
        }
        break;
      
      case 'algebraAdventure':
        // Simple algebra problems
        const x = Math.floor(Math.random() * 10) + 1;
        const coefficient = Math.floor(Math.random() * 5) + 1;
        const constant = Math.floor(Math.random() * 20);
        
        newProblem.question = `${coefficient}x + ${constant} = ${coefficient * x + constant}, what is x?`;
        newProblem.answer = x;
        break;
        
      default:
        newProblem.question = '1 + 1 = ?';
        newProblem.answer = 2;
    }
    
    setProblem(newProblem);
    setUserAnswer('');
    setFeedback(null);
  };

  // Check the user's answer
  const checkAnswer = () => {
    const userGuess = parseFloat(userAnswer);
    
    if (isNaN(userGuess)) {
      setFeedback({ correct: false, message: 'Please enter a number' });
      return;
    }
    
    const isCorrect = userGuess === problem.answer;
    
    if (isCorrect) {
      setScore(prev => prev + (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3));
      setStreak(prev => prev + 1);
      setFeedback({ correct: true, message: 'Correct! +' + (difficulty === 'easy' ? '1' : difficulty === 'medium' ? '2' : '3') });
      
      // Add some time as bonus for correct answers
      setTimeLeft(prev => Math.min(prev + 2, 60));
      
      // Generate a new problem
      setTimeout(() => {
        generateProblem();
      }, 1000);
    } else {
      setStreak(0);
      setFeedback({ correct: false, message: `Wrong! The correct answer is ${problem.answer}` });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-50 to-indigo-100 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl font-bold text-center text-indigo-800 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🧮 Math Playground Arena
          </motion.h1>
          
          {!currentGame ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-6">Choose a Game</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {games.map(game => (
                  <motion.div
                    key={game.id}
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 cursor-pointer shadow hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => startGame(game.id)}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-3xl mr-2">{game.icon}</span>
                      <h3 className="text-xl font-bold text-indigo-700">{game.name}</h3>
                    </div>
                    <p className="text-gray-600">{game.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Game Settings</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Difficulty</label>
                    <div className="flex gap-2">
                      {['easy', 'medium', 'hard'].map(level => (
                        <button
                          key={level}
                          className={`px-4 py-2 rounded-md ${difficulty === level 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-gray-200 hover:bg-gray-300'}`}
                          onClick={() => setDifficulty(level)}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {gameHistory.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">Game History</h3>
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {gameHistory.slice(-5).reverse().map((record, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.game}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.score}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-indigo-700">
                    {games.find(g => g.id === currentGame).icon} {games.find(g => g.id === currentGame).name}
                  </h2>
                  <p className="text-gray-600">Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
                </div>
                
                <div className="flex space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Score</p>
                    <p className="text-2xl font-bold text-indigo-600">{score}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Time</p>
                    <p className={`text-2xl font-bold ${timeLeft < 10 ? 'text-red-600' : 'text-indigo-600'}`}>{timeLeft}s</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Streak</p>
                    <p className="text-2xl font-bold text-indigo-600">{streak}</p>
                  </div>
                </div>
              </div>
              
              {problem && (
                <div className="mb-8">
                  <div className="flex flex-col items-center justify-center">
                    <motion.div 
                      className="text-4xl font-bold text-center p-6 bg-indigo-50 rounded-xl shadow-sm w-full max-w-md"
                      key={problem.question}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {problem.question}
                    </motion.div>
                    
                    <div className="mt-6 w-full max-w-md">
                      <div className="flex rounded-md shadow-sm">
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                          className="flex-1 px-4 py-3 text-lg border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Your answer"
                          autoFocus
                        />
                        <button
                          onClick={checkAnswer}
                          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                    
                    {feedback && (
                      <motion.div
                        className={`mt-4 p-3 rounded-md text-white ${feedback.correct ? 'bg-green-500' : 'bg-red-500'}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {feedback.message}
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={endGame}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  End Game
                </button>
              </div>
              
              {!isPlaying && (
                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-bold text-indigo-700">Game Over!</h3>
                  <p className="text-xl mt-2">Your final score: {score}</p>
                  {score >= highScore && score > 0 && (
                    <p className="text-lg font-semibold text-green-600 mt-1">New High Score!</p>
                  )}
                  <div className="mt-6 space-x-4">
                    <button
                      onClick={() => startGame(currentGame)}
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Play Again
                    </button>
                    <button
                      onClick={() => setCurrentGame(null)}
                      className="px-6 py-2 bg-gray-200 hover:bg-gray-300 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Choose Another Game
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}