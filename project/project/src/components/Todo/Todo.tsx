import React, { useState } from 'react';

interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    category: string;
}

const Todo: React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
    const [category, setCategory] = useState('general');

    const categories = [
        'general',
        'investments',
        'savings',
        'bills',
        'taxes',
        'insurance'
    ];

    const addTodo = () => {
        if (newTodo.trim()) {
            const todo: TodoItem = {
                id: Date.now().toString(),
                text: newTodo,
                completed: false,
                dueDate,
                priority,
                category
            };
            setTodos([...todos, todo]);
            setNewTodo('');
            setDueDate('');
            setPriority('medium');
            setCategory('general');
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

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-white">Financial Todo List</h2>
            </div>
            
            <div className="space-y-4">
                <div className="flex flex-col space-y-4">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a new financial task..."
                        className="w-full bg-gray-700 text-white rounded-lg p-3"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded-lg p-3"
                        />
                        
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
                            className="w-full bg-gray-700 text-white rounded-lg p-3"
                        >
                            <option value="high">High Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="low">Low Priority</option>
                        </select>
                        
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded-lg p-3"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <button
                        onClick={addTodo}
                        className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                        Add Task
                    </button>
                </div>

                <div className="space-y-2">
                    {todos.map(todo => (
                        <div
                            key={todo.id}
                            className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
                        >
                            <div className="flex items-center space-x-4">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id)}
                                    className="w-5 h-5 rounded"
                                />
                                <div>
                                    <p className={`text-white ${todo.completed ? 'line-through' : ''}`}>
                                        {todo.text}
                                    </p>
                                    <div className="flex space-x-2 mt-1">
                                        <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(todo.priority)} text-white`}>
                                            {todo.priority}
                                        </span>
                                        <span className="px-2 py-1 bg-gray-600 rounded text-xs text-white">
                                            {todo.category}
                                        </span>
                                        <span className="px-2 py-1 bg-gray-600 rounded text-xs text-white">
                                            Due: {new Date(todo.dueDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="text-red-500 hover:text-red-600"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Todo;
