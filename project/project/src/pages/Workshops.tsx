import React, { useState } from 'react';
import { Calendar, Clock, Users, BookOpen, ArrowRight, X, CheckCircle } from 'lucide-react';

interface Workshop {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  maxParticipants: number;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  topics: string[];
}

const workshopData: Workshop[] = [
  {
    id: 1,
    title: 'Investment Fundamentals',
    description: 'Learn the basics of investing, including stocks, bonds, and mutual funds.',
    date: '2024-02-15',
    time: '10:00 AM',
    duration: '2 hours',
    participants: 12,
    maxParticipants: 20,
    instructor: 'Sarah Johnson',
    level: 'Beginner',
    topics: ['Stocks', 'Bonds', 'Mutual Funds', 'Risk Management']
  },
  {
    id: 2,
    title: 'Advanced Trading Strategies',
    description: 'Master technical analysis and advanced trading techniques.',
    date: '2024-02-20',
    time: '2:00 PM',
    duration: '3 hours',
    participants: 8,
    maxParticipants: 15,
    instructor: 'Michael Chen',
    level: 'Advanced',
    topics: ['Technical Analysis', 'Options Trading', 'Risk Management']
  },
  {
    id: 3,
    title: 'Personal Finance Management',
    description: 'Build a strong foundation in personal finance and budgeting.',
    date: '2024-02-25',
    time: '11:00 AM',
    duration: '2.5 hours',
    participants: 15,
    maxParticipants: 25,
    instructor: 'Emily Brown',
    level: 'Beginner',
    topics: ['Budgeting', 'Saving', 'Debt Management', 'Credit Scores']
  }
];

const Workshops: React.FC = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    experience: ''
  });

  const getLevelColor = (level: Workshop['level']) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-950/50 text-emerald-400 border-emerald-500/50';
      case 'Intermediate':
        return 'bg-amber-950/50 text-amber-400 border-amber-500/50';
      case 'Advanced':
        return 'bg-rose-950/50 text-rose-400 border-rose-500/50';
      default:
        return 'bg-slate-800/50 text-slate-400 border-slate-500/50';
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setRegistrationSuccess(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowRegistration(false);
    setRegistrationSuccess(false);
    // Reset form
    setRegistrationData({ name: '', email: '', experience: '' });
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Workshops & Study Groups</h1>
          <p className="text-slate-400">Join expert-led sessions to enhance your financial knowledge</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Workshop List */}
          <div className="space-y-4">
            {workshopData.map((workshop) => (
              <div
                key={workshop.id}
                className={`group bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6 cursor-pointer 
                  hover:bg-slate-800/70 hover:border-slate-600 transition-all duration-300 
                  ${selectedWorkshop?.id === workshop.id ? 'ring-2 ring-blue-500/50 border-blue-500/50' : ''}`}
                onClick={() => setSelectedWorkshop(workshop)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {workshop.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(workshop.level)}`}>
                    {workshop.level}
                  </span>
                </div>
                <p className="text-slate-300 mb-4">{workshop.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-slate-400 group-hover:text-slate-300 transition-colors">
                    <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                    {workshop.date}
                  </div>
                  <div className="flex items-center text-slate-400 group-hover:text-slate-300 transition-colors">
                    <Clock className="w-4 h-4 mr-2 text-blue-400" />
                    {workshop.time}
                  </div>
                  <div className="flex items-center text-slate-400 group-hover:text-slate-300 transition-colors">
                    <Users className="w-4 h-4 mr-2 text-blue-400" />
                    {workshop.participants}/{workshop.maxParticipants} Participants
                  </div>
                  <div className="flex items-center text-slate-400 group-hover:text-slate-300 transition-colors">
                    <BookOpen className="w-4 h-4 mr-2 text-blue-400" />
                    {workshop.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Workshop Details */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6 h-fit lg:sticky lg:top-8">
            {selectedWorkshop ? (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">{selectedWorkshop.title}</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                    <p className="text-slate-300">{selectedWorkshop.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Topics Covered</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedWorkshop.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30
                            hover:bg-blue-900/50 hover:border-blue-500/50 transition-colors"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Instructor</h3>
                    <p className="text-slate-300">{selectedWorkshop.instructor}</p>
                  </div>
                  <button
                    onClick={() => setShowRegistration(true)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg 
                      transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                      flex items-center justify-center gap-2 font-medium shadow-lg shadow-blue-500/20"
                  >
                    Register Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400 py-8">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a workshop to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistration && selectedWorkshop && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50
          animate-fadeIn">
          <div className="bg-slate-800/90 backdrop-blur border border-slate-700/50 rounded-lg p-6 max-w-md w-full relative
            animate-slideIn">
            <button
              onClick={() => setShowRegistration(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white mb-6">Register for {selectedWorkshop.title}</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white
                    focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  value={registrationData.name}
                  onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white
                    focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  value={registrationData.email}
                  onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Experience Level</label>
                <select
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white
                    focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  value={registrationData.experience}
                  onChange={(e) => setRegistrationData({ ...registrationData, experience: e.target.value })}
                  required
                >
                  <option value="">Select your experience level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={registrationSuccess}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg
                  transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                  font-medium mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {registrationSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5 animate-spin" />
                    Registration Successful
                  </>
                ) : (
                  'Complete Registration'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateY(-10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }
          .animate-slideIn {
            animation: slideIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Workshops;
