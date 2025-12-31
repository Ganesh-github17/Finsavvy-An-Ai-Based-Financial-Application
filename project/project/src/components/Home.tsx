import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Gamepad2, Calculator, TrendingUp } from 'lucide-react';

const features = [
  {
    title: 'Interactive Learning',
    description: 'Learn financial concepts through engaging courses and modules.',
    icon: BookOpen,
    link: '/course-registration'
  },
  {
    title: 'Financial Games',
    description: 'Practice financial decision-making through fun and educational games.',
    icon: Gamepad2,
    link: '/games'
  },
  {
    title: 'Investment Tools',
    description: 'Calculate returns and get personalized investment suggestions.',
    icon: Calculator,
    link: '/tools/sip-calculator'
  },
  {
    title: 'Market Analysis',
    description: 'Stay updated with market trends and make informed decisions.',
    icon: TrendingUp,
    link: '/market'
  }
];

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Financial Education Platform
        </h1>
        <p className="text-xl text-gray-600">
          Your journey to financial literacy starts here
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              to={feature.link}
              className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <Icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
