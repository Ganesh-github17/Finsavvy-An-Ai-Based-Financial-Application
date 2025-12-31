import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, PieChart, Target, TrendingUp } from 'lucide-react';

interface Category {
  name: string;
  amount: number;
  color: string;
}

interface BudgetPlan {
  income: number;
  categories: Category[];
  savingsGoal: number;
}

const defaultCategories: Category[] = [
  { name: 'Housing', amount: 0, color: '#FF6B6B' },
  { name: 'Transportation', amount: 0, color: '#4ECDC4' },
  { name: 'Food', amount: 0, color: '#45B7D1' },
  { name: 'Utilities', amount: 0, color: '#96CEB4' },
  { name: 'Entertainment', amount: 0, color: '#FFEEAD' },
  { name: 'Healthcare', amount: 0, color: '#D4A5A5' },
];

const BudgetPlanner: React.FC = () => {
  const [income, setIncome] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [savingsGoal, setSavingsGoal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/budget/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: localStorage.getItem('userId'),
          income,
          categories,
          savings_goal: savingsGoal,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create budget plan');
      }

      // Reset form or show success message
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateCategoryAmount = (index: number, amount: number) => {
    const newCategories = [...categories];
    newCategories[index] = { ...newCategories[index], amount };
    setCategories(newCategories);
  };

  const totalBudgeted = categories.reduce((sum, cat) => sum + cat.amount, 0) + savingsGoal;
  const remaining = income - totalBudgeted;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <DollarSign className="w-8 h-8 mr-2 text-indigo-600" />
            Budget Planner
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Income
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-indigo-600" />
                Expense Categories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category, index) => (
                  <div key={category.name} className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {category.name}
                    </label>
                    <input
                      type="number"
                      value={category.amount}
                      onChange={(e) => updateCategoryAmount(index, Number(e.target.value))}
                      className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="0.00"
                    />
                    <div
                      className="absolute left-0 bottom-0 h-1 rounded-b-lg transition-all duration-300"
                      style={{
                        width: `${(category.amount / income) * 100}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Target className="w-5 h-5 mr-2 text-indigo-600" />
                Monthly Savings Goal
              </label>
              <input
                type="number"
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(Number(e.target.value))}
                className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="0.00"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                Budget Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Income:</span>
                  <span className="font-medium">${income.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Budgeted:</span>
                  <span className="font-medium">${totalBudgeted.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className={remaining >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {remaining >= 0 ? 'Remaining:' : 'Over Budget:'}
                  </span>
                  <span className={remaining >= 0 ? 'text-green-600' : 'text-red-600'}>
                    ${Math.abs(remaining).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Budget Plan'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BudgetPlanner;
