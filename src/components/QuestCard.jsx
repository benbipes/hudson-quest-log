import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Droplets, 
  BookOpen, 
  Music, 
  ShowerHead, 
  Smile, 
  Lock, 
  Clock 
} from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Droplets,
  BookOpen,
  Music,
  ShowerHead,
  Smile
};

export default function QuestCard({ quest, isCompleted, onToggle }) {
  const IconComponent = ICON_MAP[quest.icon] || Sparkles;

  return (
    <div 
      className={`relative overflow-hidden p-4 sm:p-5 rounded-2xl border-4 transition-all ${
        isCompleted
          ? 'bg-slate-900/90 border-emerald-400/80 shadow-[4px_4px_0px_0px_rgba(16,185,129,1)]'
          : 'bg-slate-900 border-slate-700 hover:border-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="flex items-start gap-3.5">
          {/* Icon Badge */}
          <div className={`p-3 rounded-xl border-2 border-black flex-shrink-0 ${
            isCompleted 
              ? 'bg-emerald-400 text-black' 
              : quest.deviceWarning 
                ? 'bg-red-500 text-white' 
                : 'bg-yellow-400 text-black'
          }`}>
            <IconComponent className="w-6 h-6" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className={`text-lg font-black tracking-wide uppercase ${
                isCompleted ? 'text-emerald-400 line-through' : 'text-white'
              }`}>
                {quest.title}
              </h4>
              
              <span className="bg-yellow-400 text-black font-black text-xs px-2 py-0.5 rounded-full border border-black">
                +{quest.xp} XP
              </span>

              {quest.deviceWarning && (
                <span className="bg-red-600 text-white font-black text-xs px-2.5 py-0.5 rounded-full border border-black flex items-center gap-1 animate-pulse">
                  <Lock className="w-3 h-3" /> NO DEVICES UNTIL DONE!
                </span>
              )}
            </div>

            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              {quest.description}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-400">
              <span className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                <Clock className="w-3 h-3 text-yellow-400" /> {quest.timeWindow}
              </span>
              <span className="text-amber-400">
                • {quest.ruleNote}
              </span>
            </div>
          </div>
        </div>

        {/* Action Checkbox Button */}
        <button
          onClick={onToggle}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-black text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-0.5 flex items-center justify-center gap-2 ${
            isCompleted
              ? 'bg-emerald-500 hover:bg-emerald-400 text-black'
              : 'bg-yellow-400 hover:bg-yellow-300 text-black'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-5 h-5 fill-black text-emerald-400" />
              <span>COMPLETED</span>
            </>
          ) : (
            <span>CHECK OFF (+{quest.xp} XP)</span>
          )}
        </button>

      </div>
    </div>
  );
}
