import React from 'react';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

interface LessonSection {
  title: string;
  content: string;
  completed: boolean;
}

const BankAccounts: React.FC = () => {
  const lessons: LessonSection[] = [
    {
      title: 'Types of Bank Accounts',
      content: `
        Learn about different types of bank accounts:
        
        1. Savings Account
        - Designed for personal savings
        - Earns interest on deposits
        - Limited transactions per month
        - Minimum balance requirements
        
        2. Current Account
        - Designed for businesses
        - No interest earnings
        - Unlimited transactions
        - Higher minimum balance
        
        3. Fixed Deposit Account
        - Higher interest rates
        - Fixed term investment
        - Penalty for early withdrawal
        
        4. Recurring Deposit Account
        - Regular monthly deposits
        - Fixed interest rate
        - Fixed term savings
      `,
      completed: false
    },
    {
      title: 'Account Features & Benefits',
      content: `
        Understanding key account features:
        
        1. Interest Rates
        - How banks calculate interest
        - Simple vs Compound interest
        - Annual Percentage Rate (APR)
        
        2. Banking Services
        - ATM/Debit cards
        - Online banking
        - Mobile banking
        - Cheque books
        
        3. Account Security
        - PIN and passwords
        - Two-factor authentication
        - Transaction alerts
      `,
      completed: false
    },
    {
      title: 'Managing Your Account',
      content: `
        Best practices for account management:
        
        1. Regular Monitoring
        - Check statements monthly
        - Track transactions
        - Monitor balance
        
        2. Maintaining Minimum Balance
        - Avoid penalties
        - Emergency fund
        - Budgeting basics
        
        3. Online Banking Safety
        - Secure passwords
        - Avoid public Wi-Fi
        - Regular updates
      `,
      completed: false
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Banking Basics</h1>
          <p className="text-slate-400">Learn about different types of bank accounts and how to manage them</p>
        </div>

        {/* Learning Progress */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Your Progress</h2>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">0/3 Completed</span>
              <div className="w-32 h-2 bg-slate-700 rounded-full">
                <div className="w-0 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Sections */}
        <div className="space-y-6">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">{lesson.title}</h3>
                  </div>
                  {lesson.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                      Start Learning
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="prose prose-invert max-w-none">
                  <pre className="text-slate-300 whitespace-pre-wrap font-sans">{lesson.content}</pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quiz Section */}
        <div className="mt-8 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <p className="text-slate-400 mb-4">Complete all lessons to unlock the quiz and test your understanding of banking basics.</p>
          <button className="w-full bg-blue-500/50 text-blue-200 rounded-lg px-4 py-2 cursor-not-allowed" disabled>
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankAccounts;
