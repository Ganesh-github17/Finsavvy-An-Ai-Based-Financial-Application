import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle, PieChart, BarChart3, LineChart, Clock } from 'lucide-react';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
}

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  impact: 'positive' | 'negative' | 'neutral';
}

const marketData: MarketData[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 178.45,
    change: 2.34,
    volume: '52.3M'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 334.12,
    change: -1.23,
    volume: '28.1M'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.89,
    change: 0.78,
    volume: '18.7M'
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 156.78,
    change: -0.45,
    volume: '31.2M'
  }
];

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Federal Reserve Maintains Interest Rates',
    description: 'The Federal Reserve has decided to maintain current interest rates, citing stable economic conditions.',
    date: '2024-01-30',
    impact: 'neutral'
  },
  {
    id: '2',
    title: 'Tech Sector Shows Strong Growth',
    description: 'Major technology companies report better-than-expected earnings for Q4 2023.',
    date: '2024-01-29',
    impact: 'positive'
  },
  {
    id: '3',
    title: 'Global Supply Chain Concerns',
    description: 'New disruptions in global supply chains may impact manufacturing sector.',
    date: '2024-01-28',
    impact: 'negative'
  }
];

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Market Index',
      data: [4500, 4700, 4600, 4800, 4900, 5100],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
      tension: 0.4
    }
  ]
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Market Performance'
    }
  },
  scales: {
    y: {
      beginAtZero: false
    }
  }
};

const MarketAnalysis: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Market Overview */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Market Analysis</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Market Index</h3>
              </div>
              <span className="text-green-600 text-sm">+1.2%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">4,892.35</p>
            <p className="text-sm text-gray-500 mt-1">S&P 500</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <LineChart className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Volatility</h3>
              </div>
              <span className="text-red-600 text-sm">+0.8%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">16.24</p>
            <p className="text-sm text-gray-500 mt-1">VIX</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Trading Volume</h3>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">8.2B</p>
            <p className="text-sm text-gray-500 mt-1">Shares</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <PieChart className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Market Breadth</h3>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">1.85</p>
            <p className="text-sm text-gray-500 mt-1">Advance/Decline</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Market Performance</h2>
          <div className="flex space-x-2">
            {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  selectedTimeframe === timeframe
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>
        <Line options={chartOptions} data={chartData} />
      </div>

      {/* Market Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Stocks */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Market Movers</h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Symbol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Volume
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {marketData.map((stock) => (
                    <tr key={stock.symbol} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {stock.symbol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {stock.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        ${stock.price.toFixed(2)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                        stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <div className="flex items-center justify-end">
                          {stock.change >= 0 ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          {stock.change > 0 ? '+' : ''}{stock.change}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                        {stock.volume}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Market News */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Market News</h2>
          <div className="space-y-4">
            {newsItems.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg mr-4 ${
                    news.impact === 'positive'
                      ? 'bg-green-100'
                      : news.impact === 'negative'
                      ? 'bg-red-100'
                      : 'bg-gray-100'
                  }`}>
                    <AlertCircle className={`w-5 h-5 ${
                      news.impact === 'positive'
                        ? 'text-green-600'
                        : news.impact === 'negative'
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {news.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(news.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;
