import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Users, 
  Zap, 
  Search,
  Filter,
  BookOpen,
  BarChart2
} from 'lucide-react';
import CourseList from './CourseList';
import courseApi, { Course } from '../../services/courseApi';

const Courses: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const levels = [
    { id: 'all', name: 'All Levels', icon: GraduationCap },
    { id: 'beginner', name: 'Beginner', icon: Users },
    { id: 'intermediate', name: 'Intermediate', icon: Zap },
    { id: 'advanced', name: 'Advanced', icon: BarChart2 }
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await courseApi.getCourses(selectedLevel !== 'all' ? selectedLevel : undefined);
        setCourses(data);
        setError(null);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
        console.error('Error loading courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedLevel]);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-800 p-4 rounded-lg">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          {levels.map((level) => {
            const Icon = level.icon;
            return (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedLevel === level.id
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <Icon size={18} />
                <span className="hidden md:inline">{level.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading courses...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Course Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                <p className="text-slate-400 mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-500 flex items-center gap-2">
                    <BookOpen size={18} />
                    {course.duration}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    course.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                    course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {course.level}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
