import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, BookOpen, TrendingUp, PieChart, Gamepad2, Wrench, UserCircle, Wallet, Menu, X, IndianRupee } from 'lucide-react';

const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navItems = [
        { path: '/', name: 'Home', icon: <Home className="w-5 h-5" /> },
        { path: '/learning-center', name: 'Learning Center', icon: <BookOpen className="w-5 h-5" /> },
        { path: '/market', name: 'Market', icon: <TrendingUp className="w-5 h-5" /> },
        { path: '/portfolio', name: 'Portfolio', icon: <PieChart className="w-5 h-5" /> },
        { path: '/games', name: 'Games', icon: <Gamepad2 className="w-5 h-5" /> },
        { path: '/tools', name: 'Tools', icon: <Wrench className="w-5 h-5" /> },
        { path: '/profile', name: 'Profile', icon: <UserCircle className="w-5 h-5" /> },
        { path: '/virtual-bank', name: 'Virtual Bank', icon: <Wallet className="w-5 h-5" /> }
    ];

    return (
        <div className="flex h-screen bg-gray-900">
            {/* Toggle Button for Mobile */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed top-4 left-4 z-50 lg:hidden bg-gray-800 p-2 rounded-lg text-white hover:bg-gray-700"
            >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <div className={`fixed lg:static inset-y-0 left-0 transform ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30`}>
                <div className="w-64 h-full bg-gray-800 shadow-lg flex flex-col">
                    {/* Logo */}
                    <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <IndianRupee className="w-6 h-6 text-white" />
                            </div>
                            <div className="ml-3">
                                <h1 className="text-xl font-bold text-white">FINSAVVY</h1>
                                <p className="text-xs text-gray-400">Financial Wisdom for All</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-700'
                                    }`
                                }
                                onClick={() => {
                                    if (window.innerWidth < 1024) {
                                        setIsSidebarOpen(false);
                                    }
                                }}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-700">
                        <p className="text-sm text-gray-400 text-center">
                            2025 FINSAVVY. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto bg-gray-900">
                <div className="min-h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;