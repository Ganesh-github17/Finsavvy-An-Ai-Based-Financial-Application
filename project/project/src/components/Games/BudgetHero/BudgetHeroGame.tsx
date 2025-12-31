import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Shield, Target, Star, Trophy, ArrowRight } from 'lucide-react';

interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  isExpense: boolean;
}

const BudgetHeroGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [budget, setBudget] = useState(1000);
  const [transactions, setTransactions] = useState<BudgetItem[]>([]);
  const [showReward, setShowReward] = useState(false);

  const handleTransaction = (type: 'income' | 'expense') => {
    // Game logic here
    const newTransaction: BudgetItem = {
      id: Math.random().toString(),
      category: type === 'income' ? 'Salary' : 'Expense',
      amount: type === 'income' ? 500 : 300,
      isExpense: type === 'expense'
    };

    setTransactions([...transactions, newTransaction]);
    setBudget(prev => prev + (type === 'income' ? 500 : -300));
    setScore(prev => prev + 10);

    if (score > 0 && score % 100 === 0) {
      setShowReward(true);
      setLevel(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Game Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-xl border border-white/20">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl">
              <Shield className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-white/60">Level</p>
                <p className="text-2xl font-bold text-white">{level}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl">
              <Star className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-white/60">Score</p>
                <p className="text-2xl font-bold text-white">{score}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl">
              <Wallet className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-white/60">Budget</p>
                <p className="text-2xl font-bold text-white">${budget}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl">
              <Trophy className="w-8 h-8 text-amber-400" />
              <div>
                <p className="text-white/60">Rank</p>
                <p className="text-2xl font-bold text-white">Hero</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game Actions */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTransaction('income')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-3 hover:shadow-emerald-500/20 hover:shadow-2xl transition-shadow"
          >
            <ArrowRight className="w-6 h-6" />
            Earn Income
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTransaction('expense')}
            className="bg-gradient-to-r from-red-500 to-rose-600 p-6 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-3 hover:shadow-rose-500/20 hover:shadow-2xl transition-shadow"
          >
            <ArrowRight className="w-6 h-6" />
            Manage Expense
          </motion.button>
        </div>

        {/* Transaction History */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.map(transaction => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center justify-between p-4 rounded-xl ${transaction.isExpense ? 'bg-red-500/10' : 'bg-green-500/10'}`}
              >
                <div className="flex items-center gap-3">
                  {transaction.isExpense ? (
                    <Shield className="w-6 h-6 text-red-400" />
                  ) : (
                    <Wallet className="w-6 h-6 text-green-400" />
                  )}
                  <span className="text-white">{transaction.category}</span>
                </div>
                <span className={`font-bold ${transaction.isExpense ? 'text-red-400' : 'text-green-400'}`}>
                  {transaction.isExpense ? '-' : '+'}${transaction.amount}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Level Up Modal */}
        <AnimatePresence>
          {showReward && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={() => setShowReward(false)}
            >
              <div className="bg-gradient-to-br from-yellow-400 to-amber-600 p-8 rounded-2xl shadow-2xl text-center">
                <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Level Up!</h2>
                <p className="text-white/80 mb-6">You've reached Level {level}!</p>
                <button
                  onClick={() => setShowReward(false)}
                  className="bg-white text-amber-600 px-6 py-3 rounded-lg font-bold hover:bg-white/90 transition-colors"
                >
                  Continue Playing
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BudgetHeroGame;