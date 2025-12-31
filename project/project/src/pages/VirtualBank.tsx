import React from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Building2,
  ArrowRightLeft,
  LineChart,
  ArrowRight,
  BookOpen,
  GraduationCap
} from 'lucide-react';

interface LearningModule {
  title: string;
  description: string;
  icon: JSX.Element;
  gradient: string;
  to: string;
  topics: string[];
}

const VirtualBank: React.FC = () => {
  const modules: LearningModule[] = [
    {
      title: 'Banking Basics',
      description: 'Learn the fundamentals of banking and financial services',
      icon: <Building2 className="w-6 h-6 text-white" />,
      gradient: 'from-blue-500 to-cyan-500',
      to: '/virtual-bank/accounts',
      topics: [
        'Types of Bank Accounts',
        'Banking Services Overview',
        'Digital Banking Features',
        'Account Security',
        'Banking Regulations'
      ]
    },
    {
      title: 'Cards & Payments',
      description: 'Master modern payment methods and card services',
      icon: <CreditCard className="w-6 h-6 text-white" />,
      gradient: 'from-purple-500 to-pink-500',
      to: '/virtual-bank/cards',
      topics: [
        'Credit vs Debit Cards',
        'Card Security Features',
        'Digital Wallets',
        'Contactless Payments',
        'International Transactions'
      ]
    },
    {
      title: 'Transactions',
      description: 'Understand different types of banking transactions',
      icon: <ArrowRightLeft className="w-6 h-6 text-white" />,
      gradient: 'from-green-500 to-emerald-500',
      to: '/virtual-bank/transactions',
      topics: [
        'Fund Transfers',
        'Bill Payments',
        'Standing Instructions',
        'Transaction Limits',
        'Payment Networks'
      ]
    },
    {
      title: 'Loans & Credit',
      description: 'Learn about various loan products and credit management',
      icon: <Building2 className="w-6 h-6 text-white" />,
      gradient: 'from-orange-500 to-red-500',
      to: '/virtual-bank/loans',
      topics: [
        'Personal Loans',
        'Home Loans',
        'Education Loans',
        'Credit Score',
        'EMI Calculation'
      ]
    },
    {
      title: 'Investments',
      description: 'Explore investment options and wealth management',
      icon: <LineChart className="w-6 h-6 text-white" />,
      gradient: 'from-blue-500 to-indigo-500',
      to: '/virtual-bank/investments',
      topics: [
        'Fixed Deposits',
        'Mutual Funds',
        'Stocks & Bonds',
        'Portfolio Management',
        'Risk Assessment'
      ]
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Virtual Bank
            </h1>
          </div>
          <p className="text-xl text-gray-400">
            Learn about modern banking concepts through our comprehensive educational modules.
            Master financial literacy with interactive lessons and practical examples.
          </p>
        </div>

        {/* Learning Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur border border-gray-700/50 p-6 hover:bg-gray-800/70 hover:border-gray-600 transition-all duration-300"
            >
              <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${module.gradient}`} />
              <div className="relative">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.gradient} flex items-center justify-center mb-4`}>
                  {module.icon}
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">{module.title}</h3>
                <p className="text-gray-400 mb-4">{module.description}</p>
                
                {/* Topics List */}
                <div className="space-y-2 mb-6">
                  {module.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">{topic}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={module.to}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualBank;
