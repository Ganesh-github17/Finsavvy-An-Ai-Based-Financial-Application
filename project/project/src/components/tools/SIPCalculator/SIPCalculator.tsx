import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Calendar, DollarSign, PieChart } from 'lucide-react';

interface SIPCalculation {
  monthlyInvestment: number;
  years: number;
  expectedReturn: number;
  inflationRate: number;
}

const SIPCalculator: React.FC = () => {
  const [calculation, setCalculation] = useState<SIPCalculation>({
    monthlyInvestment: 5000,
    years: 10,
    expectedReturn: 12,
    inflationRate: 6
  });

  const [results, setResults] = useState({
    totalInvestment: 0,
    totalReturns: 0,
    inflationAdjustedValue: 0
  });

  const calculateSIP = () => {
    const monthlyRate = calculation.expectedReturn / 12 / 100;
    const months = calculation.years * 12;
    const totalInvestment = calculation.monthlyInvestment * months;
    
    let futureValue = 0;
    for (let i = 0; i < months; i++) {
      futureValue = (futureValue + calculation.monthlyInvestment) * (1 + monthlyRate);
    }

    const inflationAdjustedValue = futureValue / Math.pow(1 + calculation.inflationRate / 100, calculation.years);

    setResults({
      totalInvestment,
      totalReturns: futureValue - totalInvestment,
      inflationAdjustedValue
    });
  };

  useEffect(() => {
    calculateSIP();
  }, [calculation]);

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">SIP Calculator</h1>
          <p className="text-gray-400 text-lg">
            Calculate your systematic investment plan returns with inflation adjustment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Investment Details</h2>
            <div className="space-y-6">
              {[
                {
                  label: 'Monthly Investment (₹)',
                  key: 'monthlyInvestment',
                  icon: DollarSign,
                  step: 500
                },
                {
                  label: 'Time Period (Years)',
                  key: 'years',
                  icon: Calendar,
                  step: 1
                },
                {
                  label: 'Expected Return (%)',
                  key: 'expectedReturn',
                  icon: TrendingUp,
                  step: 0.5
                },
                {
                  label: 'Inflation Rate (%)',
                  key: 'inflationRate',
                  icon: PieChart,
                  step: 0.5
                }
              ].map(field => (
                <div key={field.key} className="space-y-2">
                  <label className="flex items-center text-gray-300">
                    <field.icon className="w-4 h-4 mr-2" />
                    {field.label}
                  </label>
                  <input
                    type="number"
                    value={calculation[field.key as keyof SIPCalculation]}
                    onChange={(e) => setCalculation({
                      ...calculation,
                      [field.key]: Number(e.target.value)
                    })}
                    step={field.step}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: 'Total Investment',
                  value: results.totalInvestment,
                  color: 'from-blue-600 to-cyan-600'
                },
                {
                  label: 'Total Returns',
                  value: results.totalReturns,
                  color: 'from-green-600 to-emerald-600'
                },
                {
                  label: 'Inflation Adjusted Value',
                  value: results.inflationAdjustedValue,
                  color: 'from-purple-600 to-pink-600'
                }
              ].map((result, index) => (
                <motion.div
                  key={result.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-xl p-6"
                >
                  <h3 className="text-gray-400 mb-2">{result.label}</h3>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>
                    ₹{Math.round(result.value).toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Investment Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-gray-800 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Investment Timeline</h3>
              <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-gradient-to-r from-blue-600 to-cyan-600"
                  style={{ width: `${(results.totalInvestment / (results.totalInvestment + results.totalReturns)) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-400">Principal</span>
                <span className="text-gray-400">Returns</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;
