import React from 'react';
import { ShoppingBag, Coins, CheckCircle, Tag, Sparkles } from 'lucide-react';
import { sfx } from '../utils/audio';

interface TitleItem {
  id: string;
  name: string;
  xpCost: number;
  description: string;
  badgeBg: string;
  badgeText: string;
}

interface EmporiumViewProps {
  xp: number;
  unlockedTitles: string[];
  onRedeemTitle: (titleId: string, cost: number) => void;
}

export default function EmporiumView({
  xp,
  unlockedTitles,
  onRedeemTitle,
}: EmporiumViewProps) {
  
  const titlesList: TitleItem[] = [
    {
      id: 'cosmic_voyager',
      name: '🛸 Cosmic Voyager',
      xpCost: 300,
      description: 'Acquire the celestial title of a veteran cruiser of the starry sky.',
      badgeBg: 'bg-indigo-50 border-indigo-200',
      badgeText: 'text-indigo-800 font-extrabold'
    },
    {
      id: 'stardust_scholar',
      name: '📖 Stardust Scholar',
      xpCost: 450,
      description: 'Proclaim your intelligence in constellation configurations.',
      badgeBg: 'bg-teal-50 border-teal-200',
      badgeText: 'text-teal-800 font-extrabold'
    },
    {
      id: 'warp_speed_racer',
      name: '⚡ Warp Speed Racer',
      xpCost: 600,
      description: 'A lightning-fast explorer master of calculations and rocket orbits.',
      badgeBg: 'bg-amber-50 border-amber-200',
      badgeText: 'text-amber-800 font-extrabold'
    }
  ];

  const handlePurchase = (item: TitleItem) => {
    if (unlockedTitles.includes(item.id)) return;
    if (xp < item.xpCost) {
      sfx.playBuzz();
      return;
    }
    sfx.playRedeem();
    onRedeemTitle(item.id, item.xpCost);
  };

  return (
    <div className="flex flex-col gap-6" id="emporium-view-root">
      
      {/* Header */}
      <div className="flex flex-col gap-1 items-start">
        <span className="bg-amber-100 text-[#b58434] text-xs font-extrabold px-3 py-1 rounded-full border border-amber-200 uppercase tracking-widest">
          Space Bazaar
        </span>
        <h1 className="text-4xl font-extrabold text-[#4f81b8] tracking-tight mt-1">
          SPACE EMPORIUM
        </h1>
        <p className="text-slate-600 font-medium text-sm md:text-base mt-0.5">
          Inscribe custom cosmic titles next to your rank tag!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="titles-deck">
        
        {titlesList.map((title) => {
          const isOwned = unlockedTitles.includes(title.id);
          const canAfford = xp >= title.xpCost;
          return (
            <div 
              key={title.id}
              className={`bg-white border-4 rounded-3xl p-5 flex flex-col justify-between shadow-sm hover:translate-y-px transition-transform ${
                isOwned 
                  ? 'border-slate-200 bg-slate-50/70' 
                  : canAfford 
                    ? 'border-[#b0cef3] hover:border-amber-400' 
                    : 'border-slate-100'
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className={`text-xs px-2.5 py-1 border rounded-lg ${title.badgeBg} ${title.badgeText}`}>
                    Title Tag
                  </div>
                  <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 flex items-center gap-0.5">
                    🪙 {title.xpCost} XP
                  </span>
                </div>

                <div className="mt-2">
                  <h3 className="text-lg font-black text-slate-800">{title.name}</h3>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed mt-1">{title.description}</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-dashed border-slate-100">
                <button
                  disabled={isOwned}
                  onClick={() => handlePurchase(title)}
                  className={`w-full py-2 px-4 rounded-xl font-black text-xs border text-center transition-all ${
                    isOwned
                      ? 'bg-slate-100 text-slate-400 border-slate-300 cursor-default'
                      : canAfford
                        ? 'bg-[#4eb355] hover:bg-[#439c49] text-white border-emerald-700 cursor-pointer'
                        : 'bg-slate-100 text-slate-400 border-slate-300 opacity-60 cursor-not-allowed'
                  }`}
                >
                  {isOwned ? (
                    <span className="flex items-center justify-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Already Owned
                    </span>
                  ) : (
                    "Buy Title"
                  )}
                </button>
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}
