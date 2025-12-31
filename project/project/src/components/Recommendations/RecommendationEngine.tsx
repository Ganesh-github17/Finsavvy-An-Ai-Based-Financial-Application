import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, AlertCircle, TrendingUp, DollarSign, Target } from 'lucide-react';

interface Message {
  content: string;
  type: 'user' | 'ai';
  timestamp: Date;
}

const InvestmentSuggestions: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [riskProfile, setRiskProfile] = useState<string>('');
  const [investmentGoal, setInvestmentGoal] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const mockAIResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes('stock') || lowercaseMessage.includes('equity')) {
      return "Based on current market conditions, consider diversifying your portfolio with a mix of large-cap and mid-cap stocks. Some sectors showing promise include technology, healthcare, and renewable energy. Remember to do thorough research before investing.";
    }
    
    if (lowercaseMessage.includes('mutual fund') || lowercaseMessage.includes('sip')) {
      return "For mutual fund investments, I recommend starting with index funds for their low cost and market-matching returns. You might want to consider a mix of equity and debt funds based on your risk appetite. Some top-rated funds include...";
    }
    
    if (lowercaseMessage.includes('risk') || lowercaseMessage.includes('safe')) {
      return "To manage risk, consider following the 60-40 rule: 60% in equity and 40% in debt instruments. You can adjust this ratio based on your risk tolerance and investment horizon.";
    }
    
    return "I understand you're interested in investments. Could you please provide more specific details about your investment goals, risk tolerance, and preferred investment horizon? This will help me give you more tailored suggestions.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        content: mockAIResponse(userMessage.content),
        type: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1000);
  };

  const riskProfiles = [
    { id: 'conservative', label: 'Conservative', description: 'Focus on capital preservation with steady returns' },
    { id: 'moderate', label: 'Moderate', description: 'Balance between growth and stability' },
    { id: 'aggressive', label: 'Aggressive', description: 'Maximum growth potential with higher risk' }
  ];

  const investmentGoals = [
    { id: 'retirement', label: 'Retirement Planning', icon: Target },
    { id: 'wealth', label: 'Wealth Creation', icon: DollarSign },
    { id: 'trading', label: 'Active Trading', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI Investment Advisor
          </h2>
          <p className="text-lg text-gray-600">
            Get personalized investment suggestions based on your profile
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-8"
          >
            {/* Risk Profile */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Risk Profile</h3>
              <div className="space-y-4">
                {riskProfiles.map(profile => (
                  <motion.div
                    key={profile.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                      riskProfile === profile.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-transparent bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setRiskProfile(profile.id)}
                  >
                    <h4 className="font-medium text-gray-800">{profile.label}</h4>
                    <p className="text-sm text-gray-600">{profile.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Investment Goals */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Investment Goal</h3>
              <div className="space-y-4">
                {investmentGoals.map(goal => {
                  const Icon = goal.icon;
                  return (
                    <motion.div
                      key={goal.id}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center p-4 rounded-lg cursor-pointer border-2 transition-all ${
                        investmentGoal === goal.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-transparent bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => setInvestmentGoal(goal.id)}
                    >
                      <Icon className="w-5 h-5 text-indigo-600 mr-3" />
                      <span className="font-medium text-gray-800">{goal.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-indigo-50 flex flex-col h-[600px]"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center">
                <MessageSquare className="w-6 h-6 text-indigo-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Investment Assistant</h3>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Ask me anything about investments!</p>
                  <p className="text-sm mt-2">
                    Example: "What are the best investment options for a conservative investor?"
                  </p>
                </div>
              )}
              
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.type === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-2 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSubmit} className="flex space-x-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about investment options..."
                  className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center"
                  disabled={loading}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSuggestions;
