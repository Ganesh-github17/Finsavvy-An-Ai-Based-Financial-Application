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

interface StockData {
    date: string;
    price: number;
    prediction: number;
}

const StockMarketPredictor: React.FC = () => {
    const [stockSymbol, setStockSymbol] = useState('AAPL');
    const [timeframe, setTimeframe] = useState('1M');
    const [stockData, setStockData] = useState<StockData[]>([]);
    const [loading, setLoading] = useState(false);

    // Mock data generator
    const generateMockData = () => {
        const data: StockData[] = [];
        let currentPrice = 150;
        const days = timeframe === '1M' ? 30 : timeframe === '3M' ? 90 : 180;

        for (let i = days; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            
            // Add some random variation to price
            currentPrice = currentPrice * (1 + (Math.random() - 0.5) * 0.02);
            
            // Generate prediction with slight upward bias
            const prediction = currentPrice * (1 + (Math.random() * 0.03));

            data.push({
                date: date.toISOString().split('T')[0],
                price: parseFloat(currentPrice.toFixed(2)),
                prediction: parseFloat(prediction.toFixed(2))
            });
        }

        return data;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mockData = generateMockData();
            setStockData(mockData);
            setLoading(false);
        };

        fetchData();
    }, [stockSymbol, timeframe]);

    const chartData = {
        labels: stockData.map(d => d.date),
        datasets: [
            {
                label: 'Historical Price',
                data: stockData.map(d => d.price),
                borderColor: '#6366F1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'Predicted Price',
                data: stockData.map(d => d.prediction),
                borderColor: '#EC4899',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                fill: true,
                tension: 0.4,
                borderDash: [5, 5]
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
                mode: 'index' as const,
                intersect: false,
                callbacks: {
                    label: function(context: any) {
                        return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
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
                    color: '#E5E7EB',
                    maxRotation: 45,
                    minRotation: 45
                }
            },
            y: {
                grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                },
                ticks: {
                    color: '#E5E7EB',
                    callback: function(value: number) {
                        return '$' + value.toFixed(2);
                    }
                }
            }
        }
    };

    const popularStocks = [
        { symbol: 'AAPL', name: 'Apple Inc.' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.' },
        { symbol: 'MSFT', name: 'Microsoft Corporation' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.' },
        { symbol: 'META', name: 'Meta Platforms Inc.' },
        { symbol: 'TSLA', name: 'Tesla Inc.' }
    ];

    const timeframes = [
        { value: '1M', label: '1 Month' },
        { value: '3M', label: '3 Months' },
        { value: '6M', label: '6 Months' }
    ];

    const getLatestPrice = () => {
        if (stockData.length === 0) return null;
        const latest = stockData[stockData.length - 1];
        const previous = stockData[stockData.length - 2];
        const change = ((latest.price - previous.price) / previous.price) * 100;
        return {
            price: latest.price,
            change: change
        };
    };

    const latestPrice = getLatestPrice();

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-white">Stock Market Predictor</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-4">Select Stock</h3>
                        <div className="space-y-2">
                            {popularStocks.map(stock => (
                                <button
                                    key={stock.symbol}
                                    onClick={() => setStockSymbol(stock.symbol)}
                                    className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                                        stockSymbol === stock.symbol
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                    }`}
                                >
                                    <div className="font-medium">{stock.symbol}</div>
                                    <div className="text-sm opacity-75">{stock.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-4">Timeframe</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {timeframes.map(tf => (
                                <button
                                    key={tf.value}
                                    onClick={() => setTimeframe(tf.value)}
                                    className={`p-2 rounded-lg text-center transition-all duration-200 ${
                                        timeframe === tf.value
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                    }`}
                                >
                                    {tf.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {latestPrice && (
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-4">Latest Price</h3>
                            <div className="text-3xl font-bold text-white">
                                ${latestPrice.price.toFixed(2)}
                            </div>
                            <div className={`text-sm mt-1 ${
                                latestPrice.change >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                                {latestPrice.change >= 0 ? '↑' : '↓'} {Math.abs(latestPrice.change).toFixed(2)}%
                            </div>
                        </div>
                    )}
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-white font-semibold">Price Chart</h3>
                            {loading && (
                                <div className="text-sm text-gray-400">Loading...</div>
                            )}
                        </div>
                        {stockData.length > 0 && (
                            <Line data={chartData} options={chartOptions} />
                        )}
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-4">Market Insights</h3>
                        <div className="space-y-4">
                            <div className="p-3 bg-gray-600 rounded-lg">
                                <div className="text-sm text-gray-400">Trend Analysis</div>
                                <div className="text-white">
                                    The stock shows a {Math.random() > 0.5 ? 'bullish' : 'bearish'} trend with moderate volatility
                                </div>
                            </div>
                            <div className="p-3 bg-gray-600 rounded-lg">
                                <div className="text-sm text-gray-400">Volume Analysis</div>
                                <div className="text-white">
                                    Trading volume is {Math.random() > 0.5 ? 'above' : 'below'} average
                                </div>
                            </div>
                            <div className="p-3 bg-gray-600 rounded-lg">
                                <div className="text-sm text-gray-400">AI Prediction</div>
                                <div className="text-white">
                                    Our AI model predicts a potential {Math.random() > 0.5 ? 'upward' : 'downward'} movement in the next session
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockMarketPredictor;
