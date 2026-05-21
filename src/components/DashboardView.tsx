import React from 'react';
import { BookOpen, Trophy, Medal, Star, Compass, Gamepad2, ChevronRight } from 'lucide-react';
import { sfx } from '../utils/audio';

interface DashboardViewProps {
  xp: number;
  lessonsDone: number;
  completedCount: number;
  userName: string;
  onNavigate: (tab: string) => void;
  onOpenLesson: (lessonId: string) => void;
}

export default function DashboardView({
  xp,
  lessonsDone,
  completedCount,
  userName = "Harini",
  onNavigate,
  onOpenLesson,
}: DashboardViewProps) {
  // Current rank calculation based on XP thresholds
  // Let's assume Rank 5 is 1500 to 2000 XP, Rank 6 is 2000 to 2500, etc.
  const getRankInfo = (userXp: number) => {
    if (userXp < 500) return { rank: 1, title: "Seedling", min: 0, max: 500 };
    if (userXp < 1000) return { rank: 2, title: "Spark", min: 500, max: 1000 };
    if (userXp < 1500) return { rank: 3, title: "Scout", min: 1000, max: 1500 };
    if (userXp < 1700) return { rank: 4, title: "Squire", min: 1500, max: 1700 };
    if (userXp < 2000) return { rank: 5, title: "Novice", min: 1700, max: 2000 };
    if (userXp < 2500) return { rank: 6, title: "Expert", min: 2000, max: 2500 };
    return { rank: 7, title: "Master Explorer", min: 2500, max: 5000 };
  };

  const rankInfo = getRankInfo(xp);
  const percentToNext = ((xp - rankInfo.min) / (rankInfo.max - rankInfo.min)) * 100;

  const handleAction = (tab: string, sound: () => void = () => sfx.playTap()) => {
    sound();
    onNavigate(tab);
  };

  // Fun quote based on current level
  const getQuote = () => {
    if (xp >= 2000) return "You're entering stellar expert territory! Keep matching those constellations.";
    return "Let's resume your journey. Planet Naming can earn you huge XP!";
  };

  return (
    <div className="flex flex-col gap-6" id="dashboard-view-root">
      {/* Top Welcome Title Grid */}
      <div className="flex flex-col gap-1 items-start">
        <span className="bg-blue-100 text-[#4c7eb3] text-xs font-extrabold px-3 py-1 rounded-full border border-blue-200 uppercase tracking-widest" id="dashboard-badge-role">
          Novice Explorer's Journal
        </span>
        <h1 className="text-4xl font-extrabold text-[#4f81b8] tracking-tight mt-1" id="dashboard-title">
          EXPLORER DASHBOARD
        </h1>
        <p className="text-slate-600 font-medium text-sm md:text-base mt-0.5">
          Welcome back, Explorer {userName}! {getQuote()}
        </p>
      </div>

      {/* Key Metrics Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-slate-800" id="key-metrics-heading">Key Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="metrics-grid">
          
          {/* Top Learner Card */}
          <div className="bg-[#e9f2fc] border-2 border-[#b0cef3] rounded-2xl p-4 flex flex-col items-center justify-between text-center min-h-[140px] shadow-sm hover:shadow transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-8 h-8 opacity-10 group-hover:scale-125 transition-transform">
              <Medal className="w-full h-full text-blue-900" />
            </div>
            <span className="text-slate-700 font-bold text-sm">Top Learner</span>
            <div className="my-2 relative flex items-center justify-center">
              <div className="absolute animate-ping opacity-10 bg-yellow-400 rounded-full w-10 h-10"></div>
              {/* Render custom Medal/Award with "1" */}
              <div className="relative z-10 w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z" fill="#ffdf7d" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M30 4L34 14L24 14L14 14L18 4L24 8L30 4Z" fill="#ffb443" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 28L14 44L24 39L34 44L29 28" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="absolute top-[21px] text-xs font-black text-slate-800">1</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-slate-800">1</span>
              <span className="text-[11px] text-slate-500 font-bold leading-tight">(out of 2 students)</span>
            </div>
          </div>

          {/* Lessons Done Card */}
          <div className="bg-[#e9f2fc] border-2 border-[#b0cef3] rounded-2xl p-4 flex flex-col items-center justify-between text-center min-h-[140px] shadow-sm hover:shadow transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-8 h-8 opacity-10 group-hover:scale-125 transition-transform">
              <BookOpen className="w-full h-full text-blue-900" />
            </div>
            <span className="text-slate-700 font-bold text-sm">Lessons</span>
            <div className="my-2 text-[#4e7fb2]">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#1e293b" strokeWidth="2" fill="#93c5fd" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="#1e293b" strokeWidth="2" fill="#fff" />
                <path d="M6 6h10M6 10h10M6 14h6" stroke="#4b5563" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-slate-800">{lessonsDone}</span>
              <span className="text-[11px] text-slate-500 font-bold leading-tight">Lessons Done</span>
            </div>
          </div>

          {/* XP Card */}
          <div className="bg-[#e9f2fc] border-2 border-[#b0cef3] rounded-2xl p-4 flex flex-col items-center justify-between text-center min-h-[140px] shadow-sm hover:shadow transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-8 h-8 opacity-10 group-hover:scale-125 transition-transform">
              <Star className="w-full h-full text-blue-900" />
            </div>
            <span className="text-slate-700 font-bold text-sm">XP</span>
            <div className="my-2 relative">
              {/* Cute smiling gold star */}
              <svg className="w-12 h-12 animate-pulse" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2L20.5 11L30 12.5L23 19.5L25 29L16 24L7 29L9 19.5L2 12.5L11.5 11L16 2Z" fill="#ffdf7c" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round"/>
                <circle cx="12" cy="15" r="1.5" fill="#1e293b"/>
                <circle cx="20" cy="15" r="1.5" fill="#1e293b"/>
                <path d="M13 18.5C13.5 19.5 14.5 20 16 20C17.5 20 18.5 19.5 19 18.5" stroke="#1e293b" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-slate-800">{xp} XP</span>
              <span className="text-[11px] text-slate-500 font-bold leading-tight">Total Points</span>
            </div>
          </div>

          {/* Rank Card */}
          <div className="bg-[#e9f2fc] border-2 border-[#b0cef3] rounded-2xl p-4 flex flex-col justify-between min-h-[140px] shadow-sm hover:shadow transition-all col-span-1 sm:col-span-2 lg:col-span-1" id="rank-progress-card">
            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-bold text-sm">Rank</span>
              <div className="relative">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Small gold trophy */}
                  <path d="M6 9H4.5C3.12 9 2 7.88 2 6.5C2 5.12 3.12 4 4.5 4H6V9Z" fill="#ffb443" stroke="#1e293b" strokeWidth="1.5" />
                  <path d="M18 9H19.5C20.88 9 22 7.88 22 6.5C22 5.12 20.88 4 19.5 4H18V9Z" fill="#ffb443" stroke="#1e293b" strokeWidth="1.5" />
                  <path d="M6 2H18V12C18 15.31 15.31 18 12 18C8.69 18 6 15.31 6 12V2Z" fill="#ffdf7c" stroke="#1e293b" strokeWidth="1.5" />
                  <path d="M10 18H14V22H10V18Z" fill="#ccd0d5" stroke="#1e293b" strokeWidth="1.5" />
                  <path d="M8 22H16" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col mt-2">
              <span className="text-[13px] font-extrabold text-slate-800 leading-tight">
                Rank {rankInfo.rank}: {rankInfo.title} (Leveling Up!)
              </span>
              
              {/* Progress bar container */}
              <div className="w-full bg-slate-200 h-3.5 rounded-full mt-2 border border-slate-300 overflow-hidden relative">
                <div 
                  className="bg-[#4e7fb2] h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(100, Math.max(5, percentToNext))}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold mt-1.5">
                <span>Next Rank</span>
                <span>Nearly there! {rankInfo.max} XP</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Quest Log & Next Steps Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2" id="dashboard-lower-grid">
        
        {/* Quest Log */}
        <div className="lg:col-span-7 bg-[#f6faf2] border-2 border-[#cbdcb9] rounded-3xl p-5 flex flex-col gap-4 shadow-sm" id="quest-log-card">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-600" />
            Quest Log
          </h3>
          <div className="flex flex-col gap-3">
            {/* Quest 1 */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-3 flex items-center justify-between hover:border-emerald-300 transition-colors shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center border border-orange-200">
                  <span className="text-xl">🪐</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 text-sm md:text-base">Planet Naming Adventure</span>
                  <span className="text-xs text-slate-500 font-semibold">+150 XP Reward</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  sfx.playTap();
                  onNavigate('Learning Arena');
                }}
                className="bg-[#4eb355] hover:bg-[#439c49] active:translate-y-0.5 text-white font-extrabold text-sm px-4 py-2 rounded-xl border border-emerald-700 flex items-center gap-1 shadow-sm transition-transform cursor-pointer"
              >
                Go <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quest 2 */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-3 flex items-center justify-between hover:border-emerald-300 transition-colors shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center border border-blue-200">
                  <span className="text-xl">🏆</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 text-sm md:text-base">Check Leaderboard</span>
                  <span className="text-xs text-slate-500 font-semibold">See if anyone passed you!</span>
                </div>
              </div>
              <button 
                onClick={() => handleAction('Leaderboard')}
                className="bg-[#4eb355] hover:bg-[#439c49] active:translate-y-0.5 text-white font-extrabold text-sm px-4 py-2 rounded-xl border border-emerald-700 flex items-center gap-1 shadow-sm transition-transform cursor-pointer"
              >
                Go <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Your Next Steps */}
        <div className="lg:col-span-5 flex flex-col gap-3" id="dashboard-next-steps">
          <h3 className="text-xl font-bold text-slate-800 px-1" id="next-steps-heading">Your Next Steps</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Start New Lesson Step */}
            <div 
              onClick={() => handleAction('Learning Arena')}
              className="bg-white border-2 border-[#b0cef3] hover:border-[#4e7fb2] rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-1 transition-all shadow-sm active:translate-y-0 group min-h-[130px]"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs text-slate-500 font-extrabold">Your Learning Path</span>
              <span className="text-sm font-extrabold text-slate-800 mt-1">Start New Lesson</span>
            </div>

            {/* Practice Arena Step */}
            <div 
              onClick={() => handleAction('Gaming Arena')}
              className="bg-white border-2 border-[#b0cef3] hover:border-[#4e7fb2] rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-1 transition-all shadow-sm active:translate-y-0 group min-h-[130px]"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-xs text-slate-500 font-extrabold">Practice Arena</span>
              <span className="text-sm font-extrabold text-slate-800 mt-1">Jump to a Challenge</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
