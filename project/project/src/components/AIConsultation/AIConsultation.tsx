import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  Brain,
  Send,
  User,
  Bot,
  GraduationCap,
  Briefcase,
  PiggyBank,
  TrendingUp,
  Target,
  ChevronRight,
  Loader2
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface CareerPath {
  title: string;
  description: string;
  skills: string[];
  icon: React.ElementType;
}

const AIConsultation: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCareerPaths, setShowCareerPaths] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const careerPaths: CareerPath[] = [
    {
      title: 'Investment Banking',
      description: 'Help companies and organizations raise capital and execute financial transactions.',
      skills: ['Financial Analysis', 'Valuation', 'Deal Structuring', 'Excel Modeling'],
      icon: TrendingUp
    },
    {
      title: 'Financial Planning',
      description: 'Guide individuals and families in achieving their financial goals.',
      skills: ['Risk Management', 'Estate Planning', 'Tax Planning', 'Investment Strategy'],
      icon: Target
    },
    {
      title: 'Corporate Finance',
      description: 'Manage financial operations and strategy within organizations.',
      skills: ['Budgeting', 'Financial Planning', 'Risk Management', 'Strategic Planning'],
      icon: Briefcase
    },
    {
      title: 'Wealth Management',
      description: 'Provide comprehensive wealth management services to high-net-worth individuals.',
      skills: ['Portfolio Management', 'Asset Allocation', 'Client Relations', 'Estate Planning'],
      icon: PiggyBank
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/ai/chat', {
        user_id: 'user-123', // Replace with actual user ID from auth
        module_content: '', // Add relevant module content if needed
        question: input
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.data.message,
        timestamp: new Date(response.data.timestamp)
      };

      setMessages(prev => [...prev, aiMessage]);

      if (input.toLowerCase().includes('career') || input.toLowerCase().includes('job')) {
        setShowCareerPaths(true);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I apologize, but I'm having trouble connecting to the server. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-slate-800 rounded-lg shadow-xl overflow-hidden">
      <div className="flex items-center space-x-2 p-4 bg-slate-700">
        <Brain className="w-6 h-6 text-amber-400" />
        <h2 className="text-xl font-semibold text-white">AI Financial Advisor</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start space-x-2 ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.type === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-slate-900" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-slate-700 text-white'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            {message.type === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />

        {showCareerPaths && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-700 rounded-lg p-4 mt-4"
          >
            <h3 className="text-lg font-semibold text-amber-400 mb-3">
              Recommended Career Paths
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {careerPaths.map((career) => {
                const Icon = career.icon;
                return (
                  <div
                    key={career.title}
                    className="bg-slate-800 rounded-lg p-4 hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className="w-5 h-5 text-amber-400" />
                      <h4 className="text-white font-medium">{career.title}</h4>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">{career.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-slate-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about finance..."
            className="flex-1 bg-slate-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-amber-500 text-slate-900 rounded-lg px-4 py-2 hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIConsultation;
