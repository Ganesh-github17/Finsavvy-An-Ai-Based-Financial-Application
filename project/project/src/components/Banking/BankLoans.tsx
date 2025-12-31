import React from 'react';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

interface LessonSection {
  title: string;
  content: string;
  completed: boolean;
}

const BankLoans: React.FC = () => {
  const lessons: LessonSection[] = [
    {
      title: 'Types of Loans',
      content: `
        Common Loan Types:
        
        1. Personal Loans
        - Unsecured loans
        - Fixed interest rates
        - Flexible use
        - Quick processing
        - Credit score impact
        
        2. Home Loans
        - Property as collateral
        - Long repayment terms
        - Lower interest rates
        - Tax benefits
        - Property insurance
        
        3. Education Loans
        - Study financing
        - Moratorium period
        - Collateral requirements
        - Interest subsidies
        - Repayment flexibility
        
        4. Vehicle Loans
        - Auto financing
        - Vehicle as security
        - Fixed tenure
        - Down payment
        - Insurance requirements
      `,
      completed: false
    },
    {
      title: 'Loan Application Process',
      content: `
        Steps to Apply for a Loan:
        
        1. Pre-Application
        - Credit score check
        - Document preparation
        - Loan comparison
        - Eligibility check
        - Budget planning
        
        2. Application
        - Form filling
        - Document submission
        - Income proof
        - Address verification
        - Identity verification
        
        3. Processing
        - Application review
        - Credit assessment
        - Property valuation
        - Loan approval
        - Disbursement
      `,
      completed: false
    },
    {
      title: 'Interest & EMI',
      content: `
        Understanding Loan Costs:
        
        1. Interest Types
        - Fixed interest
        - Floating interest
        - Base rate
        - Interest calculation
        - Annual percentage rate
        
        2. EMI Calculation
        - Principal amount
        - Interest rate
        - Loan tenure
        - Monthly payments
        - Prepayment options
        
        3. Additional Costs
        - Processing fees
        - Insurance premiums
        - Documentation charges
        - Late payment fees
        - Foreclosure charges
      `,
      completed: false
    },
    {
      title: 'Loan Management',
      content: `
        Managing Your Loan:
        
        1. Repayment
        - EMI payment
        - Payment modes
        - Auto-debit setup
        - Payment tracking
        - Default consequences
        
        2. Documentation
        - Loan agreement
        - Payment receipts
        - Interest certificates
        - Account statements
        - Closure documents
        
        3. Special Features
        - Balance transfer
        - Top-up loans
        - EMI holiday
        - Part prepayment
        - Foreclosure
      `,
      completed: false
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Loans & Borrowing</h1>
          <p className="text-slate-400">Learn about different types of loans and borrowing options</p>
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
          <p className="text-slate-400 mb-4">Complete all lessons to unlock the quiz and test your understanding of loans and borrowing.</p>
          <button className="w-full bg-blue-500/50 text-blue-200 rounded-lg px-4 py-2 cursor-not-allowed" disabled>
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankLoans;
