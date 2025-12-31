import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator } from 'lucide-react';

const FinancialCalculator: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateInterest = () => {
    const principal = parseFloat(amount);
    const interestRate = parseFloat(rate) / 100;
    const years = parseFloat(time);

    if (principal && interestRate && years) {
      const interest = principal * (1 + interestRate * years);
      setResult(interest);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/tools')}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Tools
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <Calculator className="w-6 h-6 text-slate-900" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Financial Calculator</h1>
            <p className="text-slate-400">Calculate interest rates, loan payments, and investment returns</p>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Principal Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white
                  focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white
                  focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Enter rate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Time (Years)
              </label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white
                  focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Enter years"
              />
            </div>
          </div>

          <button
            onClick={calculateInterest}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg
              transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
              flex items-center justify-center gap-2 font-medium"
          >
            Calculate
          </button>

          {result !== null && (
            <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Result</h3>
              <p className="text-blue-300">
                Final Amount: ${result.toFixed(2)}
                <br />
                Interest Earned: ${(result - parseFloat(amount)).toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialCalculator;
