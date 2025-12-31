import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ShoppingBag, Car, Film, Trash2, Plus, Brain, Target, Book, Trophy, DollarSign, Star, Gift, Heart, Zap, Shield, Crown, GraduationCap, Lightbulb, ChartBar, Clock } from 'lucide-react';

// Get environment variables safely
const NVIDIA_API_KEY = import.meta.env.VITE_NVIDIA_API_KEY;

interface Expense {
  id: string;
  category: string;
  amount: number;
  isEssential: boolean;
  date: Date;
  description: string;
}

interface Category {
  name: string;
  icon: JSX.Element;
  color: string;
  budgetLimit: number;
  tip: string;
  power: number;
}

interface Level {
  id: number;
  name: string;
  description: string;
  targetSavings: number;
  timeLimit: number;
  rewards: string[];
  completed: boolean;
  background: string;
  learningObjectives: {
    title: string;
    description: string;
    completed: boolean;
  }[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface LearningProgress {
  totalObjectives: number;
  completedObjectives: number;
  currentSkill: string;
  nextSkill: string;
}

const BudgetHero: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [happiness, setHappiness] = useState(100);
  const [aiInsights, setAiInsights] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [coins, setCoins] = useState(1000);
  const [streak, setStreak] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [powerUps, setPowerUps] = useState({
    doubleCoins: false,
    timeFreeze: false,
    healthBoost: false
  });
  const [showPowerUp, setShowPowerUp] = useState(false);
  const [learningProgress, setLearningProgress] = useState<LearningProgress>({
    totalObjectives: 0,
    completedObjectives: 0,
    currentSkill: "Budget Basics",
    nextSkill: "Essential Expenses"
  });

  const levels: Level[] = [
    {
      id: 1,
      name: "Budget Basics",
      description: "Learn the fundamentals of budgeting",
      targetSavings: 500,
      timeLimit: 300,
      rewards: ["100 coins", "Basic Budget Badge"],
      completed: false,
      background: "bg-gradient-to-br from-blue-900 to-blue-700",
      learningObjectives: [
        {
          title: "Understanding Income vs Expenses",
          description: "Learn to distinguish between money coming in and going out",
          completed: false
        },
        {
          title: "Essential vs Non-Essential",
          description: "Identify which expenses are necessary for daily life",
          completed: false
        },
        {
          title: "Basic Budget Planning",
          description: "Create a simple budget plan for monthly expenses",
          completed: false
        }
      ],
      difficulty: "Beginner"
    },
    {
      id: 2,
      name: "Smart Spending",
      description: "Master the art of smart spending",
      targetSavings: 1000,
      timeLimit: 400,
      rewards: ["200 coins", "Smart Spender Badge"],
      completed: false,
      background: "bg-gradient-to-br from-purple-900 to-purple-700",
      learningObjectives: [
        {
          title: "Budget Categories",
          description: "Learn to categorize expenses effectively",
          completed: false
        },
        {
          title: "Saving Strategies",
          description: "Develop strategies to save money on regular expenses",
          completed: false
        },
        {
          title: "Emergency Fund",
          description: "Understand the importance of emergency savings",
          completed: false
        }
      ],
      difficulty: "Intermediate"
    },
    {
      id: 3,
      name: "Financial Mastery",
      description: "Become a financial expert",
      targetSavings: 2000,
      timeLimit: 500,
      rewards: ["500 coins", "Financial Wizard Badge"],
      completed: false,
      background: "bg-gradient-to-br from-yellow-900 to-yellow-700",
      learningObjectives: [
        {
          title: "Investment Basics",
          description: "Learn about basic investment concepts",
          completed: false
        },
        {
          title: "Long-term Planning",
          description: "Create a long-term financial plan",
          completed: false
        },
        {
          title: "Risk Management",
          description: "Understand how to manage financial risks",
          completed: false
        }
      ],
      difficulty: "Advanced"
    }
  ];

  const categories: { [key: string]: Category } = {
    Housing: { 
      name: 'Housing', 
      icon: <Home className="w-5 h-5" />, 
      color: 'bg-blue-600',
      budgetLimit: 2000,
      tip: 'Housing should not exceed 30% of your monthly income',
      power: 3
    },
    Food: { 
      name: 'Food', 
      icon: <ShoppingBag className="w-5 h-5" />, 
      color: 'bg-green-600',
      budgetLimit: 800,
      tip: 'Plan your meals and cook at home to save on food expenses',
      power: 2
    },
    Transportation: { 
      name: 'Transportation', 
      icon: <Car className="w-5 h-5" />, 
      color: 'bg-yellow-600',
      budgetLimit: 500,
      tip: 'Consider public transportation or carpooling to reduce costs',
      power: 2
    },
    Entertainment: { 
      name: 'Entertainment', 
      icon: <Film className="w-5 h-5" />, 
      color: 'bg-purple-600',
      budgetLimit: 300,
      tip: 'Set a monthly entertainment budget and stick to it',
      power: 1
    },
  };

  const fetchAIInsights = async () => {
    if (!NVIDIA_API_KEY) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('https://api.nvidia.com/v1/financial-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${NVIDIA_API_KEY}`
        },
        body: JSON.stringify({ expenses })
      });
      
