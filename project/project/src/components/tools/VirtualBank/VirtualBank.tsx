import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  DollarSign,
  PiggyBank,
  ArrowRight,
  TrendingUp,
  Clock,
  Send,
  Plus,
  History,
  ChevronRight,
  Settings,
  Shield,
  BookOpen,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { toolCardStyle, buttonStyle } from '../../../styles/commonStyles';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  category: string;
  riskLevel?: 'low' | 'medium' | 'high';
  learningTip?: string;
}

interface Account {
  id: string;
  type: 'savings' | 'checking' | 'investment';
  balance: number;
  number: string;
  transactions: Transaction[];
}

const VirtualBank: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      type: 'checking',
      balance: 5000,
      number: '**** 1234',
      transactions: [
        {
          id: '1',
          type: 'credit',
          amount: 2500,
          description: 'Salary Deposit',
          date: '2025-02-09',
          category: 'Income',
          riskLevel: 'low',
          learningTip: 'Regular income deposits help build a stable financial foundation.'
        },
        {
          id: '2',
          type: 'debit',
          amount: 1000,
          description: 'Online Purchase',
          date: '2025-02-08',
          category: 'Shopping',
          riskLevel: 'medium',
          learningTip: 'Always verify the merchant and use secure payment methods for online transactions.'
        }
      ]
    }
  ]);

  const [showLearningTips, setShowLearningTips] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleNewTransaction = (type: 'credit' | 'debit') => {
    // Implement transaction logic with risk analysis
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      riskLevel: 'low',
      learningTip: 'New transaction - remember to categorize and verify the details.'
    };
    // Add transaction UI logic here
  };

  const getRiskBadge = (level: 'low' | 'medium' | 'high') => {
    const colors = {
      low: 'bg-green-500',
      medium: 'bg-yellow-500',
      high: 'bg-red-500'
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[level]} text-white`}>
        {level.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Virtual Bank Simulator</h2>
        <button
          onClick={() => setShowLearningTips(!showLearningTips)}
          className={`${buttonStyle} flex items-center gap-2`}
        >
          <BookOpen className="w-4 h-4" />
          {showLearningTips ? 'Hide Tips' : 'Show Tips'}
        </button>
      </div>

      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map(account => (
          <motion.div
            key={account.id}
            className={toolCardStyle}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white capitalize">
                {account.type} Account
              </h3>
              <PiggyBank className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-4">
              ${account.balance.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">
              Account Number: {account.number}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Transaction List with Learning Features */}
      <div className={`${toolCardStyle} mt-6`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Recent Transactions</h3>
          <div className="flex gap-2">
            <button
              onClick={() => handleNewTransaction('credit')}
              className={`${buttonStyle} bg-green-600`}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Credit
            </button>
            <button
              onClick={() => handleNewTransaction('debit')}
              className={`${buttonStyle} bg-red-600`}
            >
              <Send className="w-4 h-4 mr-2" /> Add Debit
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {accounts[0].transactions.map(transaction => (
            <motion.div
              key={transaction.id}
              className="bg-gray-700 rounded-lg p-4 cursor-pointer"
              onClick={() => setSelectedTransaction(transaction)}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-white font-medium">{transaction.description}</div>
                  <div className="text-gray-400 text-sm">{transaction.date}</div>
                </div>
                <div className="flex items-center gap-4">
                  {getRiskBadge(transaction.riskLevel!)}
                  <span className={`text-lg font-semibold ${
                    transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                  </span>
                </div>
              </div>
              {showLearningTips && transaction.learningTip && (
                <div className="mt-2 text-sm text-blue-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {transaction.learningTip}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Risk Analysis Dashboard */}
      <div className={`${toolCardStyle} mt-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">Risk Analysis & Learning</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-green-500 mb-2">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Safe Transactions</span>
            </div>
            <p className="text-sm text-gray-300">
              Learn about secure banking practices and transaction safety
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-500 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Risk Awareness</span>
            </div>
            <p className="text-sm text-gray-300">
              Identify potential risks in financial transactions
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-blue-500 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Financial Growth</span>
            </div>
            <p className="text-sm text-gray-300">
              Track your progress and learn from transaction patterns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualBank;
