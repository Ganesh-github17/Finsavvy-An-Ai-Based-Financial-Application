import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  duration: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  quiz: Quiz;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: string;
  video_url?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  time_limit: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
}

export interface QuizSubmission {
  answers: { [key: string]: number };
}

export interface QuizResult {
  score: number;
  correct_answers: number;
  total_questions: number;
  passed: boolean;
}

export interface UserProgress {
  [courseId: string]: {
    [moduleId: string]: {
      completed: boolean;
      score: number;
      passed: boolean;
    };
  };
}

const courseApi = {
  // Get all courses or filter by level
  async getCourses(level?: string) {
    try {
      const params = level ? { level } : {};
      const response = await api.get<Course[]>('/courses', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Get a specific course by ID
  async getCourse(courseId: string) {
    try {
      const response = await api.get<Course>(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  },

  // Get a specific module from a course
  async getModule(courseId: string, moduleId: string) {
    try {
      const response = await api.get<Module>(`/courses/${courseId}/modules/${moduleId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching module:', error);
      throw error;
    }
  },

  // Submit quiz answers and get results
  async submitQuiz(
    courseId: string,
    moduleId: string,
    userId: string,
    answers: { [key: string]: number }
  ) {
    try {
      const response = await api.post<QuizResult>(
        `/courses/${courseId}/modules/${moduleId}/quiz`,
        {
          user_id: userId,
          answers,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error submitting quiz:', error);
      throw error;
    }
  },

  // Get user's course progress
  async getUserProgress(userId: string = 'user-123') { // Default user ID for testing
    try {
      const response = await api.get<{ [key: string]: UserProgress }>(
        `/users/${userId}/progress`
      );
      return response.data;
    } catch (error) {
      // Return empty progress if endpoint not found
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return {};
      }
      console.error('Error fetching user progress:', error);
      throw error;
    }
  },
};

export default courseApi;
