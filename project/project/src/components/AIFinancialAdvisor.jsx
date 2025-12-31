import React from 'react';

const AIFinancialAdvisor = () => {
    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-white">AI Financial Advisor</h2>
            </div>
            <p className="text-gray-300 mb-6">Get personalized financial advice powered by NVIDIA AI</p>
            <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                    <textarea
                        className="w-full bg-gray-600 text-white rounded-lg p-3"
                        placeholder="Ask your financial question..."
                        rows="4"
                    ></textarea>
                </div>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    Get Advice
                </button>
            </div>
            <div className="mt-6 bg-gray-700 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">AI Response</h3>
                <div className="text-gray-300">
                    Your financial advice will appear here...
                </div>
            </div>
        </div>
    );
};

export default AIFinancialAdvisor;
