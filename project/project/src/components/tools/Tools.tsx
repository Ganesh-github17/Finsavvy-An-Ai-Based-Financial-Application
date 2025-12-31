import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  LineChart,
  Brain,
  ChevronDown,
  ChevronUp,
  ListTodo,
  NotebookPen,
  Plus,
  Trash2,
  Save
} from 'lucide-react';
import SIPChart from './SIPChart';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Note {
  id: number;
  title: string;
  content: string;
}

const Tools: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [sipValues, setSipValues] = useState({
    monthlyInvestment: '',
    expectedReturn: '',
    timePeriod: ''
  });
  const [budgetValues, setBudgetValues] = useState({
    income: '',
    expenses: '',
    savings: ''
  });

  const tools = [
    {
      id: 'sip',
      title: 'SIP Calculator',
      icon: Calculator,
      description: 'Calculate your SIP investment returns'
    },
    {
      id: 'budget',
      title: 'Budget Planner',
      icon: LineChart,
      description: 'Create and manage your monthly budget'
    },
    {
      id: 'ai',
      title: 'AI Consultation',
      icon: Brain,
      description: 'Get personalized financial advice'
    },
    {
      id: 'todo',
      title: 'Todo List',
      icon: ListTodo,
      description: 'Track your financial tasks'
    },
    {
      id: 'notes',
      title: 'Notes',
      icon: NotebookPen,
      description: 'Keep track of your financial notes'
    }
  ];

  const handleToolClick = (toolId: string) => {
    setActiveToolId(activeToolId === toolId ? null : toolId);
  };

  const handleSIPCalculation = () => {
    const P = parseFloat(sipValues.monthlyInvestment);
    const r = parseFloat(sipValues.expectedReturn) / (12 * 100);
    const t = parseFloat(sipValues.timePeriod) * 12;
    const FV = P * ((Math.pow(1 + r, t) - 1) / r) * (1 + r);
    return FV.toFixed(2);
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleAddNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      setNotes([...notes, { ...newNote, id: Date.now() }]);
      setNewNote({ title: '', content: '' });
    }
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const renderToolContent = (toolId: string) => {
    switch (toolId) {
      case 'sip':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Monthly Investment (₹)</label>
              <input
                type="number"
                value={sipValues.monthlyInvestment}
                onChange={(e) => setSipValues({ ...sipValues, monthlyInvestment: e.target.value })}
                className="w-full bg-dark rounded-lg px-4 py-2 border border-gray-800"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Expected Return (%)</label>
              <input
                type="number"
                value={sipValues.expectedReturn}
                onChange={(e) => setSipValues({ ...sipValues, expectedReturn: e.target.value })}
                className="w-full bg-dark rounded-lg px-4 py-2 border border-gray-800"
                placeholder="Enter percentage"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time Period (Years)</label>
              <input
                type="number"
                value={sipValues.timePeriod}
                onChange={(e) => setSipValues({ ...sipValues, timePeriod: e.target.value })}
                className="w-full bg-dark rounded-lg px-4 py-2 border border-gray-800"
                placeholder="Enter years"
              />
            </div>
            {sipValues.monthlyInvestment && sipValues.expectedReturn && sipValues.timePeriod && (
              <div className="space-y-4">
                <div className="p-4 bg-dark rounded-lg border border-primary">
                  <p className="text-lg font-semibold">Expected Returns: ₹{handleSIPCalculation()}</p>
                </div>
                <SIPChart
                  monthlyInvestment={parseFloat(sipValues.monthlyInvestment)}
                  expectedReturn={parseFloat(sipValues.expectedReturn)}
                  timePeriod={parseFloat(sipValues.timePeriod)}
                />
              </div>
            )}
          </div>
        );

      case 'budget':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Monthly Income (₹)</label>
              <input
                type="number"
                value={budgetValues.income}
                onChange={(e) => setBudgetValues({ ...budgetValues, income: e.target.value })}
                className="w-full bg-dark rounded-lg px-4 py-2 border border-gray-800"
                placeholder="Enter income"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Monthly Expenses (₹)</label>
              <input
                type="number"
                value={budgetValues.expenses}
                onChange={(e) => setBudgetValues({ ...budgetValues, expenses: e.target.value })}
                className="w-full bg-dark rounded-lg px-4 py-2 border border-gray-800"
                placeholder="Enter expenses"
              />
            </div>
            {budgetValues.income && budgetValues.expenses && (
              <div className="mt-4 p-4 bg-dark rounded-lg border border-primary">
                <p className="text-lg font-semibold">
                  Savings: ₹{(parseFloat(budgetValues.income) - parseFloat(budgetValues.expenses)).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        );

      case 'ai':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-dark rounded-lg">
              <h3 className="font-semibold mb-2">Investment Recommendations</h3>
              <ul className="space-y-2">
                <li>• Based on your profile: Consider a balanced mix of equity and debt</li>
                <li>• Recommended asset allocation: 60% Equity, 30% Debt, 10% Gold</li>
                <li>• Start with: Mutual Funds and Fixed Deposits</li>
              </ul>
            </div>
            <div className="p-4 bg-dark rounded-lg">
              <h3 className="font-semibold mb-2">Risk Analysis</h3>
              <p>Your risk profile indicates a moderate risk appetite. Consider:</p>
              <ul className="space-y-2">
                <li>• Large-cap mutual funds</li>
                <li>• Government bonds</li>
                <li>• Blue-chip stocks</li>
              </ul>
            </div>
          </div>
        );

      case 'todo':
        return (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-1 bg-dark rounded-lg px-4 py-2 border border-gray-800"
                placeholder="Add a new task"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              />
              <button
                onClick={handleAddTodo}
                className="p-2 bg-primary hover:bg-primary-dark rounded-lg"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {todos.map(todo => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between p-3 bg-dark rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                      className="w-4 h-4"
                    />
                    <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'notes':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <input
                type="text"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="w-full bg-dark rounded-lg px-4 py-2 border border-gray-800"
                placeholder="Note title"
              />
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="w-full bg-dark rounded-lg px-4 py-2 border border-gray-800 h-24 resize-none"
                placeholder="Note content"
              />
              <button
                onClick={handleAddNote}
                className="w-full p-2 bg-primary hover:bg-primary-dark rounded-lg flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Note
              </button>
            </div>
            <div className="space-y-2">
              {notes.map(note => (
                <div key={note.id} className="p-4 bg-dark rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{note.title}</h3>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-400">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Financial Tools</h1>
          <p className="text-xl text-gray-400">
            Powerful tools to help you make better financial decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <div key={tool.id}>
              <button
                onClick={() => handleToolClick(tool.id)}
                className="w-full bg-dark-card hover:bg-dark-card/80 rounded-lg p-6 border border-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/20">
                      <tool.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">{tool.title}</h3>
                      <p className="text-sm text-gray-400">{tool.description}</p>
                    </div>
                  </div>
                  {activeToolId === tool.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>
              {activeToolId === tool.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 bg-dark-card rounded-lg p-6 border border-gray-800"
                >
                  {renderToolContent(tool.id)}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
