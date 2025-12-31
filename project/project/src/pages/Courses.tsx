import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Brain, CheckCircle, PlayCircle } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: number;
  image: string;
  progress?: number;
}

const Courses: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const courses: Course[] = [
    {
      id: 'financial-basics',
      title: 'Financial Basics 101',
      description: 'Master the fundamentals of personal finance, budgeting, and savings',
      level: 'Beginner',
      duration: '4 weeks',
      modules: 8,
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
      progress: 0
    },
    {
      id: 'investment-fundamentals',
      title: 'Investment Fundamentals',
      description: 'Learn the basics of investing, asset classes, and portfolio management',
      level: 'Beginner',
      duration: '6 weeks',
      modules: 10,
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
      progress: 0
    },
    {
      id: 'stock-market-mastery',
      title: 'Stock Market Mastery',
      description: 'Deep dive into stock market analysis, trading strategies, and risk management',
      level: 'Intermediate',
      duration: '8 weeks',
      modules: 12,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
      progress: 0
    },
    {
      id: 'advanced-portfolio',
      title: 'Advanced Portfolio Management',
      description: 'Master complex portfolio strategies and advanced investment techniques',
      level: 'Advanced',
      duration: '10 weeks',
      modules: 15,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      progress: 0
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Advanced': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const filteredCourses = selectedLevel === 'all' 
    ? courses 
    : courses.filter(course => course.level.toLowerCase() === selectedLevel.toLowerCase());

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Learning Paths
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Master financial literacy with our AI-powered courses
        </p>
      </motion.div>

      <div className="flex justify-center space-x-4">
        {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedLevel === level
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative h-48">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{course.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.modules} Modules</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {course.progress !== undefined && course.progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                {course.progress ? (
                  <>
                    <PlayCircle className="w-4 h-4" />
                    <span>Continue Learning</span>
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-4 h-4" />
                    <span>Start Learning</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <Award className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Your Learning Journey</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <h3 className="font-semibold">Course Progress</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Track your learning achievements</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-blue-600">0%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <div key={level} className={`p-4 rounded-lg ${getLevelColor(level)}`}>
                <h4 className="font-semibold">{level}</h4>
                <p className="text-sm">
                  {courses.filter(course => course.level === level).length} courses available
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Courses;