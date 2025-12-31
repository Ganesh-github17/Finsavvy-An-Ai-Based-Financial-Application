import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
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
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LoanCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(1000000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [loanTerm, setLoanTerm] = useState(20);
    const [loanType, setLoanType] = useState('home');
    const [result, setResult] = useState(null);
    const [amortizationChart, setAmortizationChart] = useState(null);
    const [breakdownChart, setBreakdownChart] = useState(null);

    const calculateLoan = () => {
        const monthlyRate = interestRate / (12 * 100);
        const totalMonths = loanTerm * 12;
        const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
        const totalPayment = monthlyPayment * totalMonths;
        const totalInterest = totalPayment - loanAmount;

        // Generate amortization schedule
        let balance = loanAmount;
        const schedule = [];
        let yearlyData = Array(loanTerm).fill(0);
        
        for (let month = 1; month <= totalMonths; month++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = monthlyPayment - interestPayment;
            balance -= principalPayment;
            
            const yearIndex = Math.floor((month - 1) / 12);
            yearlyData[yearIndex] = balance;
            
            schedule.push({
                month,
                principalPayment,
                interestPayment,
                balance
            });
        }

        // Update line chart data
        setAmortizationChart({
            labels: Array.from({ length: loanTerm }, (_, i) => `Year ${i + 1}`),
            datasets: [{
                label: 'Loan Balance',
                data: yearlyData,
                fill: true,
                borderColor: '#6366F1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4
            }]
        });

        // Update pie chart data
        setBreakdownChart({
            labels: ['Principal', 'Total Interest'],
            datasets: [{
                data: [loanAmount, totalInterest],
                backgroundColor: [
                    'rgba(52, 211, 153, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    'rgb(52, 211, 153)',
                    'rgb(239, 68, 68)'
                ],
                borderWidth: 1
            }]
        });

        setResult({
            monthlyPayment,
            totalPayment,
            totalInterest,
            schedule
        });
    };

    useEffect(() => {
        calculateLoan();
    }, [loanAmount, interestRate, loanTerm, loanType]);

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
                        return `Balance: ${formatCurrency(context.parsed.y)}`;
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

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#E5E7EB'
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${formatCurrency(context.raw)}`;
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-white">Loan Calculator</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <label className="block text-gray-300 mb-2">Loan Type</label>
                        <div className="grid grid-cols-3 gap-4">
                            {['home', 'car', 'personal'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setLoanType(type)}
                                    className={`p-3 rounded-lg ${loanType === type ? 'bg-indigo-600 text-white' : 'bg-gray-600 text-gray-300'}`}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <label className="block text-gray-300 mb-2">Loan Amount (₹)</label>
                        <input
                            type="number"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            className="w-full bg-gray-600 text-white rounded-lg p-3"
                            min="100000"
                            step="100000"
                        />
                        <input
                            type="range"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            min="100000"
                            max="10000000"
                            step="100000"
                            className="w-full mt-2"
                        />
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <label className="block text-gray-300 mb-2">Interest Rate (%)</label>
                        <input
                            type="number"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full bg-gray-600 text-white rounded-lg p-3"
                            min="1"
                            max="30"
                            step="0.1"
                        />
                        <input
                            type="range"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            min="1"
                            max="30"
                            step="0.1"
                            className="w-full mt-2"
                        />
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <label className="block text-gray-300 mb-2">Loan Term (Years)</label>
                        <input
                            type="number"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(Number(e.target.value))}
                            className="w-full bg-gray-600 text-white rounded-lg p-3"
                            min="1"
                            max="30"
                        />
                        <input
                            type="range"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(Number(e.target.value))}
                            min="1"
                            max="30"
                            className="w-full mt-2"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    {result && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-indigo-900/50 p-4 rounded-lg">
                                    <h3 className="text-gray-300 mb-1">Monthly EMI</h3>
                                    <p className="text-2xl font-bold text-white">{formatCurrency(result.monthlyPayment)}</p>
                                </div>
                                <div className="bg-green-900/50 p-4 rounded-lg">
                                    <h3 className="text-gray-300 mb-1">Total Payment</h3>
                                    <p className="text-2xl font-bold text-white">{formatCurrency(result.totalPayment)}</p>
                                </div>
                            </div>

                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-white font-semibold mb-4">Payment Breakdown</h3>
                                {breakdownChart && (
                                    <div className="h-64">
                                        <Pie data={breakdownChart} options={pieChartOptions} />
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-white font-semibold mb-4">Balance Over Time</h3>
                                {amortizationChart && (
                                    <Line data={amortizationChart} options={chartOptions} />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoanCalculator;
