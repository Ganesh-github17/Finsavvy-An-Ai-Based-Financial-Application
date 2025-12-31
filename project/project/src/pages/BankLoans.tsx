import React, { useState } from 'react';
import { BadgeIndianRupee, Calculator, ShieldCheck, ArrowRight, Info } from 'lucide-react';

interface LoanType {
  id: string;
  title: string;
  description: string;
  interestRate: number;
  maxAmount: number;
  tenure: string;
  features: string[];
  eligibility: string[];
  documents: string[];
}

const BankLoans: React.FC = () => {
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);

  const loanTypes: LoanType[] = [
    {
      id: 'personal',
      title: 'Personal Loan',
      description: 'Quick personal loans for your immediate needs',
      interestRate: 10.5,
      maxAmount: 1500000,
      tenure: '12 - 60 months',
      features: [
        'No collateral required',
        'Quick disbursement',
        'Flexible repayment options',
        'Minimal documentation',
        'No prepayment charges',
        'Online application process'
      ],
      eligibility: [
        'Age: 21-58 years',
        'Minimum income: ₹25,000 per month',
        'Employment: Salaried with 2+ years experience',
        'Credit score: 700+',
        'Indian resident'
      ],
      documents: [
        'PAN Card',
        'Aadhaar Card',
        'Salary slips (3 months)',
        'Bank statements (6 months)',
        'Form 16',
        'Address proof'
      ]
    },
    {
      id: 'home',
      title: 'Home Loan',
      description: 'Affordable housing loans with competitive interest rates',
      interestRate: 8.5,
      maxAmount: 10000000,
      tenure: 'Up to 30 years',
      features: [
        'Low interest rates',
        'High loan amount',
        'Long repayment tenure',
        'Tax benefits under 80C',
        'Part prepayment allowed',
        'Property insurance included'
      ],
      eligibility: [
        'Age: 21-65 years',
        'Minimum income: ₹40,000 per month',
        'Employment: 3+ years experience',
        'Credit score: 750+',
        'Property in approved location'
      ],
      documents: [
        'Property documents',
        'Income proof',
        'Bank statements',
        'Tax returns (2 years)',
        'Employment proof',
        'Identity & address proof'
      ]
    },
    {
      id: 'education',
      title: 'Education Loan',
      description: 'Support your higher education dreams',
      interestRate: 7.5,
      maxAmount: 5000000,
      tenure: 'Up to 15 years',
      features: [
        'Competitive interest rates',
        'No collateral up to ₹4 lakhs',
        'Moratorium period',
        'Tax benefits',
        'Easy repayment options',
        'Cover all education expenses'
      ],
      eligibility: [
        'Admission in recognized institute',
        'Academic record: 60%+',
        'Co-applicant required',
        'Age: 18+ years',
        'Indian citizen'
      ],
      documents: [
        'Admission letter',
        'Mark sheets',
        'Course details',
        'College fee structure',
        'Co-applicant documents',
        'Identity proof'
      ]
    },
    {
      id: 'vehicle',
      title: 'Vehicle Loan',
      description: 'Finance your dream vehicle',
      interestRate: 9.5,
      maxAmount: 3000000,
      tenure: '12 - 84 months',
      features: [
        'Quick approval',
        'Flexible tenure',
        'Up to 100% financing',
        'Competitive rates',
        'No hidden charges',
        'Online application'
      ],
      eligibility: [
        'Age: 21-65 years',
        'Minimum income: ₹30,000 per month',
        'Employment stability',
        'Credit score: 700+',
        'Indian resident'
      ],
      documents: [
        'Vehicle quotation',
        'Income proof',
        'Bank statements',
        'PAN card',
        'Address proof',
        'Photographs'
      ]
    },
    {
      id: 'business',
      title: 'Business Loan',
      description: 'Grow your business with easy financing',
      interestRate: 11.5,
      maxAmount: 5000000,
      tenure: '12 - 60 months',
      features: [
        'Minimal documentation',
        'Quick disbursement',
        'Flexible repayment',
        'No collateral up to ₹50L',
        'Online account management',
        'Relationship manager'
      ],
      eligibility: [
        'Business age: 3+ years',
        'Annual turnover: ₹40L+',
        'Profitable business',
        'Good credit history',
        'GST registration'
      ],
      documents: [
        'Business registration',
        'GST returns',
        'Bank statements',
        'ITR (2 years)',
        'KYC documents',
        'Business proof'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
          Loan Services
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose from our range of loan products designed to meet your financial needs.
          Competitive interest rates and flexible repayment options available.
        </p>
      </div>

      {/* Loan Types Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loanTypes.map((loan) => (
          <div
            key={loan.id}
            className={`bg-gray-800 rounded-xl p-6 border-2 transition-all duration-300 ${
              selectedLoan === loan.id
                ? 'border-blue-500'
                : 'border-transparent hover:border-gray-700'
            }`}
            onClick={() => setSelectedLoan(loan.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BadgeIndianRupee className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">{loan.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{loan.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-400">{loan.interestRate}%</div>
                <div className="text-sm text-gray-400">Interest p.a.</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <ShieldCheck className="w-5 h-5 text-blue-400 mr-2" />
                  Features
                </h4>
                <ul className="space-y-2">
                  {loan.features.map((feature, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  <div className="flex items-center">
                    <Info className="w-5 h-5 text-blue-400 mr-2" />
                    Details
                  </div>
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li>Max Amount: ₹{loan.maxAmount.toLocaleString()}</li>
                  <li>Tenure: {loan.tenure}</li>
                </ul>
              </div>
            </div>

            {selectedLoan === loan.id && (
              <div className="mt-6 border-t border-gray-700 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Eligibility</h4>
                    <ul className="space-y-2">
                      {loan.eligibility.map((item, index) => (
                        <li key={index} className="text-gray-300 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Required Documents</h4>
                    <ul className="space-y-2">
                      {loan.documents.map((doc, index) => (
                        <li key={index} className="text-gray-300 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <Link
                    to={`/virtual-bank/loans/apply/${loan.id}`}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Apply Now <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link
                    to={`/virtual-bank/loans/calculator/${loan.id}`}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    EMI Calculator <Calculator className="w-5 h-5 ml-2" />
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
              <li>• Interest rates are subject to change based on market conditions</li>
              <li>• Processing fees and other charges may apply</li>
              <li>• Loan approval is subject to credit assessment</li>
              <li>• Additional documents may be required based on profile</li>
              <li>• Terms and conditions apply</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankLoans;
