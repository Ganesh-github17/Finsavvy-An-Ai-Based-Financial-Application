import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, History } from 'lucide-react';
import { Line } from 'react-chartjs-2';

const VirtualBankAccount: React.FC = () => {
  const [balance, setBalance] = useState(1000);
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'deposit', amount: 1000, date: '2025-01-30', description: 'Initial deposit' }
  ]);

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleTransaction = (type: 'deposit' | 'withdraw') => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (type === 'withdraw' && numAmount > balance) {
      alert('Insufficient funds');
      return;
    }

    const newTransaction = {
      id: transactions.length + 1,
      type,
      amount: numAmount,
      date: new Date().toISOString().split('T')[0],
      description: description || `${type === 'deposit' ? 'Deposit' : 'Withdrawal'}`
    };

    setTransactions([newTransaction, ...transactions]);
    setBalance(prev => type === 'deposit' ? prev + numAmount : prev - numAmount);
    setAmount('');
    setDescription('');
  };

  // Chart data
  const chartData = {
    labels: transactions.slice().reverse().map(t => t.date),
    datasets: [{
      label: 'Account Balance',
      data: transactions.slice().reverse().reduce((acc: number[], t) => {
        const last = acc[acc.length - 1] || 0;
        acc.push(t.type === 'deposit' ? last + t.amount : last - t.amount);
        return acc;
      }, []),
      fill: false,
      borderColor: 'rgb(59, 130, 246)',
      tension: 0.1
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Balance History'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <CreditCard className="w-8 h-8" />
            <span className="text-sm">Virtual Account</span>
          </div>
          <div className="mb-4">
            <p className="text-sm opacity-80">Current Balance</p>
            <h2 className="text-3xl font-bold">${balance.toFixed(2)}</h2>
          </div>
          <p className="text-sm opacity-80">*This is a simulated account for learning purposes</p>
        </motion.div>

        {/* Transaction Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Make a Transaction</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter description"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleTransaction('deposit')}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowDownRight className="w-4 h-4" />
                Deposit
              </button>
              <button
                onClick={() => handleTransaction('withdraw')}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowUpRight className="w-4 h-4" />
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
          </div>
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {transactions.map(transaction => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Balance Chart */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default VirtualBankAccount;
