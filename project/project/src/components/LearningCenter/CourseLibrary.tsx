import React, { useState } from 'react';
import { Book, CheckCircle, Lock, Clock, ChevronLeft } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  content: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: Module[];
  progress: number;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Financial Basics',
    description: 'Learn the fundamentals of personal finance and money management',
    level: 'Beginner',
    progress: 0,
    modules: [
      {
        id: 'm1',
        title: 'Understanding Money',
        description: 'Basic concepts of money and its role in the economy',
        lessons: [
          {
            id: 'l1',
            title: 'What is Money?',
            description: 'Introduction to the concept of money and its functions',
            duration: '15 mins',
            completed: false,
            content: `
# What is Money?

Money is a medium of exchange that serves three main functions:

1. **Medium of Exchange**
   - Money is used to facilitate trade and commerce
   - It eliminates the need for barter system
   - Makes transactions efficient and convenient

2. **Store of Value**
   - Money can be saved and used later
   - Maintains its value over time
   - Allows for future planning and investment

3. **Unit of Account**
   - Money measures the value of goods and services
   - Provides a common standard for comparison
   - Makes economic calculation possible

## History of Money

Money has evolved over time from:
- Commodity money (gold, silver)
- Representative money (paper backed by gold)
- Fiat money (government-issued currency)

## Modern Money
Today's money includes:
- Physical cash (coins and notes)
- Digital money (bank accounts, credit cards)
- Cryptocurrencies (Bitcoin, Ethereum)

## Key Takeaways
- Money is essential for modern economy
- It serves multiple functions
- Has evolved with technology and society
            `
          },
          {
            id: 'l2',
            title: 'Types of Money',
            description: 'Different forms of money and their characteristics',
            duration: '20 mins',
            completed: false,
            content: `
# Types of Money

## 1. Physical Money
- Cash (notes and coins)
- Advantages: tangible, widely accepted
- Disadvantages: can be lost, stolen

## 2. Digital Money
- Bank accounts
- Credit/debit cards
- Mobile payments
- Features: convenient, traceable

## 3. Cryptocurrency
- Bitcoin
- Ethereum
- Features: decentralized, blockchain-based

## 4. Electronic Money
- PayPal
- Digital wallets
- Features: fast transfers, online use
            `
          },
          {
            id: 'l3',
            title: 'Value of Money',
            description: 'Understanding purchasing power and inflation',
            duration: '25 mins',
            completed: false,
            content: `
# Value of Money

## Factors Affecting Value
1. Supply and Demand
2. Inflation
3. Interest Rates
4. Economic Conditions

## Time Value of Money
- Present Value
- Future Value
- Compound Interest

## Purchasing Power
- How much goods/services money can buy
- Impact of inflation
- Currency strength
            `
          },
          {
            id: 'l4',
            title: 'Money Management',
            description: 'Basic principles of managing personal finances',
            duration: '30 mins',
            completed: false,
            content: `
# Money Management

## Budgeting
- Tracking income and expenses
- Creating a budget plan
- Prioritizing needs over wants

## Saving
- Emergency fund
- Short-term savings
- Long-term investments

## Investing
- Stocks
- Bonds
- Mutual Funds
- Real Estate
            `
          },
          {
            id: 'l5',
            title: 'Digital Money',
            description: 'Introduction to digital currencies and online banking',
            duration: '20 mins',
            completed: false,
            content: `
# Digital Money

## Online Banking
- Features and benefits
- Security measures
- Mobile banking apps

## Digital Currencies
- Cryptocurrencies (Bitcoin, Ethereum)
- Central Bank Digital Currencies (CBDCs)
- Stablecoins
            `
          },
        ],
      },
      // Add more modules here
    ],
  },
  {
    id: '2',
    title: 'Investment Strategies',
    description: 'Learn how to invest wisely and build your portfolio',
    level: 'Intermediate',
    progress: 0,
    modules: [
      {
        id: 'm2',
        title: 'Investment Basics',
        description: 'Understanding different investment options',
        lessons: [
          {
            id: 'l6',
            title: 'What is Investing?',
            description: 'Basic concepts of investment and returns',
            duration: '20 mins',
            completed: false,
            content: `
# Introduction to Investing

## What is Investing?
Investing is the act of allocating resources (usually money) with the expectation of generating income or profit.

## Types of Investments
1. Stocks
2. Bonds
3. Real Estate
4. Mutual Funds
5. ETFs

## Investment Goals
- Long-term growth
- Regular income
- Capital preservation
            `
          },
          // Add more lessons
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Advanced Trading',
    description: 'Master advanced trading techniques and market analysis',
    level: 'Advanced',
    progress: 0,
    modules: [
      {
        id: 'm3',
        title: 'Technical Analysis',
        description: 'Advanced chart patterns and indicators',
        lessons: [
          {
            id: 'l7',
            title: 'Chart Patterns',
            description: 'Understanding complex chart patterns',
            duration: '30 mins',
            completed: false,
            content: `
# Technical Analysis: Chart Patterns

## Common Patterns
1. Head and Shoulders
2. Double Top/Bottom
3. Triangle Patterns
4. Flag Patterns

## Using Indicators
- Moving Averages
- RSI
- MACD
- Bollinger Bands
            `
          },
          // Add more lessons
        ],
      },
    ],
  },
];

const CourseLibrary: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-500';
      case 'Intermediate':
        return 'bg-yellow-500';
      case 'Advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleStartLearning = (course: Course) => {
    setSelectedCourse(course);
    setSelectedLesson(null);
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const handleBack = () => {
    if (selectedLesson) {
      setSelectedLesson(null);
    } else {
      setSelectedCourse(null);
    }
  };

  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center text-blue-400 hover:text-blue-300 mb-6"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Module
          </button>
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="prose prose-invert max-w-none">
              {selectedLesson.content.split('\n').map((line, index) => (
                <div key={index} className="mb-2">
                  {line.startsWith('#') ? (
                    <h1 className="text-2xl font-bold mb-4">{line.replace('# ', '')}</h1>
                  ) : line.startsWith('##') ? (
                    <h2 className="text-xl font-semibold mb-3 mt-6">{line.replace('## ', '')}</h2>
                  ) : line.startsWith('- ') ? (
                    <li className="ml-4">{line.replace('- ', '')}</li>
                  ) : line.trim() !== '' ? (
                    <p>{line}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center text-blue-400 hover:text-blue-300 mb-6"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Courses
          </button>
          
          {selectedCourse.modules.map((module) => (
            <div key={module.id} className="bg-gray-800 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">{module.title}</h2>
              <p className="text-gray-400 mb-6">{module.description}</p>
              
              <div className="space-y-4">
                {module.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson)}
                    className="w-full bg-gray-700/50 hover:bg-gray-700 rounded-lg p-4 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{lesson.title}</span>
                      <div className="flex items-center text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        {lesson.duration}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                course.level === 'Beginner' ? 'bg-green-500/20 text-green-500' :
                course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-500' :
                'bg-red-500/20 text-red-500'
              }`}>
                {course.level}
              </span>
              <span className="text-gray-400 text-sm">{course.modules.length} modules</span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">{course.title}</h2>
            <p className="text-gray-400 mb-4">{course.description}</p>
            
            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <div key={module.id} className="bg-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Book className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{module.description}</p>
                  <div className="space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {lesson.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Lock className="w-4 h-4 text-gray-500" />
                          )}
                          <span className="text-gray-300">{lesson.title}</span>
                        </div>
                        <span className="text-gray-500 text-sm">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => handleStartLearning(course)}
              className="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
            >
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseLibrary;
