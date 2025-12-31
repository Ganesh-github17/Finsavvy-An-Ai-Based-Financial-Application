import React from 'react';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { InvestmentGrowthChart, AssetAllocationChart, RiskReturnChart } from '../Charts/FinanceCharts';

interface LessonSection {
  title: string;
  content: string;
  completed: boolean;
  chart?: React.ReactNode;
}

const BankInvestments: React.FC = () => {
  const lessons: LessonSection[] = [
    {
      title: 'Investment Basics',
      content: `
        Understanding Investments:
        
        1. Types of Investments
        - Fixed Deposits
        - Mutual Funds
        - Stocks
        - Bonds
        - Government Securities
        
        2. Risk and Return
        - Risk assessment
        - Return expectations
        - Risk-return relationship
        - Portfolio diversification
        - Market volatility
        
        3. Investment Goals
        - Short-term goals
        - Long-term goals
        - Emergency funds
        - Retirement planning
        - Wealth creation
      `,
      completed: false,
      chart: <RiskReturnChart />
    },
    {
      title: 'Fixed Income Investments',
      content: `
        Secure Investment Options:
        
        1. Fixed Deposits
        - Interest rates
        - Tenure options
        - Premature withdrawal
        - Tax implications
        - Auto-renewal
        
        2. Government Bonds
        - Sovereign guarantee
        - Interest payment
        - Maturity period
        - Secondary market
        - Tax benefits
        
        3. Corporate Bonds
        - Credit rating
        - Yield calculation
        - Interest frequency
        - Market risks
        - Trading options
      `,
      completed: false,
      chart: <InvestmentGrowthChart />
    },
    {
      title: 'Market-Linked Investments',
      content: `
        Growth-Oriented Options:
        
        1. Mutual Funds
        - Fund types
        - NAV calculation
        - SIP investments
        - Fund management
        - Exit loads
        
        2. Stocks
        - Share trading
        - Market analysis
        - Price movements
        - Trading accounts
        - Dividend income
        
        3. Exchange Traded Funds
        - Index tracking
        - Trading flexibility
        - Cost efficiency
        - Portfolio exposure
        - Market liquidity
      `,
      completed: false,
      chart: <AssetAllocationChart />
    },
    {
      title: 'Investment Strategy',
      content: `
        Building Your Portfolio:
        
        1. Asset Allocation
        - Risk profile
        - Age consideration
        - Income level
        - Market conditions
        - Rebalancing
        
        2. Investment Planning
        - Financial goals
        - Time horizon
        - Regular monitoring
        - Performance review
        - Tax planning
        
        3. Market Analysis
        - Fundamental analysis
        - Technical analysis
        - Market timing
        - Economic indicators
        - Global factors
      `,
      completed: false,
      chart: <InvestmentGrowthChart />
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Investment Basics</h1>
          <p className="text-slate-400">Learn about different investment options and strategies</p>
        </motion.div>

        {/* Learning Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Your Progress</h2>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">0/4 Completed</span>
              <div className="w-32 h-2 bg-slate-700 rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-2 bg-green-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lesson Sections */}
        <div className="space-y-6">
          {lessons.map((lesson, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Start Learning
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
                <div className="prose prose-invert max-w-none mb-6">
                  <pre className="text-slate-300 whitespace-pre-wrap font-sans">{lesson.content}</pre>
                </div>
                {lesson.chart && (
                  <div className="mt-6 p-4 bg-slate-900/50 rounded-lg">
                    {lesson.chart}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quiz Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <p className="text-slate-400 mb-4">Complete all lessons to unlock the quiz and test your understanding of investments.</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-500/50 text-blue-200 rounded-lg px-4 py-2 cursor-not-allowed"
            disabled
          >
            Start Quiz
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default BankInvestments;
