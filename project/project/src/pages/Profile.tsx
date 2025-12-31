import React from 'react';
import { useAuth } from '../App';
import { supabase } from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { UserCircle, PieChart, Gamepad2, BookOpen, Award, Briefcase, Users } from 'lucide-react';

const sectionData = [
  { icon: <PieChart className="w-7 h-7 text-amber-400" />, title: 'Portfolio', desc: 'Your portfolio summary will appear here.' },
  { icon: <Gamepad2 className="w-7 h-7 text-blue-400" />, title: 'Games', desc: 'Your game progress and achievements will appear here.' },
  { icon: <BookOpen className="w-7 h-7 text-green-400" />, title: 'Courses', desc: 'Your enrolled and completed courses will appear here.' },
  { icon: <Award className="w-7 h-7 text-pink-400" />, title: 'Badges', desc: 'Your earned badges will appear here.' },
  { icon: <Briefcase className="w-7 h-7 text-purple-400" />, title: 'Internships', desc: 'Your internship applications and status will appear here.' },
  { icon: <Users className="w-7 h-7 text-cyan-400" />, title: 'Workshops', desc: 'Your joined and upcoming workshops will appear here.' },
];

const Profile: React.FC = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  const name = user.user_metadata?.name || 'Ankem Ganesh';
  const avatar = user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e2746&color=fff&size=128`;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e2746] via-[#2e335a] to-[#1e2746] p-4">
      <div className="relative w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center animate-fade-in" style={{ minHeight: '600px' }}>
        {/* Profile Image */}
        <div className="-mt-20 mb-4">
          <img
            src={avatar}
            alt="avatar"
            className="w-32 h-32 rounded-full border-4 border-amber-400 shadow-xl object-cover bg-slate-900"
          />
        </div>
        {/* Name and Welcome */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow mb-1 text-center">{name}</h1>
        <div className="text-amber-300 font-medium text-lg mb-2 text-center">Welcome to FINSAVVY</div>
        {/* Email and UID */}
        <div className="bg-white/20 rounded-xl px-6 py-3 mb-8 flex flex-col md:flex-row gap-2 items-center justify-center text-white/90 text-sm shadow">
          <span className="font-semibold">Email:</span> <span>{user.email}</span>
          <span className="hidden md:inline mx-2">|</span>
          <span className="font-semibold">User ID:</span> <span className="break-all">{user.id}</span>
        </div>
        {/* Sections Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
          {sectionData.map((section) => (
            <div key={section.title} className="bg-white/20 rounded-2xl p-6 flex items-center gap-4 shadow-lg hover:scale-[1.03] transition-transform duration-200">
              <div className="flex-shrink-0">{section.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{section.title}</h3>
                <p className="text-white/80 text-sm">{section.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Logout Button - bottom right inside card */}
        <button
          onClick={handleLogout}
          className="absolute bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg z-10"
        >
          Logout
        </button>
        {/* Animation keyframes */}
        <style>{`
          .animate-fade-in {
            animation: fadeIn 1.2s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(40px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Profile;