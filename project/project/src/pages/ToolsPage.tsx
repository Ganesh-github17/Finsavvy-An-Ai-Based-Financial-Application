import React from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  LineChart,
  PieChart,
  DollarSign,
  Percent,
  TrendingUp,
  ArrowRight,
  FileSpreadsheet
} from 'lucide-react';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
}

const tools: Tool[] = [
  {
    id: 'calculator',
    title: 'Financial Calculator',
    description: 'Calculate loans, mortgages, investments, and more',
    icon: Calculator,
    link: '/tools/calculator'
  },
  {
    id: 'portfolio-analyzer',
    title: 'Portfolio Analyzer',
    description: 'Analyze your investment portfolio performance',
    icon: LineChart,
    link: '/tools/portfolio-analyzer'
  },
  {
    id: 'risk-assessment',
    title: 'Risk Assessment',
    description: 'Evaluate your investment risk tolerance',
    icon: PieChart,
    link: '/tools/risk-assessment'
  },
  {
    id: 'budget-planner',
    title: 'Budget Planner',
    description: 'Create and manage your personal budget',
    icon: DollarSign,
    link: '/tools/budget-planner'
  },
  {
    id: 'compound-calculator',
    title: 'Compound Interest',
    description: 'Calculate compound interest and growth',
    icon: Percent,
    link: '/tools/compound-calculator'
  },
  {
    id: 'stock-screener',
    title: 'Stock Screener',
    description: 'Find stocks based on custom criteria',
    icon: TrendingUp,
    link: '/tools/stock-screener'
  },
  {
    id: 'excel-templates',
    title: 'Excel Templates',
    description: 'Download financial planning templates',
    icon: FileSpreadsheet,
    link: '/tools/templates'
  }
];

const ToolsPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Financial Tools</h1>
        <p className="text-gray-400">
          Powerful tools to help you make informed financial decisions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.id}
              className="bg-dark-card rounded-lg p-6 cursor-pointer hover:bg-gray-800/50 group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/20">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {tool.title}
              </h3>
              <p className="text-gray-400">{tool.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ToolsPage;
