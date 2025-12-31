import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  Book,
  Gamepad,  // Changed from GameController to Gamepad
  User,
  Wallet,
  Calculator,
  TrendingUp,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Course Registration', href: '/course-registration' },
  { name: 'Learning', href: '/course/finance-101' },
  { name: 'Games', href: '/games' },
  { name: 'Market', href: '/market' },
  { name: 'Virtual Bank', href: '/virtual-bank' },
  { name: 'Strategy', href: '/strategy' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Recommendations', href: '/recommendations' },
  { name: 'Budget Planner', href: '/budget' },
  { name: 'Collaboration', href: '/collaboration' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      label: 'Learn',
      icon: Book,
      items: [
        { label: 'Courses', path: '/' },
        { label: 'AI Assistant', path: '/ai-assistant' }
      ]
    },
    {
      label: 'Games',
      icon: Gamepad,
      items: [
        { label: 'All Games', path: '/games' },
        { label: 'Market Master', path: '/games/market-master' },
        { label: 'Budget Hero', path: '/games/budget-hero' }
      ]
    },
    {
      label: 'Tools',
      icon: Calculator,
      items: [
        { label: 'SIP Calculator', path: '/tools/sip-calculator' },
        { label: 'Investment Suggestions', path: '/tools/investment-suggestions' }
      ]
    },
    {
      label: 'Banking',
      icon: Wallet,
      items: [
        { label: 'Virtual Account', path: '/virtual-bank' },
        { label: 'Investment Strategy', path: '/strategy' }
      ]
    }
  ];

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <TrendingUp className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">FinLearn</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeDropdown === item.label
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`block px-4 py-2 text-sm ${
                            isActive(subItem.path)
                              ? 'text-indigo-600 bg-indigo-50'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}

            {/* Profile */}
            <Link
              to="/profile"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/profile')
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className={`md:hidden overflow-hidden ${isOpen ? 'border-t border-gray-200' : ''}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <div key={item.label}>
              <button
                onClick={() => toggleDropdown(item.label)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              >
                <div className="flex items-center">
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.label}
                </div>
                <ChevronDown className={`h-5 w-5 transform transition-transform ${
                  activeDropdown === item.label ? 'rotate-180' : ''
                }`} />
              </button>

              <motion.div
                initial={false}
                animate={{ height: activeDropdown === item.label ? 'auto' : 0 }}
                className="overflow-hidden"
              >
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className={`block pl-10 pr-4 py-2 text-base font-medium ${
                      isActive(subItem.path)
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </motion.div>
            </div>
          ))}

          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(item.href)
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <Link
            to="/profile"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/profile')
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile
            </div>
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
