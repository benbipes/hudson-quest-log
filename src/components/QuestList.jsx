import React from 'react';
import QuestCard from './QuestCard.jsx';
import TubaTimer from './TubaTimer.jsx';
import { QUEST_CATEGORIES } from '../data/chores.js';
import { Sparkles, Trophy } from 'lucide-react';

export default function QuestList({ 
  activeQuests, 
  completedQuestIds, 
  onToggleQuest 
}) {
  // Group active quests by category
  const categories = Object.values(QUEST_CATEGORIES);

  const totalQuests = activeQuests.length;
  const completedCount = activeQuests.filter(q => completedQuestIds.includes(q.id)).length;
  const percent = totalQuests > 0 ? Math.round((completedCount / totalQuests) * 100) : 0;

  return (
    <div className="space-y-8">
      
      {/* Daily Overall Progress Banner */}
      <div className="bg-slate-900 border-4 border-yellow-400 p-4 sm:p-5 rounded-2xl shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
              TODAY'S MISSION DIRECTIVE
            </h2>
          </div>
          <div className="bg-yellow-400 text-black px-3 py-1 rounded-full font-black text-sm border-2 border-black">
            {completedCount} OF {totalQuests} QUESTS CLEAR ({percent}%)
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-4 bg-slate-950 rounded-full border border-black overflow-hidden p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
            style={{ width: `${percent}%` }}
          />
        </div>

        {percent === 100 && (
          <div className="mt-4 p-3 bg-emerald-500 text-black rounded-xl font-black text-center text-sm border-2 border-black animate-bounce flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 fill-black" />
            <span>VICTORY! Hudson has cleared all daily household quests today! Great job!</span>
          </div>
        )}
      </div>

      {/* Render Quests Grouped by Category */}
      {categories.map(cat => {
        const questsInCat = activeQuests.filter(q => q.category === cat.id);
        if (questsInCat.length === 0) return null;

        return (
          <section key={cat.id} className="space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-slate-800 pb-2">
              <h3 className="text-xl font-black text-yellow-400 tracking-wide uppercase">
                {cat.title}
              </h3>
              <span className="text-xs text-slate-400 font-bold">
                ({questsInCat.filter(q => completedQuestIds.includes(q.id)).length}/{questsInCat.length} Done)
              </span>
            </div>

            <div className="space-y-3">
              {questsInCat.map(quest => {
                const isCompleted = completedQuestIds.includes(quest.id);

                if (quest.id === 'tuba_practice') {
                  return (
                    <TubaTimer
                      key={quest.id}
                      isCompleted={isCompleted}
                      onToggle={() => onToggleQuest(quest.id, quest.xp)}
                      xp={quest.xp}
                    />
                  );
                }

                return (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    isCompleted={isCompleted}
                    onToggle={() => onToggleQuest(quest.id, quest.xp)}
                  />
                );
              })}
            </div>
          </section>
        );
      })}

    </div>
  );
}
