import React from 'react';
import { TrendingUp, PieChart, DollarSign, ArrowUpRight, ArrowDownRight, Briefcase } from 'lucide-react';

interface Investment {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  shares: number;
  price: number;
  change: number;
  type: 'stock' | 'crypto' | 'mutual_fund';
}

const Portfolio: React.FC = () => {
  const investments: Investment[] = [
    {
      id: '1',
      name: 'Apple Inc.',
      symbol: 'AAPL',
      amount: 15000,
      shares: 85,
      price: 176.50,
      change: 2.5,
      type: 'stock'
    },
    {
      id: '2',
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 8000,
      shares: 0.15,
      price: 53333.33,
      change: -1.2,
      type: 'crypto'
    },
    {
      id: '3',
      name: 'Vanguard 500',
      symbol: 'VOO',
      amount: 12000,
      shares: 30,
      price: 400,
      change: 1.8,
      type: 'mutual_fund'
    }
  ];

  const totalValue = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalChange = investments.reduce((sum, inv) => sum + (inv.amount * inv.change / 100), 0);
  const changePercentage = (totalChange / totalValue) * 100;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Portfolio Overview */}
        <div className="bg-dark-card rounded-xl p-8 border border-gray-800 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-lg bg-primary/20">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Portfolio Overview</h1>
              <p className="text-gray-400">Track your investments and performance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-dark rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <h3>Total Value</h3>
              </div>
              <p className="text-2xl font-semibold">${totalValue.toLocaleString()}</p>
            </div>
            <div className="bg-dark rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3>Today's Change</h3>
              </div>
              <p className={`text-2xl font-semibold ${changePercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {changePercentage >= 0 ? '+' : ''}{changePercentage.toFixed(2)}%
              </p>
            </div>
            <div className="bg-dark rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <PieChart className="w-5 h-5 text-primary" />
                <h3>Total Assets</h3>
              </div>
              <p className="text-2xl font-semibold">{investments.length}</p>
            </div>
          </div>

          {/* Investment List */}
          <div className="space-y-4">
            {investments.map(investment => (
              <div
                key={investment.id}
                className="bg-dark rounded-xl p-6 hover:border-primary border border-gray-800 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{investment.name}</h3>
                    <p className="text-gray-400">{investment.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">${investment.amount.toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                      {investment.change >= 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span className={investment.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {investment.change >= 0 ? '+' : ''}{investment.change}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                  <div>
                    <p>Shares</p>
                    <p className="font-medium text-white">{investment.shares}</p>
                  </div>
                  <div>
                    <p>Price</p>
                    <p className="font-medium text-white">${investment.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Investment Button */}
        <button className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl transition-colors">
          Add New Investment
        </button>
      </div>
    </div>
  );
};

export default Portfolio;
