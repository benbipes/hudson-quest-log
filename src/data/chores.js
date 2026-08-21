// Quest definitions and schedule rules for Hudson's daily routine

export const QUEST_CATEGORIES = {
  MORNING: { id: 'MORNING', title: '🌅 Morning Quest Phase', icon: 'Sun' },
  AFTER_SCHOOL: { id: 'AFTER_SCHOOL', title: '🏫 After School / Cross Country', icon: 'Backpack' },
  EVENING: { id: 'EVENING', title: '🎷 Evening / Dinner Time', icon: 'Music' },
  BEDTIME: { id: 'BEDTIME', title: '🌙 Night / Bedtime Ritual', icon: 'Moon' }
};

export const MASTER_QUESTS = [
  {
    id: 'teeth_morning',
    title: 'Morning Tooth Armor (Brush Teeth #1)',
    description: 'Brush teeth thoroughly for 2 minutes before heading out to school.',
    category: 'MORNING',
    xp: 100,
    icon: 'Sparkles',
    days: [0, 1, 2, 3, 4, 5, 6], // Everyday
    timeWindow: 'Morning (Before School)',
    ruleNote: 'Every morning'
  },
  {
    id: 'water_bottle',
    title: 'Hydro Mission: Sink Drop-off',
    description: 'Place your water bottle directly into the kitchen sink immediately upon arriving home.',
    category: 'AFTER_SCHOOL',
    xp: 150,
    icon: 'Droplets',
    days: [1, 2, 3, 4, 5], // Mon-Fri (Weekdays)
    timeWindow: 'After School',
    ruleNote: 'Weekdays when returning from school'
  },
  {
    id: 'homework_first',
    title: 'Brain Power: Homework Clearance',
    description: 'Finish ALL school homework before turning on screens, playing games, or using devices!',
    category: 'AFTER_SCHOOL',
    xp: 350,
    icon: 'BookOpen',
    days: [1, 2, 3, 4, 5], // Mon-Fri (Weekdays)
    timeWindow: 'After School / Cross Country',
    deviceWarning: true,
    ruleNote: 'Weekdays after school/cross country (MUST finish before device time!)'
  },
  {
    id: 'tuba_practice',
    title: 'Sonic Mastery: Tuba Rehearsal',
    description: 'Practice tuba after dinner. MUST finish before Sullivan goes to sleep at 7:30 PM!',
    category: 'EVENING',
    xp: 300,
    icon: 'Music',
    days: [1, 2, 4, 0], // Monday (1), Tuesday (2), Thursday (4), Sunday (0)
    timeWindow: 'After Dinner (Deadline: 7:30 PM)',
    tubaDeadline: '19:30',
    ruleNote: 'Mondays, Tuesdays, Thursdays & Sundays'
  },
  {
    id: 'trash_thursday',
    title: 'Trash Trooper: Street Drop-off',
    description: 'Gather all household trash cans and take the main trash bin out to the street.',
    category: 'EVENING',
    xp: 200,
    icon: 'Trash2',
    days: [4], // Thursday (4)
    timeWindow: 'Thursday Evening',
    ruleNote: 'Every Thursday evening'
  },
  {
    id: 'bedtime_shower',
    title: 'Hygiene Hero: Power Shower',
    description: 'Take a full shower and clean up before crawling into bed.',
    category: 'BEDTIME',
    xp: 150,
    icon: 'ShowerHead',
    days: [0, 1, 2, 3, 4, 5, 6], // Everyday
    timeWindow: 'Before Bed',
    ruleNote: 'Every night before bed'
  },
  {
    id: 'teeth_night',
    title: 'Nightly Tooth Armor (Brush Teeth #2)',
    description: 'Brush teeth for 2 full minutes to protect against nighttime tooth bugs.',
    category: 'BEDTIME',
    xp: 100,
    icon: 'Smile',
    days: [0, 1, 2, 3, 4, 5, 6], // Everyday
    timeWindow: 'Before Bed',
    ruleNote: 'Every night before bed'
  }
];

export const DAYS_OF_WEEK = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export function getActiveQuestsForDay(dayIndex) {
  return MASTER_QUESTS.filter(quest => quest.days.includes(dayIndex));
}
