#!/usr/bin/env bash
# Script to initialize git repository and push Hudson's Quest Log to GitHub

REPO_NAME="hudson-quest-log"

echo "🎮 Setting up Git Repository for Hudson's Quest Log..."

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
  git init
  git branch -M main
fi

# Add all files and commit
git add .
git commit -m "Initial commit: Hudson's Gamified Daily Chore Quest Log & SMS Alert system"

echo ""
echo "=========================================================="
echo "🚀 REPOSITORY CREATED LOCALLY AT:"
echo "   $(pwd)"
echo "=========================================================="
echo ""
echo "To publish this repository to your GitHub account:"
echo ""
echo "Option 1 (Using GitHub CLI if logged in):"
echo "  gh repo create $REPO_NAME --public --source=. --remote=origin --push"
echo ""
echo "Option 2 (Create repo manually on github.com/new and run):"
echo "  git remote add origin git@github.com:YOUR_USERNAME/$REPO_NAME.git"
echo "  git push -u origin main"
echo ""
echo "After pushing, GitHub Pages will automatically host your app live via the included GitHub Actions workflow!"
echo "=========================================================="
