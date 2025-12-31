import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Book, Clock, Star } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  rating: number;
}

const CourseRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Course[]>([]);
  const userId = 'user123'; // In a real app, this would come from authentication

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/recommendations/${userId}`
        );
        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  const recordInteraction = async (courseId: string) => {
    try {
      await fetch('http://localhost:5000/api/user-interaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          course_id: courseId,
          action: 'view',
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Error recording interaction:', error);
    }
  };

  return (
    <div className="bg-dark-card p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Recommended for You</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-card/50 p-4 rounded-lg cursor-pointer hover:bg-dark-card/70 transition-colors"
            onClick={() => recordInteraction(course.id)}
          >
            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{course.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Book className="w-4 h-4" />
                <span>{course.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{course.rating ? course.rating.toFixed(1) : 'N/A'}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseRecommendations;
