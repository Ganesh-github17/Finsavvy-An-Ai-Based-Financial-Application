import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const SIPCalculator = () => {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [years, setYears] = useState(10);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState(null);

    const calculateSIP = () => {
        const monthlyRate = expectedReturn / (12 * 100);
        const months = years * 12;
        const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        const totalInvestment = monthlyInvestment * months;
        const totalReturns = futureValue - totalInvestment;

        // Generate data for chart
        const yearlyData = Array.from({ length: years + 1 }, (_, index) => {
            const monthsAtPoint = index * 12;
            const valueAtPoint = monthlyInvestment * ((Math.pow(1 + monthlyRate, monthsAtPoint) - 1) / monthlyRate) * (1 + monthlyRate);
            return {
                year: index,
                value: Math.round(valueAtPoint)
            };
        });

        setChartData({
            labels: yearlyData.map(d => `Year ${d.year}`),
            datasets: [
                {
                    label: 'Portfolio Value',
                    data: yearlyData.map(d => d.value),
                    fill: true,
                    borderColor: '#4F46E5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    tension: 0.4
                }
            ]
        });

        setResult({
            futureValue: Math.round(futureValue),
            totalInvestment: Math.round(totalInvestment),
            totalReturns: Math.round(totalReturns)
        });
    };

    useEffect(() => {
        calculateSIP();
    }, [monthlyInvestment, years, expectedReturn]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#E5E7EB'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        return `Value: ${formatCurrency(context.parsed.y)}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                },
                ticks: {
                    color: '#E5E7EB'
                }
            },
            y: {
                grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                },
                ticks: {
                    color: '#E5E7EB',
                    callback: function(value) {
                        return formatCurrency(value);
                    }
                }
            }
        }
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-white">SIP Calculator</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <label className="block text-gray-300 mb-2">Monthly Investment (₹)</label>
                        <input
                            type="number"
                            value={monthlyInvestment}
                            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                            className="w-full bg-gray-600 text-white rounded-lg p-3"
                            min="500"
                            step="500"
                        />
                        <input
                            type="range"
                            value={monthlyInvestment}
                            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                            min="500"
                            max="100000"
                            step="500"
                            className="w-full mt-2"
                        />
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <label className="block text-gray-300 mb-2">Investment Period (Years)</label>
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className="w-full bg-gray-600 text-white rounded-lg p-3"
                            min="1"
                            max="30"
                        />
                        <input
                            type="range"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            min="1"
                            max="30"
                            className="w-full mt-2"
                        />
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <label className="block text-gray-300 mb-2">Expected Return Rate (%)</label>
                        <input
                            type="number"
                            value={expectedReturn}
                            onChange={(e) => setExpectedReturn(Number(e.target.value))}
                            className="w-full bg-gray-600 text-white rounded-lg p-3"
                            min="1"
                            max="30"
                            step="0.1"
                        />
                        <input
                            type="range"
                            value={expectedReturn}
                            onChange={(e) => setExpectedReturn(Number(e.target.value))}
                            min="1"
                            max="30"
                            step="0.1"
                            className="w-full mt-2"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    {result && (
                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-indigo-900/50 p-4 rounded-lg">
                                <h3 className="text-gray-300 mb-1">Future Value</h3>
                                <p className="text-2xl font-bold text-white">{formatCurrency(result.futureValue)}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-green-900/50 p-4 rounded-lg">
                                    <h3 className="text-gray-300 mb-1">Total Investment</h3>
                                    <p className="text-xl font-bold text-white">{formatCurrency(result.totalInvestment)}</p>
                                </div>
                                <div className="bg-blue-900/50 p-4 rounded-lg">
                                    <h3 className="text-gray-300 mb-1">Total Returns</h3>
                                    <p className="text-xl font-bold text-white">{formatCurrency(result.totalReturns)}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {chartData && (
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SIPCalculator;
