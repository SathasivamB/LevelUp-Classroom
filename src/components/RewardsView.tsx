import React, { useState } from 'react';
import { Gift, Coins, CheckCircle, Flame, Sparkles } from 'lucide-react';
import { sfx } from '../utils/audio';
import { ShopItem } from '../types';

interface RewardsViewProps {
  xp: number;
  unlockedItems: string[];
  onRedeem: (item: ShopItem) => void;
  userName?: string;
}

export default function RewardsView({
  xp,
  unlockedItems,
  onRedeem,
  userName = "H. Harini",
}: RewardsViewProps) {
  
  const shopItems: ShopItem[] = [
    {
      id: 'avatar_hat',
      name: 'Special Avatar Hat',
      xpCost: 500,
      icon: 'hat',
      category: 'hat',
      description: 'Equip a whimsical golden safari sun hat on your star mascot!'
    },
    {
      id: 'xp_potion',
      name: 'Double XP Potion',
      xpCost: 1000,
      icon: 'potion',
      category: 'potion',
      description: 'Increases all quest XP payouts by 2x for the next action!'
    },
    {
      id: 'custom_badge',
      name: 'Custom Badge',
      xpCost: 750,
      icon: 'badge',
      category: 'badge',
      description: 'A glowing cosmic crest displayed proudly next to your rank!'
    },
    {
      id: 'theme_pack',
      name: 'Theme Pack',
      xpCost: 1500,
      icon: 'theme',
      category: 'theme',
      description: 'Unlock special sky cosmetics and starry clouds!'
    }
  ];

  const handleRedeemClick = (item: ShopItem) => {
    if (unlockedItems.includes(item.id)) {
      sfx.playBuzz();
      return;
    }
    
    if (xp < item.xpCost) {
      sfx.playBuzz();
      return;
    }
    
    onRedeem(item);
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'hat':
        return (
          <div className="w-24 h-24 flex items-center justify-center bg-amber-50 rounded-2xl border border-amber-100 p-2 relative shadow-inner">
            {/* Cute Cartoon Safari Hat drawing */}
            <svg className="w-18 h-18" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 44C12 44 20 44 32 44C44 44 52 44 52 44C56 44 58 46 58 48C58 50 56 52 50 52H14C8 52 6 50 6 48C6 46 8 44 12 44Z" fill="#f59e0b" stroke="#1e293b" strokeWidth="3" />
              <path d="M18 44C18 30 22 20 32 20C42 20 46 30 46 44H18Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
              <rect x="25" y="38" width="14" height="6" rx="1" fill="#ec4899" stroke="#1e293b" strokeWidth="2" />
              {/* Star on hat */}
              <polygon points="32,24 34,29 39,29 35,32 37,37 32,34 27,37 29,32 25,29 30,29" fill="#ffdf7d" />
            </svg>
          </div>
        );
      case 'potion':
        return (
          <div className="w-24 h-24 flex items-center justify-center bg-emerald-50 rounded-2xl border border-emerald-100 p-2 relative shadow-inner">
            {/* Potion with bubbling effect */}
            <svg className="w-18 h-18 animate-pulse" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26 10H38V18L48 40C51 46 47 52 40 52H24C17 52 13 46 16 40L26 18V10Z" fill="#10b981" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
              {/* Bottle Top Liquid */}
              <path d="M22 28C22 28 27 30 32 28C37 26 42 28 42 28L47 38.5C47 38.5 40 40 32 38C24 36 17 38.5 17 38.5L22 28Z" fill="#34d399" />
              <rect x="23" y="6" width="18" height="4" rx="2" fill="#d1d5db" stroke="#1e293b" strokeWidth="3" />
              <text x="27" y="46" fill="#fff" fontSize="12" fontWeight="900" fontFamily="sans-serif">XP</text>
            </svg>
          </div>
        );
      case 'badge':
        return (
          <div className="w-24 h-24 flex items-center justify-center bg-blue-50 rounded-2xl border border-blue-100 p-2 relative shadow-inner">
            {/* Custom crest badge */}
            <svg className="w-18 h-18" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12V32C12 44 32 54 32 54C32 54 52 44 52 32V12H12Z" fill="#60a5fa" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
              <polygon points="32,18 36,26 45,27 39,33 41,42 32,38 23,42 25,33 19,27 28,26" fill="#fef08a" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
        );
      case 'theme':
        return (
          <div className="w-24 h-24 flex items-center justify-center bg-purple-50 rounded-2xl border border-purple-100 p-2 relative shadow-inner">
            {/* Gallery Sunset Theme icon */}
            <svg className="w-18 h-18" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="44" height="44" rx="6" fill="#a78bfa" stroke="#1e293b" strokeWidth="3" />
              <circle cx="20" cy="20" r="4" fill="#fc8181" />
              <path d="M12 48L24 32L36 44L44 34L52 42V48H12Z" fill="#fbcfe8" stroke="#1e293b" strokeWidth="2" />
            </svg>
          </div>
        );
      default:
        return <span>🎁</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6" id="rewards-view-root">
      
      {/* View Header */}
      <div className="flex flex-col gap-1 items-start">
        <span className="bg-blue-100 text-[#4c7eb3] text-xs font-extrabold px-3 py-1 rounded-full border border-blue-200 uppercase tracking-widest">
          Novice Explorer's Journal
        </span>
        <h1 className="text-4xl font-extrabold text-[#4f81b8] tracking-tight mt-1" id="rewards-title">
          TREASURE TROVE
        </h1>
        <p className="text-slate-600 font-medium text-sm md:text-base mt-0.5">
          Redeem your XP for awesome prizes!
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="rewards-grid">
        
        {/* Left Side: Prizes Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5" id="prizes-container">
          {shopItems.map((item) => {
            const isClaimed = unlockedItems.includes(item.id);
            const canAfford = xp >= item.xpCost;
            return (
              <div 
                key={item.id} 
                className={`bg-white border-2 rounded-3xl p-5 flex flex-col items-center gap-4 text-center shadow-sm relative group transition-all ${
                  isClaimed 
                    ? 'border-slate-200 bg-slate-50/50 opacity-80' 
                    : canAfford 
                      ? 'border-[#b0cef3] hover:border-blue-400 hover:shadow' 
                      : 'border-slate-200'
                }`}
              >
                {/* Cost Label Tag top-right */}
                <div className="absolute top-4 right-4 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
                  <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
                  <span className="text-xs font-black text-amber-700">{item.xpCost} XP</span>
                </div>

                {/* Render Graphic Icon */}
                <div className="mt-2 group-hover:scale-105 transition-transform duration-300">
                  {renderIcon(item.icon)}
                </div>

                {/* Info block */}
                <div className="flex flex-col gap-1 items-center">
                  <h4 className="font-extrabold text-slate-800 text-base md:text-lg">{item.name}</h4>
                  <p className="text-xs text-slate-500 font-semibold px-2 leading-tight">{item.description}</p>
                </div>

                {/* CTA Action button */}
                <button
                  disabled={isClaimed}
                  onClick={() => handleRedeemClick(item)}
                  style={{ cursor: isClaimed ? 'default' : 'pointer' }}
                  className={`width-full font-black text-sm py-2.5 px-6 rounded-xl border flex items-center justify-center gap-1 transition-all ${
                    isClaimed 
                      ? 'bg-slate-100 border-slate-300 text-slate-400'
                      : canAfford
                        ? 'bg-[#4eb355] hover:bg-[#439c49] text-white border-emerald-700 active:translate-y-0.5'
                        : 'bg-slate-100 border-slate-300 text-slate-400 cursor-not-allowed opacity-60'
                  }`}
                >
                  {isClaimed ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-slate-400" /> Redeemed
                    </>
                  ) : (
                    <>Claim Reward</>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Side: Your Balance & Mascot block */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#eaf1fb] border-2 border-[#b0cef3] rounded-3xl p-6 shadow-sm flex flex-col gap-5 items-center justify-between min-h-[360px]">
            
            <h3 className="text-xl font-bold text-slate-800 w-full text-left font-extrabold">Your Balance</h3>

            {/* Profile pill */}
            <div className="flex items-center gap-2.5 bg-white border border-slate-200 py-2.5 px-4 rounded-2xl w-full justify-self-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-black text-blue-700">H</div>
              <span className="text-sm font-extrabold text-slate-800">{userName}</span>
            </div>

            {/* Cute Yellow Happy Mascot Star */}
            <div className="my-3 flex flex-col items-center justify-center relative group">
              <div className="absolute inset-0 bg-yellow-200/40 rounded-full blur-xl scale-75 group-hover:scale-100 transition-transform duration-500 animate-pulse"></div>
              
              <svg className="w-28 h-28 relative z-10 hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Yellow smiling star */}
                <path d="M50 8L63.5 35L93.5 39.5L72 60.5L77 90.5L50 76.5L23 90.5L28 60.5L6.5 39.5L36.5 35L50 8Z" fill="#ffdf7c" stroke="#1e293b" strokeWidth="4" strokeLinejoin="round"/>
                
                {/* Eyes */}
                <circle cx="40" cy="50" r="3.5" fill="#1e293b"/>
                <circle cx="60" cy="50" r="3.5" fill="#1e293b"/>
                
                {/* Smile curve */}
                <path d="M43 60C45 63 47.5 64 50 64C52.5 64 55 63 57 60" stroke="#1e293b" strokeWidth="3" strokeLinecap="round"/>
                
                {/* Blushing cheeks */}
                <circle cx="34" cy="56" r="3" fill="#f87171" opacity="0.6"/>
                <circle cx="66" cy="56" r="3" fill="#f87171" opacity="0.6"/>

                {/* If safari hat is redeemed and owned, lets draw it! */}
                {unlockedItems.includes('avatar_hat') && (
                  <g transform="translate(10, 0) scale(0.8)">
                    {/* Safari hat positioned over the head */}
                    <path d="M12 36C12 36 20 36 32 36C44 36 52 36 52 36C56 36 58 38 58 40C58 42 56 44 50 44H14C8 44 6 42 6 40C6 38 8 36 12 36Z" fill="#f59e0b" stroke="#1e293b" strokeWidth="3" />
                    <path d="M18 36C18 22 22 12 32 12C42 12 46 22 46 36H18Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
                    <rect x="25" y="30" width="14" height="6" rx="1" fill="#ec4899" stroke="#1e293b" strokeWidth="2" />
                  </g>
                )}
              </svg>

              <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200 mt-2 font-extrabold uppercase animate-pulse">
                {unlockedItems.includes('avatar_hat') ? "Hatted Explorer!" : "Star Guide"}
              </span>
            </div>

            {/* Total Balance display */}
            <div className="flex flex-col items-center text-center mt-2">
              <span className="text-xs text-slate-500 font-extrabold uppercase tracking-wide">Total XP Balance</span>
              <span className="text-2xl font-black text-slate-800 mt-0.5">{xp} XP</span>
              <span className="text-[11px] text-slate-500 font-semibold italic mt-2.5">
                Earn more XP in the Learning Arena to unlock prizes!
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
