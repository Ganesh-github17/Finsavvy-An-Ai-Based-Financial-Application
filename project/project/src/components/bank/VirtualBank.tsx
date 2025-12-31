import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Chart } from 'react-chartjs-2';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'return';
  amount: number;
  description: string;
  date: string;
  balance: number;
}

interface VirtualBankProps {
  accountData: {
    balance: number;
    transactions: Transaction[];
    accountNumber: string;
    created: string;
  };
  onTransaction: (transaction: Omit<Transaction, 'id' | 'balance' | 'date'>) => void;
}

const VirtualBank: React.FC<VirtualBankProps> = ({ accountData, onTransaction }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdrawal'>('deposit');

  const handleTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    if (transactionType === 'withdrawal' && numAmount > accountData.balance) {
      alert('Insufficient funds!');
      return;
    }

    onTransaction({
      type: transactionType,
      amount: numAmount,
      description
    });

    setAmount('');
    setDescription('');
  };

  const getBalanceHistory = () => {
    return accountData.transactions.map(t => ({
      date: new Date(t.date).toLocaleDateString(),
      balance: t.balance
    }));
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Account Overview */}
      <div className="col-span-12 lg:col-span-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl font-bold mb-4">Virtual Bank Account</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600">Account Number</div>
              <div className="text-lg font-semibold">{accountData.accountNumber}</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">Current Balance</div>
              <div className="text-2xl font-bold">${accountData.balance.toFixed(2)}</div>
            </div>
          </div>

          {/* Transaction Form */}
          <form onSubmit={handleTransaction} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transaction Type
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value as 'deposit' | 'withdrawal')}
              >
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                className="w-full px-3 py-2 border rounded-lg"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Transaction
            </button>
          </form>
        </motion.div>
      </div>

      {/* Balance Chart */}
      <div className="col-span-12 lg:col-span-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl font-bold mb-4">Balance History</h2>
          <div className="h-64">
            <Chart
              type="line"
              data={{
                labels: getBalanceHistory().map(h => h.date),
                datasets: [{
                  label: 'Account Balance',
                  data: getBalanceHistory().map(h => h.balance),
                  borderColor: 'rgb(59, 130, 246)',
                  tension: 0.1
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Balance ($)'
                    }
                  }
                }
              }}
            />
          </div>

          {/* Transaction History */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Recent Transactions</h3>
            <div className="space-y-2">
              {accountData.transactions.slice(-5).reverse().map(transaction => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {transaction.type === 'withdrawal' ? '-' : '+'}
                    ${transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VirtualBank;
