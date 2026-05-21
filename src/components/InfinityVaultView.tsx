import React from 'react';
import { Shield, Sparkles, Check, Bookmark, Grid } from 'lucide-react';
import { sfx } from '../utils/audio';

interface InfinityVaultViewProps {
  unlockedItems: string[];
  unlockedTitles: string[];
  equippedTitle: string;
  onEquipTitle: (titleId: string) => void;
}

export default function InfinityVaultView({
  unlockedItems,
  unlockedTitles,
  equippedTitle,
  onEquipTitle,
}: InfinityVaultViewProps) {
  
  const titleLabels: { [key: string]: string } = {
    'novice': 'Novice',
    'cosmic_voyager': '🛸 Cosmic Voyager',
    'stardust_scholar': '📖 Stardust Scholar',
    'warp_speed_racer': '⚡ Warp Speed Racer'
  };

  const itemMetadata: { [key: string]: { name: string; desc: string; icon: string } } = {
    'avatar_hat': {
      name: 'Special Avatar Hat',
      desc: 'Fits beautifully on your golden star guide avatar!',
      icon: '🤠'
    },
    'xp_potion': {
      name: 'Double XP Potion',
      desc: 'Consumed. Doubled previous completion rewards!',
      icon: '🧪'
    },
    'custom_badge': {
      name: 'Custom Badge',
      desc: 'A magnificent metallic star crest showing master explorer skills.',
      icon: '🛡️'
    },
    'theme_pack': {
      name: 'Theme Pack',
      desc: 'Activated sparkling cloud effects in the galaxy!',
      icon: '🌌'
    }
  };

  const handleEquip = (titleId: string) => {
    sfx.playSuccess();
    onEquipTitle(titleId);
  };

  return (
    <div className="flex flex-col gap-6" id="infinity-vault-root">
      
      {/* Header */}
      <div className="flex flex-col gap-1 items-start">
        <span className="bg-purple-100 text-[#7c4fb8] text-xs font-extrabold px-3 py-1 rounded-full border border-purple-200 uppercase tracking-widest">
          Locker Room
        </span>
        <h1 className="text-4xl font-extrabold text-[#4f81b8] tracking-tight mt-1">
          INFINITY VAULT
        </h1>
        <p className="text-slate-600 font-medium text-sm md:text-base mt-0.5">
          Inspect and equip your unlocked space items and title tags!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="vault-layout">
        
        {/* Titles Locker */}
        <div className="bg-[#fcf5ff] border-2 border-[#cbd3eb] rounded-3xl p-5 shadow-sm flex flex-col gap-4">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-1">
            <Bookmark className="w-5 h-5 text-[#8b5cf6]" />
            Your Cosmic Titles
          </h3>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            Choose which title tag you want to carry. This will display alongside your character card in class!
          </p>

          <div className="flex flex-col gap-3 mt-1" id="vault-titles-list">
            {/* Base Title */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-slate-700">Novice</span>
                <span className="text-[11px] text-slate-400 font-bold">Standard learner rank tag</span>
              </div>
              {equippedTitle === 'novice' ? (
                <span className="bg-emerald-50 text-emerald-700 text-xs font-black px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-0.5">
                  <Check className="w-3.5 h-3.5" /> Equipped
                </span>
              ) : (
                <button 
                  onClick={() => handleEquip('novice')}
                  className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg active:scale-95"
                >
                  Equip
                </button>
              )}
            </div>

            {/* Unlocked Custom Titles */}
            {unlockedTitles.map((titleId) => (
              <div key={titleId} className="bg-white border-2 border-slate-200 rounded-2xl p-4 flex items-center justify-between animate-fade-in">
                <div className="flex flex-col">
                  <span className="text-sm font-extrabold text-slate-800">{titleLabels[titleId]}</span>
                  <span className="text-[11px] text-slate-500 font-bold">Custom Title tag</span>
                </div>
                {equippedTitle === titleId ? (
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-black px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-0.5">
                    <Check className="w-3.5 h-3.5" /> Equipped
                  </span>
                ) : (
                  <button 
                    onClick={() => handleEquip(titleId)}
                    className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg active:scale-95"
                  >
                    Equip
                  </button>
                )}
              </div>
            ))}

            {unlockedTitles.length === 0 && (
              <div className="text-center py-6 text-slate-400 font-semibold leading-relaxed text-xs border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                You haven't unlocked extra titles yet. Buy them at the Space Emporium market!
              </div>
            )}
          </div>
        </div>

        {/* Goods Locker */}
        <div className="bg-[#f0f6fc] border-2 border-[#cbd3eb] rounded-3xl p-5 shadow-sm flex flex-col gap-4">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-1">
            <Grid className="w-5 h-5 text-blue-500" />
            Claimed Accessories
          </h3>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            Your collection of badges, custom costumes, and potions purchased with XP points.
          </p>

          <div className="flex flex-col gap-3 mt-1" id="vault-items-list">
            {unlockedItems.map((itemId) => {
              const meta = itemMetadata[itemId];
              if (!meta) return null;
              return (
                <div key={itemId} className="bg-white border-2 border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center text-3xl shadow-inner">
                    {meta.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold text-slate-800">{meta.name}</span>
                    <span className="text-[11px] text-slate-500 font-semibold leading-snug">{meta.desc}</span>
                  </div>
                </div>
              );
            })}

            {unlockedItems.length === 0 && (
              <div className="text-center py-10 text-slate-400 font-semibold leading-relaxed text-xs border border-dashed border-slate-200 rounded-2xl bg-white">
                No items claimed yet. Visit the Treasure Trove to redeem your XP!
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
