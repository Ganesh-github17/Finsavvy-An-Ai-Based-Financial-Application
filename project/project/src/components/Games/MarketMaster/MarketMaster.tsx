import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Clock, Award } from 'lucide-react';

interface Stock {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  history: number[];
}

interface Portfolio {
  cash: number;
  stocks: {
    [key: string]: {
      shares: number;
      avgPrice: number;
    };
  };
}

const MarketMaster: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([
    {
      id: '1',
      name: 'Tech Corp',
      symbol: 'TECH',
      price: 150,
      change: 2.5,
      history: [145, 148, 146, 150]
    },
    {
      id: '2',
      name: 'Green Energy',
      symbol: 'GRN',
      price: 75,
      change: -1.2,
      history: [78, 77, 76, 75]
    },
    {
      id: '3',
      name: 'Healthcare Plus',
      symbol: 'HLTH',
      price: 200,
      change: 3.8,
      history: [190, 195, 198, 200]
    }
  ]);

  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: 10000,
    stocks: {}
  });

  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeAmount, setTradeAmount] = useState<string>('');
  const [gameTime, setGameTime] = useState<number>(300); // 5 minutes in seconds
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (gameTime > 0) {
        setGameTime(prev => prev - 1);
        updateStockPrices();
      } else {
        setIsGameOver(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [gameTime]);

  const updateStockPrices = () => {
    setStocks(prevStocks =>
      prevStocks.map(stock => {
        const change = (Math.random() - 0.5) * 5;
        const newPrice = Math.max(1, stock.price + change);
        return {
          ...stock,
          price: Number(newPrice.toFixed(2)),
          change: Number(((newPrice - stock.history[stock.history.length - 1]) / stock.history[stock.history.length - 1] * 100).toFixed(2)),
          history: [...stock.history, newPrice]
        };
      })
    );
  };

  const handleBuy = () => {
    if (!selectedStock || !tradeAmount) return;
    
    const shares = Number(tradeAmount);
    const totalCost = shares * selectedStock.price;
    
    if (totalCost > portfolio.cash) {
      alert('Insufficient funds!');
      return;
    }

    setPortfolio(prev => {
      const currentHolding = prev.stocks[selectedStock.id] || { shares: 0, avgPrice: 0 };
      const newTotalShares = currentHolding.shares + shares;
      const newAvgPrice = (currentHolding.shares * currentHolding.avgPrice + totalCost) / newTotalShares;

      return {
        cash: prev.cash - totalCost,
        stocks: {
          ...prev.stocks,
          [selectedStock.id]: {
            shares: newTotalShares,
            avgPrice: newAvgPrice
          }
        }
      };
    });

    setTradeAmount('');
  };

  const handleSell = () => {
    if (!selectedStock || !tradeAmount) return;
    
    const shares = Number(tradeAmount);
    const currentHolding = portfolio.stocks[selectedStock.id];
    
    if (!currentHolding || currentHolding.shares < shares) {
      alert('Insufficient shares!');
      return;
    }

    const totalValue = shares * selectedStock.price;

    setPortfolio(prev => {
      const newShares = currentHolding.shares - shares;
      const newStocks = { ...prev.stocks };
      
      if (newShares === 0) {
        delete newStocks[selectedStock.id];
      } else {
        newStocks[selectedStock.id] = {
          shares: newShares,
          avgPrice: currentHolding.avgPrice
        };
      }

      return {
        cash: prev.cash + totalValue,
        stocks: newStocks
      };
    });

    setTradeAmount('');
  };

  const calculatePortfolioValue = () => {
    const stocksValue = Object.entries(portfolio.stocks).reduce((total, [stockId, holding]) => {
      const stock = stocks.find(s => s.id === stockId);
      return total + (stock ? stock.price * holding.shares : 0);
    }, 0);
    return portfolio.cash + stocksValue;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Game Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Market Master</h2>
          <div className="flex justify-center items-center space-x-8">
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-indigo-600 mr-2" />
              <span className="text-xl font-semibold">{formatTime(gameTime)}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-xl font-semibold">
                ${calculatePortfolioValue().toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stock List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-50">
              <h3 className="text-xl font-semibold mb-4">Market Overview</h3>
              <div className="space-y-4">
                {stocks.map(stock => (
                  <motion.div
                    key={stock.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                      selectedStock?.id === stock.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-transparent bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedStock(stock)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{stock.name}</h4>
                        <p className="text-sm text-gray-600">{stock.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${stock.price.toFixed(2)}</p>
                        <p className={`text-sm flex items-center ${
                          stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stock.change >= 0 ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          {Math.abs(stock.change)}%
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Trading Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-50">
              <h3 className="text-xl font-semibold mb-4">Trading Panel</h3>
              {selectedStock ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">{selectedStock.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">Current Price: ${selectedStock.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">
                      Your Position: {portfolio.stocks[selectedStock.id]?.shares || 0} shares
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Shares
                    </label>
                    <input
                      type="number"
                      value={tradeAmount}
                      onChange={(e) => setTradeAmount(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter amount"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleBuy}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Buy
                    </button>
                    <button
                      onClick={handleSell}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Sell
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">
                  Select a stock to start trading
                </p>
              )}
            </div>

            {/* Portfolio Summary */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 border border-indigo-50">
              <h3 className="text-xl font-semibold mb-4">Portfolio Summary</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Available Cash</p>
                  <p className="text-xl font-semibold">${portfolio.cash.toLocaleString()}</p>
                </div>
                
                <div className="space-y-2">
                  {Object.entries(portfolio.stocks).map(([stockId, holding]) => {
                    const stock = stocks.find(s => s.id === stockId);
                    if (!stock) return null;
                    
                    const currentValue = stock.price * holding.shares;
                    const profit = currentValue - (holding.avgPrice * holding.shares);
                    
                    return (
                      <div key={stockId} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{stock.symbol}</p>
                            <p className="text-sm text-gray-600">{holding.shares} shares</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${currentValue.toLocaleString()}</p>
                            <p className={`text-sm ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {profit >= 0 ? '+' : ''}{profit.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Game Over Modal */}
        <AnimatePresence>
          {isGameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full"
              >
                <Award className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-center mb-4">Game Over!</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-center text-gray-600">Final Portfolio Value</p>
                    <p className="text-3xl font-bold text-center text-indigo-600">
                      ${calculatePortfolioValue().toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      {calculatePortfolioValue() > 10000
                        ? 'Congratulations! You made a profit!'
                        : 'Better luck next time!'}
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Play Again
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MarketMaster;
