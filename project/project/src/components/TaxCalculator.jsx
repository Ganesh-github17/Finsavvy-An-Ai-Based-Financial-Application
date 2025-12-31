import React, { useState, useEffect } from 'react';
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

const TaxCalculator = () => {
    const [income, setIncome] = useState(500000);
    const [age, setAge] = useState('below60');
    const [regime, setRegime] = useState('new');
    const [deductions, setDeductions] = useState({
        section80C: 0,
        section80D: 0,
        hra: 0,
        lta: 0,
        nps: 0
    });
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState(null);

    const calculateTax = () => {
        let taxableIncome = income;
        let tax = 0;
        
        if (regime === 'old') {
            // Apply deductions in old regime
            const totalDeductions = Object.values(deductions).reduce((a, b) => Number(a) + Number(b), 0);
            taxableIncome = Math.max(0, income - totalDeductions);
        }

        // New Tax Regime Calculation
        if (regime === 'new') {
            if (taxableIncome <= 300000) {
                tax = 0;
            } else if (taxableIncome <= 600000) {
                tax = (taxableIncome - 300000) * 0.05;
            } else if (taxableIncome <= 900000) {
                tax = 15000 + (taxableIncome - 600000) * 0.1;
            } else if (taxableIncome <= 1200000) {
                tax = 45000 + (taxableIncome - 900000) * 0.15;
            } else if (taxableIncome <= 1500000) {
                tax = 90000 + (taxableIncome - 1200000) * 0.2;
            } else {
                tax = 150000 + (taxableIncome - 1500000) * 0.3;
            }
        } else {
            // Old Tax Regime Calculation
            if (taxableIncome <= 250000) {
                tax = 0;
            } else if (taxableIncome <= 500000) {
                tax = (taxableIncome - 250000) * 0.05;
            } else if (taxableIncome <= 1000000) {
                tax = 12500 + (taxableIncome - 500000) * 0.2;
            } else {
                tax = 112500 + (taxableIncome - 1000000) * 0.3;
            }
        }

        // Add cess
        const cess = tax * 0.04;
        const totalTax = tax + cess;

        setResult({
            taxableIncome,
            tax,
            cess,
            totalTax,
            inHandIncome: income - totalTax
        });

        // Update chart data
        setChartData({
            labels: ['In-Hand Income', 'Tax', 'Cess'],
            datasets: [{
                data: [income - totalTax, tax, cess],
                backgroundColor: [
                    'rgba(72, 187, 120, 0.7)',
                    'rgba(237, 100, 166, 0.7)',
                    'rgba(66, 153, 225, 0.7)'
                ],
                borderColor: [
                    'rgb(72, 187, 120)',
                    'rgb(237, 100, 166)',
                    'rgb(66, 153, 225)'
                ],
                borderWidth: 1
            }]
        });
    };

    useEffect(() => {
        calculateTax();
    }, [income, age, regime, deductions]);

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
                <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-white">Income Tax Calculator</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <label className="block text-gray-300 mb-2">Annual Income (₹)</label>
                        <input
                            type="number"
                            value={income}
                            onChange={(e) => setIncome(Number(e.target.value))}
                            className="w-full bg-gray-600 text-white rounded-lg p-3"
                            min="0"
                            step="10000"
                        />
                        <input
                            type="range"
                            value={income}
                            onChange={(e) => setIncome(Number(e.target.value))}
                            min="0"
                            max="5000000"
                            step="10000"
                            className="w-full mt-2"
                        />
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <label className="block text-gray-300 mb-2">Age Group</label>
                        <select
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full bg-gray-600 text-white rounded-lg p-3"
                        >
                            <option value="below60">Below 60 years</option>
                            <option value="60to80">60 to 80 years</option>
                            <option value="above80">Above 80 years</option>
                        </select>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <label className="block text-gray-300 mb-2">Tax Regime</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setRegime('new')}
                                className={`p-3 rounded-lg ${regime === 'new' ? 'bg-pink-600 text-white' : 'bg-gray-600 text-gray-300'}`}
                            >
                                New Regime
                            </button>
                            <button
                                onClick={() => setRegime('old')}
                                className={`p-3 rounded-lg ${regime === 'old' ? 'bg-pink-600 text-white' : 'bg-gray-600 text-gray-300'}`}
                            >
                                Old Regime
                            </button>
                        </div>
                    </div>

                    {regime === 'old' && (
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-4">Deductions</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 mb-2">Section 80C</label>
                                    <input
                                        type="number"
                                        value={deductions.section80C}
                                        onChange={(e) => setDeductions({...deductions, section80C: Number(e.target.value)})}
                                        className="w-full bg-gray-600 text-white rounded-lg p-3"
                                        min="0"
                                        max="150000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Section 80D (Health Insurance)</label>
                                    <input
                                        type="number"
                                        value={deductions.section80D}
                                        onChange={(e) => setDeductions({...deductions, section80D: Number(e.target.value)})}
                                        className="w-full bg-gray-600 text-white rounded-lg p-3"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">HRA</label>
                                    <input
                                        type="number"
                                        value={deductions.hra}
                                        onChange={(e) => setDeductions({...deductions, hra: Number(e.target.value)})}
                                        className="w-full bg-gray-600 text-white rounded-lg p-3"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {result && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-pink-900/50 p-4 rounded-lg">
                                    <h3 className="text-gray-300 mb-1">Total Tax</h3>
                                    <p className="text-2xl font-bold text-white">{formatCurrency(result.totalTax)}</p>
                                </div>
                                <div className="bg-green-900/50 p-4 rounded-lg">
                                    <h3 className="text-gray-300 mb-1">In-Hand Income</h3>
                                    <p className="text-2xl font-bold text-white">{formatCurrency(result.inHandIncome)}</p>
                                </div>
                            </div>

                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-white font-semibold mb-4">Tax Breakdown</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Taxable Income</span>
                                        <span className="text-white">{formatCurrency(result.taxableIncome)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Base Tax</span>
                                        <span className="text-white">{formatCurrency(result.tax)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Health & Education Cess</span>
                                        <span className="text-white">{formatCurrency(result.cess)}</span>
                                    </div>
                                </div>
                            </div>

                            {chartData && (
                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <Doughnut data={chartData} options={chartOptions} />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaxCalculator;
