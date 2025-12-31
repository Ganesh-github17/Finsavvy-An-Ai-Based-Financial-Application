import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Circle,
  Clock,
  Star,
  Calendar,
  Tag,
  Plus,
  X,
  Filter,
  ChevronDown
} from 'lucide-react';
import todoListImage from './TodoList/images/todo-list.jpg';

interface Todo {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  completed: boolean;
  tags: string[];
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      title: 'Review Investment Portfolio',
      description: 'Analyze current investments and rebalance if necessary',
      priority: 'high',
      dueDate: '2024-02-10',
      completed: false,
      tags: ['Investment', 'Monthly']
    },
    {
      id: '2',
      title: 'Complete Budget Planning',
      description: 'Plan next month\'s budget and set savings goals',
      priority: 'medium',
      dueDate: '2024-02-15',
      completed: false,
      tags: ['Budget', 'Planning']
    }
  ]);

  const [showAddTodo, setShowAddTodo] = useState(false);
  const [newTodo, setNewTodo] = useState<Partial<Todo>>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    tags: []
  });
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [tagInput, setTagInput] = useState('');

  const addTodo = () => {
    if (!newTodo.title) return;

    const todo: Todo = {
      id: Date.now().toString(),
      title: newTodo.title,
      description: newTodo.description || '',
      priority: newTodo.priority as 'high' | 'medium' | 'low',
      dueDate: newTodo.dueDate || new Date().toISOString().split('T')[0],
      completed: false,
      tags: newTodo.tags || []
    };

    setTodos(prev => [...prev, todo]);
    setNewTodo({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      tags: []
    });
    setShowAddTodo(false);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const addTag = () => {
    if (!tagInput || newTodo.tags?.includes(tagInput)) return;
    setNewTodo(prev => ({
      ...prev,
      tags: [...(prev.tags || []), tagInput]
    }));
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setNewTodo(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'high' | 'medium' | 'low';
    setNewTodo(prev => ({
      ...prev,
      priority: value
    }));
  };

  return (
    <div className="bg-dark-card rounded-xl p-6 border border-gray-800 min-h-[calc(100vh-2rem)]">
      <div className="flex items-start gap-8 relative">
        {/* Main Content */}
        <div className="flex-1 max-w-[70%]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Financial Todo List
            </h2>
            <div className="flex gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')}
                className="bg-dark-lighter border border-gray-800 rounded-lg px-3 py-1 text-sm transition-colors hover:border-primary focus:border-primary focus:outline-none"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={() => setShowAddTodo(true)}
                className="flex items-center gap-2 px-4 py-1 bg-primary hover:bg-primary-dark rounded-lg text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <Plus className="w-4 h-4" />
                Add Todo
              </button>
            </div>
          </div>

          {/* Todo List */}
          <div className="space-y-4 pr-2">
            {filteredTodos.map((todo: Todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-dark-lighter rounded-lg p-4 ${
                  todo.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="mt-1"
                  >
                    {todo.completed ? (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`font-semibold ${todo.completed ? 'line-through' : ''}`}>
                          {todo.title}
                        </h3>
                        <p className="text-gray-400 mt-1">{todo.description}</p>
                      </div>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className={`flex items-center gap-1 text-sm ${getPriorityColor(todo.priority)}`}>
                        <Star className="w-4 h-4" />
                        {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {new Date(todo.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    {todo.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {todo.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-dark-card rounded-full text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredTodos.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                No todos found
              </div>
            )}
          </div>
        </div>

        {/* Image on the right */}
        <div className="w-[25%] flex-shrink-0">
          <div className="sticky top-6 p-4 bg-dark-lighter rounded-2xl border border-gray-800/50 shadow-xl backdrop-blur-sm">
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-dark-card/80 to-transparent z-10"></div>
              <img 
                src={todoListImage} 
                alt="Todo List" 
                className="w-full object-cover aspect-[4/5] transform transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">Stay organized and achieve your financial goals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Todo Modal */}
      {showAddTodo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-card rounded-xl p-6 max-w-lg w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Add New Todo</h3>
              <button
                onClick={() => setShowAddTodo(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={newTodo.title}
                onChange={(e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Todo title"
                className="w-full bg-dark-lighter border border-gray-800 rounded-lg px-4 py-2"
              />

              <textarea
                value={newTodo.description}
                onChange={(e) => setNewTodo(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Description"
                className="w-full bg-dark-lighter border border-gray-800 rounded-lg px-4 py-2 h-24"
              />

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={newTodo.priority}
                  onChange={handlePriorityChange}
                  className="bg-dark-lighter border border-gray-800 rounded-lg px-4 py-2"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>

                <input
                  type="date"
                  value={newTodo.dueDate}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="bg-dark-lighter border border-gray-800 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tag"
                    className="flex-1 bg-dark-lighter border border-gray-800 rounded-lg px-4 py-2"
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-dark-lighter border border-gray-800 rounded-lg hover:bg-opacity-80"
                  >
                    Add Tag
                  </button>
                </div>
                {newTodo.tags && newTodo.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {newTodo.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-dark-lighter rounded-full flex items-center gap-1"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowAddTodo(false)}
                  className="px-4 py-2 bg-dark-lighter border border-gray-800 rounded-lg hover:bg-opacity-80"
                >
                  Cancel
                </button>
                <button
                  onClick={addTodo}
                  disabled={!newTodo.title}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg disabled:opacity-50"
                >
                  Add Todo
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
