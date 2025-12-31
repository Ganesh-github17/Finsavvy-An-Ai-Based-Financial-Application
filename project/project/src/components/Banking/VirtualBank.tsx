import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BankingCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: {
    steps?: string[];
    features?: string[];
    requirements?: string[];
    tips?: string[];
  };
}

const bankingCards: BankingCard[] = [
  {
    id: 'account-creation',
    title: 'How to Create a Bank Account',
    description: 'Learn the step-by-step process of opening a bank account',
    icon: '🏦',
    content: {
      requirements: [
        'Valid government-issued ID',
        'Proof of address',
        'Initial deposit amount',
        'Social Security number or Tax ID'
      ],
      steps: [
        'Choose the type of account you want to open',
        'Gather required documents',
        'Visit bank branch or apply online',
        'Complete application form',
        'Provide required documentation',
        'Make initial deposit',
        'Receive account information and cards'
      ],
      tips: [
        'Compare different banks and their fees',
        'Read the account terms and conditions carefully',
        'Consider online banking features',
        'Ask about minimum balance requirements'
      ]
    }
  },
  {
    id: 'credit-card',
    title: 'Understanding Credit Cards',
    description: 'Learn about credit cards and their application process',
    icon: '💳',
    content: {
      features: [
        'Revolving credit line',
        'Interest-free grace period',
        'Rewards and cashback',
        'Purchase protection',
        'Fraud security'
      ],
      steps: [
        'Check your credit score',
        'Compare credit card offers',
        'Submit credit card application',
        'Wait for approval decision',
        'Receive and activate card',
        'Set up online account access'
      ],
      tips: [
        'Pay full balance to avoid interest',
        'Monitor credit utilization',
        'Set up automatic payments',
        'Review statements regularly'
      ]
    }
  },
  {
    id: 'transaction-ledger',
    title: 'Managing Transaction Ledgers',
    description: 'Understanding how banks track and manage transactions',
    icon: '📒',
    content: {
      features: [
        'Double-entry bookkeeping',
        'Real-time transaction tracking',
        'Automated reconciliation',
        'Digital statements',
        'Transaction categorization'
      ],
      steps: [
        'Record each transaction immediately',
        'Categorize income and expenses',
        'Reconcile with bank statements',
        'Monitor account balances',
        'Review for unauthorized charges'
      ]
    }
  },
  {
    id: 'account-types',
    title: 'Types of Bank Accounts',
    description: 'Explore different types of bank accounts and their features',
    icon: '📋',
    content: {
      features: [
        'Savings Account: Earn interest on deposits',
        'Checking Account: Daily transactions and bill payments',
        'Zero Balance Account: No minimum balance required',
        'Fixed Deposit: Higher interest rates for term deposits',
        'Money Market Account: Higher yields with some restrictions'
      ],
      tips: [
        'Choose accounts based on your needs',
        'Consider interest rates and fees',
        'Look for accounts with no monthly fees',
        'Check minimum balance requirements',
        'Review withdrawal limitations'
      ]
    }
  },
  {
    id: 'money-transfer',
    title: 'Advanced Payment Methods',
    description: 'Learn about modern money transfer techniques',
    icon: '💸',
    content: {
      features: [
        'NEFT: National Electronic Funds Transfer',
        'RTGS: Real-Time Gross Settlement',
        'UPI: Unified Payments Interface',
        'Wire Transfer: International money transfer',
        'Mobile Banking: Instant transfers via app'
      ],
      steps: [
        'Add beneficiary account',
        'Verify recipient details',
        'Choose transfer method',
        'Enter amount and purpose',
        'Authorize transaction',
        'Save receipt for records'
      ]
    }
  }
];

const VirtualBank: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<BankingCard | null>(null);

  const renderCardContent = (card: BankingCard) => {
    return (
      <div className="space-y-6">
        {card.content.steps && (
          <div>
            <h3 className="text-lg font-semibold text-amber-400 mb-2">Steps</h3>
            <ol className="list-decimal list-inside space-y-2">
              {card.content.steps.map((step, index) => (
                <li key={index} className="text-slate-300">{step}</li>
              ))}
            </ol>
          </div>
        )}
        
        {card.content.features && (
          <div>
            <h3 className="text-lg font-semibold text-amber-400 mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-2">
              {card.content.features.map((feature, index) => (
                <li key={index} className="text-slate-300">{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {card.content.requirements && (
          <div>
            <h3 className="text-lg font-semibold text-amber-400 mb-2">Requirements</h3>
            <ul className="list-disc list-inside space-y-2">
              {card.content.requirements.map((req, index) => (
                <li key={index} className="text-slate-300">{req}</li>
              ))}
            </ul>
          </div>
        )}

        {card.content.tips && (
          <div>
            <h3 className="text-lg font-semibold text-amber-400 mb-2">Tips</h3>
            <ul className="list-disc list-inside space-y-2">
              {card.content.tips.map((tip, index) => (
                <li key={index} className="text-slate-300">{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-400 mb-4">Virtual Bank Learning Center</h1>
          <p className="text-slate-300 text-lg">Master essential banking concepts and practices</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bankingCards.map((card) => (
            <motion.div
              key={card.id}
              className="bg-slate-800 rounded-lg p-6 cursor-pointer border border-slate-700 hover:border-amber-400 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedCard(card)}
            >
              <div className="flex items-start space-x-4">
                <span className="text-4xl">{card.icon}</span>
                <div>
                  <h2 className="text-xl font-semibold text-amber-400 mb-2">{card.title}</h2>
                  <p className="text-slate-300">{card.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for detailed view */}
        {selectedCard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-amber-400"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{selectedCard.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-amber-400">{selectedCard.title}</h2>
                    <p className="text-slate-300">{selectedCard.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="text-slate-400 hover:text-slate-300"
                >
                  ✕
                </button>
              </div>
              {renderCardContent(selectedCard)}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualBank;
