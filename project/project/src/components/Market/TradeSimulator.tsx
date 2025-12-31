import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  shares: number;
  price: number;
  timestamp: string;
  status: 'success' | 'failed' | 'pending';
}

interface Portfolio {
  cash: number;
  positions: {
    [symbol: string]: {
      shares: number;
      avgPrice: number;
    };
  };
}

const TradeSimulator: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: 100000, // Starting with $100,000
    positions: {}
  });

  const [trades, setTrades] = useState<Trade[]>([]);
  const [symbol, setSymbol] = useState('');
  const [shares, setShares] = useState('');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  // Sample stock data
  const stockPrices: { [key: string]: number } = {
    AAPL: 178.32,
    MSFT: 334.15,
    GOOGL: 142.56,
    AMZN: 156.87,
    TSLA: 245.67
  };

  const executeTrade = () => {
    const price = stockPrices[symbol];
    if (!price || !shares || isNaN(Number(shares))) {
      return;
    }

    const shareCount = Number(shares);
    const totalCost = price * shareCount;

    const newTrade: Trade = {
      id: Date.now().toString(),
      symbol,
      type: tradeType,
      shares: shareCount,
      price,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Validate trade
    if (tradeType === 'buy' && totalCost > portfolio.cash) {
      newTrade.status = 'failed';
    } else if (tradeType === 'sell' && (!portfolio.positions[symbol] || portfolio.positions[symbol].shares < shareCount)) {
      newTrade.status = 'failed';
    } else {
      newTrade.status = 'success';

      // Update portfolio
      setPortfolio(prev => {
        const newPortfolio = { ...prev };
        
        if (tradeType === 'buy') {
          newPortfolio.cash -= totalCost;
          if (!newPortfolio.positions[symbol]) {
            newPortfolio.positions[symbol] = { shares: 0, avgPrice: 0 };
          }
          const position = newPortfolio.positions[symbol];
          const totalShares = position.shares + shareCount;
          position.avgPrice = ((position.shares * position.avgPrice) + (shareCount * price)) / totalShares;
          position.shares = totalShares;
        } else {
          newPortfolio.cash += totalCost;
          const position = newPortfolio.positions[symbol];
          position.shares -= shareCount;
          if (position.shares === 0) {
            delete newPortfolio.positions[symbol];
          }
        }

        return newPortfolio;
      });
    }

    setTrades(prev => [newTrade, ...prev]);
    setShares('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
      <h2 className="text-xl font-semibold mb-6">Virtual Trading</h2>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-dark-lighter rounded-lg p-4">
          <h3 className="text-sm text-gray-400 mb-2">Available Cash</h3>
          <div className="text-2xl font-bold">${portfolio.cash.toFixed(2)}</div>
        </div>
        <div className="bg-dark-lighter rounded-lg p-4">
          <h3 className="text-sm text-gray-400 mb-2">Portfolio Value</h3>
          <div className="text-2xl font-bold">
            ${(portfolio.cash + Object.entries(portfolio.positions).reduce((total, [symbol, { shares }]) => 
              total + (shares * stockPrices[symbol]), 0)).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Trade Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="bg-dark-lighter border border-gray-800 rounded-lg px-4 py-2"
        >
          <option value="">Select Stock</option>
          {Object.keys(stockPrices).map(sym => (
            <option key={sym} value={sym}>{sym}</option>
          ))}
        </select>

        <input
          type="number"
          value={shares}
          onChange={(e) => setShares(e.target.value)}
          placeholder="Number of shares"
          className="bg-dark-lighter border border-gray-800 rounded-lg px-4 py-2"
        />

        <select
          value={tradeType}
          onChange={(e) => setTradeType(e.target.value as 'buy' | 'sell')}
          className="bg-dark-lighter border border-gray-800 rounded-lg px-4 py-2"
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>

        <button
          onClick={executeTrade}
          disabled={!symbol || !shares}
          className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg px-4 py-2 disabled:opacity-50"
        >
          Execute Trade
        </button>
      </div>

      {/* Positions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Current Positions</h3>
        <div className="bg-dark-lighter rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-4">Symbol</th>
                <th className="text-right p-4">Shares</th>
                <th className="text-right p-4">Avg Price</th>
                <th className="text-right p-4">Current Value</th>
                <th className="text-right p-4">P/L</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(portfolio.positions).map(([symbol, { shares, avgPrice }]) => {
                const currentPrice = stockPrices[symbol];
                const value = shares * currentPrice;
                const pl = value - (shares * avgPrice);
                const plPercent = (pl / (shares * avgPrice)) * 100;

                return (
                  <tr key={symbol} className="border-b border-gray-800">
                    <td className="p-4">{symbol}</td>
                    <td className="text-right p-4">{shares}</td>
                    <td className="text-right p-4">${avgPrice.toFixed(2)}</td>
                    <td className="text-right p-4">${value.toFixed(2)}</td>
                    <td className={`text-right p-4 ${pl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${pl.toFixed(2)} ({plPercent.toFixed(2)}%)
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trade History */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Trade History</h3>
        <div className="space-y-4">
          {trades.map((trade) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-lighter rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(trade.status)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{trade.symbol}</span>
                      <span className={`text-sm ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                        {trade.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(trade.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{trade.shares} shares</div>
                  <div className="text-sm text-gray-400">@ ${trade.price.toFixed(2)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradeSimulator;
