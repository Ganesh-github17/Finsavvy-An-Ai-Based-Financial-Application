import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Search, Brain, ChartBar, AlertTriangle, Clock } from 'lucide-react';
import stockPredictorImage from './images/stock-predictor.jpg';

interface StockPrediction {
  symbol: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  trend: 'up' | 'down' | 'neutral';
  analysis: string;
}

const StockPredictor: React.FC = () => {
  const [symbol, setSymbol] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState<StockPrediction[]>([
    {
      symbol: 'AAPL',
      currentPrice: 182.52,
      predictedPrice: 195.75,
      confidence: 85,
      trend: 'up',
      analysis: 'Strong buy signal based on technical indicators and AI analysis.'
    },
    {
      symbol: 'MSFT',
      currentPrice: 420.55,
      predictedPrice: 445.20,
      confidence: 78,
      trend: 'up',
      analysis: 'Positive momentum with potential short-term volatility.'
    }
  ]);

  const popularStocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META'];

  const analyzeTrend = (current: number, predicted: number) => {
    const percentChange = ((predicted - current) / current) * 100;
    if (percentChange > 2) return 'up';
    if (percentChange < -2) return 'down';
    return 'neutral';
  };

  const handleSearch = async () => {
    if (!symbol) return;
    
    setIsLoading(true);
    // Simulated API call
    setTimeout(() => {
      const currentPrice = Math.random() * 1000 + 100;
      const predictedPrice = currentPrice * (1 + (Math.random() * 0.2 - 0.1));
      
      setPredictions([{
        symbol: symbol.toUpperCase(),
        currentPrice,
        predictedPrice,
        confidence: Math.round(Math.random() * 30 + 70),
        trend: analyzeTrend(currentPrice, predictedPrice),
        analysis: 'AI-generated analysis based on market trends and technical indicators.'
      }, ...predictions]);
      
      setSymbol('');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-8">
          {/* Main Content */}
          <div className="flex-1 max-w-[75%]">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
                AI Stock Predictor
              </h1>
              <p className="text-gray-400 text-lg">
                Get AI-powered stock price predictions and market analysis
              </p>
            </motion.div>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-gray-800 rounded-xl p-6 shadow-xl mb-8">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="relative flex-1 w-full">
                    <input
                      type="text"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                      placeholder="Enter stock symbol (e.g., AAPL)"
                      className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  <button
                    onClick={handleSearch}
                    disabled={isLoading || !symbol}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Analyzing
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5 mr-2" />
                        Predict
                      </>
                    )}
                  </button>
                </div>

                {/* Popular Stocks */}
                <div className="mt-6">
                  <p className="text-gray-400 mb-3">Popular Stocks:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularStocks.map(stock => (
                      <button
                        key={stock}
                        onClick={() => setSymbol(stock)}
                        className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        {stock}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Predictions List */}
            <div className="space-y-6">
              {predictions.map((prediction, index) => (
                <motion.div
                  key={`${prediction.symbol}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-xl p-6 shadow-xl"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        prediction.trend === 'up' ? 'bg-green-500/20' :
                        prediction.trend === 'down' ? 'bg-red-500/20' :
                        'bg-gray-500/20'
                      }`}>
                        <TrendingUp className={`w-6 h-6 ${
                          prediction.trend === 'up' ? 'text-green-400' :
                          prediction.trend === 'down' ? 'text-red-400' :
                          'text-gray-400'
                        }`} />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-white">{prediction.symbol}</h3>
                        <div className="flex items-center text-sm text-gray-400">
                          <Clock className="w-4 h-4 mr-1" />
                          Updated just now
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-8">
                      <div>
                        <p className="text-gray-400 text-sm">Current Price</p>
                        <p className="text-lg font-semibold text-white">
                          ${prediction.currentPrice.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Predicted Price</p>
                        <p className={`text-lg font-semibold ${
                          prediction.trend === 'up' ? 'text-green-400' :
                          prediction.trend === 'down' ? 'text-red-400' :
                          'text-white'
                        }`}>
                          ${prediction.predictedPrice.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Confidence</p>
                        <div className="flex items-center">
                          <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${prediction.confidence}%` }}
                            />
                          </div>
                          <span className="ml-2 text-white">{prediction.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Brain className="w-5 h-5 text-blue-400 mt-1" />
                      <p className="text-gray-300">{prediction.analysis}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image on the right */}
          <div className="w-[25%] flex-shrink-0">
            <div className="sticky top-8 p-4 bg-gray-800/80 rounded-2xl border border-gray-700/50 shadow-xl backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent z-10"></div>
                <img 
                  src={stockPredictorImage} 
                  alt="Stock Market Prediction" 
                  className="w-full object-cover aspect-[4/5] transform transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-400">
                  Advanced AI algorithms predict market trends with precision
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <p className="text-yellow-200/80 text-sm">
              This tool uses AI to predict stock prices based on historical data and market trends.
              Predictions are not guaranteed and should not be the sole basis for investment decisions.
              Always conduct thorough research and consider consulting with a financial advisor.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StockPredictor;
