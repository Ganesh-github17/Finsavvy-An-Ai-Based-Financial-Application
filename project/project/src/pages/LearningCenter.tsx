import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Bot, Video, Users, ClipboardList } from 'lucide-react';

const tools = [
  {
    icon: <BookOpen className="w-8 h-8 text-orange-500" />,
    title: 'Course Library',
    description: 'Access comprehensive financial education courses',
    path: '/learning-center/courses',
    iconBg: 'bg-orange-500'
  },
  {
    icon: <Bot className="w-8 h-8 text-purple-500" />,
    title: 'AI Learning Assistant',
    description: 'Get personalized help from our NVIDIA-powered AI tutor',
    path: '/learning-center/ai-tutor',
    iconBg: 'bg-purple-500'
  },
  {
    icon: <ClipboardList className="w-8 h-8 text-blue-500" />,
    title: 'Practice Quizzes',
    description: 'Test your knowledge',
    path: '/learning-center/quizzes',
    iconBg: 'bg-blue-500'
  },
  {
    icon: <Video className="w-8 h-8 text-red-500" />,
    title: 'Video Lessons',
    description: 'Watch expert tutorials',
    path: '/learning-center/videos',
    iconBg: 'bg-red-500'
  },
  {
    icon: <Users className="w-8 h-8 text-green-500" />,
    title: 'Study Groups',
    description: 'Learn together with peers',
    path: '/learning-center/groups',
    iconBg: 'bg-green-500'
  }
];

const LearningCenter: React.FC = () => {
  const navigate = useNavigate();

  const handleOpenTool = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Learning Center</h1>
        <p className="text-gray-400 mb-8">
          Enhance your financial knowledge with our comprehensive tools
        </p>

        <h2 className="text-2xl font-bold text-white mb-6">Learning Tools</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700/80 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${tool.iconBg}/10`}>
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {tool.description}
                  </p>
                  <button
                    onClick={() => handleOpenTool(tool.path)}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                  >
                    Open Tool
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningCenter;
