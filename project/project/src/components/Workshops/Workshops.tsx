import React from 'react';
import { Calendar, Users, Book, Award, DollarSign } from 'lucide-react';

interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  capacity: number;
  instructor: string;
  price: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const Workshops: React.FC = () => {
  const workshops: Workshop[] = [
    {
      id: '1',
      title: 'Investment Fundamentals',
      description: 'Learn the basics of investment strategies and portfolio management',
      date: '2025-02-15',
      capacity: 30,
      instructor: 'Sarah Johnson',
      price: 99,
      level: 'Beginner'
    },
    {
      id: '2',
      title: 'Advanced Trading Techniques',
      description: 'Master technical analysis and advanced trading strategies',
      date: '2025-02-20',
      capacity: 25,
      instructor: 'Michael Chen',
      price: 149,
      level: 'Advanced'
    },
    {
      id: '3',
      title: 'Personal Finance Management',
      description: 'Build a strong foundation in personal finance and budgeting',
      date: '2025-02-25',
      capacity: 35,
      instructor: 'Emily Rodriguez',
      price: 79,
      level: 'Beginner'
    },
    {
      id: '4',
      title: 'Real Estate Investment',
      description: 'Understanding real estate markets and investment opportunities',
      date: '2025-03-01',
      capacity: 20,
      instructor: 'David Wilson',
      price: 129,
      level: 'Intermediate'
    }
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Financial Workshops</h1>
          <p className="text-gray-400">Join our expert-led workshops to enhance your financial knowledge</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              className="bg-dark-card rounded-xl p-6 border border-gray-800 hover:border-primary transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{workshop.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  workshop.level === 'Beginner' ? 'bg-green-500/20 text-green-500' :
                  workshop.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-red-500/20 text-red-500'
                }`}>
                  {workshop.level}
                </span>
              </div>

              <p className="text-gray-400 mb-6">{workshop.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{workshop.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{workshop.capacity} seats</span>
                </div>
                <div className="flex items-center gap-2">
                  <Book className="w-5 h-5 text-primary" />
                  <span>{workshop.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span>${workshop.price}</span>
                </div>
              </div>

              <button className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg transition-colors">
                Register Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-dark-card rounded-xl p-8 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-6">Host Your Own Workshop</h2>
          <p className="text-gray-400 mb-6">
            Are you a financial expert? Share your knowledge by hosting a workshop on our platform.
          </p>
          <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors">
            Apply as Instructor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workshops;
