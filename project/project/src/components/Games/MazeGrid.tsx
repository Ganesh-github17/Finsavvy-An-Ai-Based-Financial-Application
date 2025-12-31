import React from 'react';
import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';

interface MazeGridProps {
  size: number;
  grid: number[][];
  playerPosition: { x: number; y: number };
  coins: { x: number; y: number }[];
}

const MazeGrid: React.FC<MazeGridProps> = ({ size, grid, playerPosition, coins }) => {
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
      {grid.map((row, y) => (
        row.map((cell, x) => {
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          const hasCoin = coins.some(coin => coin.x === x && coin.y === y);
          const isWall = cell === 0;

          return (
            <motion.div
              key={`${x}-${y}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                backgroundColor: isWall 
                  ? '#1e293b' // slate-800
                  : isPlayer 
                    ? '#f59e0b' // amber-500
                    : '#334155' // slate-700
              }}
              transition={{ 
                duration: 0.2,
                delay: (x + y) * 0.02 
              }}
              className={`
                aspect-square rounded-lg relative
                ${isWall ? 'bg-slate-800 border-2 border-slate-700' : 'bg-slate-700'}
                ${isPlayer ? 'bg-amber-500 shadow-lg shadow-amber-500/20' : ''}
              `}
            >
              {hasCoin && !isPlayer && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Coins className="w-6 h-6 text-amber-400" />
                </motion.div>
              )}
              {isPlayer && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <div className="w-3/4 h-3/4 bg-amber-600 rounded-full shadow-inner" />
                </motion.div>
              )}
            </motion.div>
          );
        })
      ))}
    </div>
  );
};

export default MazeGrid;
