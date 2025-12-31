import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavLink {
  to: string;
  icon: LucideIcon;
  text: string;
}

interface SidebarProps {
  links: NavLink[];
}

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  const location = useLocation();

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">
            FinLearn Pro
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto">
        <div className="px-4 space-y-1">
          {links.map(({ to, icon: Icon, text }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-slate-900'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{text}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-slate-700/30">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold">
            U
          </div>
          <div>
            <div className="text-sm font-medium text-slate-200">User Name</div>
            <div className="text-xs text-slate-400">user@example.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
