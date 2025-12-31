import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { Line } from 'react-chartjs-2';

const SIPCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [years, setYears] = useState<number>(10);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [result, setResult] = useState<{
    totalInvestment: number;
    totalReturns: number;
    maturityValue: number;
    monthlyData: number[];
  }>({
    totalInvestment: 0,
    totalReturns: 0,
    maturityValue: 0,
    monthlyData: []
  });

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / (12 * 100);
    const months = years * 12;
    const monthlyData: number[] = [];
    
    let futureValue = 0;
    for (let i = 1; i <= months; i++) {
      futureValue = (monthlyInvestment + futureValue) * (1 + monthlyRate);
      monthlyData.push(Math.round(futureValue));
    }

    const totalInvestment = monthlyInvestment * months;
    const maturityValue = Math.round(futureValue);
    const totalReturns = maturityValue - totalInvestment;

    setResult({
      totalInvestment,
      totalReturns,
      maturityValue,
      monthlyData
    });
  };

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, years, expectedReturn]);

  const chartData = {
    labels: Array.from({ length: years * 12 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Portfolio Value',
        data: result.monthlyData,
        fill: true,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Value: ₹${context.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Portfolio Value (₹)'
        },
        ticks: {
          callback: (value: number) => `₹${(value / 1000).toFixed(0)}K`
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            SIP Calculator
          </h2>
          <p className="text-lg text-gray-600">
            Plan your financial future with our SIP calculator
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-50"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Investment (₹)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="pl-10 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter monthly investment"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Period (Years)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="pl-10 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter time period"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Return Rate (% p.a.)
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="pl-10 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter expected return rate"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-4 text-white"
              >
                <p className="text-sm opacity-80">Total Investment</p>
                <p className="text-xl font-bold">₹{result.totalInvestment.toLocaleString()}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white"
              >
                <p className="text-sm opacity-80">Total Returns</p>
                <p className="text-xl font-bold">₹{result.totalReturns.toLocaleString()}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white"
              >
                <p className="text-sm opacity-80">Maturity Value</p>
                <p className="text-xl font-bold">₹{result.maturityValue.toLocaleString()}</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-50"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Growth Projection</h3>
            <Line data={chartData} options={chartOptions} />
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-indigo-50"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Investment Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Start Early</h4>
              <p className="text-gray-600">
                The power of compounding works best over longer periods. Starting early gives your money more time to grow.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-white rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Stay Consistent</h4>
              <p className="text-gray-600">
                Regular investments, even if small, can lead to significant wealth creation over time.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Diversify</h4>
              <p className="text-gray-600">
                Don't put all your eggs in one basket. Spread your investments across different asset classes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SIPCalculator;
