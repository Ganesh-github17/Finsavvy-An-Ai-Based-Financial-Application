import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Activity, DollarSign, BarChart2, LineChart } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getMarketData } from '../../services/apiService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  chart_data: number[];
}

interface IndexData {
  symbol: string;
  name: string;
  value: number;
  change: number;
  chart_data: number[];
}

interface MarketSummary {
  total_volume: number;
  advancing_stocks: number;
  declining_stocks: number;
  volatility_index: number;
}

interface MarketData {
  stocks: StockData[];
  indices: IndexData[];
  market_summary: MarketSummary;
  timestamp: string;
}

const MarketDataComponent: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMarketData();
        console.log('Fetched market data:', data); // Debug log
        setMarketData(data);
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch market data');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    // Refresh market data every minute
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-900 p-6 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-900 p-6 rounded-lg">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!marketData) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-900 p-6 rounded-lg">
        <p className="text-gray-500">No market data available</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-900 rounded-lg">
      {/* Market Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          className="p-4 bg-gray-800 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm text-gray-400">Market Volume</h3>
          </div>
          <p className="text-2xl font-bold text-white">
            {formatNumber(marketData.market_summary.total_volume)}
          </p>
        </motion.div>

        <motion.div
          className="p-4 bg-gray-800 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="text-sm text-gray-400">Advancing Stocks</h3>
          </div>
          <p className="text-2xl font-bold text-white">
            {marketData.market_summary.advancing_stocks}
          </p>
        </motion.div>

        <motion.div
          className="p-4 bg-gray-800 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <ArrowDownRight className="w-5 h-5 text-red-500" />
            <h3 className="text-sm text-gray-400">Declining Stocks</h3>
          </div>
          <p className="text-2xl font-bold text-white">
            {marketData.market_summary.declining_stocks}
          </p>
        </motion.div>

        <motion.div
          className="p-4 bg-gray-800 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="w-5 h-5 text-yellow-500" />
            <h3 className="text-sm text-gray-400">Volatility Index</h3>
          </div>
          <p className="text-2xl font-bold text-white">
            {marketData.market_summary.volatility_index.toFixed(2)}
          </p>
        </motion.div>
      </div>

      {/* Stock List */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4">Top Stocks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketData.stocks.map((stock, index) => (
            <motion.div
              key={stock.symbol}
              className="p-4 bg-gray-800 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-white">{stock.symbol}</h3>
                  <p className="text-sm text-gray-400">{stock.name}</p>
                </div>
                <div className={`px-2 py-1 rounded ${stock.change >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change}%
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-white">${stock.price.toFixed(2)}</p>
                <p className="text-sm text-gray-400">Vol: {formatNumber(stock.volume)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketDataComponent;
