import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import { Line } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  history: number[];
  volatility: number;
}

interface Portfolio {
  [symbol: string]: {
    shares: number;
    averagePrice: number;
  };
}

const StockTrader: React.FC = () => {
  const [balance, setBalance] = useState(10000);
  const [portfolio, setPortfolio] = useState<Portfolio>({});
  const [stocks, setStocks] = useState<Stock[]>([
    {
      symbol: 'TECH',
      name: 'TechCorp Inc.',
      price: 150,
      change: 0,
      history: [150],
      volatility: 0.02
    },
    {
      symbol: 'FNCE',
      name: 'Finance Global',
      price: 80,
      change: 0,
      history: [80],
      volatility: 0.015
    },
    {
      symbol: 'ENRG',
      name: 'Energy Solutions',
      price: 120,
      change: 0,
      history: [120],
      volatility: 0.025
    },
    {
      symbol: 'HLTH',
      name: 'Healthcare Plus',
      price: 200,
      change: 0,
      history: [200],
      volatility: 0.018
    }
  ]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [newsEvents] = useState([
    'Market shows strong growth in tech sector',
    'Energy prices stabilize amid global changes',
    'Healthcare stocks rally on new developments',
    'Financial sector faces regulatory changes'
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => {
        return prevStocks.map(stock => {
          const change = (Math.random() - 0.5) * 2 * stock.volatility;
          const newPrice = Math.max(1, stock.price * (1 + change));
          return {
            ...stock,
            price: Number(newPrice.toFixed(2)),
            change: Number((change * 100).toFixed(2)),
            history: [...stock.history, newPrice].slice(-30)
          };
        });
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleBuy = () => {
    if (!selectedStock || quantity <= 0) return;

    const cost = selectedStock.price * quantity;
    if (cost > balance) {
      alert('Insufficient funds!');
      return;
    }

    setBalance(prev => prev - cost);
    setPortfolio(prev => {
      const existing = prev[selectedStock.symbol];
      const newShares = (existing?.shares || 0) + quantity;
      const newAvgPrice = existing
        ? ((existing.averagePrice * existing.shares) + cost) / newShares
        : selectedStock.price;

      return {
        ...prev,
        [selectedStock.symbol]: {
          shares: newShares,
          averagePrice: newAvgPrice
        }
      };
    });
    setQuantity(0);
  };

  const handleSell = () => {
    if (!selectedStock || quantity <= 0) return;

    const position = portfolio[selectedStock.symbol];
    if (!position || position.shares < quantity) {
      alert('Insufficient shares!');
      return;
    }

    const revenue = selectedStock.price * quantity;
    setBalance(prev => prev + revenue);
    setPortfolio(prev => {
      const newShares = position.shares - quantity;
      if (newShares === 0) {
        const { [selectedStock.symbol]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [selectedStock.symbol]: {
          ...position,
          shares: newShares
        }
      };
    });
    setQuantity(0);
  };

  const renderChart = () => {
    if (!selectedStock) return null;

    const data = {
      labels: selectedStock.history.map((_, i) => i.toString()),
      datasets: [{
        label: 'Price',
        data: selectedStock.history,
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    };

    return (
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    );
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {/* Market Overview */}
      <div className="col-span-8 space-y-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4">Market Overview</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600">Available Cash</div>
              <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">Portfolio Value</div>
              <div className="text-2xl font-bold">
                ${Object.entries(portfolio).reduce((total, [symbol, position]) => {
                  const stock = stocks.find(s => s.symbol === symbol);
                  return total + (stock?.price || 0) * position.shares;
                }, 0).toFixed(2)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stocks.map(stock => (
              <motion.div
                key={stock.symbol}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors
                  ${selectedStock?.symbol === stock.symbol
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                  }`}
                onClick={() => setSelectedStock(stock)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{stock.name}</h3>
                    <div className="text-sm text-gray-600">{stock.symbol}</div>
                  </div>
                  <div className={`flex items-center ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {Math.abs(stock.change)}%
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-lg font-bold">${stock.price.toFixed(2)}</div>
                  {portfolio[stock.symbol] && (
                    <div className="text-sm text-gray-600">
                      Shares: {portfolio[stock.symbol].shares}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {selectedStock && (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold mb-4">{selectedStock.name} - Price History</h3>
            {renderChart()}
            <div className="mt-4 flex space-x-4">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                className="flex-1 px-3 py-2 border rounded-lg"
                placeholder="Quantity"
              />
              <button
                onClick={handleBuy}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Buy
              </button>
              <button
                onClick={handleSell}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sell
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Portfolio & News */}
      <div className="col-span-4 space-y-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4">Your Portfolio</h2>
          <div className="space-y-4">
            {Object.entries(portfolio).map(([symbol, position]) => {
              const stock = stocks.find(s => s.symbol === symbol);
              if (!stock) return null;

              const currentValue = stock.price * position.shares;
              const cost = position.averagePrice * position.shares;
              const profit = currentValue - cost;
              const profitPercentage = (profit / cost) * 100;

              return (
                <div key={symbol} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{stock.name}</h3>
                      <div className="text-sm text-gray-600">{symbol}</div>
                    </div>
                    <div className={profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {profit >= 0 ? '+' : ''}{profitPercentage.toFixed(2)}%
                    </div>
                  </div>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shares:</span>
                      <span>{position.shares}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Price:</span>
                      <span>${position.averagePrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Value:</span>
                      <span>${currentValue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profit/Loss:</span>
                      <span className={profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                        ${profit.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4">Market News</h2>
          <div className="space-y-2">
            {newsEvents.map((news, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <Activity className="w-4 h-4 inline-block mr-2 text-blue-600" />
                {news}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTrader;
