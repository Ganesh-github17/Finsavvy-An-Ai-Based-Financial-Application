import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Umbrella, DollarSign, PlusCircle, MinusCircle, AlertTriangle, Target, Wallet } from 'lucide-react';

interface Expense {
  category: string;
  amount: number;
}

const EmergencyFund: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([
    { category: 'Housing', amount: 0 },
    { category: 'Utilities', amount: 0 },
    { category: 'Food', amount: 0 },
    { category: 'Healthcare', amount: 0 },
    { category: 'Transportation', amount: 0 },
    { category: 'Insurance', amount: 0 }
  ]);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [monthsTarget, setMonthsTarget] = useState(6);

  const calculateMonthlyExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const calculateTargetFund = () => {
    return calculateMonthlyExpenses() * monthsTarget;
  };

  const calculateProgress = () => {
    const target = calculateTargetFund();
    return target ? (currentSavings / target) * 100 : 0;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'text-green-400';
    if (progress >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getMonthsRemaining = () => {
    const monthlyExpenses = calculateMonthlyExpenses();
    if (monthlyExpenses === 0) return 0;
    
    const currentMonths = currentSavings / monthlyExpenses;
    return Math.max(0, monthsTarget - currentMonths);
  };

  const getSavingTimeEstimate = () => {
    const monthlyExpenses = calculateMonthlyExpenses();
    if (monthlyExpenses === 0 || monthlyIncome <= monthlyExpenses) return Infinity;
    
    const monthlySavings = monthlyIncome - monthlyExpenses;
    const remaining = calculateTargetFund() - currentSavings;
    
    return Math.ceil(remaining / monthlySavings);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative flex justify-center mb-8">
            <div className="relative w-80 h-80 rounded-2xl overflow-hidden group">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-pink-500/20 animate-pulse"></div>
              
              {/* Piggy Bank Container */}
              <motion.div
                className="relative w-full h-full flex items-center justify-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Animated Coins */}
                {[...Array(8)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="absolute w-8 h-8 rounded-full bg-yellow-400"
                    initial={{ 
                      x: 0, 
                      y: 100, 
                      opacity: 0 
                    }}
                    animate={{ 
                      x: [0, (index % 2 === 0 ? 50 : -50), 0],
                      y: [100, -100, 100],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.4,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                {/* Main Piggy Bank Image */}
                <motion.img
                  src="/images/piggy-bank.png"
                  alt="Emergency Fund Piggy Bank"
                  className="w-48 h-48 object-contain relative z-10"
                  initial={{ y: 20 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              {/* Overlay with text */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <p className="text-white text-xl font-semibold">Emergency Fund</p>
                  <p className="text-white/80 text-sm mt-1">Your Financial Safety Net</p>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">Emergency Fund Calculator</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Plan your safety net with our comprehensive emergency fund calculator. 
            Secure your financial future with smart planning and strategic savings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Income and Current Savings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Wallet className="w-6 h-6 mr-2 text-green-400" />
              Financial Overview
            </h2>

            <div className="space-y-6">
              <div>
                <label className="text-gray-400">Monthly Income</label>
                <div className="relative mt-2">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400">Current Emergency Savings</label>
                <div className="relative mt-2">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400">Target Months of Expenses</label>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => setMonthsTarget(Math.max(1, monthsTarget - 1))}
                    className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <MinusCircle className="w-5 h-5 text-gray-400" />
                  </button>
                  <span className="text-2xl font-bold text-white">{monthsTarget}</span>
                  <button
                    onClick={() => setMonthsTarget(monthsTarget + 1)}
                    className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <PlusCircle className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Monthly Expenses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2 text-blue-400" />
              Monthly Expenses
            </h2>

            <div className="space-y-4">
              {expenses.map((expense, index) => (
                <div key={expense.category}>
                  <label className="text-gray-400">{expense.category}</label>
                  <div className="relative mt-2">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={expense.amount}
                      onChange={(e) => {
                        const newExpenses = [...expenses];
                        newExpenses[index].amount = Number(e.target.value);
                        setExpenses(newExpenses);
                      }}
                      className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Umbrella className="w-6 h-6 mr-2 text-purple-400" />
              Fund Status
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-gray-400 mb-2">Target Emergency Fund</p>
                <p className="text-2xl font-bold text-white">
                  ${calculateTargetFund().toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-2">Progress</p>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${getProgressColor(calculateProgress())}`}>
                        {Math.round(calculateProgress())}%
                      </span>
                    </div>
                  </div>
                  <div className="flex h-2 mb-4 overflow-hidden bg-gray-700 rounded">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, calculateProgress())}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgressColor(calculateProgress())}`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Months Covered</p>
                  <p className="text-xl font-semibold text-white">
                    {(currentSavings / calculateMonthlyExpenses()).toFixed(1)}
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Months Remaining</p>
                  <p className="text-xl font-semibold text-white">
                    {getMonthsRemaining().toFixed(1)}
                  </p>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Estimated Time to Goal</p>
                <p className="text-xl font-semibold text-white">
                  {getSavingTimeEstimate() === Infinity ? (
                    'Increase income or reduce expenses'
                  ) : (
                    `${getSavingTimeEstimate()} months`
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gray-800 rounded-xl p-6 shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Emergency Fund Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Start small - aim for 1 month of expenses first',
              'Keep your emergency fund in an easily accessible savings account',
              'Only use it for true emergencies',
              'Replenish the fund as soon as possible after using it',
              'Review and adjust your target as your expenses change',
              'Consider increasing your target if you have variable income'
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 bg-gray-700 rounded-lg p-4"
              >
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">{tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmergencyFund;
