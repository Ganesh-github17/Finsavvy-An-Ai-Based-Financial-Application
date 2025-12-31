import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Expense {
    category: string;
    amount: number;
}

const EmergencyFundCalculator: React.FC = () => {
    const [monthlyIncome, setMonthlyIncome] = useState(50000);
    const [expenses, setExpenses] = useState<Expense[]>([
        { category: 'Housing', amount: 15000 },
        { category: 'Utilities', amount: 5000 },
        { category: 'Food', amount: 8000 },
        { category: 'Transportation', amount: 4000 },
        { category: 'Healthcare', amount: 3000 },
        { category: 'Insurance', amount: 2000 }
    ]);
    const [monthsCovered, setMonthsCovered] = useState(6);
    const [currentSavings, setCurrentSavings] = useState(100000);

    const calculateMonthlyExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    const calculateEmergencyFund = () => {
        const monthlyExpenses = calculateMonthlyExpenses();
        return monthlyExpenses * monthsCovered;
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const chartData = {
        labels: ['Current Savings', 'Required Emergency Fund'],
        datasets: [
            {
                label: 'Amount',
                data: [currentSavings, calculateEmergencyFund()],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(236, 72, 153, 0.8)'
                ],
                borderColor: [
                    'rgb(99, 102, 241)',
                    'rgb(236, 72, 153)'
                ],
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#E5E7EB'
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        return formatCurrency(context.raw);
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
                    callback: function(value: number) {
                        return formatCurrency(value);
                    }
                }
            }
        }
    };

    const expensesChartData = {
        labels: expenses.map(e => e.category),
        datasets: [
            {
                label: 'Monthly Expenses',
                data: expenses.map(e => e.amount),
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)'
                ],
                borderColor: [
                    'rgb(99, 102, 241)',
                    'rgb(236, 72, 153)',
                    'rgb(34, 197, 94)',
                    'rgb(245, 158, 11)',
                    'rgb(139, 92, 246)',
                    'rgb(236, 72, 153)'
                ],
                borderWidth: 1
            }
        ]
    };

    const handleExpenseChange = (index: number, amount: number) => {
        const newExpenses = [...expenses];
        newExpenses[index].amount = amount;
        setExpenses(newExpenses);
    };

    const getSavingsStatus = () => {
        const required = calculateEmergencyFund();
        const difference = currentSavings - required;
        
        if (difference >= 0) {
            return {
                message: 'Your emergency fund is fully funded!',
                color: 'text-green-400'
            };
        } else {
            return {
                message: `You need ${formatCurrency(Math.abs(difference))} more to reach your goal`,
                color: 'text-yellow-400'
            };
        }
    };

    const status = getSavingsStatus();

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-white">Emergency Fund Calculator</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-4">Monthly Income & Savings</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-2">Monthly Income (₹)</label>
                                <input
                                    type="number"
                                    value={monthlyIncome}
                                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                                    className="w-full bg-gray-600 text-white rounded-lg p-3"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Current Savings (₹)</label>
                                <input
                                    type="number"
                                    value={currentSavings}
                                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                                    className="w-full bg-gray-600 text-white rounded-lg p-3"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Months to Cover</label>
                                <input
                                    type="range"
                                    min="3"
                                    max="12"
                                    value={monthsCovered}
                                    onChange={(e) => setMonthsCovered(Number(e.target.value))}
                                    className="w-full"
                                />
                                <div className="text-right text-gray-400">{monthsCovered} months</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-4">Monthly Expenses</h3>
                        <div className="space-y-4">
                            {expenses.map((expense, index) => (
                                <div key={index}>
                                    <label className="block text-gray-300 mb-2">{expense.category} (₹)</label>
                                    <input
                                        type="number"
                                        value={expense.amount}
                                        onChange={(e) => handleExpenseChange(index, Number(e.target.value))}
                                        className="w-full bg-gray-600 text-white rounded-lg p-3"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-4">Emergency Fund Status</h3>
                        <div className="text-center mb-4">
                            <div className="text-3xl font-bold text-white mb-2">
                                {formatCurrency(calculateEmergencyFund())}
                            </div>
                            <div className="text-gray-400">Required Emergency Fund</div>
                            <div className={`mt-4 ${status.color}`}>
                                {status.message}
                            </div>
                        </div>
                        <Bar data={chartData} options={chartOptions} />
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-4">Monthly Expenses Breakdown</h3>
                        <Bar data={expensesChartData} options={chartOptions} />
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-4">Summary</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between p-3 bg-gray-600 rounded-lg">
                                <span className="text-gray-300">Total Monthly Expenses</span>
                                <span className="text-white font-medium">{formatCurrency(calculateMonthlyExpenses())}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-gray-600 rounded-lg">
                                <span className="text-gray-300">Monthly Savings Rate</span>
                                <span className="text-white font-medium">
                                    {Math.round((monthlyIncome - calculateMonthlyExpenses()) / monthlyIncome * 100)}%
                                </span>
                            </div>
                            <div className="flex justify-between p-3 bg-gray-600 rounded-lg">
                                <span className="text-gray-300">Months of Expenses Covered</span>
                                <span className="text-white font-medium">
                                    {(currentSavings / calculateMonthlyExpenses()).toFixed(1)} months
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyFundCalculator;
