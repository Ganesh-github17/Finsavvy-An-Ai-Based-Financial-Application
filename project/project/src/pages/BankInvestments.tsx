import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, PieChart, LineChart, ArrowRight, Info, ShieldCheck, BadgeIndianRupee } from 'lucide-react';

interface InvestmentType {
  id: string;
  title: string;
  description: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  expectedReturns: string;
  minInvestment: number;
  features: string[];
  benefits: string[];
  requirements: string[];
}

const BankInvestments: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const investmentTypes: InvestmentType[] = [
    {
      id: 'mutual-funds',
      title: 'Mutual Funds',
      description: 'Professionally managed investment funds',
      riskLevel: 'Moderate',
      expectedReturns: '12-15% p.a.',
      minInvestment: 1000,
      features: [
        'Diversified portfolio',
        'Professional management',
        'SIP option available',
        'High liquidity',
        'Regular performance updates',
        'Multiple fund options'
      ],
      benefits: [
        'Portfolio diversification',
        'Professional fund management',
        'Tax benefits under 80C',
        'Flexible investment options'
      ],
      requirements: [
        'KYC documents',
        'PAN card',
        'Bank account',
        'Investment amount',
        'Risk assessment'
      ]
    },
    {
      id: 'fixed-deposits',
      title: 'Fixed Deposits',
      description: 'Secure fixed-term investments',
      riskLevel: 'Low',
      expectedReturns: '5-7% p.a.',
      minInvestment: 10000,
      features: [
        'Guaranteed returns',
        'Flexible tenure',
        'Auto-renewal option',
        'Loan facility',
        'Senior citizen benefits',
        'Multiple payout options'
      ],
      benefits: [
        'Capital protection',
        'Fixed returns',
        'Regular interest payouts',
        'Tax benefits available'
      ],
      requirements: [
        'KYC documents',
        'PAN card',
        'Bank account',
        'Investment amount',
        'Tenure selection'
      ]
    },
    {
      id: 'stocks',
      title: 'Stock Investment',
      description: 'Direct equity investment in stock market',
      riskLevel: 'High',
      expectedReturns: '15-20% p.a.',
      minInvestment: 500,
      features: [
        'Real-time trading',
        'Market research tools',
        'Portfolio tracking',
        'Multiple order types',
        'Mobile trading app',
        'Expert recommendations'
      ],
      benefits: [
        'High return potential',
        'Ownership in companies',
        'Dividend income',
        'High liquidity'
      ],
      requirements: [
        'Demat account',
        'Trading account',
        'KYC documents',
        'PAN card',
        'Risk assessment'
      ]
    },
    {
      id: 'bonds',
      title: 'Government Bonds',
      description: 'Safe investment in government securities',
      riskLevel: 'Low',
      expectedReturns: '7-8% p.a.',
      minInvestment: 5000,
      features: [
        'Sovereign guarantee',
        'Regular interest payments',
        'Tax benefits',
        'Long-term options',
        'Secondary market trading',
        'Multiple series available'
      ],
      benefits: [
        'Capital safety',
        'Regular income',
        'Tax advantages',
        'Government backing'
      ],
      requirements: [
        'KYC documents',
        'PAN card',
        'Bank account',
        'Investment amount',
        'Tenure selection'
      ]
    },
    {
      id: 'gold',
      title: 'Digital Gold',
      description: 'Investment in digital gold',
      riskLevel: 'Moderate',
      expectedReturns: '8-12% p.a.',
      minInvestment: 100,
      features: [
        '24K pure gold',
        'Secure storage',
        'Physical delivery option',
        'Flexible investment',
        'Real-time pricing',
        'Easy liquidation'
      ],
      benefits: [
        'No storage hassle',
        'High liquidity',
        'Inflation hedge',
        'Small ticket size'
      ],
      requirements: [
        'KYC documents',
        'PAN card',
        'Bank account',
        'Mobile number',
        'Email ID'
      ]
    }
  ];

  const getRiskColor = (risk: 'Low' | 'Moderate' | 'High') => {
    switch (risk) {
      case 'Low':
        return 'text-green-400';
      case 'Moderate':
        return 'text-yellow-400';
      case 'High':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
          Investment Options
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our range of investment products to grow your wealth.
          Choose from various options based on your risk appetite and investment goals.
        </p>
      </div>

      {/* Investment Types Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {investmentTypes.map((investment) => (
          <div
            key={investment.id}
            className={`bg-gray-800 rounded-xl p-6 border-2 transition-all duration-300 ${
              selectedType === investment.id
                ? 'border-blue-500'
                : 'border-transparent hover:border-gray-700'
            }`}
            onClick={() => setSelectedType(investment.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">{investment.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{investment.description}</p>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getRiskColor(investment.riskLevel)}`}>
                  {investment.riskLevel} Risk
                </div>
                <div className="text-sm text-gray-400">
                  Returns: {investment.expectedReturns}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <ShieldCheck className="w-5 h-5 text-blue-400 mr-2" />
                  Features
                </h4>
                <ul className="space-y-2">
                  {investment.features.map((feature, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <BadgeIndianRupee className="w-5 h-5 text-blue-400 mr-2" />
                  Benefits
                </h4>
                <ul className="space-y-2">
                  {investment.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {selectedType === investment.id && (
              <div className="mt-6 border-t border-gray-700 pt-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Requirements</h4>
                  <ul className="space-y-2">
                    {investment.requirements.map((req, index) => (
                      <li key={index} className="text-gray-300 flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Link
                    to={`/virtual-bank/investments/${investment.id}`}
                    className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Invest Now <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Information Note */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-start">
          <Info className="w-6 h-6 text-blue-400 mr-3 mt-1" />
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Important Information</h4>
            <ul className="space-y-2 text-gray-300">
              <li>• Past performance is not indicative of future returns</li>
              <li>• Investments are subject to market risks</li>
              <li>• Read all scheme related documents carefully</li>
              <li>• Consult your financial advisor before investing</li>
              <li>• Investment value may go up or down based on market conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankInvestments;
