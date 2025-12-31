import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { PlusCircle, MinusCircle, ArrowUpRight, ArrowDownRight, Wallet, CreditCard, Banknote } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const BudgetPlanner: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('February');

  // Sample data for charts
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [50000, 52000, 51000, 53000, 52500, 54000],
        borderColor: '#10b981', // emerald-500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: [35000, 37000, 34000, 36000, 35500, 36500],
        borderColor: '#ef4444', // red-500
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const expenseBreakdown = {
    labels: ['Housing', 'Food', 'Transportation', 'Utilities', 'Entertainment', 'Savings'],
    datasets: [{
      data: [35, 20, 15, 10, 10, 10],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)', // blue-500
        'rgba(16, 185, 129, 0.8)', // emerald-500
        'rgba(245, 158, 11, 0.8)', // amber-500
        'rgba(139, 92, 246, 0.8)', // violet-500
        'rgba(236, 72, 153, 0.8)', // pink-500
        'rgba(14, 165, 233, 0.8)', // sky-500
      ],
      borderWidth: 0,
    }],
  };

  const savingsGoals = {
    labels: ['Emergency Fund', 'Retirement', 'Travel', 'Education', 'Home'],
    datasets: [{
      label: 'Progress (%)',
      data: [80, 45, 60, 30, 20],
      backgroundColor: 'rgba(59, 130, 246, 0.8)', // blue-500
      borderRadius: 8,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#94a3b8', // text-slate-400
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: '#1e293b', // slate-800
        titleColor: '#f8fafc', // slate-50
        bodyColor: '#f8fafc', // slate-50
        padding: 12,
        cornerRadius: 8,
        boxPadding: 6,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8', // text-slate-400
        },
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)', // text-slate-400 with opacity
        },
        ticks: {
          color: '#94a3b8', // text-slate-400
          callback: (value: number) => '₹' + value.toLocaleString(),
        },
      },
    },
  };

  const doughnutOptions = {
    ...chartOptions,
    cutout: '75%',
    plugins: {
      ...chartOptions.plugins,
      legend: {
        ...chartOptions.plugins.legend,
        position: 'right' as const,
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    indexAxis: 'y' as const,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8', // text-slate-400
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8', // text-slate-400
        },
      },
    },
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Budget Planner</h1>
          <p className="text-slate-400">Track your income, expenses, and savings goals</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Balance</p>
                <p className="text-2xl font-bold text-white">₹85,000</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Monthly Income</p>
                <p className="text-2xl font-bold text-white">₹54,000</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <ArrowDownRight className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Monthly Expenses</p>
                <p className="text-2xl font-bold text-white">₹36,500</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Income vs Expenses Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Income vs Expenses</h2>
            <div className="h-[300px]">
              <Line data={monthlyData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Expense Breakdown Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Expense Breakdown</h2>
            <div className="h-[300px]">
              <Doughnut data={expenseBreakdown} options={doughnutOptions} />
            </div>
          </motion.div>

          {/* Savings Goals Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6 lg:col-span-2"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Savings Goals Progress</h2>
            <div className="h-[300px]">
              <Bar data={savingsGoals} options={barOptions} />
            </div>
          </motion.div>
        </div>

        {/* Budget Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Budget Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="flex items-center gap-2 bg-green-500/20 text-green-500 rounded-lg px-4 py-3 hover:bg-green-500/30 transition-colors">
              <PlusCircle className="w-5 h-5" />
              Add Income
            </button>
            <button className="flex items-center gap-2 bg-red-500/20 text-red-500 rounded-lg px-4 py-3 hover:bg-red-500/30 transition-colors">
              <MinusCircle className="w-5 h-5" />
              Add Expense
            </button>
            <button className="flex items-center gap-2 bg-blue-500/20 text-blue-500 rounded-lg px-4 py-3 hover:bg-blue-500/30 transition-colors">
              <CreditCard className="w-5 h-5" />
              Set Budget
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BudgetPlanner;
