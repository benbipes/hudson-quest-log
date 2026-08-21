# 🎮 Hudson's Household Quest Log

A high-energy, manga/video-game-inspired daily chore tracker built for **Hudson (11 years old)**. Designed with Manga HUD graphics, Web Audio chiptune sound effects, XP/Level progression, streak counters, Sullivan bedtime countdown timers, and automated SMS alerts to **Dad (919-961-8875)**.

---

## 📅 Hudson's Chore Schedule & Rules

| Quest Name | Schedule | Time Window & Special Rules |
| :--- | :--- | :--- |
| 🪥 **Morning Tooth Armor (Brush Teeth #1)** | Daily | Morning (Before School) |
| 💧 **Hydro Mission: Sink Drop-off** | Weekdays (Mon-Fri) | Right after returning home from school |
| 📚 **Brain Power: Homework Clearance** | Weekdays (Mon-Fri) | After school / Cross Country (**MUST finish before any device time!**) |
| 🎷 **Sonic Mastery: Tuba Rehearsal** | Mon, Tue, Thu, Sun | After dinner (**MUST finish before 7:30 PM** - Sullivan's Bedtime!) |
| 🗑️ **Trash Trooper: Street Drop-off** | Thursdays | Thursday Evening (Gather trash cans & take main bin to street) |
| 🧼 **Hygiene Hero: Power Shower** | Daily | Bedtime |
| 🪥 **Nightly Tooth Armor (Brush Teeth #2)** | Daily | Bedtime |
| ⭐ **Special One-off Quests (Parents)** | Custom / Daily | Mom & Dad can add any one-off task for Hudson to complete that day |

---

## 🔥 Features

1. **Manga / Anime / Video Game Aesthetic**:
   - Manga HUD header with level badges, XP progress bar, and streak counter.
   - High-contrast comic panels, dynamic checkmark animations, and level-up popups.
2. **Parent One-off Quest Creator**:
   - Mom and Dad can click `➕ ADD ONE-OFF QUEST (PARENTS)` to assign Hudson a special task for the day (e.g., clean room, rake leaves, feed pet) with custom XP rewards!
3. **Thursday Trash Routine**:
   - Scheduled every Thursday evening for Hudson to gather household trash and roll the bin to the street.
4. **Built-in Chiptune Sound Effects**:
   - Web Audio API sound effects for checkmarks, unchecking, level ups, and victory fanfares.
5. **Sullivan Bedtime Countdown Timer**:
   - Real-time countdown timer for Tuba practice relative to the 7:30 PM deadline on Tuba days (Mon, Tue, Thu, Sun).
6. **SMS Alert & Progress Dispatch (Dad: 919-961-8875)**:
   - **1-Click Phone SMS**: Opens native Messages app pre-filled with Hudson's daily completion percentage.
   - **Twilio Integration**: Programmatic SMS sending via Twilio API.
   - **Daily 7:00 PM GitHub Action**: Automated evening SMS alert runner `.github/workflows/daily-sms-alert.yml`.
7. **Day Simulator**:
   - Dropdown menu allowing Hudson or parents to test and view scheduled quests for any day of the week.

---

## 🚀 How to Push & Update on GitHub Pages

Inside the project directory `/Users/benbipes/.gemini/antigravity/scratch/hudson-quest-log`:

```bash
git add .
git commit -m "Add Thursday trash chore and Parent One-Off quest creator"
git push origin main
```

Once pushed, GitHub Pages will update live at **[https://benbipes.github.io/hudson-quest-log/](https://benbipes.github.io/hudson-quest-log/)**!
