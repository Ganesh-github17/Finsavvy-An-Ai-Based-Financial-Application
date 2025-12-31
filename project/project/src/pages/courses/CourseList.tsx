import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, Clock, Target } from 'lucide-react';
import AITutor from '../../components/Learning/AITutor';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrolled: number;
  modules: Module[];
}

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
}

const CourseList: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showAITutor, setShowAITutor] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCourseRegistration = async (courseId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/courses/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: localStorage.getItem('userId'),
          course_id: courseId,
        }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to register for course');
      }
      
      setSelectedCourse(data.course);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const courses: Course[] = [
    {
      id: '1',
      title: 'Financial Fundamentals',
      description: 'Learn the basics of personal finance and money management.',
      duration: '4 weeks',
      level: 'Beginner',
      rating: 4.8,
      enrolled: 1200,
      modules: [
        {
          id: 'm1',
          title: 'Understanding Money',
          description: 'Basic concepts of money, value, and financial systems.',
          duration: '1 week',
          completed: true,
        },
        {
          id: 'm2',
          title: 'Budgeting Basics',
          description: 'Learn to create and maintain a personal budget.',
          duration: '1 week',
          completed: false,
        },
      ],
    },
    {
      id: '2',
      title: 'Investment Strategies',
      description: 'Master the art of investing in various financial instruments.',
      duration: '6 weeks',
      level: 'Intermediate',
      rating: 4.9,
      enrolled: 800,
      modules: [
        {
          id: 'm1',
          title: 'Stock Market Basics',
          description: 'Understanding stocks, shares, and market dynamics.',
          duration: '2 weeks',
          completed: false,
        },
        {
          id: 'm2',
          title: 'Portfolio Management',
          description: 'Learn to build and manage an investment portfolio.',
          duration: '2 weeks',
          completed: false,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Master Your Financial Future
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {course.enrolled} enrolled
                  </div>
                </div>
                
                <button
                  onClick={() => handleCourseRegistration(course.id)}
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? 'Registering...' : 'Start Learning'}
                </button>
              </div>
              
              {course.modules.length > 0 && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Course Modules</h3>
                  <ul className="space-y-2">
                    {course.modules.map((module) => (
                      <li
                        key={module.id}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <Target className="w-4 h-4 mr-2 text-indigo-500" />
                        {module.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-4">{selectedCourse.title}</h2>
              <div className="space-y-4">
                {selectedCourse.modules.map((module) => (
                  <div
                    key={module.id}
                    className="p-4 border rounded-lg hover:border-indigo-500 cursor-pointer transition-colors duration-300"
                    onClick={() => setSelectedModule(module)}
                  >
                    <h3 className="font-medium">{module.title}</h3>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="mt-6 w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
        
        {showAITutor && (
          <AITutor onClose={() => setShowAITutor(false)} />
        )}
      </div>
    </div>
  );
};

export default CourseList;
