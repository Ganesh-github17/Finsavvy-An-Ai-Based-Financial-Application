import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Award, ChevronRight, Star } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  duration: string;
  description: string;
  topics: string[];
  prerequisites: string[];
  skills_gained: string[];
}

interface CourseListProps {
  courses: Course[];
  selectedLevel: string;
  onCourseSelect: (course: Course) => void;
}

const levelColors = {
  beginner: 'bg-emerald-500',
  intermediate: 'bg-amber-500',
  advanced: 'bg-rose-500'
};

const levelNames = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
};

const CourseList: React.FC<CourseListProps> = ({ courses, selectedLevel, onCourseSelect }) => {
  const filteredCourses = selectedLevel === 'all' 
    ? courses 
    : courses.filter(course => course.level === selectedLevel);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCourses.map((course) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="bg-slate-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
          onClick={() => onCourseSelect(course)}
        >
          {/* Course Header */}
          <div className="relative">
            <div className={`h-2 ${levelColors[course.level]} w-full`} />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${levelColors[course.level]} bg-opacity-20 text-${levelColors[course.level].split('-')[1]}-400`}>
                  {levelNames[course.level]}
                </span>
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
              <p className="text-slate-300 text-sm mb-4">{course.description}</p>
            </div>
          </div>

          {/* Course Details */}
          <div className="px-6 pb-6">
            <div className="flex items-center space-x-4 text-slate-300 text-sm mb-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                {course.topics.length} Topics
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-1" />
                {course.skills_gained.length} Skills
              </div>
            </div>

            {/* Topics Preview */}
            <div className="space-y-2">
              {course.topics.slice(0, 2).map((topic, index) => (
                <div key={index} className="flex items-center text-slate-300 text-sm">
                  <ChevronRight className="w-4 h-4 mr-2 text-amber-400" />
                  {topic}
                </div>
              ))}
              {course.topics.length > 2 && (
                <div className="text-amber-400 text-sm font-medium mt-2">
                  +{course.topics.length - 2} more topics
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CourseList;
