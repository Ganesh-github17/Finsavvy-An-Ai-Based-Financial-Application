import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Target, BarChart4, ArrowRight } from 'lucide-react';

interface Strategy {
  id: string;
  title: string;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  expectedReturn: string;
  timeHorizon: string;
  features: string[];
}

const StrategyOptions: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);

  const strategies: Strategy[] = [
    {
      id: '1',
      title: 'Conservative Growth',
      description: 'Focus on capital preservation with steady, modest growth potential.',
      riskLevel: 'Low',
      expectedReturn: '4-6% annually',
      timeHorizon: '5+ years',
      features: [
        'Emphasis on bonds and fixed income',
        'Limited exposure to stocks',
        'Regular dividend income',
        'Capital preservation focus'
      ]
    },
    {
      id: '2',
      title: 'Balanced Growth',
      description: 'Balance between growth and stability with moderate risk tolerance.',
      riskLevel: 'Medium',
      expectedReturn: '6-8% annually',
      timeHorizon: '7-10 years',
      features: [
        'Mix of stocks and bonds',
        'Diversified asset allocation',
        'Regular rebalancing',
        'Income and growth focus'
      ]
    },
    {
      id: '3',
      title: 'Aggressive Growth',
      description: 'Maximum growth potential with higher risk tolerance.',
      riskLevel: 'High',
      expectedReturn: '8-12% annually',
      timeHorizon: '10+ years',
      features: [
        'High equity exposure',
        'Growth stock focus',
        'International diversification',
        'Opportunistic investing'
      ]
    }
  ];

  const handleStrategySelect = (strategy: Strategy) => {
    setSelectedStrategy(strategy);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Investment Strategy Options</h2>
        <p className="text-gray-600">Choose the investment strategy that best matches your goals and risk tolerance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {strategies.map((strategy) => (
          <motion.div
            key={strategy.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  {strategy.id === '1' ? (
                    <Shield className="w-6 h-6 text-blue-600" />
                  ) : strategy.id === '2' ? (
                    <Target className="w-6 h-6 text-blue-600" />
                  ) : (
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  strategy.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                  strategy.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {strategy.riskLevel} Risk
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2">{strategy.title}</h3>
              <p className="text-gray-600 mb-4">{strategy.description}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-700">
                  <BarChart4 className="w-5 h-5 mr-2 text-blue-600" />
                  <span>Expected Return: {strategy.expectedReturn}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  <span>Time Horizon: {strategy.timeHorizon}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {strategy.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <ArrowRight className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleStrategySelect(strategy)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Select Strategy
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Strategy Details Modal */}
      {selectedStrategy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-2xl w-full"
          >
            <h3 className="text-2xl font-bold mb-4">{selectedStrategy.title}</h3>
            <p className="text-gray-600 mb-6">{selectedStrategy.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-2">Risk Level</h4>
                <p className={`inline-block px-3 py-1 rounded-full text-sm ${
                  selectedStrategy.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                  selectedStrategy.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedStrategy.riskLevel}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Expected Return</h4>
                <p>{selectedStrategy.expectedReturn}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Time Horizon</h4>
                <p>{selectedStrategy.timeHorizon}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-2">Key Features</h4>
              <ul className="list-disc pl-5 space-y-2">
                {selectedStrategy.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedStrategy(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Strategy ${selectedStrategy.title} has been implemented!`);
                  setSelectedStrategy(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Implement Strategy
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StrategyOptions;