      const data = await response.json();
      setAiInsights(data.insights);
    } catch (error) {
      console.error('Error fetching AI insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (expenses.length > 0) {
      fetchAIInsights();
    }
    const timer = setInterval(() => {
      if (!powerUps.timeFreeze) {
        setGameTime(prev => prev + 1);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [expenses, powerUps.timeFreeze]);

  const addExpense = (category: string) => {
    const newExpense: Expense = {
      id: Math.random().toString(),
      category,
      amount: Math.floor(Math.random() * 1000) + 100,
      isEssential: Math.random() > 0.5,
      date: new Date(),
      description: `Monthly ${category.toLowerCase()} expense`
    };

    setExpenses([...expenses, newExpense]);
    updateHappiness(newExpense);
    checkLevelProgress();
    
    // Chance to get power-up
    if (Math.random() < 0.2) {
      setShowPowerUp(true);
    }
  };

  const removeExpense = (id: string) => {
    const expense = expenses.find(e => e.id === id);
    if (expense) {
      setExpenses(expenses.filter(e => e.id !== id));
      updateHappiness(expense, true);
      const coinReward = powerUps.doubleCoins ? 100 : 50;
      setCoins(prev => prev + coinReward);
      setStreak(prev => prev + 1);
    }
  };

  const updateHappiness = (expense: Expense, isRemoval: boolean = false) => {
    const impact = expense.isEssential ? 15 : 10;
    setHappiness(prev => {
      const newHappiness = isRemoval
        ? prev + impact
        : prev - impact;
      return Math.max(0, Math.min(100, newHappiness));
    });
  };

  const checkLevelProgress = () => {
    const currentLevelData = levels[currentLevel - 1];
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const savings = coins - totalExpenses;

    if (savings >= currentLevelData.targetSavings && gameTime <= currentLevelData.timeLimit) {
      setShowReward(true);
      setCoins(prev => prev + parseInt(currentLevelData.rewards[0]));
      if (currentLevel < levels.length) {
        setCurrentLevel(prev => prev + 1);
      }
    }
  };

  const activatePowerUp = (type: keyof typeof powerUps) => {
    setPowerUps(prev => ({ ...prev, [type]: true }));
    setShowPowerUp(false);
    
    // Power-up duration
    setTimeout(() => {
      setPowerUps(prev => ({ ...prev, [type]: false }));
    }, 30000); // 30 seconds
  };

  const checkLearningProgress = () => {
    const currentLevelData = levels[currentLevel - 1];
    const completedObjectives = currentLevelData.learningObjectives.filter(obj => obj.completed).length;
    
    setLearningProgress({
      totalObjectives: currentLevelData.learningObjectives.length,
      completedObjectives,
      currentSkill: currentLevelData.name,
      nextSkill: currentLevel < levels.length ? levels[currentLevel].name : "Master"
    });
  };

  const completeLearningObjective = (objectiveIndex: number) => {
    const currentLevelData = levels[currentLevel - 1];
    if (objectiveIndex < currentLevelData.learningObjectives.length) {
      currentLevelData.learningObjectives[objectiveIndex].completed = true;
      checkLearningProgress();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Game Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Budget Hero</h1>
          <div className="flex items-center justify-center space-x-4">
            <span className="text-gray-300">Level {currentLevel}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">{levels[currentLevel - 1].name}</span>
            <span className="text-gray-400">•</span>
            <span className={`px-2 py-1 rounded-full text-sm ${
              levels[currentLevel - 1].difficulty === 'Beginner' ? 'bg-green-900 text-green-300' :
              levels[currentLevel - 1].difficulty === 'Intermediate' ? 'bg-yellow-900 text-yellow-300' :
              'bg-red-900 text-red-300'
            }`}>
              {levels[currentLevel - 1].difficulty}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Game Stats and Learning Progress */}
          <div className="space-y-6">
            {/* Game Stats */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl bg-gray-800 border border-gray-700"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Game Stats</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <DollarSign className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <span className="text-white text-lg">{coins}</span>
                  <p className="text-gray-400 text-sm">Coins</p>
                </div>
                <div className="text-center">
                  <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <span className="text-white text-lg">{streak}</span>
                  <p className="text-gray-400 text-sm">Streak</p>
                </div>
                <div className="text-center">
                  <Heart className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <span className="text-white text-lg">{happiness}%</span>
                  <p className="text-gray-400 text-sm">Health</p>
                </div>
              </div>
            </motion.div>

            {/* Learning Progress */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl bg-gray-800 border border-gray-700"
            >
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Learning Progress</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Current Skill:</span>
                  <span className="text-white font-medium">{learningProgress.currentSkill}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Next Skill:</span>
                  <span className="text-white font-medium">{learningProgress.nextSkill}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <motion.div
                    className="bg-blue-600 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(learningProgress.completedObjectives / learningProgress.totalObjectives) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-gray-300 text-sm text-center">
                  {learningProgress.completedObjectives} of {learningProgress.totalObjectives} objectives completed
                </p>
              </div>
            </motion.div>

            {/* Financial Tips */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl bg-gray-800 border border-gray-700"
            >
              <div className="flex items-center space-x-2 mb-4">
                <ChartBar className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-semibold text-white">Financial Tips</h2>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300">• Save at least 20% of your income</p>
                <p className="text-gray-300">• Keep emergency fund for 3-6 months of expenses</p>
                <p className="text-gray-300">• Track your expenses regularly</p>
                <p className="text-gray-300">• Set specific financial goals</p>
              </div>
            </motion.div>
          </div>

          {/* Middle Column - Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Level Progress */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl bg-gray-800 border border-gray-700"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Level {currentLevel} Goal</h2>
              <p className="text-gray-300 mb-4">{levels[currentLevel - 1].description}</p>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <span className="text-white text-lg">${levels[currentLevel - 1].targetSavings}</span>
                  <p className="text-gray-400 text-sm">Target Savings</p>
                </div>
                <div className="text-center">
                  <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <span className="text-white text-lg">{levels[currentLevel - 1].timeLimit - gameTime}s</span>
                  <p className="text-gray-400 text-sm">Time Left</p>
                </div>
              </div>
            </motion.div>

            {/* Category Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(categories).map(([key, category]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addExpense(key)}
                  className="p-4 rounded-xl bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      {category.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-gray-400">Budget: ${category.budgetLimit}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Expenses List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Your Expenses</h2>
              <AnimatePresence>
                {expenses.map(expense => (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-800 border border-gray-700"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${categories[expense.category].color}`}>
                        {categories[expense.category].icon}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{expense.category}</h3>
                        <p className="text-gray-400">${expense.amount}</p>
                        <p className="text-sm text-gray-500">{expense.date.toLocaleDateString()}</p>
                      </div>
                      {expense.isEssential && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-900 text-blue-200">
                          Essential
                        </span>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeExpense(expense.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Power-ups */}
        <div className="fixed bottom-4 right-4 flex space-x-4">
          {Object.entries(powerUps).map(([key, active]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => activatePowerUp(key as keyof typeof powerUps)}
              className={`p-3 rounded-full ${
                active ? 'bg-yellow-600' : 'bg-gray-800'
              } border border-gray-700`}
            >
              {key === 'doubleCoins' && <Zap className="w-5 h-5 text-yellow-400" />}
              {key === 'timeFreeze' && <Shield className="w-5 h-5 text-blue-400" />}
              {key === 'healthBoost' && <Crown className="w-5 h-5 text-green-400" />}
            </motion.button>
          ))}
        </div>

        {/* Level Rewards */}
        <AnimatePresence>
          {showReward && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            >
              <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 text-center">
                <Gift className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Level Complete!</h2>
                <p className="text-gray-400 mb-4">Rewards:</p>
                <ul className="text-gray-300 mb-4">
                  {levels[currentLevel - 1].rewards.map((reward, index) => (
                    <li key={index}>{reward}</li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowReward(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BudgetHero;
