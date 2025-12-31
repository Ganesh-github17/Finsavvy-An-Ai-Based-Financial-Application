import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PieChart,
  Target,
  Plus,
  Trash2,
  DollarSign,
  Save,
  AlertCircle
} from 'lucide-react';

interface Expenses {
  housing: string;
  food: string;
  transport: string;
  utilities: string;
  entertainment: string;
  savings: string;
  [key: string]: string;
}

const BudgetPlanner: React.FC = () => {
  const [income, setIncome] = useState(5000);
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { id: '1', name: 'Housing', planned: 1500, actual: 1450, color: '#60A5FA' },
    { id: '2', name: 'Transportation', planned: 500, actual: 480, color: '#34D399' },
    { id: '3', name: 'Food & Dining', planned: 800, actual: 825, color: '#F472B6' },
    { id: '4', name: 'Utilities', planned: 300, actual: 285, color: '#A78BFA' },
    { id: '5', name: 'Entertainment', planned: 400, actual: 375, color: '#FBBF24' },
    { id: '6', name: 'Healthcare', planned: 200, actual: 180, color: '#EC4899' }
  ]);

  const [monthlyBudget, setMonthlyBudget] = useState({
    income: '5000',
    expenses: {
      housing: '1500',
      food: '800',
      transport: '500',
      utilities: '300',
      entertainment: '400',
      savings: '500'
    }
  });

  const calculateTotalExpenses = () => {
    return Object.values(monthlyBudget.expenses).reduce(
      (total, expense) => total + (parseFloat(expense) || 0),
      0
    );
  };

  const getExpensePercentage = (expense: string) => {
    const expenseValue = parseFloat(monthlyBudget.expenses[expense]) || 0;
    const totalIncome = parseFloat(monthlyBudget.income) || 1;
    return (expenseValue / totalIncome) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm mb-2">Monthly Income</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={monthlyBudget.income}
              onChange={(e) =>
                setMonthlyBudget({ ...monthlyBudget, income: e.target.value })
              }
              className="w-full bg-dark-lighter border border-gray-700 rounded-lg pl-10 pr-4 py-2"
              placeholder="Enter your monthly income"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Monthly Expenses</h3>
          {Object.entries(monthlyBudget.expenses).map(([category, value]) => (
            <div key={category}>
              <label className="block text-sm mb-2 capitalize">
                {category}
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={value}
                  onChange={(e) =>
                    setMonthlyBudget({
                      ...monthlyBudget,
                      expenses: {
                        ...monthlyBudget.expenses,
                        [category]: e.target.value
                      }
                    })
                  }
                  className="w-full bg-dark-lighter border border-gray-700 rounded-lg pl-10 pr-4 py-2"
                  placeholder={`Enter ${category} expenses`}
                />
              </div>
            </div>
          ))}
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-all duration-300">
          <Save className="w-5 h-5" />
          Save Budget
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-dark-lighter rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Budget Summary</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Total Income</span>
                <span>${parseFloat(monthlyBudget.income || '0').toFixed(2)}</span>
              </div>
              <div className="h-2 bg-dark-card rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Total Expenses</span>
                <span>${calculateTotalExpenses().toFixed(2)}</span>
              </div>
              <div className="h-2 bg-dark-card rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500"
                  style={{
                    width: `${(calculateTotalExpenses() / parseFloat(monthlyBudget.income || '1')) * 100}%`
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Remaining</span>
                <span>
                  $
                  {(
                    parseFloat(monthlyBudget.income || '0') -
                    calculateTotalExpenses()
                  ).toFixed(2)}
                </span>
              </div>
              <div className="h-2 bg-dark-card rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${
                      ((parseFloat(monthlyBudget.income || '0') -
                        calculateTotalExpenses()) /
                        parseFloat(monthlyBudget.income || '1')) *
                      100
                    }%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark-lighter rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
          <div className="space-y-4">
            {Object.entries(monthlyBudget.expenses).map(([category, value]) => (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1 capitalize">
                  <span>{category}</span>
                  <span>${parseFloat(value || '0').toFixed(2)}</span>
                </div>
                <div className="h-2 bg-dark-card rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${getExpensePercentage(category)}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetPlanner;
