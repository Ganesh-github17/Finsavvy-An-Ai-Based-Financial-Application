import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Target, AlertTriangle, Trophy, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Heart } from 'lucide-react';
import { formatIndianRupees } from '../../../utils/currency';

interface Cell {
  type: 'empty' | 'wall' | 'coin' | 'powerup' | 'trap' | 'goal';
  value?: number;
}

interface Position {
  x: number;
  y: number;
}

interface GameState {
  moves: number;
  coins: number;
  isGameStarted: boolean;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  maze: Cell[][];
  playerPosition: Position;
  lives: number;
  timeLeft: number;
  level: number;
  score: number;
  showTutorial: boolean;
  gameOver: boolean;
}

const MAZE_SIZE = {
  beginner: 10,
  intermediate: 12,
  expert: 15
};
const INITIAL_LIVES = 3;
const GAME_DURATION = 180; // 3 minutes
const COIN_FREQUENCY = {
  beginner: 0.3,
  intermediate: 0.2,
  expert: 0.15
};
const TRAP_FREQUENCY = {
  beginner: 0.1,
  intermediate: 0.15,
  expert: 0.2
};

const MoneyMaze: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    moves: 0,
    coins: 0,
    isGameStarted: false,
    difficulty: 'beginner',
    maze: [],
    playerPosition: { x: 1, y: 1 },
    lives: INITIAL_LIVES,
    timeLeft: GAME_DURATION,
    level: 1,
    score: 0,
    showTutorial: true,
    gameOver: false
  });

  const generateMaze = () => {
    const size = MAZE_SIZE[gameState.difficulty];
    const newMaze: Cell[][] = Array(size).fill(null).map(() =>
      Array(size).fill(null).map(() => ({ type: 'wall' }))
    );

    const createPath = (x: number, y: number) => {
      newMaze[y][x] = { type: 'empty' };
      const directions = [
        [0, -2], [2, 0], [0, 2], [-2, 0]
      ].sort(() => Math.random() - 0.5);

      directions.forEach(([dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;
        if (
          newX > 0 && newX < size - 1 &&
          newY > 0 && newY < size - 1 &&
          newMaze[newY][newX].type === 'wall'
        ) {
          newMaze[y + dy/2][x + dx/2] = { type: 'empty' };
          createPath(newX, newY);
        }
      });
    };

    createPath(1, 1);

    // Add goal at a random position far from start
    let goalPlaced = false;
    for (let y = Math.floor(size * 0.7); y < size - 1 && !goalPlaced; y++) {
      for (let x = Math.floor(size * 0.7); x < size - 1 && !goalPlaced; x++) {
        if (newMaze[y][x].type === 'empty') {
          newMaze[y][x] = { type: 'goal' };
          goalPlaced = true;
        }
      }
    }

    // Add coins, powerups, and traps
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (newMaze[y][x].type === 'empty') {
          const rand = Math.random();
          if (rand < COIN_FREQUENCY[gameState.difficulty]) {
            newMaze[y][x] = {
              type: 'coin',
              value: Math.floor(Math.random() * (1000 - 500 + 1) + 500) * gameState.level
            };
          } else if (rand < COIN_FREQUENCY[gameState.difficulty] + 0.1) {
            newMaze[y][x] = { type: 'powerup' };
          } else if (rand < COIN_FREQUENCY[gameState.difficulty] + 0.1 + TRAP_FREQUENCY[gameState.difficulty]) {
            newMaze[y][x] = { type: 'trap' };
          }
        }
      }
    }

    setGameState(prev => ({
      ...prev,
      maze: newMaze,
      playerPosition: { x: 1, y: 1 }
    }));
  };

  useEffect(() => {
    if (gameState.isGameStarted && !gameState.gameOver) {
      generateMaze();
    }
  }, [gameState.level, gameState.isGameStarted]);

  useEffect(() => {
    if (gameState.isGameStarted && !gameState.showTutorial && !gameState.gameOver && gameState.timeLeft > 0) {
      const timer = setInterval(() => {
        setGameState(prev => {
          if (prev.timeLeft <= 1) {
            return { ...prev, gameOver: true, timeLeft: 0 };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState.isGameStarted, gameState.showTutorial, gameState.gameOver, gameState.timeLeft]);

  const handleMove = (dx: number, dy: number) => {
    if (gameState.gameOver || gameState.showTutorial || !gameState.isGameStarted) return;

    const newX = gameState.playerPosition.x + dx;
    const newY = gameState.playerPosition.y + dy;

    if (
      newX >= 0 && newX < MAZE_SIZE[gameState.difficulty] &&
      newY >= 0 && newY < MAZE_SIZE[gameState.difficulty] &&
      gameState.maze[newY][newX].type !== 'wall'
    ) {
      const cell = gameState.maze[newY][newX];
      const newMaze = [...gameState.maze];

      setGameState(prev => {
        const updates: Partial<GameState> = {
          playerPosition: { x: newX, y: newY },
          moves: prev.moves + 1
        };

        if (cell.type === 'coin') {
          const coinValue = cell.value || 0;
          updates.score = prev.score + coinValue;
          updates.coins = prev.coins + 1;
          newMaze[newY][newX] = { type: 'empty' };
        } else if (cell.type === 'powerup') {
          updates.lives = Math.min(prev.lives + 1, INITIAL_LIVES);
          newMaze[newY][newX] = { type: 'empty' };
        } else if (cell.type === 'trap') {
          updates.lives = prev.lives - 1;
          if (updates.lives <= 0) {
            updates.gameOver = true;
          }
          newMaze[newY][newX] = { type: 'empty' };
        } else if (cell.type === 'goal') {
          updates.level = prev.level + 1;
          updates.timeLeft = Math.min(prev.timeLeft + 60, GAME_DURATION); // Bonus time for reaching goal
          generateMaze(); // Generate new maze for next level
        }

        updates.maze = newMaze;
        return { ...prev, ...updates };
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState.gameOver || gameState.showTutorial || !gameState.isGameStarted) return;
      e.preventDefault();
      switch (e.key) {
        case 'ArrowUp': handleMove(0, -1); break;
        case 'ArrowDown': handleMove(0, 1); break;
        case 'ArrowLeft': handleMove(-1, 0); break;
        case 'ArrowRight': handleMove(1, 0); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.playerPosition, gameState.maze, gameState.gameOver, gameState.showTutorial]);

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      isGameStarted: true,
      showTutorial: false
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Game Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-transparent bg-clip-text"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Money Maze
          </motion.h1>
          <p className="text-slate-300">Master financial strategy through gameplay</p>
        </div>

        {!gameState.isGameStarted ? (
          <motion.div 
            className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Game Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-amber-400">How to Play</h2>
                <div className="flex items-start space-x-3 text-slate-300">
                  <ArrowRight className="w-5 h-5 mt-1 text-amber-400" />
                  <p>Use arrow keys to navigate through the maze</p>
                </div>
                <div className="flex items-start space-x-3 text-slate-300">
                  <Coins className="w-5 h-5 mt-1 text-amber-400" />
                  <p>Collect coins to increase your portfolio value</p>
                </div>
                <div className="flex items-start space-x-3 text-slate-300">
                  <AlertTriangle className="w-5 h-5 mt-1 text-amber-400" />
                  <p>Avoid obstacles that represent market risks</p>
                </div>
                <div className="flex items-start space-x-3 text-slate-300">
                  <Target className="w-5 h-5 mt-1 text-amber-400" />
                  <p>Reach the goal with maximum portfolio value</p>
                </div>
              </div>

              {/* Difficulty Selection */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-amber-400">Select Difficulty</h2>
                <div className="space-y-3">
                  {['beginner', 'intermediate', 'expert'].map((level) => (
                    <motion.button
                      key={level}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-4 rounded-lg border ${
                        gameState.difficulty === level
                          ? 'bg-amber-500 border-amber-400 text-slate-900'
                          : 'bg-slate-700 border-slate-600 text-slate-300'
                      } transition-all duration-200`}
                      onClick={() => setGameState(prev => ({ ...prev, difficulty: level as GameState['difficulty'] }))}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Start Game Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 px-8 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 rounded-lg font-bold text-lg shadow-lg hover:shadow-amber-500/20 transition-all duration-200"
              onClick={startGame}
            >
              Start Game
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Game Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-700 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Coins className="w-5 h-5 text-amber-400" />
                  <span className="text-slate-300">Score</span>
                </div>
                <div className="text-xl font-bold text-amber-400">
                  {formatIndianRupees(gameState.score)}
                </div>
              </div>
              <div className="bg-slate-700 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-5 h-5 text-purple-400" />
                  <span className="text-slate-300">Level</span>
                </div>
                <div className="text-xl font-bold text-purple-400">
                  {gameState.level}
                </div>
              </div>
              <div className="bg-slate-700 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300">Time</span>
                </div>
                <div className="text-xl font-bold text-blue-400">
                  {Math.floor(gameState.timeLeft / 60)}:{(gameState.timeLeft % 60).toString().padStart(2, '0')}
                </div>
              </div>
              <div className="bg-slate-700 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-5 h-5 text-red-400" />
                  <span className="text-slate-300">Lives</span>
                </div>
                <div className="flex space-x-1">
                  {Array.from({ length: INITIAL_LIVES }).map((_, i) => (
                    <Heart
                      key={i}
                      className={`w-5 h-5 ${i < gameState.lives ? 'text-red-500' : 'text-slate-600'}`}
                      fill={i < gameState.lives ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Game Grid */}
            <div className="relative aspect-square bg-slate-800 rounded-lg overflow-hidden border-2 border-slate-600">
              <div className="grid gap-0.5 p-1" style={{ 
                gridTemplateColumns: `repeat(${MAZE_SIZE[gameState.difficulty]}, minmax(0, 1fr))` 
              }}>
                {gameState.maze.map((row, y) => (
                  row.map((cell, x) => (
                    <motion.div
                      key={`${x}-${y}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: (x + y) * 0.01 }}
                      className={`
                        relative aspect-square rounded-sm border border-slate-700
                        ${cell.type === 'wall' ? 'bg-slate-900' : cell.type === 'goal' ? 'bg-green-500' : 'bg-slate-700'}
                        ${gameState.playerPosition.x === x && gameState.playerPosition.y === y ? 'ring-2 ring-blue-400' : ''}
                        hover:opacity-90 transition-opacity
                      `}
                    >
                      {cell.type === 'coin' && (
                        <motion.div
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Coins className="w-3 h-3 text-amber-400" />
                        </motion.div>
                      )}
                      {cell.type === 'powerup' && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Heart className="w-3 h-3 text-red-400" />
                        </motion.div>
                      )}
                      {cell.type === 'trap' && (
                        <motion.div
                          animate={{ rotate: [0, 180, 360] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))
                ))}
              </div>

              {/* Player */}
              <motion.div
                layoutId="player"
                className="absolute"
                style={{
                  width: `${100 / MAZE_SIZE}%`,
                  height: `${100 / MAZE_SIZE}%`,
                  left: `${(gameState.playerPosition.x * 100) / MAZE_SIZE}%`,
                  top: `${(gameState.playerPosition.y * 100) / MAZE_SIZE}%`,
                  transition: 'left 0.2s, top 0.2s'
                }}
              >
                <div className="absolute inset-2 bg-blue-500 rounded-full shadow-lg" />
              </motion.div>
            </div>

            {/* Controls */}
            <div className="mt-6 grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
              <div />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleMove(0, -1)}
                className="p-3 bg-slate-700 rounded-lg text-white hover:bg-slate-600"
              >
                <ArrowUp className="w-6 h-6" />
              </motion.button>
              <div />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleMove(-1, 0)}
                className="p-3 bg-slate-700 rounded-lg text-white hover:bg-slate-600"
              >
                <ArrowLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleMove(0, 1)}
                className="p-3 bg-slate-700 rounded-lg text-white hover:bg-slate-600"
              >
                <ArrowDown className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleMove(1, 0)}
                className="p-3 bg-slate-700 rounded-lg text-white hover:bg-slate-600"
              >
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Game Stats and Tips */}
        <motion.div 
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { title: 'Investment Strategy', content: 'Plan your route carefully to maximize returns' },
            { title: 'Risk Management', content: 'Avoid obstacles like a seasoned investor' },
            { title: 'Portfolio Growth', content: 'Collect coins to build your wealth' }
          ].map((item, index) => (
            <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">{item.title}</h3>
              <p className="text-slate-300 text-sm">{item.content}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MoneyMaze;