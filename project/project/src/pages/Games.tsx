import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Coins, PiggyBank, TrendingUp, Clock, Users, Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Games = () => {
    const navigate = useNavigate();

    const games = [
        {
            id: 'money-maze',
            title: 'Money Maze',
            description: 'Navigate through the financial maze, collect coins, and learn investment strategies in this exciting game!',
            icon: <Coins className="w-8 h-8" />,
            difficulty: 'Beginner',
            duration: '10-15 min',
            players: '1 Player',
            skills: ['Investment Basics', 'Strategic Planning', 'Resource Management'],
            color: 'from-blue-500 to-purple-600'
        },
        {
            id: 'budget-hero',
            title: 'Budget Hero',
            description: 'Master budgeting skills in this exciting adventure. Make smart financial decisions and achieve your savings goals!',
            icon: <PiggyBank className="w-8 h-8" />,
            difficulty: 'Beginner',
            duration: '15-20 min',
            players: '1 Player',
            skills: ['Budgeting', 'Financial Planning', 'Goal Setting'],
            color: 'from-green-500 to-teal-600'
        },
        {
            id: 'investment-simulator',
            title: 'Investment Simulator',
            description: 'Practice investment strategies with virtual money. Build and manage your portfolio in a risk-free environment.',
            icon: <TrendingUp className="w-8 h-8" />,
            difficulty: 'Intermediate',
            duration: '30-45 min',
            players: '1 Player',
            skills: ['Portfolio Management', 'Risk Assessment', 'Market Analysis'],
            color: 'from-yellow-500 to-orange-600'
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold text-white mb-4">
                    Financial Games
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Learn financial concepts through interactive gameplay
                </p>
            </motion.div>

            {/* Games Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="max-w-7xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
                {games.map((game) => (
                    <motion.div
                        key={game.id}
                        variants={item}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative group"
                    >
                        <div
                            onClick={() => navigate(`/games/${game.id}`)}
                            className="h-full cursor-pointer rounded-2xl bg-gray-800 p-6 transition-all duration-300 border border-gray-700 hover:border-blue-500 overflow-hidden"
                        >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${game.color} p-3 text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                                {game.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                {game.title}
                            </h3>
                            <p className="text-gray-400 mb-6">
                                {game.description}
                            </p>

                            {/* Game Details */}
                            <div className="space-y-3">
                                <div className="flex items-center text-gray-400">
                                    <Trophy className="w-4 h-4 mr-2" />
                                    <span>{game.difficulty}</span>
                                </div>
                                <div className="flex items-center text-gray-400">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span>{game.duration}</span>
                                </div>
                                <div className="flex items-center text-gray-400">
                                    <Users className="w-4 h-4 mr-2" />
                                    <span>{game.players}</span>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="mt-6 flex flex-wrap gap-2">
                                {game.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300"
                                    >
                                        <Star className="w-3 h-3 mr-1" />
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Play Button */}
                            <button className="mt-6 w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-300 flex items-center justify-center group">
                                Play Now
                                <motion.div
                                    className="ml-2"
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    →
                                </motion.div>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Games;