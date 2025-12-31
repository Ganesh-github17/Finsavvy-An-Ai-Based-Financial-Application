import React from 'react';
import { Link } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  image: string;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Personal Finance',
    description: 'Learn the basics of managing your personal finances, budgeting, and saving.',
    duration: '4 weeks',
    level: 'Beginner',
    image: '/images/personal-finance.jpg'
  },
  {
    id: '2',
    title: 'Investment Fundamentals',
    description: 'Understand different investment vehicles and strategies for long-term wealth building.',
    duration: '6 weeks',
    level: 'Intermediate',
    image: '/images/investment.jpg'
  },
  {
    id: '3',
    title: 'Stock Market Basics',
    description: 'Learn how the stock market works and develop basic trading strategies.',
    duration: '8 weeks',
    level: 'Intermediate',
    image: '/images/stock-market.jpg'
  }
];

const CourseList: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <div className="w-full h-48 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {course.title}
              </h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  Duration: {course.duration}
                </span>
                <span className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full">
                  {course.level}
                </span>
              </div>
              <Link
                to={`/course/${course.id}`}
                className="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Start Learning
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
