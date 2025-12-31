import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, AlertCircle, DollarSign, Award, BookOpen, PieChart, History } from 'lucide-react';
import { formatIndianRupees } from '../../../utils/currency';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Investment {
  id: string;
  name: string;
  type: 'Stocks' | 'Bonds' | 'Real Estate' | 'Crypto';
  symbol?: string;
  price: number;
  risk: 'Low' | 'Medium' | 'High';
  returns: number[];
  description: string;
  marketCap?: number;
  volume?: number;
}

interface Portfolio {
  [key: string]: {
    quantity: number;
    averagePrice: number;
  };
}

interface LearningTip {
  title: string;
  content: string;
  icon: React.ReactNode;
}

const ALPHA_VANTAGE_API_KEY = 'YOUR_API_KEY'; // Replace with your API key

const InvestmentSimulator: React.FC = () => {
  const [balance, setBalance] = useState(100000);
  const [portfolio, setPortfolio] = useState<Portfolio>({});
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [history, setHistory] = useState<{ date: string; value: number }[]>([]);
  const [showTutorial, setShowTutorial] = useState(true);
  const [marketNews, setMarketNews] = useState<string[]>([]);
  const [learningProgress, setLearningProgress] = useState(0);
  const [showLearningTip, setShowLearningTip] = useState(false);
  const [currentTip, setCurrentTip] = useState<LearningTip | null>(null);

  const learningTips: LearningTip[] = [
    {
      title: 'Diversification',
      content: 'Spread your investments across different assets to reduce risk. Don\'t put all your eggs in one basket!',
      icon: <PieChart className="w-6 h-6 text-blue-500" />
    },
    {
      title: 'Risk Management',
      content: 'Higher returns often come with higher risks. Always assess your risk tolerance before investing.',
      icon: <AlertCircle className="w-6 h-6 text-yellow-500" />
    },
    {
      title: 'Market Research',
      content: 'Study market trends and company fundamentals before making investment decisions.',
      icon: <BookOpen className="w-6 h-6 text-green-500" />
    },
    {
      title: 'Long-term Perspective',
      content: 'Successful investing is about time in the market, not timing the market.',
      icon: <History className="w-6 h-6 text-purple-500" />
    }
  ];

  const fetchStockData = async (symbol: string) => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      const data = await response.json();
      return data['Global Quote'];
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return null;
    }
  };

  const fetchMarketNews = async () => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      const data = await response.json();
      const news = data.feed?.slice(0, 5).map((item: any) => item.title) || [];
      setMarketNews(news);
    } catch (error) {
      console.error('Error fetching market news:', error);
    }
  };

  useEffect(() => {
    fetchMarketNews();
    const interval = setInterval(() => {
      const tip = learningTips[Math.floor(Math.random() * learningTips.length)];
      setCurrentTip(tip);
      setShowLearningTip(true);
      setTimeout(() => setShowLearningTip(false), 5000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const investments: Investment[] = [
    {
      id: 'AAPL',
      name: 'Apple Inc.',
      type: 'Stocks',
      symbol: 'AAPL',
      price: 150,
      risk: 'Medium',
      returns: [2.5, 3.1, -1.2, 4.5, 2.8],
      description: 'Leading technology company known for iPhone and other consumer electronics.',
      marketCap: 2500000000000,
      volume: 80000000
    },
    {
      id: 'GOVT',
      name: 'Government Bonds',
      type: 'Bonds',
      price: 1000,
      risk: 'Low',
      returns: [1.2, 1.3, 1.1, 1.4, 1.2],
      description: 'Safe government securities with guaranteed returns.'
    },
    {
      id: 'REIT',
      name: 'Real Estate Trust',
      type: 'Real Estate',
      price: 500,
      risk: 'Medium',
      returns: [1.8, 2.2, 1.9, 2.5, 2.1],
      description: 'Investment trust focused on commercial real estate properties.'
    }
  ];

  const buyInvestment = async () => {
    if (!selectedInvestment || quantity <= 0) return;

    const cost = selectedInvestment.price * quantity;
    if (cost > balance) {
      alert('Insufficient funds!');
      return;
    }

    // If it's a stock, get real-time price
    if (selectedInvestment.symbol) {
      const stockData = await fetchStockData(selectedInvestment.symbol);
      if (stockData) {
        selectedInvestment.price = parseFloat(stockData['05. price']);
      }
    }

    setBalance(prev => prev - cost);
    setPortfolio(prev => {
      const current = prev[selectedInvestment.id] || { quantity: 0, averagePrice: 0 };
      const newQuantity = current.quantity + quantity;
      const newAveragePrice = (current.quantity * current.averagePrice + cost) / newQuantity;
      return {
        ...prev,
        [selectedInvestment.id]: { quantity: newQuantity, averagePrice: newAveragePrice }
      };
    });

    setHistory(prev => [
      ...prev,
      { date: new Date().toLocaleDateString(), value: balance - cost }
    ]);

    // Update learning progress
    setLearningProgress(prev => Math.min(prev + 10, 100));
  };

  const renderPortfolioChart = () => {
    const data = {
      labels: Object.keys(portfolio).map(id => investments.find(i => i.id === id)?.name || id),
      datasets: [{
        data: Object.entries(portfolio).map(([id, data]) => data.quantity * (investments.find(i => i.id === id)?.price || 0)),
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ]
      }]
    };

    return <Pie data={data} />;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Investment Simulator</h1>
          <p className="text-gray-400">Learn to invest with virtual money</p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Portfolio & Balance */}
          <div className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">Your Portfolio</h2>
              <div className="text-3xl font-bold text-green-500 mb-4">
                {formatIndianRupees(balance)}
              </div>
              <div className="h-64">
                {Object.keys(portfolio).length > 0 ? renderPortfolioChart() : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No investments yet
                  </div>
                )}
              </div>
            </motion.div>

            {/* Market News */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">Market News</h2>
              <ul className="space-y-3">
                {marketNews.map((news, index) => (
                  <li key={index} className="text-gray-400 text-sm">{news}</li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Center Panel - Investment Options */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {investments.map(investment => (
                <motion.div
                  key={investment.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-gray-800 rounded-xl p-6 cursor-pointer ${
                    selectedInvestment?.id === investment.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedInvestment(investment)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{investment.name}</h3>
                      <p className="text-sm text-gray-400">{investment.type}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      investment.risk === 'Low' ? 'bg-green-500/20 text-green-500' :
                      investment.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {investment.risk} Risk
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{investment.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold text-white">
                      {formatIndianRupees(investment.price)}
                    </div>
                    <div className="flex items-center text-sm">
                      {investment.returns[investment.returns.length - 1] > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={investment.returns[investment.returns.length - 1] > 0 ? 'text-green-500' : 'text-red-500'}>
                        {Math.abs(investment.returns[investment.returns.length - 1])}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Buy Panel */}
            {selectedInvestment && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">Buy {selectedInvestment.name}</h3>
                <div className="flex items-center gap-4 mb-6">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg w-32"
                    placeholder="Quantity"
                  />
                  <div className="text-gray-400">
                    Total: {formatIndianRupees(quantity * selectedInvestment.price)}
                  </div>
                </div>
                <button
                  onClick={buyInvestment}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Buy Investment
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Learning Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 bg-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Learning Progress</h2>
            <div className="flex items-center">
              <Award className="w-6 h-6 text-yellow-500 mr-2" />
              <span className="text-white">{learningProgress}%</span>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${learningProgress}%` }}
            />
          </div>
        </motion.div>

        {/* Learning Tips Modal */}
        <AnimatePresence>
          {showLearningTip && currentTip && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 right-4 max-w-md bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
            >
              <div className="flex items-start gap-4">
                {currentTip.icon}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{currentTip.title}</h3>
                  <p className="text-gray-400">{currentTip.content}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InvestmentSimulator;
