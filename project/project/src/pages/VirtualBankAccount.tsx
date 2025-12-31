import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  DollarSign,
  PiggyBank,
  Calendar,
  TrendingUp,
  List,
  Save
} from 'lucide-react';

const VirtualBankAccount: React.FC = () => {
  const [activeTab, setActiveTab] = useState('budget');
  const [sipAmount, setSipAmount] = useState('');
  const [years, setYears] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState({
    income: '',
    expenses: {
      housing: '',
      food: '',
      transport: '',
      utilities: '',
      entertainment: '',
      savings: ''
    }
  });

  const calculateSIP = () => {
    const P = parseFloat(sipAmount);
    const t = parseFloat(years);
    const r = parseFloat(expectedReturn) / 100 / 12;
    const n = t * 12;

    const FV = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    return FV.toFixed(2);
  };

  const calculateTotalExpenses = () => {
    return Object.values(monthlyBudget.expenses).reduce(
      (total, expense) => total + (parseFloat(expense) || 0),
      0
    );
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('budget')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'budget'
                ? 'bg-primary text-white'
                : 'bg-dark-card hover:bg-dark-lighter'
            }`}
          >
            <PiggyBank className="w-5 h-5" />
            Budget Planner
          </button>
          <button
            onClick={() => setActiveTab('sip')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'sip'
                ? 'bg-primary text-white'
                : 'bg-dark-card hover:bg-dark-lighter'
            }`}
          >
            <Calculator className="w-5 h-5" />
            SIP Calculator
          </button>
          <button
            onClick={() => setActiveTab('todo')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'todo'
                ? 'bg-primary text-white'
                : 'bg-dark-card hover:bg-dark-lighter'
            }`}
          >
            <List className="w-5 h-5" />
            Financial Todo
          </button>
        </div>

        {activeTab === 'budget' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6">Monthly Budget</h2>
              <div className="space-y-4">
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
              </div>
            </div>

            <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6">Budget Summary</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Total Income</span>
                    <span>${parseFloat(monthlyBudget.income || '0').toFixed(2)}</span>
                  </div>
                  <div className="h-2 bg-dark-lighter rounded-full overflow-hidden">
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
                  <div className="h-2 bg-dark-lighter rounded-full overflow-hidden">
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
                  <div className="h-2 bg-dark-lighter rounded-full overflow-hidden">
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
          </motion.div>
        )}

        {activeTab === 'sip' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-card rounded-xl p-6 border border-gray-800"
          >
            <h2 className="text-xl font-semibold mb-6">SIP Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Monthly Investment</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={sipAmount}
                      onChange={(e) => setSipAmount(e.target.value)}
                      className="w-full bg-dark-lighter border border-gray-700 rounded-lg pl-10 pr-4 py-2"
                      placeholder="Enter monthly investment amount"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Time Period (Years)</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      className="w-full bg-dark-lighter border border-gray-700 rounded-lg pl-10 pr-4 py-2"
                      placeholder="Enter investment duration"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    Expected Return Rate (% p.a.)
                  </label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(e.target.value)}
                      className="w-full bg-dark-lighter border border-gray-700 rounded-lg pl-10 pr-4 py-2"
                      placeholder="Enter expected return rate"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-dark-lighter rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Investment Summary</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-400">
                      Total Investment Amount
                    </span>
                    <p className="text-2xl font-bold">
                      $
                      {(
                        parseFloat(sipAmount || '0') *
                        parseFloat(years || '0') *
                        12
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">
                      Expected Future Value
                    </span>
                    <p className="text-2xl font-bold text-primary">
                      ${sipAmount && years && expectedReturn ? calculateSIP() : '0.00'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">
                      Expected Returns
                    </span>
                    <p className="text-2xl font-bold text-green-400">
                      $
                      {(
                        (sipAmount && years && expectedReturn
                          ? parseFloat(calculateSIP())
                          : 0) -
                        parseFloat(sipAmount || '0') *
                          parseFloat(years || '0') *
                          12
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'todo' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-card rounded-xl p-6 border border-gray-800"
          >
            <h2 className="text-xl font-semibold mb-6">Financial Todo List</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-dark-lighter rounded-lg">
                <input type="checkbox" className="mr-4" />
                <div>
                  <h3 className="font-medium">Create Emergency Fund</h3>
                  <p className="text-sm text-gray-400">
                    Save 3-6 months of living expenses
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-dark-lighter rounded-lg">
                <input type="checkbox" className="mr-4" />
                <div>
                  <h3 className="font-medium">Start SIP Investment</h3>
                  <p className="text-sm text-gray-400">
                    Begin with minimum ₹500 monthly investment
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-dark-lighter rounded-lg">
                <input type="checkbox" className="mr-4" />
                <div>
                  <h3 className="font-medium">Review Insurance Coverage</h3>
                  <p className="text-sm text-gray-400">
                    Check and update life and health insurance
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-dark-lighter rounded-lg">
                <input type="checkbox" className="mr-4" />
                <div>
                  <h3 className="font-medium">Tax Planning</h3>
                  <p className="text-sm text-gray-400">
                    Review tax-saving investments and documents
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VirtualBankAccount;
