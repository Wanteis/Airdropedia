import React, { useState } from 'react';

const QUESTIONS = [
  {
    question: 'What is a blockchain?',
    options: [
      'A programming language used for cryptocurrency development',
      'A distributed digital ledger that records transactions',
      'A type of cryptocurrency wallet',
      'An algorithm for encrypting private keys',
    ],
    answer: 1,
  },
  {
    question: 'Which of the following is considered the first cryptocurrency?',
    options: [
      'Ethereum',
      'Litecoin',
      'Bitcoin',
      'Ripple',
    ],
    answer: 2,
  },
  {
    question: 'What is the primary purpose of a "private key" in cryptocurrency?',
    options: [
      'To create new coins',
      'To verify transactions publicly',
      'To access and control your crypto assets',
      'To display your wallet address',
    ],
    answer: 2,
  },
  {
    question: 'Which mechanism is used by Bitcoin to reach consensus across the network?',
    options: [
      'Proof of Stake (PoS)',
      'Proof of Work (PoW)',
      'Delegated Proof of Stake (DPoS)',
      'Byzantine Fault Tolerance (BFT)',
    ],
    answer: 1,
  },
  {
    question: 'What is a "smart contract"?',
    options: [
      'A cryptocurrency trading strategy',
      'A legal agreement written on paper',
      'A self-executing contract with the terms directly written into code',
      'A type of blockchain used only for NFTs',
    ],
    answer: 2,
  },
];

const Quizzes = () => {
  const [current, setCurrent] = useState(0); // Current question index
  const [selected, setSelected] = useState(null); // Selected option for current
  const [showResult, setShowResult] = useState(false);
  const [correctSoFar, setCorrectSoFar] = useState([]); // Store correct answers for each question
  const [error, setError] = useState(false);

  const handleOption = (optIdx) => {
    setSelected(optIdx);
    setError(false);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (selected === QUESTIONS[current].answer) {
      setCorrectSoFar([...correctSoFar, true]);
      setSelected(null);
      setError(false);
      if (current === QUESTIONS.length - 1) {
        setShowResult(true);
      } else {
        setCurrent(current + 1);
      }
    } else {
      setError(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setCorrectSoFar([]);
    setError(false);
  };

  return (
    <div className="bg-[#181f33] p-6 rounded-xl shadow-lg max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-[#8bb6f9]">Today's Quiz</h2>
      {showResult ? (
        <div className="text-green-400 text-lg font-semibold text-center">
          🎉 Congratulations! You answered all questions correctly!
        </div>
      ) : (
        <form onSubmit={handleNext}>
          <div className="mb-6">
            <div className="font-semibold text-[#b4bcd0] mb-2">
              {current + 1}. {QUESTIONS[current].question}
            </div>
            <div className="grid grid-cols-1 gap-2">
              {QUESTIONS[current].options.map((opt, optIdx) => (
                <label key={optIdx} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors
                  ${selected === optIdx ? 'bg-[#8bb6f9] text-[#181f33] font-bold' : 'bg-[#232b47] text-[#b4bcd0]'}`}
                >
                  <input
                    type="radio"
                    name={`q${current}`}
                    checked={selected === optIdx}
                    onChange={() => handleOption(optIdx)}
                    className="accent-[#8bb6f9]"
                  />
                  <span>{String.fromCharCode(65 + optIdx)}) {opt}</span>
                </label>
              ))}
            </div>
            {error && (
              <div className="text-red-400 mt-2 font-semibold">Incorrect! Please try again.</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#8bb6f9] text-[#181f33] px-4 py-2 rounded-lg font-bold hover:bg-[#2979f3] mt-2"
            disabled={selected === null}
          >
            {current === QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </form>
      )}
      {showResult && (
        <button
          className="block mt-6 mx-auto bg-[#8bb6f9] text-[#181f33] px-4 py-2 rounded-lg font-bold hover:bg-[#2979f3]"
          onClick={handleRestart}
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default Quizzes;
