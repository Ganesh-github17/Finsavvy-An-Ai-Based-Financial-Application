import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Receipt, DollarSign, Calculator, Building, Briefcase, Home } from 'lucide-react';

interface Income {
  salary: number;
  business: number;
  rental: number;
  other: number;
}

interface Deductions {
  section80C: number;
  section80D: number;
  housingLoan: number;
  others: number;
}

const TaxCalculator: React.FC = () => {
  const [income, setIncome] = useState<Income>({
    salary: 0,
    business: 0,
    rental: 0,
    other: 0
  });

  const [deductions, setDeductions] = useState<Deductions>({
    section80C: 0,
    section80D: 0,
    housingLoan: 0,
    others: 0
  });

  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('new');
  const [results, setResults] = useState({
    totalIncome: 0,
    totalDeductions: 0,
    taxableIncome: 0,
    taxAmount: 0,
    effectiveTaxRate: 0
  });

  const calculateTax = () => {
    const totalIncome = Object.values(income).reduce((a, b) => a + b, 0);
    const totalDeductions = taxRegime === 'old' 
      ? Object.values(deductions).reduce((a, b) => a + b, 0)
      : 0;
    const taxableIncome = Math.max(totalIncome - totalDeductions, 0);
    
    let taxAmount = 0;
    if (taxRegime === 'old') {
      // Old regime tax calculation
      if (taxableIncome > 1000000) {
        taxAmount += (taxableIncome - 1000000) * 0.3;
        taxAmount += 100000;
      } else if (taxableIncome > 500000) {
        taxAmount += (taxableIncome - 500000) * 0.2;
        taxAmount += 12500;
      } else if (taxableIncome > 250000) {
        taxAmount += (taxableIncome - 250000) * 0.05;
      }
    } else {
      // New regime tax calculation
      if (taxableIncome > 1500000) {
        taxAmount += (taxableIncome - 1500000) * 0.3;
        taxAmount += 187500;
      } else if (taxableIncome > 1250000) {
        taxAmount += (taxableIncome - 1250000) * 0.25;
        taxAmount += 125000;
      } else if (taxableIncome > 1000000) {
        taxAmount += (taxableIncome - 1000000) * 0.2;
        taxAmount += 75000;
      } else if (taxableIncome > 750000) {
        taxAmount += (taxableIncome - 750000) * 0.15;
        taxAmount += 37500;
      } else if (taxableIncome > 500000) {
        taxAmount += (taxableIncome - 500000) * 0.1;
        taxAmount += 12500;
      } else if (taxableIncome > 250000) {
        taxAmount += (taxableIncome - 250000) * 0.05;
      }
    }

    setResults({
      totalIncome,
      totalDeductions,
      taxableIncome,
      taxAmount,
      effectiveTaxRate: totalIncome ? (taxAmount / totalIncome) * 100 : 0
    });
  };

  useEffect(() => {
    calculateTax();
  }, [income, deductions, taxRegime]);

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Income Tax Calculator</h1>
          <p className="text-gray-400 text-lg">
            Calculate your income tax liability under both old and new tax regimes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Income Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-green-400" />
              Income Details
            </h2>
            <div className="space-y-6">
              {[
                { label: 'Salary Income', key: 'salary', icon: Briefcase },
                { label: 'Business Income', key: 'business', icon: Building },
                { label: 'Rental Income', key: 'rental', icon: Home },
                { label: 'Other Income', key: 'other', icon: DollarSign }
              ].map(field => (
                <div key={field.key} className="space-y-2">
                  <label className="flex items-center text-gray-300">
                    <field.icon className="w-4 h-4 mr-2" />
                    {field.label}
                  </label>
                  <input
                    type="number"
                    value={income[field.key as keyof Income]}
                    onChange={(e) => setIncome({
                      ...income,
                      [field.key]: Number(e.target.value)
                    })}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Deductions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-blue-400" />
                Deductions
              </h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setTaxRegime('old')}
                  className={`px-4 py-2 rounded-lg ${
                    taxRegime === 'old'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  Old Regime
                </button>
                <button
                  onClick={() => setTaxRegime('new')}
                  className={`px-4 py-2 rounded-lg ${
                    taxRegime === 'new'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  New Regime
                </button>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { label: 'Section 80C', key: 'section80C', max: 150000 },
                { label: 'Section 80D', key: 'section80D', max: 25000 },
                { label: 'Housing Loan Interest', key: 'housingLoan', max: 200000 },
                { label: 'Other Deductions', key: 'others', max: 0 }
              ].map(field => (
                <div key={field.key} className="space-y-2">
                  <label className="flex items-center justify-between text-gray-300">
                    <span>{field.label}</span>
                    {field.max > 0 && (
                      <span className="text-sm text-gray-500">
                        Max: ₹{field.max.toLocaleString()}
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    value={deductions[field.key as keyof Deductions]}
                    onChange={(e) => setDeductions({
                      ...deductions,
                      [field.key]: Math.min(Number(e.target.value), field.max || Infinity)
                    })}
                    disabled={taxRegime === 'new'}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Receipt className="w-6 h-6 mr-2 text-purple-400" />
              Tax Calculation
            </h2>
            <div className="space-y-6">
              {[
                { label: 'Total Income', value: results.totalIncome },
                { label: 'Total Deductions', value: results.totalDeductions },
                { label: 'Taxable Income', value: results.taxableIncome },
                { label: 'Tax Amount', value: results.taxAmount },
                { label: 'Effective Tax Rate', value: `${results.effectiveTaxRate.toFixed(2)}%`, isPercentage: true }
              ].map((result, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                  <span className="text-gray-300">{result.label}</span>
                  <span className="text-xl font-semibold text-white">
                    {result.isPercentage ? result.value : `₹${Math.round(result.value).toLocaleString()}`}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;
