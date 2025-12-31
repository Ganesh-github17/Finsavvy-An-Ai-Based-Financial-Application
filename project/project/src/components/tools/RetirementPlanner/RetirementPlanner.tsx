import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Brain, ChartBar, Calendar, DollarSign, TrendingUp, List, ArrowRight } from 'lucide-react';

// Get environment variables safely
const NVIDIA_API_KEY = import.meta.env.VITE_NVIDIA_API_KEY || window.env?.NVIDIA_API_KEY;

interface RetirementPlan {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturn: number;
  inflationRate: number;
}

interface AIRecommendation {
  type: string;
  message: string;
  action: string;
}

const RetirementPlanner: React.FC = () => {
  const [plan, setPlan] = useState<RetirementPlan>({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 1000,
    expectedReturn: 7,
    inflationRate: 2,
  });

  const [projectedSavings, setProjectedSavings] = useState<number>(0);
  const [monthlyIncomeNeeded, setMonthlyIncomeNeeded] = useState<number>(0);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'calculator' | 'ai' | 'todo'>('calculator');
  const [todos, setTodos] = useState<{ id: string; text: string; completed: boolean }[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const calculateRetirement = () => {
    const years = plan.retirementAge - plan.currentAge;
    const monthlyRate = plan.expectedReturn / 100 / 12;
    const months = years * 12;
    
    let futureValue = plan.currentSavings;
    for (let i = 0; i < months; i++) {
      futureValue = futureValue * (1 + monthlyRate) + plan.monthlyContribution;
    }
    
    setProjectedSavings(Math.round(futureValue));
    setMonthlyIncomeNeeded(Math.round(futureValue * 0.04 / 12));
  };

  const fetchAIRecommendations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.nvidia.com/v1/financial-insights/retirement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${NVIDIA_API_KEY}`
        },
        body: JSON.stringify(plan)
      });
      
      const data = await response.json();
      setAiRecommendations(data.recommendations);
    } catch (error) {
      console.error('Error fetching AI recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    calculateRetirement();
  }, [plan]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative flex justify-center mb-8">
            <div className="relative w-72 h-72 rounded-2xl overflow-hidden group bg-gradient-to-br from-blue-600 to-purple-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Calculator className="w-16 h-16 text-white mb-4" />
                  <p className="text-white text-xl font-semibold">Retirement Planning</p>
                  <p className="text-white/80 text-sm mt-2">Secure Your Future</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Retirement Planner</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Plan your retirement with our comprehensive calculator. 
            Make informed decisions about your future with advanced financial planning tools.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          {[
            { id: 'calculator', label: 'Calculator', icon: Calculator },
            { id: 'ai', label: 'AI Consultation', icon: Brain },
            { id: 'todo', label: 'Action Items', icon: List }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-6 py-3 rounded-lg mr-4 transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Section */}
          {activeTab === 'calculator' && (
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/20 shadow-2xl"
              >
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-blue-400" />
                  Retirement Calculator
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Current Age', key: 'currentAge', icon: Calendar },
                    { label: 'Retirement Age', key: 'retirementAge', icon: Calendar },
                    { label: 'Current Savings ($)', key: 'currentSavings', icon: DollarSign },
                    { label: 'Monthly Contribution ($)', key: 'monthlyContribution', icon: DollarSign },
                    { label: 'Expected Return (%)', key: 'expectedReturn', icon: TrendingUp },
                    { label: 'Inflation Rate (%)', key: 'inflationRate', icon: ChartBar }
                  ].map(field => (
                    <div key={field.key} className="relative group">
                      <label className="flex items-center text-blue-300 mb-2 text-sm">
                        <field.icon className="w-4 h-4 mr-2" />
                        {field.label}
                      </label>
                      <input
                        type="number"
                        value={plan[field.key as keyof RetirementPlan]}
                        onChange={(e) => setPlan({ ...plan, [field.key]: Number(e.target.value) })}
                        className="w-full bg-blue-900/20 text-white rounded-xl px-4 py-3 border border-blue-500/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all duration-200"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Results Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/20 shadow-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center p-6 bg-white/5 rounded-2xl">
                    <h3 className="text-blue-300 mb-2">Total Savings at Retirement</h3>
                    <p className="text-4xl font-bold text-green-400">
                      ${projectedSavings.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-2xl">
                    <h3 className="text-blue-300 mb-2">Monthly Income in Retirement</h3>
                    <p className="text-4xl font-bold text-blue-400">
                      ${monthlyIncomeNeeded.toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* AI Insights Section */}
          {activeTab === 'ai' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/20 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white flex items-center">
                  <Brain className="w-6 h-6 mr-2 text-purple-400" />
                  AI Insights
                </h2>
                <button
                  onClick={() => setActiveTab('ai')}
                  className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-colors flex items-center"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>

              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {aiRecommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-purple-900/20 border border-purple-500/20"
                      >
                        <h3 className="text-purple-300 font-medium mb-2">{rec.type}</h3>
                        <p className="text-gray-300 text-sm">{rec.message}</p>
                        <p className="text-purple-400 text-sm mt-2">{rec.action}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Todo List Section */}
          {activeTab === 'todo' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="lg:col-span-3"
            >
              <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
                <h2 className="text-2xl font-semibold text-white mb-6">Retirement Planning Tasks</h2>
                
                {/* Add Todo Form */}
                <div className="flex mb-6">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 bg-gray-700 text-white rounded-l-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                  />
                  <button
                    onClick={addTodo}
                    className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>

                {/* Todo List */}
                <div className="space-y-4">
                  {todos.map(todo => (
                    <motion.div
                      key={todo.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between bg-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`ml-3 text-white ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                          {todo.text}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <List className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetirementPlanner;
