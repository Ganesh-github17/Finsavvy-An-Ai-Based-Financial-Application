import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 border-t border-slate-700 py-4 px-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-400">
          {new Date().getFullYear()} FinLearn Pro. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <Link to="/privacy" className="text-sm text-slate-400 hover:text-amber-400">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-sm text-slate-400 hover:text-amber-400">
            Terms of Service
          </Link>
          <Link to="/support" className="text-sm text-slate-400 hover:text-amber-400">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
