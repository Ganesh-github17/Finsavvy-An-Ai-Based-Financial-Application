import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  PiggyBank,
  Wallet,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  description: string;
  timestamp: string;
}

interface Account {
  id: string;
  name: string;
  balance: number;
  type: 'checking' | 'savings' | 'investment';
  transactions: Transaction[];
}

const VirtualBank: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      name: 'Checking Account',
      balance: 5000,
      type: 'checking',
      transactions: []
    },
    {
      id: '2',
      name: 'Savings Account',
      balance: 10000,
      type: 'savings',
      transactions: []
    },
    {
      id: '3',
      name: 'Investment Account',
      balance: 15000,
      type: 'investment',
      transactions: []
    }
  ]);

  const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[0]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdrawal' | 'transfer'>('deposit');

  const executeTransaction = () => {
    if (!amount || isNaN(Number(amount))) return;

    const transactionAmount = Number(amount);
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: transactionType,
      amount: transactionAmount,
      description,
      timestamp: new Date().toISOString()
    };

    setAccounts(prev => prev.map(account => {
      if (account.id === selectedAccount.id) {
        return {
          ...account,
          balance: transactionType === 'deposit' 
            ? account.balance + transactionAmount 
            : account.balance - transactionAmount,
          transactions: [newTransaction, ...account.transactions]
        };
      }
      return account;
    }));

    setAmount('');
    setDescription('');
  };

  // Chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Balance History',
        data: [4000, 4500, 5200, 4800, 5500, selectedAccount.balance],
        borderColor: '#3B82F6',
        tension: 0.4,
        fill: false
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#1E293B'
        },
        ticks: {
          color: '#94A3B8'
        }
      },
      x: {
        grid: {
          color: '#1E293B'
        },
        ticks: {
          color: '#94A3B8'
        }
      }
    }
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking':
        return <Wallet className="w-6 h-6" />;
      case 'savings':
        return <PiggyBank className="w-6 h-6" />;
      case 'investment':
        return <TrendingUp className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
      <h2 className="text-xl font-semibold mb-6">Virtual Bank</h2>

      {/* Account Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {accounts.map(account => (
          <motion.div
            key={account.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg cursor-pointer ${
              selectedAccount.id === account.id ? 'bg-primary bg-opacity-20 border-primary' : 'bg-dark-lighter'
            } border`}
            onClick={() => setSelectedAccount(account)}
          >
            <div className="flex items-center justify-between mb-2">
              {getAccountIcon(account.type)}
              <span className="text-sm text-gray-400">{account.type.toUpperCase()}</span>
            </div>
            <div className="text-2xl font-bold mb-1">${account.balance.toFixed(2)}</div>
            <div className="text-sm text-gray-400">{account.name}</div>
          </motion.div>
        ))}
      </div>

      {/* Balance Chart */}
      <div className="bg-dark-lighter rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Balance History</h3>
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Transaction Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value as 'deposit' | 'withdrawal' | 'transfer')}
          className="bg-dark-lighter border border-gray-800 rounded-lg px-4 py-2"
        >
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="transfer">Transfer</option>
        </select>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="bg-dark-lighter border border-gray-800 rounded-lg px-4 py-2"
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="bg-dark-lighter border border-gray-800 rounded-lg px-4 py-2"
        />

        <button
          onClick={executeTransaction}
          disabled={!amount || isNaN(Number(amount))}
          className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg px-4 py-2 disabled:opacity-50"
        >
          Execute Transaction
        </button>
      </div>

      {/* Transaction History */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {selectedAccount.transactions.map(transaction => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-lighter rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {transaction.type === 'deposit' ? (
                    <ArrowDownRight className="w-5 h-5 text-green-400" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-red-400" />
                  )}
                  <div>
                    <div className="font-semibold">{transaction.description || transaction.type}</div>
                    <div className="text-sm text-gray-400">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className={`text-lg font-semibold ${
                  transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </div>
              </div>
            </motion.div>
          ))}

          {selectedAccount.transactions.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              No transactions yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualBank;
