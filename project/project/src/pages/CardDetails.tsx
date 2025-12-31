import React from 'react';
import { useParams } from 'react-router-dom';
import { CreditCard, ShieldCheck, Clock, Activity, Download } from 'lucide-react';

const CardDetails: React.FC = () => {
  const { cardId } = useParams();

  const cardDetails = {
    cardNumber: '**** **** **** 4321',
    cardType: 'Premium Credit Card',
    cardHolder: 'John Doe',
    expiryDate: '12/25',
    creditLimit: 100000,
    availableCredit: 75000,
    rewardPoints: 1500,
    transactions: [
      {
        id: 1,
        date: '2024-02-08',
        merchant: 'Amazon Shopping',
        amount: 2500,
        category: 'Shopping'
      },
      {
        id: 2,
        date: '2024-02-07',
        merchant: 'Starbucks',
        amount: 450,
        category: 'Food & Beverages'
      },
      {
        id: 3,
        date: '2024-02-06',
        merchant: 'Movie Tickets',
        amount: 1000,
        category: 'Entertainment'
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Card Overview */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-blue-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">Card Details</h2>
              <p className="text-gray-400">{cardDetails.cardNumber}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">₹{cardDetails.availableCredit}</div>
            <p className="text-gray-400">Available Credit</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-white">Card Type</h3>
            </div>
            <p className="text-gray-300">{cardDetails.cardType}</p>
            <p className="text-sm text-gray-400">{cardDetails.cardHolder}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-white">Expiry Date</h3>
            </div>
            <p className="text-gray-300">{cardDetails.expiryDate}</p>
            <p className="text-sm text-gray-400">Valid Thru</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-white">Reward Points</h3>
            </div>
            <p className="text-gray-300">{cardDetails.rewardPoints} points</p>
            <p className="text-sm text-gray-400">Worth ₹{cardDetails.rewardPoints * 0.25}</p>
          </div>
        </div>
      </div>

      {/* Credit Utilization */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Credit Utilization</h3>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-blue-400">
                {Math.round((1 - cardDetails.availableCredit / cardDetails.creditLimit) * 100)}%
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-gray-400">
                ₹{cardDetails.availableCredit} / ₹{cardDetails.creditLimit}
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
            <div
              style={{ width: `${(1 - cardDetails.availableCredit / cardDetails.creditLimit) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-400"
            ></div>
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
          {cardDetails.transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
            >
              <div>
                <p className="font-medium text-white">{transaction.merchant}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-400">{transaction.date}</p>
                  <span className="text-xs px-2 py-1 bg-gray-600 rounded-full text-gray-300">
                    {transaction.category}
                  </span>
                </div>
              </div>
              <div className="font-semibold text-red-400">
                -₹{transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
