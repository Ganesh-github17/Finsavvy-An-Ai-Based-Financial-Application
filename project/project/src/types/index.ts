export interface User {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: {
    completedCourses: string[];
    currentCourse?: string;
    points: number;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  content: string;
  quiz: Quiz[];
}

export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Investment' | 'Budgeting' | 'Savings' | 'Market' | 'RealEstate';
}