import React from 'react';
import { Target, Eye, Users, Star } from 'lucide-react';

const About: React.FC = () => {
    const team = [
        {
            name: 'B. Ganesh',
            role: 'Team Lead',
            placeholder: '🧑‍💼', // Will be replaced with actual image
        },
        {
            name: 'CH.SaiManish',
            role: 'Developer',
            placeholder: '👨‍💻', // Will be replaced with actual image
        },
        {
            name: 'A. Pranav',
            role: 'Developer',
            placeholder: '👨‍💻', // Will be replaced with actual image
        },
        {
            name: 'G.SriVignesh',
            role: 'Developer',
            placeholder: '👨‍💻', // Will be replaced with actual image
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mission & Vision Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <Target className="w-6 h-6 text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold">Our Mission</h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            To empower individuals with comprehensive financial knowledge and practical skills 
                            through innovative learning experiences. We strive to make financial education 
                            accessible, engaging, and effective for everyone, regardless of their background 
                            or experience level.
                        </p>
                    </div>

                    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <Eye className="w-6 h-6 text-purple-400" />
                            </div>
                            <h2 className="text-2xl font-bold">Our Vision</h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            To create a financially literate society where every individual has the knowledge 
                            and tools to make informed financial decisions. We envision a future where 
                            financial wisdom is accessible to all, fostering economic empowerment and prosperity.
                        </p>
                    </div>
                </div>

                {/* About Us Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <Star className="w-6 h-6 text-pink-400" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">About Us</h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            We are a passionate team of developers dedicated to revolutionizing financial education.
                            Our diverse skills and shared vision drive us to create innovative solutions that make
                            learning about finance engaging and accessible.
                        </p>
                    </div>
                </div>

                {/* Team Section */}
                <div>
                    <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all text-center group"
                            >
                                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6 flex items-center justify-center text-4xl overflow-hidden">
                                    {/* This will be replaced with actual image */}
                                    <span>{member.placeholder}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-gray-400">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values Section */}
                <div className="mt-20 text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Users className="w-6 h-6 text-green-400" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                            <p className="text-gray-300">
                                Constantly pushing boundaries to create engaging and effective learning experiences.
                            </p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                            <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                            <p className="text-gray-300">
                                Making financial education available and understandable for everyone.
                            </p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                            <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                            <p className="text-gray-300">
                                Committed to delivering high-quality educational content and user experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
