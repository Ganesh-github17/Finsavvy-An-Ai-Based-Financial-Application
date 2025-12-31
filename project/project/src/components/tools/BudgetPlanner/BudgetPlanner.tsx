import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  ShoppingCart,
  Home,
  Car,
  Coffee,
  Smartphone,
  Utensils,
  Heart,
  Plus,
  Trash2,
  PieChart,
  TrendingUp,
  Wallet
} from 'lucide-react';
import budgetPlannerImage from '@/components/tools/BudgetPlanner/images/budget-planner.jpg';

interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
}

interface Budget {
  category: string;
  limit: number;
}

const BudgetPlanner: React.FC = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: 0,
    description: ''
  });

  const categories = [
    { name: 'Housing', icon: Home },
    { name: 'Transportation', icon: Car },
    { name: 'Food', icon: Utensils },
    { name: 'Shopping', icon: ShoppingCart },
    { name: 'Entertainment', icon: Coffee },
    { name: 'Healthcare', icon: Heart },
    { name: 'Utilities', icon: Smartphone }
  ];

  const addExpense = () => {
    if (newExpense.amount && newExpense.category) {
      setExpenses([
        ...expenses,
        {
          id: Math.random().toString(36).substr(2, 9),
          ...newExpense
        }
      ]);
      setNewExpense({ category: '', amount: 0, description: '' });
    }
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getExpensesByCategory = () => {
    return expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as { [key: string]: number });
  };

  const getRemainingBudget = () => {
    return income - getTotalExpenses();
  };

  const getBudgetStatus = (category: string) => {
    const budget = budgets.find(b => b.category === category);
    if (!budget) return null;

    const spent = expenses
      .filter(e => e.category === category)
      .reduce((total, expense) => total + expense.amount, 0);

    return {
      spent,
      remaining: budget.limit - spent,
      percentage: (spent / budget.limit) * 100
    };
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-8">
          {/* Main Content */}
          <div className="flex-1 max-w-[75%]">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
                Budget Planner
              </h1>
              <p className="text-gray-400 text-lg">
                Track your expenses and manage your budget effectively
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Income and Summary Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800 rounded-xl p-6 shadow-xl"
              >
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <Wallet className="w-6 h-6 mr-2 text-green-400" />
                  Financial Summary
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-gray-400">Monthly Income</label>
                    <div className="relative mt-2">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                        className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Total Expenses</p>
                      <p className="text-xl font-semibold text-red-400">
                        ${getTotalExpenses().toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Remaining</p>
                      <p className="text-xl font-semibold text-green-400">
                        ${getRemainingBudget().toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-400 text-sm">Budget Usage</p>
                      <p className="text-sm text-white">
                        {Math.round((getTotalExpenses() / income) * 100)}%
                      </p>
                    </div>
                    <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${(getTotalExpenses() / income) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Add Expense Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-xl p-6 shadow-xl"
              >
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <Plus className="w-6 h-6 mr-2 text-blue-400" />
                  Add Expense
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400">Category</label>
                    <select
                      value={newExpense.category}
                      onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                      className="w-full mt-2 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-400">Amount</label>
                    <div className="relative mt-2">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                        className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400">Description</label>
                    <input
                      type="text"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                      className="w-full mt-2 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={addExpense}
                    className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Expense
                  </button>
                </div>
              </motion.div>

              {/* Expenses List */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800 rounded-xl p-6 shadow-xl"
              >
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-2 text-purple-400" />
                  Recent Expenses
                </h2>

                <div className="space-y-4">
                  {expenses.map(expense => {
                    const CategoryIcon = categories.find(c => c.name === expense.category)?.icon || ShoppingCart;
                    return (
                      <motion.div
                        key={expense.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-gray-600 flex items-center justify-center">
                            <CategoryIcon className="w-5 h-5 text-gray-300" />
                          </div>
                          <div className="ml-4">
                            <p className="text-white font-medium">{expense.category}</p>
                            <p className="text-gray-400 text-sm">{expense.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-white font-medium">${expense.amount}</p>
                          <button
                            onClick={() => removeExpense(expense.id)}
                            className="text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}

                  {expenses.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No expenses added yet
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Category Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-gray-800 rounded-xl p-6 shadow-xl"
            >
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <PieChart className="w-6 h-6 mr-2 text-yellow-400" />
                Spending Analysis
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(getExpensesByCategory()).map(([category, amount]) => (
                  <div key={category} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {React.createElement(
                          categories.find(c => c.name === category)?.icon || ShoppingCart,
                          { className: 'w-5 h-5 text-gray-400 mr-2' }
                        )}
                        <span className="text-white">{category}</span>
                      </div>
                      <span className="text-gray-300">${amount}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${(amount / getTotalExpenses()) * 100}%` }}
                      />
                    </div>
                    <p className="text-right text-sm text-gray-400 mt-1">
                      {Math.round((amount / getTotalExpenses()) * 100)}% of total
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Image on the right */}
          <div className="w-[25%] flex-shrink-0">
            <div className="sticky top-8 p-4 bg-gray-800/80 rounded-2xl border border-gray-700/50 shadow-xl backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent z-10"></div>
                <img 
                  src={budgetPlannerImage} 
                  alt="Budget Planning" 
                  className="w-full object-cover aspect-[4/5] transform transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-400">
                  Plan your finances wisely for a secure future
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanner;
