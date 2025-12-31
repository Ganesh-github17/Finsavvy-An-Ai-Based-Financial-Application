import React from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  return (
    <motion.div
      className="flex items-center gap-3"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg shadow-lg">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full p-2 text-slate-900"
          >
            <path
              d="M50 20 L80 70 L20 70 Z M35 45 L65 45 L50 70 Z"
              fill="currentColor"
              className="transform -rotate-45"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-amber-400">FINSAVVY</span>
        <span className="text-xs text-amber-300/80">Financial Wisdom for All</span>
      </div>
    </motion.div>
  );
};

export default Logo;
