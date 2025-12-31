import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavLink {
  to: string;
  icon: LucideIcon;
  text: string;
}

interface NavbarProps {
  links: NavLink[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const location = useLocation();

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-amber-400">
              FinLearn Pro
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            {links.map(({ to, icon: Icon, text }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-slate-900'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {text}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center">
            <button className="bg-amber-500 text-slate-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-400 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
