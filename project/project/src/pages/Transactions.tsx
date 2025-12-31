import React, { useState } from 'react';
import { ArrowRightLeft, Download, Filter, Search } from 'lucide-react';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  account: string;
}

const Transactions: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const transactions: Transaction[] = [
    {
      id: 1,
      date: '2024-02-08',
      description: 'Salary Credit',
      amount: 50000,
      type: 'credit',
      category: 'Income',
      account: 'Salary Account'
    },
    {
      id: 2,
      date: '2024-02-07',
      description: 'Grocery Shopping',
      amount: 2500,
      type: 'debit',
      category: 'Shopping',
      account: 'Savings Account'
    },
    {
      id: 3,
      date: '2024-02-07',
      description: 'Netflix Subscription',
      amount: 499,
      type: 'debit',
      category: 'Entertainment',
      account: 'Credit Card'
    },
    {
      id: 4,
      date: '2024-02-06',
      description: 'Investment in Mutual Fund',
      amount: 10000,
      type: 'debit',
      category: 'Investment',
      account: 'Savings Account'
    },
    {
      id: 5,
      date: '2024-02-05',
      description: 'Interest Credit',
      amount: 1500,
      type: 'credit',
      category: 'Interest',
      account: 'Fixed Deposit'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'credit' && transaction.type === 'credit') ||
                         (filter === 'debit' && transaction.type === 'debit');
    
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.account.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Transaction History</h1>
          <p className="text-gray-400">View and manage your transactions across all accounts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Transactions</option>
            <option value="credit">Credits Only</option>
            <option value="debit">Debits Only</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Account</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-600 text-gray-300">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {transaction.account}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                    transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-2">Total Credits</h3>
          <p className="text-2xl font-bold text-green-400">
            ₹{transactions.reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : 0), 0)}
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-2">Total Debits</h3>
          <p className="text-2xl font-bold text-red-400">
            ₹{transactions.reduce((sum, t) => sum + (t.type === 'debit' ? t.amount : 0), 0)}
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-2">Net Balance</h3>
          <p className="text-2xl font-bold text-blue-400">
            ₹{transactions.reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
