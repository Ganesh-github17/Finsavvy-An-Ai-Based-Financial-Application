import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageCircle, Send, ChevronRight, TrendingUp, PieChart, DollarSign, Heart, AlertTriangle } from 'lucide-react';

interface EmotionalResponse {
  sentiment: 'positive' | 'negative' | 'neutral';
  intensity: number;
  keywords: string[];
}

interface AIResponse {
  type: 'Welcome' | 'Emotional Support' | 'Error';
  message: string;
  supportMessage: string;
  emotion?: EmotionalResponse;
}

const AIAdvisor: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState<AIResponse[]>([
    {
      type: 'Welcome',
      message: 'Hello! I\'m here to listen and provide emotional support. Feel free to share how you\'re feeling, and we can work through your emotions together.',
      supportMessage: 'Your feelings are valid, and I\'m here to help you process them.',
      emotion: {
        sentiment: 'neutral',
        intensity: 0.5,
        keywords: []
      }
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeEmotion = (text: string): EmotionalResponse => {
    const positiveWords = ['happy', 'great', 'excited', 'good', 'confident', 'optimistic', 'thank', 'pleased'];
    const negativeWords = ['worried', 'sad', 'anxious', 'concerned', 'stressed', 'afraid', 'confused', 'frustrated'];
    
    const words = text.toLowerCase().split(' ');
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    let intensity = 0;
    const keywords: string[] = [];

    words.forEach(word => {
      if (positiveWords.includes(word)) {
        sentiment = 'positive';
        intensity += 0.2;
        keywords.push(word);
      } else if (negativeWords.includes(word)) {
        sentiment = 'negative';
        intensity += 0.2;
        keywords.push(word);
      }
    });

    return {
      sentiment,
      intensity: Math.min(intensity, 1),
      keywords
    };
  };

  const getEmotionalResponse = (emotion: EmotionalResponse): string => {
    const responses = {
      positive: [
        "I'm so glad you're feeling positive!\n\n* Your optimism is wonderful to see\n* This positive energy can help you tackle any challenge\n* Let's build on these good feelings\n\n",
        "It's wonderful to see your enthusiasm!\n\n* Your positive attitude is inspiring\n* These good feelings can lead to great things\n* Let's celebrate this moment together\n\n",
        "Your confidence is amazing!\n\n* This positive outlook will serve you well\n* You have every reason to feel good\n* Let's embrace these uplifting emotions\n\n"
      ],
      negative: [
        "I hear that you're struggling, and I'm here for you:\n\n* Your feelings are completely valid\n* It's okay to not be okay sometimes\n* We can work through these emotions together\n\n",
        "I understand this is difficult, and I'm here to support you:\n\n* Many people experience similar feelings\n* You're not alone in this\n* We can take it one step at a time\n\n",
        "Thank you for sharing your feelings with me:\n\n* It takes courage to express difficult emotions\n* Let's process these feelings together\n* I'm here to listen and support you\n\n"
      ],
      neutral: [
        "I'm here to support you emotionally:\n\n* We can explore your feelings together\n* Every emotion is valid and important\n* You're in a safe space to express yourself\n\n",
        "Let's explore how you're feeling:\n\n* Your emotional well-being matters\n* We can discuss anything that's on your mind\n* I'm here to listen and understand\n\n",
        "Feel free to share what's on your mind:\n\n* Your feelings are important\n* We can work through any emotion\n* This is a judgment-free space\n\n"
      ]
    };

    const responseArray = responses[emotion.sentiment];
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsLoading(true);
    const emotion = analyzeEmotion(userInput);

    try {
      const response = await fetch('http://localhost:5000/api/chat/tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput.trim(),
          context: 'emotional_support'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const emotionalPrefix = getEmotionalResponse(emotion);
      
      setResponses(prev => [...prev, {
        type: 'Emotional Support',
        message: emotionalPrefix + data.response,
        supportMessage: 'Remember, your feelings are valid and important. I\'m here to support you through this.',
        emotion
      }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setResponses(prev => [...prev, {
        type: 'Error',
        message: "I apologize, but I'm having trouble connecting to the server.",
        recommendation: 'Please try again later.',
        emotion: {
          sentiment: 'neutral',
          intensity: 0.5,
          keywords: []
        }
      }]);
    } finally {
      setUserInput('');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative overflow-hidden rounded-3xl bg-blue-600 bg-opacity-10 backdrop-blur-lg p-8 border border-blue-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x"></div>
          <h1 className="text-5xl font-bold text-white mb-4 relative z-10">AI Emotional Support</h1>
          <p className="text-xl text-blue-200 relative z-10">Get compassionate emotional support powered by advanced AI</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Insights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {[
              { title: 'Express Yourself', icon: Heart, color: 'from-pink-500 to-rose-600' },
              { title: 'Find Support', icon: MessageCircle, color: 'from-blue-500 to-indigo-600' },
              { title: 'Process Emotions', icon: Brain, color: 'from-purple-500 to-pink-600' }
            ].map((insight, index) => (
              <div
                key={insight.title}
                className={`p-6 rounded-2xl bg-gradient-to-br ${insight.color} backdrop-blur-lg border border-white/10 cursor-pointer hover:scale-105 transition-transform duration-200`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <insight.icon className="w-8 h-8 text-white mr-4" />
                    <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white" />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/20 shadow-2xl"
          >
            <div className="flex items-center mb-6">
              <Brain className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-2xl font-semibold text-white">AI Consultation</h2>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4 mb-6 h-[400px] overflow-y-auto">
              {responses.map((response, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-purple-900/20 border border-purple-500/20"
                >
                  <div className="flex items-center mb-2">
                    <MessageCircle className="w-5 h-5 text-purple-400 mr-2" />
                    <h3 className="text-purple-300 font-medium">{response.type}</h3>
                    {response.emotion && (
                      <div className="flex items-center ml-2">
                        {response.emotion.sentiment === 'positive' && (
                          <Heart className="w-4 h-4 text-pink-400" />
                        )}
                        {response.emotion.sentiment === 'negative' && (
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-300 mb-2 whitespace-pre-line">{response.message}</p>
                  <p className="text-purple-400 text-sm">{response.supportMessage}</p>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Share how you're feeling..."
                className="w-full bg-blue-900/20 text-white rounded-xl px-4 py-3 pr-12 border border-blue-500/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-colors"
                disabled={isLoading}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;
