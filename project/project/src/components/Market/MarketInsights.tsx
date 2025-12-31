import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
  BarChart2,
  DollarSign,
  Target
} from 'lucide-react';

interface MarketInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'tip';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  timestamp: string;
}

const MarketInsights: React.FC = () => {
  const [insights] = useState<MarketInsight[]>([
    {
      id: '1',
      type: 'opportunity',
      title: 'Tech Sector Showing Strong Growth',
      description: 'Technology stocks are showing positive momentum with increased institutional buying.',
      impact: 'high',
      timestamp: '2024-02-03T14:30:00Z'
    },
    {
      id: '2',
      type: 'risk',
      title: 'Market Volatility Alert',
      description: 'Increased market volatility expected due to upcoming economic data releases.',
      impact: 'medium',
      timestamp: '2024-02-03T13:15:00Z'
    },
    {
      id: '3',
      type: 'tip',
      title: 'Portfolio Diversification',
      description: 'Consider adding defensive stocks to balance portfolio risk in current market conditions.',
      impact: 'medium',
      timestamp: '2024-02-03T12:00:00Z'
    }
  ]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'risk':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'tip':
        return <Lightbulb className="w-5 h-5 text-yellow-400" />;
      default:
        return null;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Market Insights</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm bg-dark-lighter rounded-lg hover:bg-opacity-80">
            Opportunities
          </button>
          <button className="px-3 py-1 text-sm bg-dark-lighter rounded-lg hover:bg-opacity-80">
            Risks
          </button>
          <button className="px-3 py-1 text-sm bg-dark-lighter rounded-lg hover:bg-opacity-80">
            Tips
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-lighter rounded-lg p-4 hover:bg-opacity-80 cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{getInsightIcon(insight.type)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{insight.title}</h3>
                  <span className={`text-sm ${getImpactColor(insight.impact)}`}>
                    {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)} Impact
                  </span>
                </div>
                <p className="text-gray-400 mt-1">{insight.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">
                    {new Date(insight.timestamp).toLocaleTimeString()}
                  </span>
                  <button className="flex items-center text-sm text-primary hover:text-primary-dark">
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-dark-lighter rounded-lg hover:bg-opacity-80">
            <BarChart2 className="w-4 h-4" />
            Market Analysis
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-dark-lighter rounded-lg hover:bg-opacity-80">
            <DollarSign className="w-4 h-4" />
            Investment Ideas
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-dark-lighter rounded-lg hover:bg-opacity-80">
            <Target className="w-4 h-4" />
            Set Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
