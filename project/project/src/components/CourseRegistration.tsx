import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Clock, DollarSign, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseModule from './Learning/CourseModule';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  rating: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  modules: {
    id: string;
    title: string;
    content: string;
    videoUrl?: string;
    duration: string;
    quiz: {
      questions: {
        id: string;
        question: string;
        options: string[];
        correctAnswer: number;
      }[];
    };
  }[];
}

const CourseRegistration: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [registeredCourses, setRegisteredCourses] = useState<string[]>([]);
  const navigate = useNavigate();

  const courses: Course[] = [
    {
      id: '1',
      title: 'Financial Planning Fundamentals',
      description: 'Learn the basics of financial planning and build a strong foundation for your financial future.',
      duration: '6 weeks',
      price: 99.99,
      rating: 4.8,
      level: 'Beginner',
      instructor: 'Dr. Sarah Johnson',
      modules: [
        {
          id: 'mod1',
          title: 'Introduction to Financial Planning',
          content: 'Learn the basic principles of financial planning and why it\'s important for your future.',
          duration: '45 minutes',
          quiz: {
            questions: [
              {
                id: 'q1',
                question: 'What is the primary goal of financial planning?',
                options: [
                  'To make quick money',
                  'To achieve long-term financial goals',
                  'To avoid taxes',
                  'To spend more money'
                ],
                correctAnswer: 1
              },
              {
                id: 'q2',
                question: 'Which of these is a key component of financial planning?',
                options: [
                  'Day trading',
                  'Budgeting',
                  'Gambling',
                  'Shopping'
                ],
                correctAnswer: 1
              }
            ]
          }
        },
        {
          id: 'mod2',
          title: 'Budgeting Basics',
          content: 'Master the fundamentals of creating and maintaining a budget.',
          duration: '60 minutes',
          quiz: {
            questions: [
              {
                id: 'q1',
                question: 'What is a budget?',
                options: [
                  'A restriction on spending',
                  'A plan for managing money',
                  'A bank account',
                  'A type of investment'
                ],
                correctAnswer: 1
              }
            ]
          }
        }
      ]
    },
    {
      id: '2',
      title: 'Investment Strategies Masterclass',
      description: 'Master advanced investment strategies and portfolio management techniques.',
      duration: '8 weeks',
      price: 149.99,
      rating: 4.9,
      level: 'Advanced',
      instructor: 'Prof. Michael Chen',
      modules: [
        {
          id: 'mod1',
          title: 'Understanding Market Analysis',
          content: 'Learn how to analyze market trends and make informed investment decisions.',
          duration: '90 minutes',
          quiz: {
            questions: [
              {
                id: 'q1',
                question: 'What is technical analysis?',
                options: [
                  'Analyzing company financials',
                  'Studying price patterns',
                  'Reading news articles',
                  'Interviewing CEOs'
                ],
                correctAnswer: 1
              }
            ]
          }
        }
      ]
    }
  ];

  const handleRegistration = (course: Course) => {
    setSelectedCourse(course);
    setRegisteredCourses([...registeredCourses, course.id]);
  };

  const handleCourseComplete = (courseId: string, score: number) => {
    // Save completion data to user profile
    const completionData = {
      courseId,
      completionDate: new Date().toISOString(),
      score
    };
    
    // In a real app, you would save this to a backend
    console.log('Course completed:', completionData);
    
    // Navigate to profile to view certificate
    navigate('/profile', { 
      state: { 
        completedCourse: courseId,
        score,
        showCertificate: true
      }
    });
  };

  if (selectedCourse) {
    return (
      <CourseModule
        courseId={selectedCourse.id}
        courseName={selectedCourse.title}
        modules={selectedCourse.modules}
        onComplete={handleCourseComplete}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Available Courses</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Book className="w-8 h-8 text-blue-600" />
                <span className={`px-3 py-1 rounded-full text-sm ${
                  course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {course.level}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-5 h-5 mr-2" />
                  <span>${course.price}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  <span>{course.rating}/5.0</span>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-4">
                  Instructor: {course.instructor}
                </p>
                <button
                  onClick={() => handleRegistration(course)}
                  className={`w-full py-2 px-4 rounded-lg transition-colors ${
                    registeredCourses.includes(course.id)
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {registeredCourses.includes(course.id) ? 'Continue Course' : 'Register Now'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseRegistration;
