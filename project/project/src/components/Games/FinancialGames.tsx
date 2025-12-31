import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, DollarSign, Target, Award, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Game {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: React.ElementType;
  color: string;
  path: string;
}

const FinancialGames: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const games: Game[] = [
    {
      id: 'market-master',
      title: 'Market Master',
      description: 'Test your stock market knowledge with this interactive trading simulation.',
      difficulty: 'Intermediate',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      path: '/games/market-master'
    },
    {
      id: 'budget-hero',
      title: 'Budget Hero',
      description: 'Learn budgeting skills by managing virtual finances and making financial decisions.',
      difficulty: 'Beginner',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      path: '/games/budget-hero'
    },
    {
      id: 'investment-quest',
      title: 'Investment Quest',
      description: 'Embark on an adventure to build the perfect investment portfolio.',
      difficulty: 'Advanced',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      path: '/games/investment-quest'
    },
    {
      id: 'finance-trivia',
      title: 'Finance Trivia',
      description: 'Challenge your financial knowledge with this fast-paced quiz game.',
      difficulty: 'Beginner',
      icon: Brain,
      color: 'from-pink-500 to-pink-600',
      path: '/games/finance-trivia'
    }
  ];

  const filteredGames = games.filter(game => {
    const matchesDifficulty = selectedDifficulty === 'all' || game.difficulty.toLowerCase() === selectedDifficulty;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Gamepad2 className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Financial Games
          </h2>
          <p className="text-lg text-gray-600">
            Learn finance through interactive and fun games
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4">
            {['all', 'beginner', 'intermediate', 'advanced'].map((difficulty) => (
              <motion.button
                key={difficulty}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedDifficulty === difficulty
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </motion.button>
            ))}
          </div>
          
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredGames.map((game) => {
            const Icon = game.icon;
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-50"
              >
                <div className={`bg-gradient-to-r ${game.color} p-6`}>
                  <Icon className="w-8 h-8 text-white mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-white bg-opacity-20 text-white text-sm">
                    {game.difficulty}
                  </span>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{game.description}</p>
                  <div className="flex justify-between items-center">
                    <Link
                      to={game.path}
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Gamepad2 className="w-4 h-4 mr-2" />
                      Play Now
                    </Link>
                    <div className="flex items-center text-gray-500">
                      <Award className="w-4 h-4 mr-1" />
                      <span className="text-sm">Earn Points</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredGames.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Gamepad2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No games found matching your criteria</p>
          </motion.div>
        )}

        {/* Achievement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-indigo-50"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-yellow-50 to-white rounded-lg border border-yellow-100">
              <Award className="w-8 h-8 text-yellow-500 mb-2" />
              <h4 className="font-semibold text-gray-800">Games Completed</h4>
              <p className="text-2xl font-bold text-yellow-500">0/4</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100">
              <Target className="w-8 h-8 text-blue-500 mb-2" />
              <h4 className="font-semibold text-gray-800">Total Score</h4>
              <p className="text-2xl font-bold text-blue-500">0</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-100">
              <Brain className="w-8 h-8 text-green-500 mb-2" />
              <h4 className="font-semibold text-gray-800">Knowledge Level</h4>
              <p className="text-2xl font-bold text-green-500">Beginner</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FinancialGames;
