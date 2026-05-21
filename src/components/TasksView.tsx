import React from 'react';
import { Compass, CheckSquare, Trophy, ChevronRight, Award, Plus, Sparkles } from 'lucide-react';
import { sfx } from '../utils/audio';
import { Task, CompletedMission } from '../types';

interface TasksViewProps {
  tasks: Task[];
  completedMissions: CompletedMission[];
  onStartQuest: (taskId: string) => void;
  onNavigate: (tab: string) => void;
}

export default function TasksView({
  tasks,
  completedMissions,
  onStartQuest,
  onNavigate,
}: TasksViewProps) {
  
  const getBadgeStyle = (status: Task['status']) => {
    switch (status) {
      case 'new':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  const getEmojiForTask = (title: string) => {
    if (title.includes('Planet')) return '🪐';
    if (title.includes('Math')) return '🧮';
    if (title.includes('Explore') || title.includes('Explort')) return '🚀';
    if (title.includes('Leaderboard')) return '🏆';
    return '✨';
  };

  // Render tiny stars
  const renderStars = (count: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="relative w-6 h-6">
            <svg 
              className={`w-6 h-6 ${idx < count ? 'text-yellow-400' : 'text-slate-200'}`} 
              viewBox="0 0 24 24" 
              fill={idx < count ? 'currentColor' : 'none'} 
              stroke="#1e293b" 
              strokeWidth="2"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6" id="tasks-view-root">
      
      {/* View Header */}
      <div className="flex flex-col gap-1 items-start">
        <span className="bg-blue-100 text-[#4c7eb3] text-xs font-extrabold px-3 py-1 rounded-full border border-blue-200 uppercase tracking-widest">
          Novice Explorer's Journal
        </span>
        <h1 className="text-4xl font-extrabold text-[#4f81b8] tracking-tight mt-1" id="tasks-title">
          MISSION CONTROL
        </h1>
        <p className="text-slate-600 font-medium text-sm md:text-base mt-0.5">
          Active Tasks & Missions
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="tasks-content-grid">
        
        {/* Left column: Active quests */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-[#e9f2fc] border-2 border-[#b0cef3] rounded-3xl p-5 shadow-sm flex flex-col gap-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-600" />
              Active Missions
            </h3>
            
            <div className="flex flex-col gap-3" id="active-tasks-list">
              {tasks.map((task, idx) => (
                <div 
                  key={task.id + '-' + idx} 
                  className="bg-white border-2 border-slate-200 rounded-2xl p-4 flex items-center justify-between hover:border-blue-300 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl shadow-inner">
                      {getEmojiForTask(task.title)}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-extrabold text-slate-800 text-sm md:text-base">
                        {task.title}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        {task.status !== 'completed' && (
                          <span className={`text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full border ${getBadgeStyle(task.status)}`}>
                            {task.status === 'in-progress' ? 'In Progress' : 'New'}
                          </span>
                        )}
                        <span className="text-xs text-slate-500 font-bold">
                          +{task.xpReward} XP Reward
                        </span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      sfx.playTap();
                      if (task.title.includes('Leaderboard')) {
                        onNavigate('Leaderboard');
                      } else {
                        onStartQuest(task.id);
                      }
                    }}
                    className="bg-[#4eb355] hover:bg-[#439c49] active:translate-y-0.5 text-white font-extrabold text-sm px-4 py-2.5 rounded-xl border border-emerald-700 flex items-center gap-0.5 shadow-sm transition-all cursor-pointer"
                  >
                    Go <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {tasks.length === 0 && (
                <div className="text-center py-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 p-4">
                  <span className="text-4xl">🎉</span>
                  <span className="font-bold text-slate-700">All Active Missions Cleared!</span>
                  <p className="text-xs text-slate-500">Go to the Learning Arena to start new learning paths and quests!</p>
                  <button 
                    onClick={() => { sfx.playTap(); onNavigate('Learning Arena'); }}
                    className="mt-2 bg-blue-500 hover:bg-blue-600 border border-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                  >
                    Load New Lessons
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Completed Missions */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#fcf8ec] border-2 border-[#ecd4b1] rounded-3xl p-5 shadow-sm flex flex-col gap-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Completed Missions
            </h3>

            <div className="flex flex-col gap-3" id="completed-missions-list">
              {completedMissions.map((mission, idx) => (
                <div 
                  key={mission.id + '-' + idx}
                  className="bg-white border-2 border-amber-100 rounded-2xl p-4 flex flex-col gap-2 hover:border-amber-300 transition-colors shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-800 text-sm md:text-base">
                      {mission.title}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {mission.date}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    {renderStars(mission.stars)}
                    <span className="text-xs text-[#b88c4f] font-extrabold flex items-center gap-0.5">
                      <Sparkles className="w-3.5 h-3.5" /> Complete!
                    </span>
                  </div>
                </div>
              ))}

              {completedMissions.length === 0 && (
                <div className="text-center py-8 text-slate-400 font-semibold text-sm">
                  Complete quests to see them listed here!
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
