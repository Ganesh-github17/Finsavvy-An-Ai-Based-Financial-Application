import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: Question[];
}

const quizzes: Quiz[] = [
  {
    id: 'q1',
    courseId: '1', // Financial Basics
    title: 'Understanding Money Quiz',
    description: 'Test your knowledge about the basics of money and its functions',
    questions: [
      {
        id: '1',
        question: 'What are the three main functions of money?',
        options: [
          'Medium of exchange, store of value, unit of account',
          'Saving, spending, investing',
          'Cash, credit, debit',
          'Gold, silver, copper'
        ],
        correctAnswer: 0
      },
      {
        id: '2',
        question: 'Which type of money is backed by government decree but not by physical commodities?',
        options: [
          'Commodity money',
          'Representative money',
          'Fiat money',
          'Digital money'
        ],
        correctAnswer: 2
      },
      {
        id: '3',
        question: 'What is the main advantage of digital money over physical cash?',
        options: [
          'It cannot be stolen',
          'It is more widely accepted',
          'It is easier to trace and transfer',
          'It has more value'
        ],
        correctAnswer: 2
      },
      {
        id: '4',
        question: 'Which of these is NOT a cryptocurrency?',
        options: [
          'Bitcoin',
          'Ethereum',
          'PayPal',
          'Dogecoin'
        ],
        correctAnswer: 2
      },
      {
        id: '5',
        question: 'What is inflation?',
        options: [
          'The increase in money supply',
          'The general rise in prices over time',
          'The value of foreign currency',
          'The interest rate set by banks'
        ],
        correctAnswer: 1
      },
      {
        id: '6',
        question: 'Which factor does NOT affect the value of money?',
        options: [
          'Supply and demand',
          'Weather conditions',
          'Interest rates',
          'Economic conditions'
        ],
        correctAnswer: 1
      },
      {
        id: '7',
        question: 'What is the main purpose of a central bank?',
        options: [
          'To make profits from banking',
          'To regulate the money supply and monetary policy',
          'To provide loans to individuals',
          'To store physical gold'
        ],
        correctAnswer: 1
      },
      {
        id: '8',
        question: 'Which of these is a characteristic of good money?',
        options: [
          'It should be rare and difficult to find',
          'It should be easy to counterfeit',
          'It should be durable and portable',
          'It should change value frequently'
        ],
        correctAnswer: 2
      },
      {
        id: '9',
        question: 'What is the barter system?',
        options: [
          'Using credit cards for transactions',
          'Direct exchange of goods and services',
          'Using digital currencies',
          'Modern banking system'
        ],
        correctAnswer: 1
      },
      {
        id: '10',
        question: 'Which statement about modern money is correct?',
        options: [
          'It must always be backed by gold',
          'It only exists in physical form',
          'It relies on trust and government backing',
          'It cannot be created digitally'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'q2',
    courseId: '2', // Investment Strategies
    title: 'Investment Basics Quiz',
    description: 'Test your knowledge about investment fundamentals',
    questions: [
      {
        id: '1',
        question: 'What is diversification in investing?',
        options: [
          'Buying only one type of investment',
          'Spreading investments across different assets',
          'Investing all money in stocks',
          'Keeping all money in a savings account'
        ],
        correctAnswer: 1
      },
      {
        id: '2',
        question: 'Which investment typically has the highest risk and potential return?',
        options: [
          'Government bonds',
          'Savings accounts',
          'Stocks',
          'Certificates of deposit'
        ],
        correctAnswer: 2
      },
      // Add more questions for Investment course
    ]
  }
];

const PracticeQuiz: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < (selectedQuiz?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    if (!selectedQuiz) return 0;
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === selectedQuiz.questions[index].correctAnswer
    );
    return (correctAnswers.length / selectedQuiz.questions.length) * 100;
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleBackToQuizzes}
            className="flex items-center text-blue-400 hover:text-blue-300 mb-6"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Quizzes
          </button>
          
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Quiz Results</h2>
            <div className="text-6xl font-bold text-blue-500 mb-6">
              {score.toFixed(0)}%
            </div>
            
            <div className="space-y-4">
              {selectedQuiz?.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="bg-gray-700/50 rounded-lg p-4 text-left"
                >
                  <div className="flex items-start gap-3">
                    {selectedAnswers[index] === question.correctAnswer ? (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <p className="text-white mb-2">{question.question}</p>
                      <p className="text-gray-400">
                        Your answer: {question.options[selectedAnswers[index]]}
                      </p>
                      {selectedAnswers[index] !== question.correctAnswer && (
                        <p className="text-green-500">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleBackToQuizzes}
              className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
            >
              Try Another Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedQuiz) {
    const question = selectedQuiz.questions[currentQuestion];
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleBackToQuizzes}
            className="flex items-center text-blue-400 hover:text-blue-300 mb-6"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Quizzes
          </button>
          
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">
                Question {currentQuestion + 1} of {selectedQuiz.questions.length}
              </h2>
              <div className="text-gray-400">
                {((currentQuestion + 1) / selectedQuiz.questions.length * 100).toFixed(0)}%
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl text-white mb-6">{question.question}</h3>
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    className={`w-full p-4 rounded-lg text-left transition-colors ${
                      selectedAnswers[currentQuestion] === index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  currentQuestion === 0
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-blue-400 hover:text-blue-300'
                }`}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>
              
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                  selectedAnswers[currentQuestion] === undefined
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {currentQuestion === selectedQuiz.questions.length - 1 ? (
                  'Finish Quiz'
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Practice Quizzes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">{quiz.title}</h2>
              <p className="text-gray-400 mb-4">{quiz.description}</p>
              <p className="text-gray-400 mb-6">{quiz.questions.length} questions</p>
              <button
                onClick={() => handleStartQuiz(quiz)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeQuiz;
