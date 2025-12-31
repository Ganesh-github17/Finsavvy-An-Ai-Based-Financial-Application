import React from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { motion } from 'framer-motion';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

// Chart Options
const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: '#94a3b8', // text-slate-400
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(148, 163, 184, 0.1)', // text-slate-400 with opacity
      },
      ticks: {
        color: '#94a3b8', // text-slate-400
      },
    },
    y: {
      grid: {
        color: 'rgba(148, 163, 184, 0.1)', // text-slate-400 with opacity
      },
      ticks: {
        color: '#94a3b8', // text-slate-400
      },
    },
  },
};

export const InvestmentGrowthChart = () => {
  const data = {
    labels: ['Year 1', 'Year 5', 'Year 10', 'Year 15', 'Year 20', 'Year 25'],
    datasets: [
      {
        label: 'Conservative',
        data: [10000, 12000, 15000, 18000, 22000, 27000],
        borderColor: '#3b82f6', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Moderate',
        data: [10000, 13000, 18000, 25000, 35000, 48000],
        borderColor: '#10b981', // emerald-500
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      },
      {
        label: 'Aggressive',
        data: [10000, 14000, 22000, 35000, 55000, 85000],
        borderColor: '#f59e0b', // amber-500
        backgroundColor: 'rgba(245, 158, 11, 0.5)',
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="h-[300px] w-full"
    >
      <Line options={commonOptions} data={data} />
    </motion.div>
  );
};

export const AssetAllocationChart = () => {
  const data = {
    labels: ['Stocks', 'Bonds', 'Real Estate', 'Cash', 'Others'],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)', // blue-500
          'rgba(16, 185, 129, 0.8)', // emerald-500
          'rgba(245, 158, 11, 0.8)', // amber-500
          'rgba(139, 92, 246, 0.8)', // violet-500
          'rgba(236, 72, 153, 0.8)', // pink-500
        ],
        borderColor: '#1e293b', // slate-800
        borderWidth: 2,
      },
    ],
  };

  const options = {
    ...commonOptions,
    cutout: '60%',
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6 }}
      className="h-[300px] w-full"
    >
      <Doughnut options={options} data={data} />
    </motion.div>
  );
};

export const RiskReturnChart = () => {
  const data = {
    labels: ['Cash', 'Bonds', 'Real Estate', 'Stocks', 'Crypto'],
    datasets: [
      {
        label: 'Expected Return (%)',
        data: [2, 5, 8, 10, 15],
        backgroundColor: 'rgba(59, 130, 246, 0.8)', // blue-500
      },
      {
        label: 'Risk Level',
        data: [1, 3, 6, 8, 10],
        backgroundColor: 'rgba(245, 158, 11, 0.8)', // amber-500
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="h-[300px] w-full"
    >
      <Bar options={commonOptions} data={data} />
    </motion.div>
  );
};

export const LoanComparisonChart = () => {
  const data = {
    labels: ['5 Years', '10 Years', '15 Years', '20 Years', '25 Years', '30 Years'],
    datasets: [
      {
        label: 'Monthly EMI',
        data: [35000, 20000, 15000, 12000, 10000, 9000],
        borderColor: '#3b82f6', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Total Interest',
        data: [300000, 400000, 500000, 600000, 700000, 800000],
        borderColor: '#f59e0b', // amber-500
        backgroundColor: 'rgba(245, 158, 11, 0.5)',
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="h-[300px] w-full"
    >
      <Line options={commonOptions} data={data} />
    </motion.div>
  );
};
