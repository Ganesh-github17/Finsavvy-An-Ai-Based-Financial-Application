import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Bot, Video, Users, ClipboardList } from 'lucide-react';

const tools = [
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: 'Course Library',
    description: 'Access comprehensive financial education courses',
    color: 'from-orange-500 to-amber-500',
    path: '/learning-center/courses'
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: 'AI Learning Assistant',
    description: 'Get personalized help from our NVIDIA-powered AI tutor',
    color: 'from-purple-500 to-pink-500',
    path: '/learning-center/ai-tutor'
  },
  {
    icon: <ClipboardList className="w-8 h-8" />,
    title: 'Practice Quizzes',
    description: 'Test your knowledge with interactive quizzes',
    color: 'from-blue-500 to-cyan-500',
    path: '/learning-center/quizzes'
  },
  {
    icon: <Video className="w-8 h-8" />,
    title: 'Video Lessons',
    description: 'Watch expert tutorials and explanations',
    color: 'from-red-500 to-rose-500',
    path: '/learning-center/videos'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Study Groups',
    description: 'Learn together with peers in collaborative groups',
    color: 'from-green-500 to-emerald-500',
    path: '/learning-center/groups'
  }
];

const LearningCenter: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Learning Center</h1>
          <p className="text-xl text-gray-400">
            Enhance your financial knowledge with our comprehensive learning tools
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link
              key={index}
              to={tool.path}
              className="block group"
            >
              <div className="bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {React.cloneElement(tool.icon as React.ReactElement, { className: 'w-8 h-8 text-white' })}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {tool.title}
                </h2>
                <p className="text-gray-400">
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-2">15+</h3>
              <p className="text-gray-400">Courses Available</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-2">100+</h3>
              <p className="text-gray-400">Video Lessons</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-2">1000+</h3>
              <p className="text-gray-400">Active Learners</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningCenter;
