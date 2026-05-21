import React, { useState } from 'react';
import { Trophy, Shield, ChevronRight, Sparkles, Award, History, X } from 'lucide-react';
import { sfx } from '../utils/audio';
import { LeaderboardEntry } from '../types';

interface LeaderboardViewProps {
  xp: number;
  userName: string;
  xpHistory: { activity: string; xpGained: number; date: string }[];
}

export default function LeaderboardView({
  xp,
  userName = "H. Harini",
  xpHistory,
}: LeaderboardViewProps) {
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Hardcoded other students
  const baseStudents = [
    { id: '1', name: 'Zenon', xp: 2100, avatar: '🛸', color: 'bg-indigo-100 border-indigo-200' },
    { id: '2', name: 'Stella', xp: 1950, avatar: '✨', color: 'bg-rose-100 border-rose-200' },
    { id: '3', name: 'Astro', xp: 1850, avatar: '👨‍🚀', color: 'bg-teal-100 border-teal-200' },
    { id: '5', name: 'Miniah', xp: 1600, avatar: '🦊', color: 'bg-amber-100 border-amber-200' },
    { id: '6', name: 'M. Jonan', xp: 1500, avatar: '🐼', color: 'bg-purple-100 border-purple-200' },
    { id: '7', name: 'Callyma', xp: 1000, avatar: '🤖', color: 'bg-emerald-100 border-emerald-200' },
    { id: '8', name: 'Alexada', xp: 750, avatar: '🦁', color: 'bg-rose-100 border-rose-200' },
  ];

  // Merge user into student list dynamically and sort descending
  const allEntries: LeaderboardEntry[] = [
    ...baseStudents,
    { id: 'user', name: userName, xp: xp, avatar: '⭐', color: 'bg-blue-100 border-blue-200', isUser: true }
  ].sort((a, b) => b.xp - a.xp);

  // Find user's rank
  const userRank = allEntries.findIndex(entry => entry.isUser) + 1;

  // Retrieve 1st, 2nd, 3rd for podium
  const first = allEntries[0];
  const second = allEntries[1];
  const third = allEntries[2];

  // Retrieve remainder for list
  const remainingStudents = allEntries.filter((_, idx) => idx >= 3);

  const getRankSuffix = (rank: number) => {
    if (rank === 1) return 'st';
    if (rank === 2) return 'nd';
    if (rank === 3) return 'rd';
    return 'th';
  };

  const handleOpenHistory = () => {
    sfx.playTap();
    setShowHistoryModal(true);
  };

  return (
    <div className="flex flex-col gap-6" id="leaderboard-view-root">
      {/* View Header */}
      <div className="flex flex-col gap-1 items-start">
        <span className="bg-blue-100 text-[#4c7eb3] text-xs font-extrabold px-3 py-1 rounded-full border border-blue-200 uppercase tracking-widest">
          Novice Explorer's Journal
        </span>
        <h1 className="text-4xl font-extrabold text-[#4f81b8] tracking-tight mt-1">
          GALACTIC CHAMPIONS
        </h1>
        <p className="text-slate-600 font-medium text-sm md:text-base mt-0.5">
          Top Explorers of the Week
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="leaderboard-grid">
        
        {/* Left Column: Podium & Rankings */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Podium Component */}
          <div className="bg-[#f0f6fc] border-2 border-[#b0cef3] rounded-3xl p-6 shadow-sm flex flex-col items-center gap-1">
            
            {/* Visual Podiums Row */}
            <div className="flex items-end justify-center gap-4 w-full max-w-sm h-48 mt-4">
              
              {/* 2nd Place */}
              <div className="flex flex-col items-center w-24">
                <div className="mb-2 text-center">
                  <div className="text-2xl">{second?.avatar}</div>
                  <span className="text-xs font-black text-slate-700 block truncate max-w-[80px]">{second?.name}</span>
                  <span className="text-[10px] font-bold text-slate-500">{second?.xp} XP</span>
                </div>
                {/* Visual block */}
                <div className="bg-[#e4effc] border-2 border-t-4 border-[#b0cef3] w-full h-[65px] rounded-t-xl flex flex-col items-center justify-start p-2 relative">
                  {/* Cute gold star */}
                  <div className="absolute -top-7 animate-bounce">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#ffdf7d" stroke="#1e293b" strokeWidth="1.5">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <span className="text-lg font-black text-[#5d8cb9]">2nd</span>
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center w-28">
                <div className="mb-2 text-center">
                  <div className="text-3xl animate-pulse">{first?.avatar}</div>
                  <span className="text-xs font-black text-slate-800 block truncate max-w-[100px]">{first?.name}</span>
                  <span className="text-[10px] font-black text-amber-600">{first?.xp} XP</span>
                </div>
                {/* Visual block */}
                <div className="bg-[#d2e4f7] border-2 border-t-4 border-amber-400 w-full h-[95px] rounded-t-xl flex flex-col items-center justify-start p-2 relative">
                  {/* Big smiling trophy star */}
                  <div className="absolute -top-8 animate-bounce delay-150">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#ffdf7d" stroke="#1e293b" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      <circle cx="9" cy="11" r="1" fill="#000" />
                      <circle cx="15" cy="11" r="1" fill="#000" />
                      <path d="M10.5 14c.5.5 1 .5 1.5.5s1 0 1.5-.5" stroke="#000" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-xl font-black text-[#4374a4]">1st</span>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center w-24">
                <div className="mb-2 text-center">
                  <div className="text-2xl">{third?.avatar}</div>
                  <span className="text-xs font-black text-slate-700 block truncate max-w-[80px]">{third?.name}</span>
                  <span className="text-[10px] font-bold text-slate-500">{third?.xp} XP</span>
                </div>
                {/* Visual block */}
                <div className="bg-[#e4effc] border-2 border-t-4 border-[#b0cef3] w-full h-[50px] rounded-t-xl flex flex-col items-center justify-start p-2 relative">
                  {/* Cute star */}
                  <div className="absolute -top-6 animate-bounce delay-300">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#ffdf7d" stroke="#1e293b" strokeWidth="1.5">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <span className="text-lg font-black text-[#5d8cb9]">3rd</span>
                </div>
              </div>

            </div>
          </div>

          {/* Under-Podium list in 2 columns (4th to 8th) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="ranks-sublist">
            {remainingStudents.map((student, idx) => {
              const studentRank = idx + 4;
              return (
                <div 
                  key={student.id} 
                  className={`border-2 rounded-2xl p-3 flex items-center justify-between shadow-sm hover:translate-y-px transition-all bg-white ${
                    student.isUser ? 'border-blue-400 bg-blue-50/50' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-slate-500 w-6 text-center">{studentRank}th</span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-xl shadow-inner">
                      {student.avatar}
                    </div>
                    <span className={`text-sm font-extrabold ${student.isUser ? 'text-blue-800' : 'text-slate-700'}`}>
                      {student.name} {student.isUser ? '(You)' : ''}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                    {student.xp} XP
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Your Standing */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#f2f7fc] border-2 border-[#b0cef3] rounded-3xl p-5 shadow-sm flex flex-col gap-5 relative overflow-hidden">
            
            <h3 className="text-xl font-bold text-slate-800">Your Standing</h3>

            {/* Profile badge style mirroring mockup */}
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-3 shadow-inner">
              <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-lg font-black text-blue-800">
                H
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-slate-800">{userName}</span>
                <span className="text-xs text-slate-500 font-bold">Current Rank: {userRank}{getRankSuffix(userRank)}</span>
              </div>
            </div>

            {/* Details panel */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center bg-white/70 p-3 rounded-xl border border-dashed border-slate-200">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total XP</span>
                <span className="text-base font-extrabold text-slate-800">{xp} XP</span>
              </div>
              <div className="flex justify-between items-center bg-white/70 p-3 rounded-xl border border-dashed border-slate-200">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Milestone Progress</span>
                <span className="text-xs font-extrabold text-blue-700 uppercase">
                  {xp >= 2000 ? '2,500 XP goal' : '2,000 XP goal'}
                </span>
              </div>
            </div>

            {/* Button */}
            <button 
              onClick={handleOpenHistory}
              className="w-full bg-[#4eb355] hover:bg-[#439c49] text-white font-extrabold text-sm py-3.5 rounded-xl border border-emerald-700 flex items-center justify-center gap-1 shadow-sm active:translate-y-0.5 transition-transform cursor-pointer"
            >
              <History className="w-4 h-4" /> View History <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-4 border-[#b0cef3] rounded-3xl w-full max-w-md shadow-2xl p-6 flex flex-col gap-4 animate-scale-up">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
                <History className="w-5 h-5 text-blue-500" />
                XP Activity Log
              </h4>
              <button 
                onClick={() => { sfx.playTap(); setShowHistoryModal(false); }}
                className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto pr-1">
              {xpHistory.map((log, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-dashed border-slate-100 pb-2">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800 text-sm">{log.activity}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{log.date}</span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 font-extrabold text-xs px-2.5 py-1 rounded-full border border-emerald-200 shadow-xs">
                    +{log.xpGained} XP
                  </span>
                </div>
              ))}

              {xpHistory.length === 0 && (
                <div className="text-center py-6 text-slate-400 font-semibold text-xs">
                  No activity history yet. Complete tasks to earn points!
                </div>
              )}
            </div>

            {/* Close button */}
            <button 
              onClick={() => { sfx.playTap(); setShowHistoryModal(false); }}
              className="bg-blue-600 hover:bg-blue-500 border border-blue-800 text-white font-extrabold rounded-xl py-2 mt-2 w-full text-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
