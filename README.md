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
| 🧼 **Hygiene Hero: Power Shower** | Daily | Bedtime |
| 🪥 **Nightly Tooth Armor (Brush Teeth #2)** | Daily | Bedtime |

---

## 🔥 Features

1. **Manga / Anime / Video Game Aesthetic**:
   - Manga HUD header with level badges, XP progress bar, and streak counter.
   - High-contrast comic panels, dynamic checkmark animations, and level-up popups.
2. **Built-in Chiptune Sound Effects**:
   - Web Audio API sound effects for checkmarks, unchecking, level ups, and victory fanfares (no external mp3 files required!).
3. **Sullivan Bedtime Countdown Timer**:
   - Real-time countdown timer for Tuba practice relative to the 7:30 PM deadline on Tuba days (Mon, Tue, Thu, Sun).
4. **SMS Alert & Progress Dispatch (Dad: 919-961-8875)**:
   - **1-Click Phone SMS**: Opens native Messages app pre-filled with Hudson's daily completion percentage.
   - **Twilio Integration**: Programmatic SMS sending via Twilio API.
   - **Daily 7:00 PM GitHub Action**: Automated evening SMS alert runner `.github/workflows/daily-sms-alert.yml`.
5. **Day Simulator**:
   - Dropdown menu allowing Hudson or parents to test and view scheduled quests for any day of the week (e.g. Monday vs Sunday vs Wednesday).

---

## 🚀 How to Host on your GitHub Account

### Step 1: Create Remote GitHub Repository
Inside the local project directory `/Users/benbipes/.gemini/antigravity/scratch/hudson-quest-log`:

If you have GitHub CLI (`gh`):
```bash
gh repo create hudson-quest-log --public --source=. --remote=origin --push
```

Or create a new repo `hudson-quest-log` on [github.com/new](https://github.com/new) and run:
```bash
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/hudson-quest-log.git
git push -u origin main
```

### Step 2: GitHub Pages Automatic Hosting
The included GitHub Action workflow `.github/workflows/deploy.yml` will automatically build and publish the web page on GitHub Pages whenever code is pushed to `main`.

Enable GitHub Pages in your repository settings:
1. Go to **Settings** -> **Pages**.
2. Under **Source**, select **GitHub Actions**.

---

## 📱 Setting up Daily Automated SMS Alerts (Optional Twilio Setup)

To enable automatic SMS alerts at 7:00 PM every evening to `919-961-8875`:
1. In your GitHub repository, go to **Settings** -> **Secrets and variables** -> **Actions**.
2. Add the following repository secrets:
   - `TWILIO_ACCOUNT_SID`: Your Twilio Account SID
   - `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token
   - `TWILIO_FROM_NUMBER`: Your Twilio Phone Number (e.g. `+15005550006`)
