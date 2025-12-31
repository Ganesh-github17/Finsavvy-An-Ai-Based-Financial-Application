import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

interface CreditFactor {
    name: string;
    weight: number;
    score: number;
    description: string;
}

const CreditScoreChecker: React.FC = () => {
    const [creditScore, setCreditScore] = useState(750);
    const [paymentHistory, setPaymentHistory] = useState(95);
    const [creditUtilization, setCreditUtilization] = useState(30);
    const [creditAge, setCreditAge] = useState(5);
    const [creditMix, setCreditMix] = useState(3);
    const [creditInquiries, setCreditInquiries] = useState(2);

    const creditFactors: CreditFactor[] = [
        {
            name: 'Payment History',
            weight: 35,
            score: paymentHistory,
            description: 'Your track record of paying bills on time'
        },
        {
            name: 'Credit Utilization',
            weight: 30,
            score: 100 - creditUtilization,
            description: 'Amount of credit you\'re using compared to your credit limits'
        },
        {
            name: 'Credit Age',
            weight: 15,
            score: Math.min(creditAge * 10, 100),
            description: 'Length of your credit history'
        },
        {
            name: 'Credit Mix',
            weight: 10,
            score: creditMix * 20,
            description: 'Different types of credit accounts you have'
        },
        {
            name: 'Credit Inquiries',
            weight: 10,
            score: 100 - (creditInquiries * 10),
            description: 'Number of recent applications for credit'
        }
    ];

    const calculateScore = () => {
        const score = creditFactors.reduce((total, factor) => {
            return total + (factor.score * factor.weight / 100);
        }, 0);
        setCreditScore(Math.round(score * 8.5)); // Scale to 850
    };

    const getScoreColor = (score: number) => {
        if (score >= 750) return '#22C55E'; // Excellent
        if (score >= 670) return '#3B82F6'; // Good
        if (score >= 580) return '#F59E0B'; // Fair
        return '#EF4444'; // Poor
    };

    const getScoreCategory = (score: number) => {
        if (score >= 750) return 'Excellent';
        if (score >= 670) return 'Good';
        if (score >= 580) return 'Fair';
        return 'Poor';
    };

    const chartData = {
        labels: creditFactors.map(f => f.name),
        datasets: [{
            data: creditFactors.map(f => f.weight),
            backgroundColor: [
                'rgba(59, 130, 246, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(236, 72, 153, 0.8)'
            ],
            borderColor: [
                'rgb(59, 130, 246)',
                'rgb(34, 197, 94)',
                'rgb(245, 158, 11)',
                'rgb(139, 92, 246)',
                'rgb(236, 72, 153)'
            ],
            borderWidth: 1
        }]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: '#E5E7EB'
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        return `Weight: ${context.raw}%`;
                    }
                }
            }
        }
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-white">Credit Score Checker</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-4">Credit Factors</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-2">Payment History (%)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={paymentHistory}
                                    onChange={(e) => setPaymentHistory(Number(e.target.value))}
                                    className="w-full"
                                />
                                <div className="text-right text-gray-400">{paymentHistory}%</div>
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Credit Utilization (%)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={creditUtilization}
                                    onChange={(e) => setCreditUtilization(Number(e.target.value))}
                                    className="w-full"
                                />
                                <div className="text-right text-gray-400">{creditUtilization}%</div>
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Credit Age (Years)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="10"
                                    value={creditAge}
                                    onChange={(e) => setCreditAge(Number(e.target.value))}
                                    className="w-full"
                                />
                                <div className="text-right text-gray-400">{creditAge} years</div>
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Credit Mix (Types)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    value={creditMix}
                                    onChange={(e) => setCreditMix(Number(e.target.value))}
                                    className="w-full"
                                />
                                <div className="text-right text-gray-400">{creditMix} types</div>
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Recent Credit Inquiries</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="10"
                                    value={creditInquiries}
                                    onChange={(e) => setCreditInquiries(Number(e.target.value))}
                                    className="w-full"
                                />
                                <div className="text-right text-gray-400">{creditInquiries} inquiries</div>
                            </div>
                            <button
                                onClick={calculateScore}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Calculate Score
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-4">Your Credit Score</h3>
                        <div className="flex items-center justify-center mb-4">
                            <div className="text-center">
                                <div className="text-5xl font-bold" style={{ color: getScoreColor(creditScore) }}>
                                    {creditScore}
                                </div>
                                <div className="text-gray-400 mt-2">
                                    {getScoreCategory(creditScore)}
                                </div>
                            </div>
                        </div>
                        <div className="h-64">
                            <Doughnut data={chartData} options={chartOptions} />
                        </div>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-4">Credit Factors Impact</h3>
                        <div className="space-y-3">
                            {creditFactors.map((factor, index) => (
                                <div key={index} className="p-3 bg-gray-600 rounded-lg">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="text-white font-medium">{factor.name}</div>
                                        <div className="text-gray-400">{factor.weight}%</div>
                                    </div>
                                    <div className="text-sm text-gray-400">{factor.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditScoreChecker;
