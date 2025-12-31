import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, BookOpen, Video, Award } from 'lucide-react';

interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  instructor: string;
  capacity: string;
  type: 'live' | 'recorded';
}

const Workshop: React.FC = () => {
  const workshops: Workshop[] = [
    {
      id: 'w1',
      title: 'Introduction to Stock Market',
      description: 'Learn the basics of stock market investing and trading strategies.',
      date: '2024-02-15',
      time: '10:00 AM',
      duration: '2 hours',
      instructor: 'John Smith',
      capacity: '50 participants',
      type: 'live'
    },
    {
      id: 'w2',
      title: 'Advanced Trading Techniques',
      description: 'Master advanced trading strategies and market analysis.',
      date: '2024-02-20',
      time: '2:00 PM',
      duration: '3 hours',
      instructor: 'Sarah Johnson',
      capacity: '30 participants',
      type: 'live'
    },
    {
      id: 'w3',
      title: 'Portfolio Management',
      description: 'Learn how to build and manage a diversified investment portfolio.',
      date: '2024-02-25',
      time: '11:00 AM',
      duration: '2.5 hours',
      instructor: 'Michael Chen',
      capacity: '40 participants',
      type: 'live'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Financial Workshops</h1>
        <p className="text-gray-400">Join expert-led sessions to enhance your financial knowledge</p>
      </div>

      {/* Workshop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workshops.map((workshop) => (
          <motion.div
            key={workshop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-card rounded-lg p-6"
          >
            <div className="flex items-start gap-4">
              {workshop.type === 'live' ? (
                <div className="p-3 rounded-lg bg-green-500/20">
                  <Video className="w-6 h-6 text-green-500" />
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-blue-500/20">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold mb-2">{workshop.title}</h3>
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                    {workshop.type === 'live' ? 'Live Session' : 'Recorded'}
                  </span>
                </div>
                
                <p className="text-gray-400 mb-4">{workshop.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{new Date(workshop.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{workshop.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    <span>{workshop.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{workshop.capacity}</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Events Calendar */}
      <div className="bg-dark-card rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Workshop Schedule</h2>
        <div className="space-y-4">
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50"
            >
              <div className="text-center">
                <div className="text-xl font-bold">{new Date(workshop.date).getDate()}</div>
                <div className="text-sm text-gray-400">
                  {new Date(workshop.date).toLocaleString('default', { month: 'short' })}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{workshop.title}</h4>
                <div className="text-sm text-gray-400">
                  {workshop.time} • {workshop.duration} • {workshop.instructor}
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                {workshop.type === 'live' ? 'Live' : 'Recorded'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workshop;
