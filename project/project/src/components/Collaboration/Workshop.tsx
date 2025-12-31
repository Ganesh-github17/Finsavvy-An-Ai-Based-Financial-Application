import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Clock, MapPin, MessageSquare } from 'lucide-react';

interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  host: {
    name: string;
    verified: boolean;
    expertise: string;
  };
  participants: number;
  maxParticipants: number;
}

const Workshop: React.FC = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([
    {
      id: '1',
      title: 'Introduction to Stock Market Analysis',
      description: 'Learn the fundamentals of analyzing stock market trends and making informed investment decisions.',
      date: '2024-03-25',
      time: '14:00',
      location: 'Virtual Meeting Room',
      host: {
        name: 'Sarah Chen',
        verified: true,
        expertise: 'Financial Analyst'
      },
      participants: 15,
      maxParticipants: 30
    },
    // Add more workshops here
  ]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Upcoming Workshops</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Host Workshop
          </button>
        </div>

        <div className="space-y-4">
          {workshops.map((workshop) => (
            <motion.div
              key={workshop.id}
              whileHover={{ scale: 1.01 }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{workshop.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {workshop.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {workshop.participants}/{workshop.maxParticipants}
                  </span>
                  <Users className="w-4 h-4 text-gray-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{workshop.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{workshop.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{workshop.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <button className="text-blue-600 hover:underline">
                    Join Discussion
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm">
                      <span className="font-medium">{workshop.host.name}</span>
                      {workshop.host.verified && (
                        <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full">
                          Verified
                        </span>
                      )}
                      <p className="text-gray-500">{workshop.host.expertise}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Register
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Workshop;