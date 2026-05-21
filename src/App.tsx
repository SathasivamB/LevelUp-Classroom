import React, { useState, useEffect } from 'react';
import { 
  BarChart2, 
  CheckSquare, 
  Trophy, 
  Gift, 
  ShoppingBag, 
  Compass, 
  GraduationCap, 
  Gamepad2, 
  Settings, 
  Volume2, 
  VolumeX,
  X,
  Sparkles,
  Award
} from 'lucide-react';

import DashboardView from './components/DashboardView';
import TasksView from './components/TasksView';
import LeaderboardView from './components/LeaderboardView';
import RewardsView from './components/RewardsView';
import EmporiumView from './components/EmporiumView';
import InfinityVaultView from './components/InfinityVaultView';
import LearningArenaView from './components/LearningArenaView';
import GamingArenaView from './components/GamingArenaView';

import { Task, CompletedMission, ShopItem } from './types';
import { sfx } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [xp, setXp] = useState(1730);
  const [lessonsDone, setLessonsDone] = useState(2);
  const [userName, setUserName] = useState('H. Harini');
  const [equippedTitle, setEquippedTitle] = useState('novice');
  
  // Custom unlocks
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);
  const [unlockedTitles, setUnlockedTitles] = useState<string[]>([]);
  
  // Audio state
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // User profile Settings Modal
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [tempName, setTempName] = useState(userName);

  // Active missions state (exactly mirror mockup lists)
  const [tasks, setTasks] = useState<Task[]>([
    { id: 't1', title: 'Planet Naming Adventure', status: 'in-progress', category: 'Science', xpReward: 150 },
    { id: 't2', title: 'Math Galaxy Quest', status: 'new', category: 'Math', xpReward: 200 },
    { id: 't3', title: 'Planet Naming Adventure', status: 'new', category: 'Science', xpReward: 150 },
    { id: 't4', title: 'Explort Galaxy Quest', status: 'new', category: 'Science', xpReward: 100 },
    { id: 't5', title: 'Check Leaderboard', status: 'new', category: 'Social', xpReward: 50 },
  ]);

  // Completed missions log
  const [completedMissions, setCompletedMissions] = useState<CompletedMission[]>([
    { id: 'cm1', title: 'Solar System Mastery', stars: 3, date: '12/05/23' },
    { id: 'cm2', title: 'Solar System Mastery', stars: 2, date: '12/08/23' },
    { id: 'cm3', title: 'Solar System Mastery', stars: 2, date: '12/08/23' },
  ]);

  // XP Activities Log
  const [xpHistory, setXpHistory] = useState<{ activity: string; xpGained: number; date: string }[]>([
    { activity: 'Baseline enrollment bonus', xpGained: 1000, date: '12/01/23' },
    { activity: 'Solar System Mastery Quiz', xpGained: 430, date: '12/05/23' },
    { activity: 'Solar System Mastery Lesson', xpGained: 300, date: '12/08/23' },
  ]);

  // Handle sfx toggling
  useEffect(() => {
    sfx.enabled = soundEnabled;
  }, [soundEnabled]);

  const handleEarnXp = (amount: number, activityName: string) => {
    setXp(prev => prev + amount);
    
    // Add to XP logs
    const today = new Date().toLocaleDateString('en-US', {
      month: '2-digit', day: '2-digit', year: '2-digit'
    });
    setXpHistory(prev => [
      { activity: activityName, xpGained: amount, date: today },
      ...prev
    ]);
  };

  const handleCompleteMission = (missionName: string, stars: number) => {
    const today = new Date().toLocaleDateString('en-US', {
      month: '2-digit', day: '2-digit', year: '2-digit'
    });
    const newMission: CompletedMission = {
      id: 'cm-' + Date.now(),
      title: missionName,
      stars: stars,
      date: today
    };
    setCompletedMissions(prev => [newMission, ...prev]);
    setLessonsDone(prev => prev + 1);

    // Mark corresponding task as complete if matches title
    setTasks(prev => prev.filter(t => !t.title.includes(missionName.substring(0, 8)))); 
  };

  const handleStartQuest = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // Direct routing based on target task click
    if (task.title.includes('Math')) {
      setActiveTab('Gaming Arena');
    } else {
      setActiveTab('Learning Arena');
    }
  };

  const handleRedeemShopItem = (item: ShopItem) => {
    if (xp < item.xpCost) return;
    
    setXp(prev => prev - item.xpCost);
    setUnlockedItems(prev => [...prev, item.id]);
    
    const today = new Date().toLocaleDateString('en-US', {
      month: '2-digit', day: '2-digit', year: '2-digit'
    });
    setXpHistory(prev => [
      { activity: `Spent XP redeeming ${item.name}`, xpGained: -item.xpCost, date: today },
      ...prev
    ]);
    
    sfx.playRedeem();
  };

  const handleRedeemTitle = (titleId: string, cost: number) => {
    if (xp < cost) return;
    
    setXp(prev => prev - cost);
    setUnlockedTitles(prev => [...prev, titleId]);
    
    const today = new Date().toLocaleDateString('en-US', {
      month: '2-digit', day: '2-digit', year: '2-digit'
    });
    setXpHistory(prev => [
      { activity: `Unlocked title: ${titleId.replace('_', ' ')}`, xpGained: -cost, date: today },
      ...prev
    ]);
  };

  const handleEquipTitle = (titleId: string) => {
    setEquippedTitle(titleId);
  };

  const handleSaveProfileSettings = () => {
    sfx.playSuccess();
    setUserName(tempName);
    setShowSettingsModal(false);
  };

  // Calculate current subtitle rank
  const getSubTitleText = () => {
    if (equippedTitle === 'novice') return 'Novice';
    if (equippedTitle === 'cosmic_voyager') return '🛸 Cosmic Voyager';
    if (equippedTitle === 'stardust_scholar') return '📖 Stardust Scholar';
    if (equippedTitle === 'warp_speed_racer') return '⚡ Warp Speed Racer';
    return 'Novice';
  };

  const getRankInfoForBar = (xpVal: number) => {
    if (xpVal < 500) return { title: "Seedling", min: 0, max: 500 };
    if (xpVal < 1000) return { title: "Spark", min: 500, max: 1000 };
    if (xpVal < 1500) return { title: "Scout", min: 1000, max: 1500 };
    if (xpVal < 1700) return { title: "Squire", min: 1500, max: 1700 };
    if (xpVal < 2000) return { title: "Novice", min: 1700, max: 2000 };
    if (xpVal < 2500) return { title: "Expert", min: 2000, max: 2500 };
    return { title: "Master Explorer", min: 2500, max: 5000 };
  };

  const currentRankInfo = getRankInfoForBar(xp);
  const percentToNextRank = ((xp - currentRankInfo.min) / (currentRankInfo.max - currentRankInfo.min)) * 100;

  // Sidebar navigation options with their corresponding Lucide icons
  const navigationItems = [
    { name: 'Dashboard', icon: BarChart2 },
    { name: 'Tasks', icon: CheckSquare },
    { name: 'Leaderboard', icon: Trophy },
    { name: 'Rewards', icon: Gift },
    { name: 'Emporium', icon: ShoppingBag },
    { name: 'Infinity Vault', icon: Compass },
    { name: 'Learning Arena', icon: GraduationCap },
    { name: 'Gaming Arena', icon: Gamepad2 }
  ];

  return (
    <div className="min-h-screen bg-[#a2c9f5] flex items-center justify-center p-4 relative overflow-hidden font-sans" id="app-root">
      
      {/* Whimsical Rotating Stars and Floating Vector Clouds in Sky Background */}
      <div className="absolute top-[10%] left-[5%] text-slate-100/50 text-5xl animate-bounce delay-150 select-none hidden md:block">☁️</div>
      <div className="absolute top-[40%] right-[3%] text-slate-100/40 text-6xl animate-bounce delay-300 select-none hidden md:block">☁️</div>
      <div className="absolute bottom-[10%] left-[20%] text-slate-100/60 text-4xl animate-bounce select-none hidden md:block">☁️</div>
      
      <div className="absolute top-[15%] right-[15%] text-yellow-300 text-3xl animate-pulse select-none" style={{ animationDuration: '3s' }}>⭐</div>
      <div className="absolute bottom-[25%] left-[10%] text-yellow-300 text-2xl animate-pulse select-none" style={{ animationDuration: '4s' }}>⭐</div>
      <div className="absolute top-[75%] right-[20%] text-yellow-300 text-xl animate-pulse select-none" style={{ animationDuration: '2.5s' }}>⭐</div>

      {/* Main Journal Workbook card */}
      <div 
        className="w-full max-w-6xl bg-white border-4 border-slate-800 rounded-[36px] shadow-2xl p-4 md:p-6 transition-all relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6" 
        id="journal-workbook-container"
        style={{
          boxShadow: '8px 8px 0px #1e293b'
        }}
      >
        {/* Left Side: Sidebar Panel */}
        <div className="lg:col-span-3 bg-white flex flex-col gap-5 border-b lg:border-b-0 lg:border-r border-slate-150 pb-5 lg:pb-0 lg:pr-5 justify-between">
          <div className="flex flex-col gap-5">
            {/* Logo details with a laughing happy star mascot */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 border-2 border-amber-400 flex items-center justify-center text-2xl shadow-sm animate-pulse">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#ffdf7d" stroke="#1e293b" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  <circle cx="9" cy="11" r="1.2" fill="#000" />
                  <circle cx="15" cy="11" r="1.2" fill="#000" />
                  <path d="M10 14.5c.8.8 1.2 1 2 1s1.2-.2 2-1" stroke="#000" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col select-none">
                <span className="text-xl font-black text-slate-800 leading-tight">LevelUp</span>
                <span className="text-sm font-extrabold text-indigo-600 tracking-wide mt-[-2px]">Classroom</span>
              </div>
            </div>

            {/* Profile Level progress card in the sidebar panel */}
            <div className="bg-[#eef5fc] border-2 border-[#b5cff3] rounded-2xl p-3.5 flex flex-col gap-1 shadow-sm">
              <div className="flex items-center justify-between text-[10px] font-extrabold text-blue-700 tracking-wider uppercase">
                <span>Beginner Level</span>
              </div>
              <div className="flex items-end gap-1.5 mt-0.5">
                <span className="text-2xl font-black text-slate-800 leading-none">{xp}</span>
                <span className="text-xs text-slate-500 font-bold mb-0.5">XP</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full mt-1 overflow-hidden border border-slate-300">
                <div 
                  className="bg-blue-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(5, percentToNextRank))}%` }}
                ></div>
              </div>
              <span className="text-xs font-black text-[#507fae] mt-1 block truncate">
                {getSubTitleText()}
              </span>
            </div>

            {/* Navigation options list */}
            <nav className="flex flex-col gap-1" id="workbook-navigation">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      sfx.playTap();
                      setActiveTab(item.name);
                    }}
                    className={`flex items-center gap-3 py-3 px-4 rounded-xl text-left font-black text-sm transition-all border outline-none cursor-pointer ${
                      isActive
                        ? 'bg-[#e4effc] text-[#1f4b75] border-[#1f4b75] scale-[1.02]'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50 border-transparent hover:border-slate-100'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#1f4b75]' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sound toggle controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
            <span className="text-xs text-slate-500 font-bold">Sound FX</span>
            <button
              onClick={() => {
                sfx.playTap();
                setSoundEnabled(!soundEnabled);
              }}
              className="w-10 h-10 rounded-xl border-2 border-slate-200 hover:border-slate-300 active:scale-95 transition-all flex items-center justify-center text-slate-600 bg-white shadow-xs cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
            </button>
          </div>
        </div>

        {/* Right Side: Primary Active Workbook Page Container */}
        <div className="lg:col-span-9 flex flex-col min-h-[480px]">
          
          {/* Top header stats bar belonging in the open book page context (from mockups right corner indicator) */}
          <div className="flex items-center justify-between border-b pb-4 mb-4 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black bg-blue-50 border border-blue-200 text-[#4c7eb3] py-1 px-3.5 rounded-full shadow-xs uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Study Journal
              </span>
            </div>
            
            {/* User credentials & Cog settings button matching mockup screenshot top right */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-slate-100/80 border border-slate-200 px-3 py-1.5 rounded-full shadow-xs">
                <div className="w-6 h-6 rounded-full bg-[#cbdff8] border border-blue-300 text-[10px] font-black text-[#2e5783] flex items-center justify-center">
                  H
                </div>
                <span className="text-xs font-black text-slate-700 block max-w-[110px] truncate">
                  {userName} ({currentRankInfo.title})
                </span>
                
                {/* Settings icon */}
                <button 
                  onClick={() => {
                    sfx.playTap();
                    setTempName(userName);
                    setShowSettingsModal(true);
                  }}
                  className="rounded-full hover:bg-slate-200 p-0.5 text-slate-500 transition-colors cursor-pointer"
                  title="Edit Profile"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Render Active View components with their parameters */}
          <div className="flex-1" id="active-viewport">
            {activeTab === 'Dashboard' && (
              <DashboardView
                xp={xp}
                lessonsDone={lessonsDone}
                completedCount={completedMissions.length}
                userName={userName}
                onNavigate={(tab) => {
                  setActiveTab(tab);
                }}
                onOpenLesson={(lessonId) => {
                  setActiveTab('Learning Arena');
                }}
              />
            )}

            {activeTab === 'Tasks' && (
              <TasksView
                tasks={tasks}
                completedMissions={completedMissions}
                onStartQuest={handleStartQuest}
                onNavigate={(tab) => {
                  setActiveTab(tab);
                }}
              />
            )}

            {activeTab === 'Leaderboard' && (
              <LeaderboardView
                xp={xp}
                userName={userName}
                xpHistory={xpHistory}
              />
            )}

            {activeTab === 'Rewards' && (
              <RewardsView
                xp={xp}
                unlockedItems={unlockedItems}
                onRedeem={handleRedeemShopItem}
                userName={userName}
              />
            )}

            {activeTab === 'Emporium' && (
              <EmporiumView
                xp={xp}
                unlockedTitles={unlockedTitles}
                onRedeemTitle={handleRedeemTitle}
              />
            )}

            {activeTab === 'Infinity Vault' && (
              <InfinityVaultView
                unlockedItems={unlockedItems}
                unlockedTitles={unlockedTitles}
                equippedTitle={equippedTitle}
                onEquipTitle={handleEquipTitle}
              />
            )}

            {activeTab === 'Learning Arena' && (
              <LearningArenaView
                onEarnXp={handleEarnXp}
                onCompleteMission={handleCompleteMission}
                xpValue={xp}
              />
            )}

            {activeTab === 'Gaming Arena' && (
              <GamingArenaView
                onEarnXp={handleEarnXp}
              />
            )}
          </div>

        </div>
      </div>

      {/* Profile Settings Modal Box */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border-4 border-slate-800 rounded-3xl w-full max-w-sm shadow-2xl p-6 flex flex-col gap-4 animate-scale-up" id="settings-dialog">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="text-lg font-extrabold text-slate-800">Edit Explorer Profile</h4>
              <button 
                onClick={() => { sfx.playTap(); setShowSettingsModal(false); }}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Input fields */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">Explorer Name</label>
              <input 
                type="text" 
                maxLength={18}
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 rounded-xl px-3 py-2.5 text-sm font-semibold outline-none transition-colors"
                placeholder="Enter explorer name"
              />
              <p className="text-[10px] text-slate-400 font-bold leading-normal">
                Changes will automatically save in active student registries and leaderboard standings.
              </p>
            </div>

            {/* Save Buttons */}
            <div className="flex gap-2 justify-end mt-4">
              <button 
                onClick={() => { sfx.playTap(); setShowSettingsModal(false); }}
                className="hover:bg-slate-150 text-slate-600 font-bold border border-slate-200 text-xs px-4 py-2.5 rounded-xl text-center cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveProfileSettings}
                className="bg-indigo-600 hover:bg-indigo-500 border border-indigo-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl text-center cursor-pointer"
              >
                Save Profile
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
