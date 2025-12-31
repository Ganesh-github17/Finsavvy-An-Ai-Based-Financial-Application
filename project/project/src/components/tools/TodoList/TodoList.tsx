import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListTodo, Plus, Trash2, Check, Calendar, Clock, Brain } from 'lucide-react';

// Get environment variables safely
const NVIDIA_API_KEY = import.meta.env.VITE_NVIDIA_API_KEY || window.env?.NVIDIA_API_KEY;

interface Todo {
  id: string;
  text: string;
  category: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'Savings',
    'Investment',
    'Debt',
    'Budget',
    'Insurance',
    'Tax',
    'Retirement'
  ];

  const priorities = {
    low: 'bg-green-600',
    medium: 'bg-yellow-600',
    high: 'bg-red-600'
  };

  const fetchAISuggestions = async () => {
    if (!NVIDIA_API_KEY) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('https://api.nvidia.com/v1/financial-insights/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${NVIDIA_API_KEY}`
        },
        body: JSON.stringify({ todos })
      });
      
      const data = await response.json();
      setAiSuggestions(data.suggestions);
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo,
        category: categories[0],
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'medium',
        completed: false
      };
      setTodos([...todos, todo]);
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

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    const categoryMatch = selectedCategory === 'all' || todo.category === selectedCategory;
    const priorityMatch = selectedPriority === 'all' || todo.priority === selectedPriority;
    return categoryMatch && priorityMatch;
  });

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Financial Todo List</h1>
          <p className="text-gray-400 text-lg">Track and manage your financial tasks with AI assistance</p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Todo Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-800 rounded-xl p-6 shadow-xl mb-8">
              <div className="flex mb-4">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new financial task..."
                  className="flex-1 bg-gray-700 text-white rounded-l-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                />
                <button
                  onClick={addTodo}
                  className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Task
                </button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>

            {/* Todo List */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredTodos.map(todo => (
                  <motion.div
                    key={todo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-gray-800 rounded-xl p-4 shadow-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                            todo.completed ? 'bg-green-600 border-green-600' : 'border-gray-400'
                          }`}
                        >
                          {todo.completed && <Check className="w-4 h-4 text-white" />}
                        </button>
                        <div className="flex-1">
                          <p className={`text-lg ${todo.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                            {todo.text}
                          </p>
                          <div className="flex items-center mt-2 space-x-4">
                            <span className="text-sm text-gray-400 flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {todo.dueDate}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${priorities[todo.priority]} text-white`}>
                              {todo.priority}
                            </span>
                            <span className="text-sm text-gray-400">{todo.category}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors ml-4"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* AI Suggestions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Brain className="w-6 h-6 text-blue-400 mr-2" />
                  <h2 className="text-xl font-semibold text-white">AI Suggestions</h2>
                </div>
                <button
                  onClick={fetchAISuggestions}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Clock className="w-5 h-5" />
                </button>
              </div>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="text-gray-400 mt-4">Analyzing your tasks...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-700 rounded-lg p-4"
                    >
                      <p className="text-gray-300">{suggestion}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
