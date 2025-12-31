import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calculator,
  Receipt,
  PiggyBank,
  Wallet,
  Bot,
  LineChart,
  ListTodo,
  CreditCard,
  DollarSign,
  Building2
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface Tool {
  title: string;
  description: string;
  icon: JSX.Element;
  to: string;
  gradient: string;
  model?: React.ComponentType;
}

const Tools: React.FC = () => {
  const tools: Tool[] = [
    {
      title: 'SIP Calculator',
      description: 'Calculate your Systematic Investment Plan returns',
      icon: <Calculator className="w-6 h-6 text-white" />,
      to: '/tools/sip-calculator',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Tax Calculator',
      description: 'Estimate your income tax liability',
      icon: <Receipt className="w-6 h-6 text-white" />,
      to: '/tools/tax-calculator',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Retirement Planner',
      description: 'Plan your retirement savings and goals',
      icon: <PiggyBank className="w-6 h-6 text-white" />,
      to: '/tools/retirement-planner',
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      title: 'Budget Planner',
      description: 'Track and manage your monthly budget',
      icon: <Wallet className="w-6 h-6 text-white" />,
      to: '/tools/budget-planner',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      title: 'AI Advisor',
      description: 'Get personalized financial advice',
      icon: <Bot className="w-6 h-6 text-white" />,
      to: '/tools/ai-advisor',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'Stock Predictor',
      description: 'Analyze stock trends and predictions',
      icon: <LineChart className="w-6 h-6 text-white" />,
      to: '/tools/stock-predictor',
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      title: 'Todo List',
      description: 'Manage your financial tasks',
      icon: <ListTodo className="w-6 h-6 text-white" />,
      to: '/tools/todo-list',
      gradient: 'from-lime-500 to-green-600'
    },
    {
      title: 'Credit Score',
      description: 'Monitor your credit health',
      icon: <CreditCard className="w-6 h-6 text-white" />,
      to: '/tools/credit-score',
      gradient: 'from-red-500 to-rose-600'
    },
    {
      title: 'Emergency Fund',
      description: 'Plan your emergency savings',
      icon: <DollarSign className="w-6 h-6 text-white" />,
      to: '/tools/emergency-fund',
      gradient: 'from-teal-500 to-emerald-600'
    },
    {
      title: 'Virtual Bank',
      description: 'Learn banking through simulation',
      icon: <Building2 className="w-6 h-6 text-white" />,
      to: '/virtual-bank',
      gradient: 'from-blue-500 to-violet-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Financial Tools</h1>
          <p className="text-xl text-slate-400">
            Powerful tools to help you manage your finances and make informed decisions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <Link
                to={tool.to}
                className="block h-full p-6 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg hover:bg-slate-800/70 transition-colors overflow-hidden"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.gradient}`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{tool.title}</h3>
                </div>
                <p className="text-slate-400 mb-4">{tool.description}</p>
                
                {/* 3D Canvas Area */}
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-50 group-hover:opacity-100 transition-opacity">
                  <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <OrbitControls enableZoom={false} />
                    <mesh>
                      <boxGeometry args={[1, 1, 1]} />
                      <meshStandardMaterial color={tool.gradient.split(' ')[1].split('-')[2]} />
                    </mesh>
                  </Canvas>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
