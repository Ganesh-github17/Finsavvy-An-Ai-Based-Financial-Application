import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, ShieldCheck, ArrowRight, Info, Check } from 'lucide-react';

interface CardType {
  id: string;
  title: string;
  description: string;
  type: 'credit' | 'debit';
  annualFee: number;
  rewardRate: number;
  features: string[];
  benefits: string[];
  eligibility: string[];
  documents: string[];
}

const BankCards: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const cardTypes: CardType[] = [
    {
      id: 'basic-credit',
      title: 'Basic Credit Card',
      description: 'Perfect for first-time credit card users',
      type: 'credit',
      annualFee: 500,
      rewardRate: 1,
      features: [
        '1% cashback on all purchases',
        'No annual fee for first year',
        'Low minimum income requirement',
        'EMI conversion facility',
        'Fuel surcharge waiver',
        'Movie ticket discounts'
      ],
      benefits: [
        'Welcome bonus points',
        'Zero liability protection',
        'Easy bill payments',
        'Emergency card replacement'
      ],
      eligibility: [
        'Age 21-60 years',
        'Minimum monthly income ₹15,000',
        'Indian resident',
        'Good credit score'
      ],
      documents: [
        'PAN card',
        'Aadhaar card',
        'Latest salary slip',
        'Bank statements (3 months)',
        'Address proof'
      ]
    },
    {
      id: 'premium-credit',
      title: 'Premium Credit Card',
      description: 'Enhanced rewards and exclusive benefits',
      type: 'credit',
      annualFee: 2000,
      rewardRate: 2,
      features: [
        '2% cashback on all purchases',
        'Airport lounge access',
        'Movie ticket discounts',
        'Premium concierge services',
        'Higher credit limits',
        'Travel insurance'
      ],
      benefits: [
        'Priority customer service',
        'Extended warranty on purchases',
        'Purchase protection',
        'Luxury hotel privileges'
      ],
      eligibility: [
        'Age 21-60 years',
        'Minimum monthly income ₹50,000',
        'Indian resident',
        'Excellent credit score'
      ],
      documents: [
        'PAN card',
        'Aadhaar card',
        'Latest salary slip',
        'Bank statements (6 months)',
        'Income tax returns',
        'Address proof'
      ]
    },
    {
      id: 'travel-credit',
      title: 'Travel Credit Card',
      description: 'Designed for frequent travelers',
      type: 'credit',
      annualFee: 3000,
      rewardRate: 3,
      features: [
        'Air miles rewards',
        'Travel insurance',
        'Foreign currency markup waiver',
        'Airport lounge access worldwide',
        'Hotel discounts',
        'Travel assistance'
      ],
      benefits: [
        'Complimentary flight tickets',
        'Lost baggage insurance',
        'Travel concierge',
        'Hotel upgrades'
      ],
      eligibility: [
        'Age 21-60 years',
        'Minimum monthly income ₹75,000',
        'Indian resident',
        'Excellent credit score'
      ],
      documents: [
        'PAN card',
        'Aadhaar card',
        'Passport',
        'Latest salary slip',
        'Bank statements (6 months)',
        'Address proof'
      ]
    },
    {
      id: 'shopping-credit',
      title: 'Shopping Credit Card',
      description: 'Maximum rewards on shopping',
      type: 'credit',
      annualFee: 1000,
      rewardRate: 5,
      features: [
        '5% cashback on online shopping',
        'Partner store discounts',
        'EMI conversion on purchases',
        'Welcome shopping vouchers',
        'Extended warranty',
        'Purchase protection'
      ],
      benefits: [
        'Special sale previews',
        'Extra rewards on fashion',
        'Price protection',
        'Return protection'
      ],
      eligibility: [
        'Age 21-60 years',
        'Minimum monthly income ₹25,000',
        'Indian resident',
        'Good credit score'
      ],
      documents: [
        'PAN card',
        'Aadhaar card',
        'Latest salary slip',
        'Bank statements (3 months)',
        'Address proof'
      ]
    },
    {
      id: 'business-credit',
      title: 'Business Credit Card',
      description: 'Designed for business expenses',
      type: 'credit',
      annualFee: 5000,
      rewardRate: 2,
      features: [
        'Expense management tools',
        'Higher credit limits',
        'Multiple add-on cards',
        'GST benefits',
        'Travel insurance',
        'Lounge access'
      ],
      benefits: [
        'Corporate liability waiver',
        'Business travel rewards',
        'Expense tracking tools',
        'Vendor payment benefits'
      ],
      eligibility: [
        'Business age > 2 years',
        'Minimum turnover ₹50L',
        'Registered business',
        'Good business credit'
      ],
      documents: [
        'Business PAN card',
        'GST registration',
        'Business proof',
        'Bank statements (12 months)',
        'ITR (2 years)',
        'Address proof'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
          Credit & Debit Cards
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our range of cards designed to match your lifestyle. Choose from various
          options with exclusive benefits and rewards.
        </p>
      </div>

      {/* Card Types Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cardTypes.map((card) => (
          <div
            key={card.id}
            className={`bg-gray-800 rounded-xl p-6 border-2 transition-all duration-300 ${
              selectedType === card.id
                ? 'border-blue-500'
                : 'border-transparent hover:border-gray-700'
            }`}
            onClick={() => setSelectedType(card.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{card.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-400">{card.rewardRate}%</div>
                <div className="text-sm text-gray-400">Reward Rate</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <ShieldCheck className="w-5 h-5 text-blue-400 mr-2" />
                  Features
                </h4>
                <ul className="space-y-2">
                  {card.features.map((feature, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Check className="w-5 h-5 text-blue-400 mr-2" />
                  Benefits
                </h4>
                <ul className="space-y-2">
                  {card.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {selectedType === card.id && (
              <div className="mt-6 border-t border-gray-700 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Eligibility</h4>
                    <ul className="space-y-2">
                      {card.eligibility.map((item, index) => (
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
                      {card.documents.map((doc, index) => (
                        <li key={index} className="text-gray-300 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    to={`/virtual-bank/cards/apply/${card.id}`}
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
              <li>• Credit limit will be assigned based on income and credit score</li>
              <li>• Annual fees may be waived based on spending patterns</li>
              <li>• All reward points have a validity period of 2 years</li>
              <li>• Card delivery typically takes 7-10 working days</li>
              <li>• Additional documents may be required based on profile</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankCards;
