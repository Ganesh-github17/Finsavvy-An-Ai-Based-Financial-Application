import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, AlertTriangle, Check, X, HelpCircle, TrendingUp, Shield } from 'lucide-react';

interface CreditFactor {
  name: string;
  score: number;
  impact: 'High' | 'Medium' | 'Low';
  status: 'Good' | 'Fair' | 'Poor';
  description: string;
}

const CreditScore: React.FC = () => {
  const [creditScore, setCreditScore] = useState(750);
  const [showTips, setShowTips] = useState(false);

  const creditFactors: CreditFactor[] = [
    {
      name: 'Payment History',
      score: 95,
      impact: 'High',
      status: 'Good',
      description: 'Your track record of paying bills on time'
    },
    {
      name: 'Credit Utilization',
      score: 80,
      impact: 'High',
      status: 'Good',
      description: 'Amount of credit you\'re using compared to your credit limits'
    },
    {
      name: 'Credit Age',
      score: 70,
      impact: 'Medium',
      status: 'Fair',
      description: 'Length of your credit history'
    },
    {
      name: 'Credit Mix',
      score: 85,
      impact: 'Low',
      status: 'Good',
      description: 'Different types of credit accounts you have'
    },
    {
      name: 'Recent Inquiries',
      score: 90,
      impact: 'Low',
      status: 'Good',
      description: 'Number of recent applications for credit'
    }
  ];

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-400';
    if (score >= 650) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getCreditScoreStatus = (score: number) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    if (score >= 550) return 'Fair';
    return 'Poor';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Good': return 'text-green-400';
      case 'Fair': return 'text-yellow-400';
      case 'Poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-400/20 text-red-400';
      case 'Medium': return 'bg-yellow-400/20 text-yellow-400';
      case 'Low': return 'bg-green-400/20 text-green-400';
      default: return 'bg-gray-400/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Credit Score Checker</h1>
          <p className="text-gray-400 text-lg">
            Monitor and understand your credit score
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Credit Score Display */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-xl p-6 shadow-xl"
          >
            <div className="text-center">
              <div className="relative inline-block">
                <svg className="w-48 h-48">
                  <circle
                    className="text-gray-700"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="70"
                    cx="96"
                    cy="96"
                  />
                  <circle
                    className={getCreditScoreColor(creditScore)}
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="70"
                    cx="96"
                    cy="96"
                    strokeDasharray={440}
                    strokeDashoffset={440 - (440 * creditScore) / 850}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <p className={`text-4xl font-bold ${getCreditScoreColor(creditScore)}`}>
                    {creditScore}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {getCreditScoreStatus(creditScore)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Poor</span>
                <span className="text-gray-400">Excellent</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full">
                <div
                  className={`h-full rounded-full ${getCreditScoreColor(creditScore)}`}
                  style={{ width: `${(creditScore / 850) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>300</span>
                <span>850</span>
              </div>
            </div>
          </motion.div>

          {/* Credit Factors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-gray-800 rounded-xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-blue-400" />
              Credit Factors
            </h2>

            <div className="space-y-6">
              {creditFactors.map((factor, index) => (
                <motion.div
                  key={factor.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <h3 className="text-white font-medium">{factor.name}</h3>
                      <span className={`ml-3 px-2 py-1 rounded-full text-xs ${getImpactColor(factor.impact)}`}>
                        {factor.impact} Impact
                      </span>
                    </div>
                    <span className={`font-semibold ${getStatusColor(factor.status)}`}>
                      {factor.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{factor.description}</p>
                  <div className="w-full h-2 bg-gray-600 rounded-full">
                    <div
                      className={`h-full rounded-full ${getStatusColor(factor.status)}`}
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <button
            onClick={() => setShowTips(!showTips)}
            className="w-full bg-gray-800 rounded-xl p-6 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <HelpCircle className="w-6 h-6 text-blue-400 mr-2" />
                <h2 className="text-2xl font-semibold text-white">
                  Tips to Improve Your Credit Score
                </h2>
              </div>
              {showTips ? (
                <X className="w-6 h-6 text-gray-400" />
              ) : (
                <TrendingUp className="w-6 h-6 text-gray-400" />
              )}
            </div>
          </button>

          {showTips && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 bg-gray-800 rounded-xl p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  'Make payments on time',
                  'Keep credit utilization below 30%',
                  'Maintain old credit accounts',
                  'Limit new credit applications',
                  'Diversify your credit mix',
                  'Monitor your credit report regularly'
                ].map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">{tip}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <p className="text-yellow-200/80 text-sm">
              This is a simulated credit score for educational purposes.
              For your actual credit score, please check with authorized credit bureaus.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreditScore;
