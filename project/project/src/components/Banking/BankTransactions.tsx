import React from 'react';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

interface LessonSection {
  title: string;
  content: string;
  completed: boolean;
}

const BankTransactions: React.FC = () => {
  const lessons: LessonSection[] = [
    {
      title: 'Understanding Bank Transactions',
      content: `
        Types of Bank Transactions:
        
        1. Deposits
        - Cash deposits
        - Check deposits
        - Direct deposits
        - Wire transfers
        - Mobile deposits
        
        2. Withdrawals
        - ATM withdrawals
        - Cash withdrawals
        - Bank drafts
        - Electronic transfers
        - Standing instructions
        
        3. Fund Transfers
        - NEFT/RTGS/IMPS
        - UPI transfers
        - International transfers
        - Recurring transfers
      `,
      completed: false
    },
    {
      title: 'Transaction Security',
      content: `
        Keeping Your Transactions Safe:
        
        1. Authentication Methods
        - Two-factor authentication
        - OTP verification
        - Biometric security
        - Transaction passwords
        
        2. Monitoring
        - Regular statement checks
        - Transaction alerts
        - Suspicious activity
        - Fraud detection
        
        3. Best Practices
        - Secure networks only
        - Verify recipients
        - Keep records
        - Report issues promptly
      `,
      completed: false
    },
    {
      title: 'Digital Banking',
      content: `
        Modern Banking Features:
        
        1. Mobile Banking
        - App-based banking
        - Quick transfers
        - Bill payments
        - Account management
        
        2. Internet Banking
        - Online transactions
        - Account statements
        - Service requests
        - Investment options
        
        3. Payment Apps
        - UPI apps
        - Mobile wallets
        - QR payments
        - Merchant payments
      `,
      completed: false
    },
    {
      title: 'Transaction Records',
      content: `
        Managing Financial Records:
        
        1. Bank Statements
        - Reading statements
        - Transaction codes
        - Balance calculation
        - Statement periods
        
        2. Record Keeping
        - Important documents
        - Digital records
        - Receipt management
        - Tax purposes
        
        3. Dispute Resolution
        - Transaction disputes
        - Chargeback process
        - Time limits
        - Required documents
      `,
      completed: false
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Banking Transactions</h1>
          <p className="text-slate-400">Learn about different types of banking transactions and how to manage them</p>
        </div>

        {/* Learning Progress */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Your Progress</h2>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">0/4 Completed</span>
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
          <p className="text-slate-400 mb-4">Complete all lessons to unlock the quiz and test your understanding of banking transactions.</p>
          <button className="w-full bg-blue-500/50 text-blue-200 rounded-lg px-4 py-2 cursor-not-allowed" disabled>
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankTransactions;
