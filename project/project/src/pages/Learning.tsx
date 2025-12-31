import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Brain,
  Users,
  ClipboardCheck,
  Video,
  ArrowRight
} from 'lucide-react';

interface LearningTool {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
  path: string;
}

const Learning: React.FC = () => {
  const navigate = useNavigate();

  const tools: LearningTool[] = [
    {
      icon: <BookOpen className="w-6 h-6 text-slate-900" />,
      title: 'Course Library',
      description: 'Access comprehensive financial education courses',
      color: 'bg-amber-500',
      path: '/learning/courses'
    },
    {
      icon: <Brain className="w-6 h-6 text-slate-900" />,
      title: 'AI Learning Assistant',
      description: 'Get personalized help from our NVIDIA-powered AI tutor',
      color: 'bg-purple-500',
      path: '/learning/ai-tutor'
    },
    {
      icon: <Users className="w-6 h-6 text-slate-900" />,
      title: 'Study Groups',
      description: 'Learn together with peers',
      color: 'bg-green-500',
      path: '/learning/groups'
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 text-slate-900" />,
      title: 'Practice Quizzes',
      description: 'Test your knowledge',
      color: 'bg-blue-500',
      path: '/learning/quizzes'
    },
    {
      icon: <Video className="w-6 h-6 text-slate-900" />,
      title: 'Video Lessons',
      description: 'Watch expert tutorials',
      color: 'bg-red-500',
      path: '/learning/videos'
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Learning Center</h1>
          <p className="text-slate-400">Enhance your financial knowledge with our comprehensive tools</p>
        </div>

        <h2 className="text-xl font-semibold text-white mb-4">Learning Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              onClick={() => navigate(tool.path)}
              className="group bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6 cursor-pointer
                hover:bg-slate-800/70 hover:border-slate-600 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center
                  transform group-hover:scale-110 transition-transform duration-300`}>
                  {tool.icon}
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {tool.title}
                </h3>
              </div>
              <p className="text-slate-400 mb-4 group-hover:text-slate-300 transition-colors">
                {tool.description}
              </p>
              <div className="flex justify-end">
                <button className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                  Open Tool
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learning;
