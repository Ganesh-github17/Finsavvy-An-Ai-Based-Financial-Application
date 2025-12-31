import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
  DollarSign,
  Calendar,
  TrendingUp,
  Calculator,
  Info
} from 'lucide-react';

interface InvestmentData {
  month: number;
  value: number;
}

const GrowthChart: React.FC<{ data: InvestmentData[] }> = ({ data }) => {
  // Pre-calculate max value to avoid repeated calculations
  const maxValue = React.useMemo(() => Math.max(...data.map(p => p.value)), [data]);

  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <OrbitControls enableZoom={false} enablePan={false} />
      <group position={[0, -1, 0]}>
        {/* Base platform */}
        <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 2]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        
        {/* Investment growth visualization */}
        {data.map((point, index) => {
          // Safeguard against division by zero
          const normalizedValue = maxValue > 0 ? point.value / maxValue : 0;
          const height = normalizedValue * 2;
          const xPos = (index / Math.max(1, data.length - 1)) * 3 - 1.5;
          
          return (
            <group key={index} position={[xPos, 0, 0]}>
              {/* Vertical bar */}
              <mesh position={[0, height / 2, 0]}>
                <boxGeometry args={[0.05, height, 0.05]} />
                <meshStandardMaterial color="#60A5FA" />
              </mesh>
              
              {/* Top sphere */}
              <mesh position={[0, height, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#93C5FD" metalness={0.5} roughness={0.2} />
              </mesh>
            </group>
          );
        })}
        
        {/* Decorative elements */}
        <mesh position={[-2, 0.5, -0.5]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[0.2, 1, 0.2]} />
          <meshStandardMaterial color="#4F46E5" metalness={0.6} roughness={0.2} />
        </mesh>
        <mesh position={[2, 0.3, -0.5]} rotation={[0, -Math.PI / 4, 0]}>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial color="#4F46E5" metalness={0.6} roughness={0.2} />
        </mesh>
      </group>
    </Canvas>
  );
};

const SIPCalculator: React.FC = () => {
  const [sipAmount, setSipAmount] = useState('');
  const [years, setYears] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [investmentData, setInvestmentData] = useState<InvestmentData[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const calculateMonthlyData = () => {
    const P = parseFloat(sipAmount) || 0;
    const t = parseFloat(years) || 0;
    const r = (parseFloat(expectedReturn) || 0) / 100 / 12;
    const n = t * 12;

    const data: InvestmentData[] = [];
    for (let i = 1; i <= n; i++) {
      const FV = P * ((Math.pow(1 + r, i) - 1) / r) * (1 + r);
      data.push({ month: i, value: FV });
    }
    return data;
  };

  useEffect(() => {
    if (sipAmount && years && expectedReturn) {
      setInvestmentData(calculateMonthlyData());
    }
  }, [sipAmount, years, expectedReturn]);

  const totalInvestment = parseFloat(sipAmount || '0') * parseFloat(years || '0') * 12;
  const finalAmount = investmentData.length > 0 ? investmentData[investmentData.length - 1].value : 0;
  const totalReturns = finalAmount - totalInvestment;

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div className="space-y-6 bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700/50">
          <h2 className="text-2xl font-bold text-white mb-6">SIP Calculator</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-2">Monthly Investment</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="number"
                  value={sipAmount}
                  onChange={(e) => setSipAmount(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter monthly investment amount"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Time Period (Years)</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter investment duration"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Expected Return Rate (% p.a.)
                <button
                  className="ml-2 text-blue-400 hover:text-blue-300"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <Info className="w-4 h-4 inline" />
                </button>
              </label>
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 p-2 text-xs bg-slate-700 text-slate-200 rounded shadow-lg max-w-xs"
                  >
                    Historical average returns have been between 8-12% per annum for diversified equity investments.
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter expected return rate"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700/50">
          <h3 className="text-xl font-semibold text-white mb-6">Investment Summary</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <span className="text-sm text-slate-400">Total Investment</span>
              <p className="text-2xl font-bold text-white">
                ${totalInvestment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <span className="text-sm text-slate-400">Expected Returns</span>
              <p className="text-2xl font-bold text-green-400">
                ${totalReturns.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>

          <div className="h-64 w-full bg-slate-900/50 rounded-lg overflow-hidden">
            {investmentData.length > 0 && <GrowthChart data={investmentData} />}
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm text-blue-300">
              Your investment of ${sipAmount || 0} monthly for {years || 0} years could grow to
              <span className="text-lg font-bold text-blue-400 ml-2">
                ${finalAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SIPCalculator;
