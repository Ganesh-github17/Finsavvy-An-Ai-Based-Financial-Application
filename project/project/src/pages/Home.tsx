import React, { useState } from 'react';
import { ArrowRight, Target, Eye, Users, TrendingUp, Award, BookOpen, IndianRupee } from 'lucide-react';
import { formatIndianNumber, formatIndianRupees } from '../utils/currency';
import FinancialScene from '../components/3D/FinancialScene';

const Home: React.FC = () => {
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [modalContent, setModalContent] = useState<{
        title: string;
        content: string;
    }>({ title: '', content: '' });

    const stats = [
        {
            icon: <Users className="w-8 h-8 text-blue-500" />,
            title: "Active Users",
            value: formatIndianNumber(10000),
            description: "Learners across India"
        },
        {
            icon: <Award className="w-8 h-8 text-green-500" />,
            title: "Success Rate",
            value: "92%",
            description: "Course completion"
        },
        {
            icon: <IndianRupee className="w-8 h-8 text-purple-500" />,
            title: "Average Savings",
            value: formatIndianRupees(50000),
            description: "Per user annually"
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-red-500" />,
            title: "Growth",
            value: "85%",
            description: "User skill improvement"
        }
    ];

    const openModal = (type: 'mission' | 'vision' | 'about') => {
        let content = {
            title: '',
            content: ''
        };

        switch (type) {
            case 'mission':
                content = {
                    title: 'Our Mission',
                    content: 'To empower Indians with comprehensive financial knowledge and practical skills through innovative learning experiences. We strive to make financial education accessible, engaging, and effective for everyone, regardless of their background or experience level.'
                };
                break;
            case 'vision':
                content = {
                    title: 'Our Vision',
                    content: 'To create a financially literate India, where every individual has the knowledge and tools to make informed financial decisions. We envision a future where financial education is not just accessible but transformative, leading to greater financial independence and security for all Indians.'
                };
                break;
            case 'about':
                content = {
                    title: 'About Us',
                    content: 'FINSAVVY is a cutting-edge financial education platform designed specifically for the Indian market. We combine interactive learning, real-world applications, and personalized guidance tailored to Indian financial contexts. Founded in 2025, we have grown to become a trusted resource for individuals seeking to enhance their financial knowledge and skills. Our platform offers comprehensive courses, real-time market insights, and practical tools designed to make learning both effective and engaging.'
                };
                break;
        }

        setModalContent(content);
        setShowAboutModal(true);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
            {/* 3D Financial Scene Background */}
            <div className="absolute inset-0 opacity-40">
                <FinancialScene />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 text-transparent bg-clip-text mb-6">
                        Master Financial Skills with FINSAVVY
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                        Your journey to financial wisdom starts here. Learn, practice, and excel in managing
                        your finances through engaging challenges and real-world applications.
                    </p>
                    <div className="flex justify-center gap-4 mb-16">
                        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                            Get Started <ArrowRight className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => openModal('about')}
                            className="px-8 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                        >
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                {stat.icon}
                                <h3 className="text-lg font-semibold text-gray-200">{stat.title}</h3>
                            </div>
                            <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                            <p className="text-gray-400">{stat.description}</p>
                        </div>
                    ))}
                </div>

                {/* Features Section */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                            <Target className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-4">Personalized Learning</h3>
                        <p className="text-gray-400">
                            Adaptive learning paths tailored to your financial goals and current knowledge level.
                        </p>
                    </div>
                    <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                            <Eye className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-4">Real-World Practice</h3>
                        <p className="text-gray-400">
                            Gain hands-on experience with virtual banking, investment simulations, and market analysis.
                        </p>
                    </div>
                    <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50">
                        <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-6">
                            <BookOpen className="w-6 h-6 text-pink-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-4">Expert Guidance</h3>
                        <p className="text-gray-400">
                            Learn from industry experts and get AI-powered recommendations for your financial decisions.
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showAboutModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                        </div>

                        <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-2xl font-bold mb-4">{modalContent.title}</h3>
                                <p className="text-gray-300">{modalContent.content}</p>
                            </div>
                            <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setShowAboutModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;