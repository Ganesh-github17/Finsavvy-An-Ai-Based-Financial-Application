import React, { useState } from 'react';
import { TrendingUp, BarChart2, LineChart, PieChart, DollarSign, AlertTriangle, BookOpen, Target } from 'lucide-react';
import MarketData from './MarketData';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
}

interface MarketInsight {
  title: string;
  description: string;
  type: 'bullish' | 'bearish' | 'neutral';
  timestamp: string;
}

const Market: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [virtualBalance, setVirtualBalance] = useState(100000);

  const insights: MarketInsight[] = [
    {
      title: 'Tech Sector Rally',
      description: 'Technology stocks showing strong momentum due to AI advancements',
      type: 'bullish',
      timestamp: '2 hours ago'
    },
    {
      title: 'Market Volatility Alert',
      description: 'Increased market volatility expected due to upcoming economic data',
      type: 'neutral',
      timestamp: '4 hours ago'
    }
  ];

  const opportunities = [
    {
      title: 'Green Energy Sector',
      description: 'Renewable energy companies showing strong growth potential',
      expectedReturn: '12-15%'
    },
    {
      title: 'AI & Machine Learning',
      description: 'Companies focused on artificial intelligence development',
      expectedReturn: '18-22%'
    }
  ];

  const handleTrade = (stock: Stock, action: 'buy' | 'sell') => {
    // Implement trading logic
    alert(`${action === 'buy' ? 'Bought' : 'Sold'} ${stock.symbol} stock`);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Real-time Market Data */}
        <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Real-time Market Data</h2>
          </div>
          <MarketData />
        </div>

        {/* Market Overview and Balance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <BarChart2 className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Market Overview</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>S&P 500</span>
                <span className="text-green-500">+1.2%</span>
              </div>
              <div className="flex justify-between">
                <span>NASDAQ</span>
                <span className="text-red-500">-0.5%</span>
              </div>
            </div>
          </div>

          <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Virtual Balance</h2>
            </div>
            <p className="text-2xl font-bold">${virtualBalance.toLocaleString()}</p>
          </div>

          <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Risk Level</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-dark rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-green-500 to-yellow-500"></div>
              </div>
              <span>Moderate</span>
            </div>
          </div>
        </div>

        {/* Market Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-6">
              <LineChart className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Market Insights</h2>
            </div>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="p-4 bg-dark rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{insight.title}</h3>
                    <span className={`text-sm px-2 py-1 rounded ${
                      insight.type === 'bullish' ? 'bg-green-500/20 text-green-500' :
                      insight.type === 'bearish' ? 'bg-red-500/20 text-red-500' :
                      'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {insight.type}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{insight.description}</p>
                  <span className="text-xs text-gray-500">{insight.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Investment Opportunities</h2>
            </div>
            <div className="space-y-4">
              {opportunities.map((opportunity, index) => (
                <div key={index} className="p-4 bg-dark rounded-lg">
                  <h3 className="font-semibold mb-2">{opportunity.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{opportunity.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Expected Return:</span>
                    <span className="text-sm text-green-500">{opportunity.expectedReturn}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
