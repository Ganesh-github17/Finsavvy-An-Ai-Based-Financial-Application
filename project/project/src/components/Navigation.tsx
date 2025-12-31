import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  GamepadIcon, 
  TrendingUp, 
  Brain,
  GraduationCap,
  Wallet,
  Briefcase
} from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: BookOpen, label: 'Learn' },
    { path: '/courses', icon: GraduationCap, label: 'Courses' },
    { path: '/games', icon: GamepadIcon, label: 'Games' },
    { path: '/market', icon: TrendingUp, label: 'Market' },
    { path: '/ai-advisor', icon: Brain, label: 'AI Advisor' },
    { path: '/portfolio', icon: Wallet, label: 'Portfolio' },
    { path: '/internships', icon: Briefcase, label: 'Internships' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
            >
              Financial Freedom Quest
            </motion.div>
          </Link>
          
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;