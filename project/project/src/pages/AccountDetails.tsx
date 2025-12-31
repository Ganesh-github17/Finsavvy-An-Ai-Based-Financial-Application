import React from 'react';
import { useParams } from 'react-router-dom';
import { Building2, ArrowRightLeft, PiggyBank, FileText, Download } from 'lucide-react';

const AccountDetails: React.FC = () => {
  const { accountId } = useParams();

  const accountDetails = {
    accountNumber: '1234567890',
    balance: 25000,
    accountType: 'Savings Account',
    interestRate: 4.0,
    status: 'Active',
    lastTransaction: '2024-02-08',
    transactions: [
      {
        id: 1,
        date: '2024-02-08',
        description: 'Online Transfer',
        amount: -1500,
        type: 'debit'
      },
      {
        id: 2,
        date: '2024-02-07',
        description: 'Salary Credit',
        amount: 45000,
        type: 'credit'
      },
      {
        id: 3,
        date: '2024-02-06',
        description: 'ATM Withdrawal',
        amount: -2000,
        type: 'debit'
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Account Overview */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-blue-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">Account Details</h2>
              <p className="text-gray-400">Account #{accountDetails.accountNumber}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">₹{accountDetails.balance}</div>
            <p className="text-gray-400">Available Balance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <PiggyBank className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-white">Account Type</h3>
            </div>
            <p className="text-gray-300">{accountDetails.accountType}</p>
            <p className="text-sm text-blue-400">{accountDetails.interestRate}% p.a.</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-white">Status</h3>
            </div>
            <p className="text-gray-300">{accountDetails.status}</p>
            <p className="text-sm text-gray-400">Since 2024</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowRightLeft className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-white">Last Transaction</h3>
            </div>
            <p className="text-gray-300">{accountDetails.lastTransaction}</p>
            <p className="text-sm text-gray-400">Online Transfer</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
          <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
            <Download className="w-4 h-4" />
            Download Statement
          </button>
        </div>

        <div className="space-y-4">
          {accountDetails.transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
            >
              <div>
                <p className="font-medium text-white">{transaction.description}</p>
                <p className="text-sm text-gray-400">{transaction.date}</p>
              </div>
              <div className={`font-semibold ${
                transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'
              }`}>
                {transaction.type === 'credit' ? '+' : '-'}₹{Math.abs(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
