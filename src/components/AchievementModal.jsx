import React from 'react';
import { Trophy, Sparkles, X, Flame } from 'lucide-react';

export default function AchievementModal({ isOpen, onClose, levelInfo, streak }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-8 border-yellow-400 rounded-3xl max-w-md w-full p-8 shadow-[14px_14px_0px_0px_rgba(250,204,21,1)] relative text-center animate-in zoom-in-75 duration-300">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 border-2 border-black text-slate-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Speedlines Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400 via-transparent to-black" />

        <div className="relative z-10 space-y-4">
          <div className="inline-block p-4 bg-yellow-400 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce">
            <Trophy className="w-12 h-12 text-black" />
          </div>

          <h2 className="text-4xl font-black text-yellow-400 uppercase tracking-widest drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
            LEVEL UP!
          </h2>

          <div className="bg-slate-950 p-4 rounded-2xl border-2 border-yellow-400/60">
            <p className="text-sm font-bold text-amber-300">
              HUDSON REACHED
            </p>
            <p className="text-3xl font-black text-white uppercase mt-1">
              LEVEL {levelInfo.level}
            </p>
            <p className="text-xs font-bold text-emerald-400 mt-1">
              Title Unlocked: <span className="underline">{levelInfo.title}</span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 bg-red-950/80 border border-red-500 text-red-300 px-4 py-2 rounded-xl font-black text-sm">
            <Flame className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
            <span>STREAK MULTIPLIER: {streak} DAYS!</span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-lg rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-1 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-6 h-6 fill-black" />
            <span>KEEP CRUSHING QUESTS!</span>
          </button>
        </div>

      </div>
    </div>
  );
}
