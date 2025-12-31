import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, LineChart, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  change: number;
}

interface Asset {
  type: string;
  value: number;
  percentage: number;
  color: string;
}

const Portfolio: React.FC = () => {
  const [stocks] = useState<Stock[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 10, avgPrice: 150.25, currentPrice: 175.43, change: 2.5 },
    { symbol: 'MSFT', name: 'Microsoft', shares: 15, avgPrice: 350.75, currentPrice: 378.85, change: 1.8 },
    { symbol: 'GOOGL', name: 'Alphabet', shares: 8, avgPrice: 138.50, currentPrice: 142.56, change: -0.5 },
    { symbol: 'AMZN', name: 'Amazon', shares: 12, avgPrice: 145.30, currentPrice: 155.32, change: 1.2 },
  ]);

  const assets: Asset[] = [
    { type: 'Stocks', value: 45000, percentage: 60, color: 'bg-blue-500' },
    { type: 'Bonds', value: 15000, percentage: 20, color: 'bg-green-500' },
    { type: 'Cash', value: 10000, percentage: 13, color: 'bg-yellow-500' },
    { type: 'Crypto', value: 5000, percentage: 7, color: 'bg-purple-500' },
  ];

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalReturn = stocks.reduce(
    (sum, stock) => sum + (stock.currentPrice - stock.avgPrice) * stock.shares,
    0
  );

  return (
    <div className="p-6 space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-card p-6 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="text-primary" />
            <h3 className="text-lg font-semibold">Total Value</h3>
          </div>
          <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-card p-6 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-primary" />
            <h3 className="text-lg font-semibold">Total Return</h3>
          </div>
          <p className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ${Math.abs(totalReturn).toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-card p-6 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <PieChart className="text-primary" />
            <h3 className="text-lg font-semibold">Asset Mix</h3>
          </div>
          <div className="flex gap-1 h-4 rounded-full overflow-hidden">
            {assets.map((asset) => (
              <div
                key={asset.type}
                className={`${asset.color}`}
                style={{ width: `${asset.percentage}%` }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-card p-6 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <LineChart className="text-primary" />
            <h3 className="text-lg font-semibold">Performance</h3>
          </div>
          <p className="text-2xl font-bold text-green-500">+12.5%</p>
          <p className="text-sm text-gray-400">Past 12 months</p>
        </motion.div>
      </div>

      {/* Holdings Table */}
      <div className="bg-dark-card rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Stock Holdings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="py-3 px-4">Symbol</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Shares</th>
                <th className="py-3 px-4">Avg Price</th>
                <th className="py-3 px-4">Current Price</th>
                <th className="py-3 px-4">Market Value</th>
                <th className="py-3 px-4">Gain/Loss</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => {
                const marketValue = stock.shares * stock.currentPrice;
                const gainLoss = (stock.currentPrice - stock.avgPrice) * stock.shares;
                return (
                  <tr key={stock.symbol} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                    <td className="py-3 px-4 font-medium">{stock.symbol}</td>
                    <td className="py-3 px-4">{stock.name}</td>
                    <td className="py-3 px-4">{stock.shares}</td>
                    <td className="py-3 px-4">${stock.avgPrice.toFixed(2)}</td>
                    <td className="py-3 px-4">${stock.currentPrice.toFixed(2)}</td>
                    <td className="py-3 px-4">${marketValue.toFixed(2)}</td>
                    <td className={`py-3 px-4 flex items-center gap-1 ${gainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {gainLoss >= 0 ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      ${Math.abs(gainLoss).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-card rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Asset Allocation</h2>
          <div className="space-y-4">
            {assets.map((asset) => (
              <div key={asset.type} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${asset.color}`} />
                  <span>{asset.type}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">${asset.value.toLocaleString()}</span>
                  <span className="w-16 text-right">{asset.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-card rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
              <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="block text-center">Buy Stock</span>
            </button>
            <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
              <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="block text-center">Sell Stock</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;