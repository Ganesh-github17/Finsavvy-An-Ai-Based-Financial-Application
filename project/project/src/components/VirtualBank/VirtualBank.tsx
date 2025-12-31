import React, { useState } from 'react';
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

interface Transaction {
    id: string;
    type: 'credit' | 'debit';
    amount: number;
    description: string;
    date: string;
    category: string;
}

interface Account {
    id: string;
    name: string;
    balance: number;
    type: 'savings' | 'checking' | 'investment';
    transactions: Transaction[];
}

const VirtualBank: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([
        {
            id: '1',
            name: 'Savings Account',
            balance: 50000,
            type: 'savings',
            transactions: []
        },
        {
            id: '2',
            name: 'Checking Account',
            balance: 25000,
            type: 'checking',
            transactions: []
        },
        {
            id: '3',
            name: 'Investment Account',
            balance: 100000,
            type: 'investment',
            transactions: []
        }
    ]);

    const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[0]);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [transactionType, setTransactionType] = useState<'credit' | 'debit'>('credit');
    const [category, setCategory] = useState('general');

    const categories = [
        'general',
        'salary',
        'shopping',
        'food',
        'transport',
        'utilities',
        'entertainment'
    ];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const handleTransaction = () => {
        if (!amount || !description) return;

        const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: transactionType,
            amount: Number(amount),
            description,
            date: new Date().toISOString(),
            category
        };

        const updatedAccounts = accounts.map(account => {
            if (account.id === selectedAccount.id) {
                const newBalance = transactionType === 'credit' 
                    ? account.balance + Number(amount)
                    : account.balance - Number(amount);
                
                return {
                    ...account,
                    balance: newBalance,
                    transactions: [newTransaction, ...account.transactions]
                };
            }
            return account;
        });

        setAccounts(updatedAccounts);
        setSelectedAccount(updatedAccounts.find(a => a.id === selectedAccount.id)!);
        setAmount('');
        setDescription('');
        setCategory('general');
    };

    const getBalanceHistory = () => {
        const history = selectedAccount.transactions.reduce((acc: { date: string; balance: number }[], transaction) => {
            const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : selectedAccount.balance;
            const change = transaction.type === 'credit' ? transaction.amount : -transaction.amount;
            return [...acc, {
                date: new Date(transaction.date).toLocaleDateString(),
                balance: lastBalance - change
            }];
        }, []);

        return {
            labels: history.map(h => h.date).reverse(),
            datasets: [{
                label: 'Account Balance',
                data: history.map(h => h.balance).reverse(),
                fill: true,
                borderColor: '#6366F1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4
            }]
        };
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
                    callback: function(value: number) {
                        return formatCurrency(value);
                    }
                }
            }
        }
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-white">Virtual Bank</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {accounts.map(account => (
                    <div
                        key={account.id}
                        onClick={() => setSelectedAccount(account)}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${
                            selectedAccount.id === account.id
                                ? 'bg-green-900/50 border-2 border-green-500'
                                : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                    >
                        <h3 className="text-lg font-semibold text-white mb-2">{account.name}</h3>
                        <p className="text-2xl font-bold text-white">{formatCurrency(account.balance)}</p>
                        <p className="text-sm text-gray-400 mt-1 capitalize">{account.type}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-4">New Transaction</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-2">Amount (₹)</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-gray-600 text-white rounded-lg p-3"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Description</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-gray-600 text-white rounded-lg p-3"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-gray-600 text-white rounded-lg p-3"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setTransactionType('credit')}
                                    className={`p-3 rounded-lg ${
                                        transactionType === 'credit'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-600 text-gray-300'
                                    }`}
                                >
                                    Credit
                                </button>
                                <button
                                    onClick={() => setTransactionType('debit')}
                                    className={`p-3 rounded-lg ${
                                        transactionType === 'debit'
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-600 text-gray-300'
                                    }`}
                                >
                                    Debit
                                </button>
                            </div>
                            <button
                                onClick={handleTransaction}
                                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Submit Transaction
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-4">Recent Transactions</h3>
                        <div className="space-y-3">
                            {selectedAccount.transactions.slice(0, 5).map(transaction => (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between p-3 bg-gray-600 rounded-lg"
                                >
                                    <div>
                                        <p className="text-white font-medium">{transaction.description}</p>
                                        <p className="text-sm text-gray-400">
                                            {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
                                        </p>
                                    </div>
                                    <p className={`font-semibold ${
                                        transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                        {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-4">Balance History</h3>
                        {selectedAccount.transactions.length > 0 ? (
                            <Line data={getBalanceHistory()} options={chartOptions} />
                        ) : (
                            <p className="text-gray-400 text-center py-8">No transaction history available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VirtualBank;
