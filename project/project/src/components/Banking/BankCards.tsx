import React from 'react';
import { BookOpen, CheckCircle, ArrowRight, CreditCard } from 'lucide-react';

interface LessonSection {
  title: string;
  content: string;
  completed: boolean;
}

const BankCards: React.FC = () => {
  const lessons: LessonSection[] = [
    {
      title: 'Understanding Bank Cards',
      content: `
        Types of Bank Cards:
        
        1. Debit Cards
        - Linked directly to your bank account
        - Spends money you already have
        - No interest charges
        - Daily spending limits
        - Instant deduction from account
        
        2. Credit Cards
        - Borrow money from the bank
        - Credit limit based on eligibility
        - Interest charges on unpaid balance
        - Grace period for payments
        - Builds credit history
        
        3. Prepaid Cards
        - Load money before use
        - No bank account needed
        - No credit check required
        - Limited to loaded amount
      `,
      completed: false
    },
    {
      title: 'Card Security & Protection',
      content: `
        Essential Security Practices:
        
        1. PIN Protection
        - Never share your PIN
        - Change PIN regularly
        - Avoid obvious numbers
        - Cover keypad while entering
        
        2. Online Safety
        - Use secure websites (https)
        - Enable 2-factor authentication
        - Monitor transactions
        - Set up alerts
        
        3. Physical Security
        - Keep cards safe
        - Report lost cards immediately
        - Don't share card details
        - Watch for skimming devices
      `,
      completed: false
    },
    {
      title: 'Digital Payments',
      content: `
        Modern Payment Methods:
        
        1. Contactless Payments
        - Tap and pay
        - Transaction limits
        - How it works
        - Security features
        
        2. Mobile Wallets
        - Digital card storage
        - NFC payments
        - QR code payments
        - In-app purchases
        
        3. UPI Payments
        - Instant transfers
        - QR code scanning
        - Virtual payment address
        - Transaction limits
      `,
      completed: false
    },
    {
      title: 'Credit Score & Management',
      content: `
        Building Good Credit:
        
        1. Credit Score Basics
        - What affects your score
        - How to check score
        - Improving credit score
        - Score range meaning
        
        2. Credit Card Management
        - Payment due dates
        - Minimum payments
        - Credit utilization
        - Interest calculation
        
        3. Responsible Usage
        - Budgeting with credit
        - Avoiding debt traps
        - Emergency fund importance
        - When to use credit
      `,
      completed: false
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Cards & Digital Payments</h1>
          <p className="text-slate-400">Learn about different types of cards and modern payment methods</p>
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
          <p className="text-slate-400 mb-4">Complete all lessons to unlock the quiz and test your understanding of banking cards and payments.</p>
          <button className="w-full bg-blue-500/50 text-blue-200 rounded-lg px-4 py-2 cursor-not-allowed" disabled>
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankCards;
