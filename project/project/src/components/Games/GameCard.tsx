import React from 'react';
import { motion } from 'framer-motion';
import { GamepadIcon, Star } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  category: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, difficulty, image, category }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{category}</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
          <GamepadIcon className="w-4 h-4" />
          <span>Play Now</span>
        </button>
      </div>
    </motion.div>
  );
};

export default GameCard;