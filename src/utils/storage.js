// LocalStorage & Gamification State Management

const STORAGE_KEY = 'hudson_quest_log_v1';

export const INITIAL_STATE = {
  xp: 0,
  level: 1,
  streak: 0,
  lastCompletedDate: null,
  completedQuests: {}, // { 'YYYY-MM-DD': ['teeth_morning', 'tuba_practice'] }
  achievements: [],
  soundEnabled: true,
  dadPhone: '919-961-8875',
  twilioConfig: {
    accountSid: '',
    authToken: '',
    fromNumber: ''
  }
};

export function getTodayDateString(simulatedDate = null) {
  const d = simulatedDate ? new Date(simulatedDate) : new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw);
    return { ...INITIAL_STATE, ...parsed };
  } catch (err) {
    console.error('Error loading game state:', err);
    return INITIAL_STATE;
  }
}

export function saveGameState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Error saving game state:', err);
  }
}

export function calculateLevel(xp) {
  // Each level requires 500 XP
  const level = Math.floor(xp / 500) + 1;
  const currentLevelXp = xp % 500;
  const xpForNextLevel = 500;
  const progressPercent = Math.min(100, Math.round((currentLevelXp / xpForNextLevel) * 100));
  
  return {
    level,
    currentLevelXp,
    xpForNextLevel,
    progressPercent,
    title: getTitleForLevel(level)
  };
}

export function getTitleForLevel(level) {
  if (level >= 20) return '🔥 Ultimate Legend';
  if (level >= 15) return '👑 Master Choresmith';
  if (level >= 10) return '⚡ Super Saiyan Son';
  if (level >= 7) return '🎷 Tuba Virtuoso';
  if (level >= 5) return '🛡️ Knight of Order';
  if (level >= 3) return '🎮 Device Unlocked Champion';
  if (level >= 2) return '⭐ Apprentice Adventurer';
  return '🌱 Rookie Hero';
}
