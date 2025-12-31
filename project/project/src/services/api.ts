import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatService = {
  sendMessage: async (message: string) => {
    try {
      const response = await api.post('/api/ai/chat', {
        user_id: 'user-123', // Replace with actual user ID
        module_content: '',
        question: message
      });
      return response.data;
    } catch (error) {
      console.error('Chat API Error:', error);
      throw error;
    }
  }
};

export const marketService = {
  getMarketData: async () => {
    try {
      const response = await api.get('/api/market-data');
      return response.data;
    } catch (error) {
      console.error('Market API Error:', error);
      throw error;
    }
  }
};

export const courseService = {
  getCourses: async () => {
    try {
      const response = await api.get('/api/courses');
      return response.data;
    } catch (error) {
      console.error('Course API Error:', error);
      throw error;
    }
  },
  
  getCourseById: async (courseId: string) => {
    try {
      const response = await api.get(`/api/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Course API Error:', error);
      throw error;
    }
  }
};
