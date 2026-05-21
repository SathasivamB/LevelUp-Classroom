import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Play, RefreshCw, Trophy, Sparkles, Volume2 } from 'lucide-react';
import { sfx } from '../utils/audio';

interface GamingArenaViewProps {
  onEarnXp: (amount: number, activityName: string) => void;
}

export default function GamingArenaView({ onEarnXp }: GamingArenaViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  
  // Game coordinates state
  const [shipX, setShipX] = useState(50); // percentage 0-100
  const [stars, setStars] = useState<{ x: number; y: number; id: number }[]>([]);
  const [asteroids, setAsteroids] = useState<{ x: number; y: number; id: number }[]>([]);
  
  const gameInterval = useRef<NodeJS.Timeout | null>(null);
  const nextId = useRef(0);

  const startGame = () => {
    sfx.playTap();
    setIsPlaying(true);
    setScore(0);
    setGameOver(false);
    setStars([]);
    setAsteroids([]);
    nextId.current = 0;
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        moveLeft();
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        moveRight();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver]);

  const moveLeft = () => {
    setShipX(prev => Math.max(5, prev - 15));
  };

  const moveRight = () => {
    setShipX(prev => Math.min(95, prev + 15));
  };

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) {
      if (gameInterval.current) clearInterval(gameInterval.current);
      return;
    }

    gameInterval.current = setInterval(() => {
      // Spawn items
      if (Math.random() < 0.15) {
        setStars(prev => [...prev, { x: Math.random() * 90 + 5, y: -10, id: nextId.current++ }]);
      }
      if (Math.random() < 0.2) {
        setAsteroids(prev => [...prev, { x: Math.random() * 90 + 5, y: -10, id: nextId.current++ }]);
      }

      // Move stars down
      setStars(prev => {
        const remaining: typeof prev = [];
        prev.forEach(star => {
          const newY = star.y + 6;
          // Check collision
          if (newY >= 82 && newY <= 94 && Math.abs(star.x - shipX) < 12) {
            sfx.playSuccess();
            setScore(s => s + 10);
          } else if (newY < 100) {
            remaining.push({ ...star, y: newY });
          }
        });
        return remaining;
      });

      // Move asteroids down
      setAsteroids(prev => {
        let hit = false;
        const remaining: typeof prev = [];
        prev.forEach(ast => {
          const newY = ast.y + 8;
          // Check collision
          if (newY >= 82 && newY <= 94 && Math.abs(ast.x - shipX) < 10) {
            hit = true;
          } else if (newY < 100) {
            remaining.push({ ...ast, y: newY });
          }
        });

        if (hit) {
          triggerGameOver();
        }
        return remaining;
      });

    }, 100);

    return () => {
      if (gameInterval.current) clearInterval(gameInterval.current);
    };
  }, [isPlaying, gameOver, shipX]);

  const triggerGameOver = () => {
    sfx.playBuzz();
    setGameOver(true);
    setIsPlaying(false);
    
    // XP math
    if (score > 0) {
      const earnedXp = Math.min(100, Math.floor(score / 2));
      if (earnedXp > 0) {
        onEarnXp(earnedXp, `Star Catcher game score: ${score}`);
        sfx.playLevelUp();
      }
    }

    if (score > highScore) {
      setHighScore(score);
    }
  };

  return (
    <div className="flex flex-col gap-6" id="gaming-arena-root">
      {/* Header */}
      <div className="flex flex-col gap-1 items-start">
        <span className="bg-indigo-100 text-indigo-800 text-xs font-extrabold px-3 py-1 rounded-full border border-indigo-200 uppercase tracking-widest">
          Practice Arena
        </span>
        <h1 className="text-4xl font-extrabold text-[#4f81b8] tracking-tight mt-1">
          GAMING ARENA
        </h1>
        <p className="text-slate-600 font-medium text-sm md:text-base mt-0.5">
          Play Star Catcher to sharpen coordination & earn bonus XP!
        </p>
      </div>

      {/* Main Game Card */}
      <div className="bg-[#1e293b] border-4 border-slate-700 rounded-3xl p-6 shadow-2xl relative min-h-[460px] flex flex-col justify-between text-white overflow-hidden">
        
        {/* Star Sparkle Background Decor (Simulated space dust) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950 via-slate-900 to-black opacity-60"></div>
        
        {/* Header HUD */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-700 pb-3 font-mono">
          <div className="flex items-center gap-2 text-indigo-300">
            <Gamepad2 className="w-5 h-5 animate-pulse" />
            <span className="font-bold">STAR CATCHER PRO 1.0</span>
          </div>
          <div className="flex gap-4">
            <span className="text-xs">Hi Score: <span className="text-amber-400 font-bold">{highScore}</span></span>
            <span className="text-xs">Score: <span className="text-emerald-400 font-bold">{score}</span></span>
          </div>
        </div>

        {/* Content Frame */}
        <div className="relative z-10 flex-1 flex items-center justify-center p-4">
          
          {/* Start Screen */}
          {!isPlaying && !gameOver && (
            <div className="flex flex-col items-center text-center gap-4 max-w-sm">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-3xl animate-bounce">
                🚀
              </div>
              <h3 className="text-xl font-bold">Launch Star Catcher</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Move your rocket ship with arrow keys (or clicks) to capture falling gold stars and dodge stony gray asteroids!
              </p>
              <button 
                onClick={startGame}
                className="bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 text-white font-extrabold font-sans text-sm px-6 py-2.5 rounded-xl active:translate-y-0.5 transition-transform cursor-pointer"
              >
                Launch Ship
              </button>
            </div>
          )}

          {/* Active Gameplay Screen */}
          {isPlaying && !gameOver && (
            <div className="relative w-full h-[280px] bg-slate-950/40 rounded-2xl border border-slate-800 overflow-hidden" id="space-stage">
              
              {/* Falling Stars */}
              {stars.map(star => (
                <div 
                  key={star.id} 
                  className="absolute text-xl" 
                  style={{ left: `${star.x}%`, top: `${star.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  ⭐
                </div>
              ))}

              {/* Falling Asteroids */}
              {asteroids.map(ast => (
                <div 
                  key={ast.id} 
                  className="absolute text-xl" 
                  style={{ left: `${ast.x}%`, top: `${ast.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  ☄️
                </div>
              ))}

              {/* Player Rocket ship */}
              <div 
                className="absolute text-3xl transition-all duration-75"
                style={{ left: `${shipX}%`, top: '90%', transform: 'translate(-50%, -50%)' }}
              >
                🚀
              </div>

            </div>
          )}

          {/* Game Over Screen */}
          {gameOver && (
            <div className="flex flex-col items-center text-center gap-3">
              <div className="text-4xl">💥</div>
              <h3 className="text-lg font-bold text-red-400 uppercase tracking-wider">Boom! Asteroid Strike</h3>
              <p className="text-xs text-slate-400 font-sans max-w-xs">
                You gathered <span className="text-emerald-400 font-bold">{score} star points</span>, earning you <span className="text-amber-400 font-bold">+{Math.min(100, Math.floor(score / 2))} XP</span> as a bonus!
              </p>
              <button 
                onClick={startGame}
                className="bg-indigo-600 hover:bg-indigo-500 border border-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1 transition-all mt-2"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Launch Again
              </button>
            </div>
          )}

        </div>

        {/* Footer controls for responsive / tablet users (clicks allowed!) */}
        {isPlaying && !gameOver && (
          <div className="relative z-10 flex justify-center gap-6 border-t border-slate-800 pt-3">
            <button 
              onClick={moveLeft}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-600 p-3 rounded-xl active:scale-95 text-xl font-bold w-16"
            >
              ◀
            </button>
            <button 
              onClick={moveRight}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-600 p-3 rounded-xl active:scale-95 text-xl font-bold w-16"
            >
              ▶
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
