import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',  // Update to match your Flask backend port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Course endpoints
export const getCourses = async () => {
  try {
    const response = await api.get('/courses');
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

export const getCourseById = async (courseId: string) => {
  try {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
};

export const getModuleContent = async (courseId: string, moduleId: string) => {
  try {
    const response = await api.get(`/courses/${courseId}/modules/${moduleId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching module:', error);
    return null;
  }
};

export const startQuiz = async (courseId: string, moduleId: string) => {
  try {
    const response = await api.get(`/courses/${courseId}/modules/${moduleId}/quiz`);
    return response.data;
  } catch (error) {
    console.error('Error starting quiz:', error);
    return null;
  }
};

export const submitQuiz = async (courseId: string, moduleId: string, answers: Record<string, number>) => {
  try {
    const response = await api.post(`/courses/${courseId}/modules/${moduleId}/quiz/submit`, { answers });
    return response.data;
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return null;
  }
};

export const generateCertificate = async (courseId: string, moduleId: string) => {
  try {
    const response = await api.post(`/courses/${courseId}/modules/${moduleId}/certificate`);
    return response.data;
  } catch (error) {
    console.error('Error generating certificate:', error);
    return null;
  }
};

// AI Learning endpoints
export const getAIResponse = async (data: {
  user_id: string;
  module_content: string;
  question: string;
}) => {
  try {
    const response = await api.post('/learning/ai/chat', data);
    return response.data;
  } catch (error) {
    console.error('Error getting AI response:', error);
    return null;
  }
};

export const getPersonalizedLearning = async (userId: string = 'default_user') => {
  try {
    const response = await api.get(`/learning/personalized/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting personalized learning:', error);
    return null;
  }
};

// AI Personalized Learning endpoints
export const getPersonalizedLearningOld = async () => {
  const response = await api.get('/learning/personalized');
  return response.data;
};

// AI Chat endpoints
export const getAIResponseOld = async (message: string) => {
  const response = await api.post('/ai/chat', { message });
  return response.data;
};

// Student Groups endpoints
export const getStudentGroups = async () => {
  try {
    const response = await api.get('/groups');
    return response.data;
  } catch (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
};

export const createStudyGroup = async (data: { name: string; description: string }) => {
  try {
    const response = await api.post('/groups', data);
    return response.data;
  } catch (error) {
    console.error('Error creating group:', error);
    return null;
  }
};

export const addGroupDiscussion = async (groupId: string, data: { title: string; content: string }) => {
  const response = await api.post(`/groups/${groupId}/discussions`, data);
  return response.data;
};

// Resources endpoints
export const getResources = async () => {
  try {
    const response = await api.get('/resources');
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
};

export const uploadResource = async (formData: FormData) => {
  try {
    const response = await api.post('/resources', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading resource:', error);
    return null;
  }
};

// Market Data endpoints
export const getMarketData = async () => {
  const response = await api.get('/market/data');
  return response.data;
};

export const getStockData = async (symbol: string) => {
  const response = await api.get(`/market/stocks/${symbol}`);
  return response.data;
};

export const getPortfolioData = async () => {
  const response = await api.get('/market/portfolio');
  return response.data;
};

export const executeTradeOrder = async (order: {
  symbol: string;
  type: 'buy' | 'sell';
  shares: number;
  price: number;
}) => {
  const response = await api.post('/market/trade', order);
  return response.data;
};

// Game endpoints
export const getUserGameScores = async (userId: string) => {
  const response = await api.get(`/game/scores/${userId}`);
  return response.data;
};

export const saveGameScore = async (data: {
  user_id: string;
  score: number;
  completion_time: number;
}) => {
  const response = await api.post('/game/scores', data);
  return response.data;
};

export const getGameLeaderboard = async () => {
  const response = await api.get('/game/leaderboard');
  return response.data;
};

// Add error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
