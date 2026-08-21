import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header.jsx';
import QuestList from './components/QuestList.jsx';
import SmsNotifyModal from './components/SmsNotifyModal.jsx';
import AchievementModal from './components/AchievementModal.jsx';
import { soundFX } from './components/SoundEffects.js';
import { getActiveQuestsForDay, MASTER_QUESTS, DAYS_OF_WEEK } from './data/chores.js';
import { loadGameState, saveGameState, getTodayDateString, calculateLevel } from './utils/storage.js';

export default function App() {
  const [gameState, setGameState] = useState(loadGameState);
  
  // Date Simulator state (defaults to actual today index: 0=Sun, 1=Mon, ..., 6=Sat)
  const [selectedDayIndex, setSelectedDayIndex] = useState(new Date().getDay());
  
  // Modal states
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);

  // Active date key (e.g. "2026-08-21")
  const todayStr = getTodayDateString();

  // Completed quest IDs for today
  const completedToday = gameState.completedQuests[todayStr] || [];

  // Active quests based on selected day index
  const activeQuests = getActiveQuestsForDay(selectedDayIndex);

  // Calculate Level & Progress
  const levelInfo = calculateLevel(gameState.xp);

  // Save game state changes to LocalStorage
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // Fallback if canvas-confetti is unavailable
    }
  };

  // Handle Quest Check/Uncheck toggle
  const handleToggleQuest = (questId, questXp) => {
    const isAlreadyCompleted = completedToday.includes(questId);
    let updatedTodayList = [];

    let newXp = gameState.xp;
    let oldLevel = levelInfo.level;

    if (isAlreadyCompleted) {
      // Uncheck
      updatedTodayList = completedToday.filter(id => id !== questId);
      newXp = Math.max(0, newXp - questXp);
      if (gameState.soundEnabled) soundFX.playUncheck();
    } else {
      // Check off
      updatedTodayList = [...completedToday, questId];
      newXp = newXp + questXp;

      if (gameState.soundEnabled) soundFX.playCheckmark();
      triggerConfetti();

      // Check if all active quests for today are completed
      if (updatedTodayList.length === activeQuests.length) {
        if (gameState.soundEnabled) soundFX.playFanfare();
      }
    }

    // Check for level up
    const newLevelInfo = calculateLevel(newXp);
    if (newLevelInfo.level > oldLevel) {
      if (gameState.soundEnabled) soundFX.playLevelUp();
      setIsAchievementModalOpen(true);
    }

    // Calculate streak logic
    let newStreak = gameState.streak;
    if (!gameState.completedQuests[todayStr] && updatedTodayList.length > 0) {
      newStreak += 1;
    }

    setGameState(prev => ({
      ...prev,
      xp: newXp,
      streak: newStreak,
      completedQuests: {
        ...prev.completedQuests,
        [todayStr]: updatedTodayList
      }
    }));
  };

  const handleToggleSound = () => {
    setGameState(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  };

  const handleSaveTwilioConfig = (config) => {
    setGameState(prev => ({
      ...prev,
      twilioConfig: config
    }));
  };

  const completedQuestTitles = activeQuests
    .filter(q => completedToday.includes(q.id))
    .map(q => q.title);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="max-w-4xl mx-auto">
        
        {/* Header HUD */}
        <Header
          levelInfo={levelInfo}
          streak={gameState.streak}
          soundEnabled={gameState.soundEnabled}
          onToggleSound={handleToggleSound}
          onOpenSmsModal={() => setIsSmsModalOpen(true)}
          selectedDayIndex={selectedDayIndex}
          onSelectDayIndex={setSelectedDayIndex}
        />

        {/* Main Quest Board */}
        <main>
          <QuestList
            activeQuests={activeQuests}
            completedQuestIds={completedToday}
            onToggleQuest={handleToggleQuest}
          />
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs font-bold text-slate-500 py-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>🎮 Hudson's Household Quest Log • Built for Hudson</span>
          <span>Alerts configured for Dad: <strong className="text-yellow-400">919-961-8875</strong></span>
        </footer>

        {/* Modals */}
        <SmsNotifyModal
          isOpen={isSmsModalOpen}
          onClose={() => setIsSmsModalOpen(false)}
          dateStr={todayStr}
          completedCount={completedToday.length}
          totalCount={activeQuests.length}
          completedTitles={completedQuestTitles}
          streak={gameState.streak}
          twilioConfig={gameState.twilioConfig}
          onSaveTwilioConfig={handleSaveTwilioConfig}
        />

        <AchievementModal
          isOpen={isAchievementModalOpen}
          onClose={() => setIsAchievementModalOpen(false)}
          levelInfo={levelInfo}
          streak={gameState.streak}
        />

      </div>
    </div>
  );
}
