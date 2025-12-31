import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, ShoppingBag, MessageSquare, Users, Building2, PieChart, Gamepad2, Wrench, UserCircle, Info, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../config/supabaseClient';

const navLinks = [
  { to: '/', icon: Home, text: 'Home' },
  { to: '/about', icon: Info, text: 'About Us' },
  { to: '/learning', icon: BookOpen, text: 'Learning' },
  { to: '/market', icon: ShoppingBag, text: 'Market' },
  { to: '/ai-chat', icon: MessageSquare, text: 'AI Chat' },
  { to: '/workshops', icon: Users, text: 'Workshops' },
  { to: '/virtual-bank', icon: Building2, text: 'Virtual Bank' },
  { to: '/portfolio', icon: PieChart, text: 'Portfolio' },
  { to: '/games', icon: Gamepad2, text: 'Games' },
  { to: '/tools', icon: Wrench, text: 'Tools' },
  { to: '/internships', icon: Briefcase, text: 'Internships' },
  { to: '/profile', icon: UserCircle, text: 'Profile' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="w-64 h-screen bg-slate-800 text-white p-4 flex flex-col">
      {/* Logo */}
      <div className="mb-8 px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg transform rotate-45">
              <div className="absolute inset-1 bg-slate-800 rounded-md"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-amber-400">
              F
            </div>
          </div>
          <span className="text-2xl font-bold text-amber-400">FINSAVVY</span>
        </Link>
        <div className="mt-2 text-xs text-amber-300/80">Your Financial Companion</div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;

            return (
              <motion.li
                key={link.to}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={link.to}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-slate-900'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.text}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-slate-700">
        <div className="text-xs text-slate-400 text-center">
          2025 FinSavvy
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
