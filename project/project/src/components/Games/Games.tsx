import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Clock, Star, GamepadIcon, TrendingUp, Wallet, Brain, Info, ChevronRight } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  players: string;
  duration: string;
  icon: React.ElementType;
  skills: string[];
  realWorldApplications: string[];
  comingSoon?: boolean;
}

const Games: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const games: Game[] = [
    {
      id: 'budget-hero',
      title: 'Budget Hero',
      description: 'Master personal finance by managing virtual income, expenses, and savings goals.',
      difficulty: 'Beginner',
      players: '1 Player',
      duration: '15-20 min',
      icon: Wallet,
      skills: [
        'Budget planning',
        'Expense tracking',
        'Savings management',
        'Financial goal setting'
      ],
      realWorldApplications: [
        'Personal budgeting',
        'Expense optimization',
        'Emergency fund planning',
        'Financial goal achievement'
      ]
    },
    {
      id: 'investment-sim',
      title: 'Investment Simulator',
      description: 'Build and manage an investment portfolio with virtual money in a realistic market environment.',
      difficulty: 'Intermediate',
      players: '1 Player',
      duration: '30-45 min',
      icon: TrendingUp,
      skills: [
        'Portfolio management',
        'Risk assessment',
        'Market analysis',
        'Investment strategy'
      ],
      realWorldApplications: [
        'Stock market investing',
        'Portfolio diversification',
        'Risk management',
        'Long-term wealth building'
      ]
    },
    {
      id: 'market-master',
      title: 'Market Master',
      description: 'Compete with other players in a fast-paced stock trading competition.',
      difficulty: 'Advanced',
      players: '2-4 Players',
      duration: '45-60 min',
      icon: GamepadIcon,
      skills: [
        'Technical analysis',
        'Trading strategies',
        'Market timing',
        'Risk management'
      ],
      realWorldApplications: [
        'Day trading',
        'Market trend analysis',
        'Trading psychology',
        'Risk-reward optimization'
      ]
    },
    {
      id: 'money-maze',
      title: 'Money Maze',
      description: 'Navigate through financial challenges and learn about smart money management.',
      difficulty: 'Beginner',
      players: '1 Player',
      duration: '20-30 min',
      icon: Brain,
      skills: [
        'Financial decision making',
        'Problem solving',
        'Resource management',
        'Risk assessment'
      ],
      realWorldApplications: [
        'Daily financial decisions',
        'Financial problem solving',
        'Resource allocation',
        'Risk evaluation'
      ],
      comingSoon: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'text-green-500';
      case 'intermediate':
        return 'text-yellow-500';
      case 'advanced':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    if (game.id === 'money-maze') {
      // navigate('/games/money-maze'); // This line is commented out because the navigate function is not defined in the provided code
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Financial Games</h1>
      <p className="text-gray-400 mb-6">Learn finance through interactive gameplay</p>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Side - Game Info */}
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-dark-card rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">About {selectedGame ? selectedGame.title : 'Games'}</h2>
            {selectedGame ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Skills You'll Learn</h3>
                  <ul className="space-y-2">
                    {selectedGame.skills.map((skill, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-300">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Game Details</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      <span>Difficulty: <span className={getDifficultyColor(selectedGame.difficulty)}>{selectedGame.difficulty}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{selectedGame.players}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{selectedGame.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-400">
                <div className="text-center">
                  <Info className="w-12 h-12 mx-auto mb-2 text-primary" />
                  <p>Select a game to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center - Games */}
        <div className="col-span-12 lg:col-span-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {games.map((game) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-dark-card rounded-lg p-6 cursor-pointer transition-all ${
                  selectedGame?.id === game.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleGameSelect(game)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/20">
                    <game.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{game.description}</p>
                    {!game.comingSoon && (
                      <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors">
                        Play Now
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side - Real World Applications */}
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-dark-card rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Real-World Applications</h2>
            {selectedGame ? (
              <div className="space-y-4">
                {selectedGame.realWorldApplications.map((application, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
                  >
                    <p className="text-gray-300">{application}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-400">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2 text-primary" />
                  <p>Select a game to view applications</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
