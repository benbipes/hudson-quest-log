import React, { useState, useEffect } from 'react';
import { Music, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function TubaTimer({ isCompleted, onToggle, xp }) {
  const [timeLeftStr, setTimeLeftStr] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    function updateTimer() {
      const now = new Date();
      const target = new Date();
      target.setHours(19, 30, 0, 0); // 7:30 PM

      const diffMs = target - now;

      if (diffMs <= 0) {
        setTimeLeftStr('PASSED (Deadline was 7:30 PM)');
        setIsUrgent(true);
      } else {
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
        
        if (hours === 0 && minutes < 60) {
          setIsUrgent(true);
        } else {
          setIsUrgent(false);
        }

        setTimeLeftStr(`${hours}h ${minutes}m ${seconds}s remaining`);
      }
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative overflow-hidden p-5 rounded-2xl border-4 transition-all ${
      isCompleted 
        ? 'bg-emerald-950/80 border-emerald-400 shadow-[6px_6px_0px_0px_rgba(16,185,129,1)]' 
        : isUrgent 
          ? 'bg-gradient-to-r from-red-950 via-amber-950 to-slate-900 border-red-500 shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] animate-pulse'
          : 'bg-slate-900 border-yellow-400 shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]'
    }`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="flex items-start gap-3.5">
          <div className={`p-3 rounded-xl border-2 border-black ${
            isCompleted ? 'bg-emerald-400 text-black' : 'bg-yellow-400 text-black'
          }`}>
            <Music className="w-7 h-7" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-white uppercase tracking-wide">
                🎷 Sonic Mastery: Tuba Rehearsal
              </h3>
              <span className="bg-yellow-400 text-black font-black text-xs px-2 py-0.5 rounded-full border border-black">
                +{xp} XP
              </span>
            </div>
            
            <p className="text-slate-300 text-sm mt-0.5">
              Practice tuba after dinner. <strong className="text-yellow-300 underline">Must complete before Sullivan goes to sleep at 7:30 PM!</strong>
            </p>

            {/* Countdown Badge */}
            <div className="mt-2 flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black border-2 border-black ${
                isCompleted 
                  ? 'bg-emerald-500 text-black' 
                  : isUrgent 
                    ? 'bg-red-600 text-white animate-bounce' 
                    : 'bg-amber-400 text-black'
              }`}>
                <Clock className="w-4 h-4" />
                <span>BEDTIME DEADLINE (7:30 PM): {timeLeftStr}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Check Button */}
        <button
          onClick={onToggle}
          className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-black text-base border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-1 flex items-center justify-center gap-2 ${
            isCompleted
              ? 'bg-emerald-500 hover:bg-emerald-400 text-black'
              : 'bg-yellow-400 hover:bg-yellow-300 text-black'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-6 h-6 fill-black text-emerald-400" />
              <span>QUEST COMPLETE!</span>
            </>
          ) : (
            <span>CLAIM REHEARSAL XP (+{xp})</span>
          )}
        </button>

      </div>
    </div>
  );
}
