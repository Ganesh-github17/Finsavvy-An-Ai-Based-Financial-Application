import React, { useState } from 'react';
import { Play, Clock, BookOpen } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  youtubeId: string;
}

interface Module {
  id: number;
  title: string;
  description: string;
  videos: Video[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  modules: Module[];
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Financial Basics',
    description: 'Learn the fundamentals of personal finance',
    modules: [
      {
        id: 1,
        title: 'Understanding Money',
        description: 'Basic concepts of money and its role',
        videos: [
          {
            id: '1',
            title: 'What is Money?',
            description: 'Learn about the basic concepts of money and its functions in the economy',
            duration: '10:25',
            thumbnail: 'https://img.youtube.com/vi/YHjYt6Jm5j8/maxresdefault.jpg',
            youtubeId: 'YHjYt6Jm5j8'
          },
          {
            id: '2',
            title: 'Banking Basics',
            description: 'Understanding how banks work and their role in the financial system',
            duration: '15:30',
            thumbnail: 'https://img.youtube.com/vi/fTTGALaRZoc/maxresdefault.jpg',
            youtubeId: 'fTTGALaRZoc'
          }
        ]
      },
      {
        id: 2,
        title: 'Indian Financial Education',
        description: 'Learn about personal finance in the Indian context',
        videos: [
          {
            id: '3',
            title: 'Personal Finance Basics for Indians',
            description: 'Essential financial concepts every Indian should know',
            duration: '18:45',
            thumbnail: 'https://img.youtube.com/vi/PHe0bXAIuk0/maxresdefault.jpg',
            youtubeId: 'PHe0bXAIuk0'
          },
          {
            id: '4',
            title: 'Investment Options in India',
            description: 'Understanding various investment opportunities available in India',
            duration: '22:15',
            thumbnail: 'https://img.youtube.com/vi/WEDIj9JBTC8/maxresdefault.jpg',
            youtubeId: 'WEDIj9JBTC8'
          },
          {
            id: '5',
            title: 'Mutual Funds in India',
            description: 'Complete guide to investing in mutual funds for Indians',
            duration: '20:30',
            thumbnail: 'https://img.youtube.com/vi/7gRxBQ6Bv1k/maxresdefault.jpg',
            youtubeId: '7gRxBQ6Bv1k'
          },
          {
            id: '6',
            title: 'Tax Saving Investments in India',
            description: 'Learn about tax-saving investment options available in India',
            duration: '16:20',
            thumbnail: 'https://img.youtube.com/vi/bVYZxqn8qnM/maxresdefault.jpg',
            youtubeId: 'bVYZxqn8qnM'
          },
          {
            id: '7',
            title: 'Stock Market Basics for Indians',
            description: 'Introduction to Indian stock market and how to start investing',
            duration: '25:10',
            thumbnail: 'https://img.youtube.com/vi/Xn7KWR9EOGM/maxresdefault.jpg',
            youtubeId: 'Xn7KWR9EOGM'
          }
        ]
      }
    ]
  }
];

const VideoLessons: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course>(courses[0]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Course Videos</h2>
              
              <div className="space-y-6">
                {selectedCourse.modules.map((module) => (
                  <div key={module.id} className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      {module.title}
                    </h3>
                    
                    <div className="space-y-3">
                      {module.videos.map((video) => (
                        <button
                          key={video.id}
                          onClick={() => setSelectedVideo(video)}
                          className={`w-full p-4 rounded-xl text-left transition-all ${
                            selectedVideo?.id === video.id
                              ? 'bg-blue-600'
                              : 'bg-gray-700/50 hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex gap-4">
                            <div className="relative flex-shrink-0">
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-32 h-20 rounded-lg object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Play className="w-8 h-8 text-white" />
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{video.title}</h4>
                              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                                {video.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                                <Clock className="w-4 h-4" />
                                {video.duration}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="lg:col-span-2">
            {selectedVideo ? (
              <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {selectedVideo.title}
                  </h1>
                  <p className="text-gray-400">{selectedVideo.description}</p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-2xl p-8 shadow-xl h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Select a Video
                  </h3>
                  <p className="text-gray-400">
                    Choose a video from the list to start learning
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLessons;
