import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, Clock, Star, ChevronRight, Sparkles } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrolled: number;
  image: string;
  tags: string[];
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Financial Literacy 101',
    description: 'Master the basics of personal finance and make informed financial decisions.',
    duration: '8 weeks',
    level: 'Beginner',
    rating: 4.8,
    enrolled: 1200,
    image: '/course1.jpg',
    tags: ['Personal Finance', 'Budgeting', 'Savings']
  },
  {
    id: '2',
    title: 'Investment Strategies',
    description: 'Learn advanced investment techniques and portfolio management.',
    duration: '10 weeks',
    level: 'Advanced',
    rating: 4.9,
    enrolled: 800,
    image: '/course2.jpg',
    tags: ['Investing', 'Stocks', 'Portfolio Management']
  },
  {
    id: '3',
    title: 'Real Estate Investment',
    description: 'Understanding real estate markets and investment opportunities.',
    duration: '6 weeks',
    level: 'Intermediate',
    rating: 4.7,
    enrolled: 950,
    image: '/course3.jpg',
    tags: ['Real Estate', 'Property Investment', 'Market Analysis']
  }
];

const CourseRegistration = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesDuration = selectedDuration === 'all' || course.duration.includes(selectedDuration);
    return matchesSearch && matchesLevel && matchesDuration;
  });

  return (
    <div className="min-h-screen bg-[#0A0F29] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Master New Skills with Interactive Learning
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Embark on a journey of discovery and growth. Learn, practice, and excel in finance through engaging challenges and real-world applications.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-[#151A35] rounded-2xl p-6 mb-12">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#1E2443] rounded-xl focus:ring-2 focus:ring-purple-500 border-none"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 bg-[#1E2443] rounded-xl focus:ring-2 focus:ring-purple-500 border-none"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-4 py-3 bg-[#1E2443] rounded-xl focus:ring-2 focus:ring-purple-500 border-none"
              >
                <option value="all">All Durations</option>
                <option value="6">6 weeks</option>
                <option value="8">8 weeks</option>
                <option value="10">10 weeks</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#151A35] rounded-2xl overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="relative h-48 bg-gradient-to-r from-purple-500 to-blue-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white opacity-50" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-400 mb-4">{course.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-400">{course.rating}</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  <span>Enroll Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#151A35] p-6 rounded-2xl">
            <Sparkles className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
            <p className="text-gray-400">Learn through hands-on exercises and real-world scenarios</p>
          </div>
          <div className="bg-[#151A35] p-6 rounded-2xl">
            <Star className="w-12 h-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Instruction</h3>
            <p className="text-gray-400">Learn from industry professionals and financial experts</p>
          </div>
          <div className="bg-[#151A35] p-6 rounded-2xl">
            <BookOpen className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Comprehensive Content</h3>
            <p className="text-gray-400">Access detailed course materials and resources</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRegistration;
