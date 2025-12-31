import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const topUsers = [
    { rank: 1, name: "Alex Thompson", points: 15000, badge: Crown },
    { rank: 2, name: "Sarah Chen", points: 12500, badge: Medal },
    { rank: 3, name: "Michael Rodriguez", points: 10800, badge: Award },
  ];

  const categories = [
    { name: "Investment Master", description: "Highest returns in simulation" },
    { name: "Knowledge Seeker", description: "Most courses completed" },
    { name: "Quick Thinker", description: "Best performance in quizzes" },
    { name: "Market Guru", description: "Most accurate market predictions" }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Leaderboard
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Top performers in financial literacy and investment challenges
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-semibold">Top Performers</h2>
            </div>
            <div className="space-y-4">
              {topUsers.map((user) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-gray-400">#{user.rank}</span>
                    <user.badge className="w-6 h-6 text-yellow-500" />
                    <span className="font-semibold">{user.name}</span>
                  </div>
                  <span className="font-mono font-bold text-blue-600">{user.points.toLocaleString()} pts</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;