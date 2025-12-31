import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, ArrowRight, Info } from 'lucide-react';

interface AccountType {
  id: string;
  title: string;
  description: string;
  interestRate: number;
  minBalance: number;
  features: string[];
  requirements: string[];
  documents: string[];
}

const BankAccounts: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const accountTypes: AccountType[] = [
    {
      id: 'savings',
      title: 'Savings Account',
      description: 'Basic savings account with competitive interest rates',
      interestRate: 4.0,
      minBalance: 0,
      features: [
        'Zero minimum balance',
        'Free virtual debit card',
        'Unlimited transactions',
        'Mobile banking access',
        '24/7 customer support',
        'Free SMS alerts'
      ],
      requirements: [
        'Age 18 years or above',
        'Valid ID proof',
        'Address proof',
        'PAN card'
      ],
      documents: [
        'Passport size photograph',
        'PAN card copy',
        'Aadhaar card',
        'Address proof (utility bill/passport/driving license)'
      ]
    },
    {
      id: 'premium',
      title: 'Premium Savings',
      description: 'Premium account with enhanced benefits and higher interest',
      interestRate: 5.5,
      minBalance: 25000,
      features: [
        'Priority customer service',
        'Free physical debit card',
        'Higher transaction limits',
        'Exclusive rewards',
        'Free locker service',
        'International debit card'
      ],
      requirements: [
        'Age 18 years or above',
        'Valid ID proof',
        'Address proof',
        'PAN card',
        'Minimum income proof'
      ],
      documents: [
        'Passport size photograph',
        'PAN card copy',
        'Aadhaar card',
        'Address proof',
        'Income proof (6 months salary slip/ITR)'
      ]
    },
    {
      id: 'student',
      title: 'Student Account',
      description: 'Special account designed for students',
      interestRate: 4.5,
      minBalance: 0,
      features: [
        'No minimum balance',
        'Free educational resources',
        'Special student offers',
        'Parent monitoring',
        'Education loan benefits',
        'Free debit card'
      ],
      requirements: [
        'Age 16 years or above',
        'Valid student ID',
        'Valid ID proof',
        'Address proof'
      ],
      documents: [
        'Passport size photograph',
        'Student ID card',
        'Aadhaar card',
        'Parent/Guardian ID proof',
        'Admission letter/fee receipt'
      ]
    },
    {
      id: 'salary',
      title: 'Salary Account',
      description: 'Account for receiving salary with special benefits',
      interestRate: 4.25,
      minBalance: 0,
      features: [
        'Zero balance requirement',
        'Overdraft facility',
        'Insurance benefits',
        'Special loan rates',
        'Free bill payments',
        'Corporate offers'
      ],
      requirements: [
        'Age 18 years or above',
        'Valid ID proof',
        'Address proof',
        'PAN card',
        'Employment proof'
      ],
      documents: [
        'Passport size photograph',
        'PAN card copy',
        'Aadhaar card',
        'Employee ID card',
        'Salary slip',
        'Appointment letter'
      ]
    },
    {
      id: 'fixed',
      title: 'Fixed Deposit',
      description: 'Lock-in your savings with guaranteed returns',
      interestRate: 7.0,
      minBalance: 10000,
      features: [
        'Flexible tenure options',
        'Higher interest rates',
        'Loan against FD',
        'Auto-renewal facility',
        'Senior citizen benefits',
        'Tax saving options'
      ],
      requirements: [
        'Age 18 years or above',
        'Valid ID proof',
        'Address proof',
        'PAN card',
        'Existing bank account'
      ],
      documents: [
        'Passport size photograph',
        'PAN card copy',
        'Aadhaar card',
        'Address proof',
        'Existing bank account details'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
          Open a Bank Account
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose from our range of bank accounts designed to meet your specific needs.
          Compare features and start your banking journey with us.
        </p>
      </div>

      {/* Account Types Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {accountTypes.map((account) => (
          <div
            key={account.id}
            className={`bg-gray-800 rounded-xl p-6 border-2 transition-all duration-300 ${
              selectedType === account.id
                ? 'border-blue-500'
                : 'border-transparent hover:border-gray-700'
            }`}
            onClick={() => setSelectedType(account.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{account.title}</h3>
                <p className="text-gray-400 mb-4">{account.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-400">{account.interestRate}%</div>
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
                  {account.features.map((feature, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Info className="w-5 h-5 text-blue-400 mr-2" />
                  Requirements
                </h4>
                <ul className="space-y-2">
                  {account.requirements.map((req, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {selectedType === account.id && (
              <div className="mt-6 border-t border-gray-700 pt-6">
                <h4 className="text-lg font-semibold text-white mb-3">Required Documents</h4>
                <ul className="space-y-2">
                  {account.documents.map((doc, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                      {doc}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    to={`/virtual-bank/accounts/apply/${account.id}`}
                    className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Apply Now <ArrowRight className="w-5 h-5 ml-2" />
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
              <li>• All documents should be self-attested</li>
              <li>• Original documents need to be presented for verification</li>
              <li>• Processing time is typically 2-3 working days</li>
              <li>• Interest rates are subject to change as per RBI guidelines</li>
              <li>• Additional documents may be required based on account type</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccounts;
