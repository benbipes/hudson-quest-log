import React from 'react';
import { Volume2, VolumeX, Shield, Zap, Calendar, Send, Award, Flame } from 'lucide-react';
import { DAYS_OF_WEEK } from '../data/chores.js';

export default function Header({ 
  levelInfo, 
  streak, 
  soundEnabled, 
  onToggleSound, 
  onOpenSmsModal, 
  selectedDayIndex, 
  onSelectDayIndex 
}) {
  return (
    <header className="relative overflow-hidden bg-slate-900 border-4 border-yellow-400 rounded-2xl p-4 sm:p-6 shadow-[8px_8px_0px_0px_rgba(250,204,21,1)] mb-8 transition-all">
      {/* Manga Speed Lines Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400 via-transparent to-black" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Avatar & HUD Info */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative group">
            {/* Animated Avatar Frame */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-yellow-500 via-amber-400 to-red-500 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:scale-105 transition-transform">
              <span className="text-4xl sm:text-5xl select-none">🥷</span>
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black font-black text-xs px-2 py-0.5 rounded-full border-2 border-black">
                LVL {levelInfo.level}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-yellow-400 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase">
                HUDSON'S QUEST LOG
              </h1>
            </div>
            <p className="text-amber-300 font-bold text-sm sm:text-base flex items-center gap-1">
              <Shield className="w-4 h-4 inline text-yellow-400" />
              Rank: <span className="text-white underline decoration-yellow-400">{levelInfo.title}</span>
            </p>
            
            {/* Streak Counter */}
            <div className="mt-1 flex items-center gap-1.5 bg-red-950/80 border border-red-500 text-red-300 px-2.5 py-0.5 rounded-lg w-fit text-xs sm:text-sm font-black">
              <Flame className="w-4 h-4 text-red-500 animate-pulse fill-red-500" />
              <span>STREAK: {streak} DAYS</span>
            </div>
          </div>
        </div>

        {/* Middle: XP Progress Bar */}
        <div className="w-full md:w-1/3 bg-slate-950 p-3 rounded-xl border-2 border-yellow-500/50 shadow-inner">
          <div className="flex justify-between items-center text-xs sm:text-sm font-black mb-1">
            <span className="text-yellow-400 flex items-center gap-1">
              <Zap className="w-4 h-4 fill-yellow-400" /> XP PROGRESS
            </span>
            <span className="text-slate-300">
              {levelInfo.currentLevelXp} / {levelInfo.xpForNextLevel} XP
            </span>
          </div>
          <div className="w-full h-4 bg-slate-800 rounded-full border border-black overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(250,204,21,0.8)]"
              style={{ width: `${levelInfo.progressPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 text-right mt-1 font-semibold">
            {500 - levelInfo.currentLevelXp} XP until Level {levelInfo.level + 1}!
          </p>
        </div>

        {/* Right: Quick Action Controls & Simulator */}
        <div className="flex flex-wrap items-center gap-2 justify-end w-full md:w-auto">
          {/* Day Simulator */}
          <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-xl border border-yellow-500/40 text-xs text-yellow-300">
            <Calendar className="w-3.5 h-3.5 text-yellow-400" />
            <select 
              value={selectedDayIndex} 
              onChange={(e) => onSelectDayIndex(Number(e.target.value))}
              className="bg-transparent text-yellow-300 font-bold focus:outline-none cursor-pointer"
            >
              {DAYS_OF_WEEK.map((dayName, idx) => (
                <option key={dayName} value={idx} className="bg-slate-900 text-white">
                  {dayName} {idx === new Date().getDay() ? '(Today)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Disable Web Audio SFX' : 'Enable Web Audio SFX'}
            className="p-2.5 rounded-xl bg-slate-800 border-2 border-yellow-400 hover:bg-slate-700 text-yellow-400 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-0.5"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
          </button>

          {/* Send SMS Alert to Dad */}
          <button
            onClick={onOpenSmsModal}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-0.5"
          >
            <Send className="w-4 h-4" />
            <span>NOTIFY DAD (SMS)</span>
          </button>
        </div>

      </div>
    </header>
  );
}
