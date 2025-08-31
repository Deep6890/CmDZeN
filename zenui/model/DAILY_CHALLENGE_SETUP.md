# Daily Challenge Setup Guide

## Overview
This integration connects your Jupyter notebook LeetCode analysis with your React daily challenge component, creating an adaptive learning system.

## Files Created
1. `daily_challenge_api.py` - Main API server
2. `start_daily_challenge.bat` - Startup script
3. `requirements_daily_challenge.txt` - Python dependencies
4. `DailyChallengeSection.jsx` - Homepage component

## Setup Instructions

### 1. Install Python Dependencies
```bash
cd model
pip install -r requirements_daily_challenge.txt
```

### 2. Start the API Server
Double-click `start_daily_challenge.bat` or run:
```bash
python daily_challenge_api.py
```

### 3. Add to Homepage (Optional)
Import and use the DailyChallengeSection component in your homepage:
```jsx
import DailyChallengeSection from '../src/components/HomePage/DailyChallengeSection';

// Add to your homepage
<DailyChallengeSection />
```

### 4. Add Route for Full Challenge Page
Add this route to your React router:
```jsx
import DailyQuizChallenge from './pages/DailyQuizChallenge';

// In your routes
<Route path="/daily-challenge" element={<DailyQuizChallenge />} />
```

## Features

### Adaptive Learning System
- **Knowledge Level Tracking**: Starts at 50%, adjusts based on performance
- **Question Difficulty**: Automatically selects questions matching user level
- **Progress Persistence**: Saves user progress in JSON file

### Question Types
1. **Difficulty Questions**: "What difficulty is this problem?"
2. **Topic Questions**: "Which topic does this problem involve?"
3. **Acceptance Rate**: "What's the acceptance rate?"

### Data Integration
- **CSV Data**: Uses your existing `leetcode_questions.csv`
- **History Tracking**: Logs all attempts in `history.csv`
- **User Profile**: Saves progress in `user_profile.json`

### API Endpoints
- `GET /daily-challenge` - Get today's challenge
- `POST /submit-answer` - Submit answer and get feedback
- `GET /user-stats` - Get user statistics
- `POST /reset-progress` - Reset user progress

## How It Works

1. **Question Selection**: Algorithm picks questions based on current knowledge level
2. **Answer Processing**: Adjusts knowledge level (+5 for correct, -5 for incorrect)
3. **Progress Tracking**: Maintains streak, accuracy, and total questions
4. **Adaptive Difficulty**: Questions get harder/easier based on performance

## Integration with Jupyter Notebook

The system uses the same data analysis from your notebook:
- Loads `leetcode_questions.csv` with all problem data
- Applies difficulty filtering based on acceptance rates
- Creates multiple choice questions about the problems
- Tracks user performance over time

## Customization

### Adjust Knowledge Level Changes
In `daily_challenge_api.py`, modify the `adjust_knowledge_level` method:
```python
def adjust_knowledge_level(self, correct):
    if correct:
        self.knowledge_level = min(100, self.knowledge_level + 10)  # Increase by 10
    else:
        self.knowledge_level = max(0, self.knowledge_level - 3)   # Decrease by 3
```

### Add New Question Types
Create new methods in the `DailyChallengeSystem` class:
```python
def _create_custom_question(self, question):
    # Your custom question logic
    return {
        'question': 'Your question text',
        'options': ['A', 'B', 'C', 'D'],
        'correct': 0,
        'explanation': 'Explanation text'
    }
```

## Troubleshooting

### API Not Starting
- Check if port 5000 is available
- Ensure all dependencies are installed
- Verify `leetcode_questions.csv` exists in the model folder

### React Component Not Loading
- Ensure API is running on localhost:5000
- Check browser console for CORS errors
- Verify the component is properly imported

### Data Not Persisting
- Check file permissions in the model folder
- Ensure `history.csv` and `user_profile.json` can be created/modified

## Future Enhancements

1. **Daily Streaks**: Track consecutive days of challenges
2. **Leaderboards**: Compare with other users
3. **Topic Focus**: Allow users to focus on specific topics
4. **Difficulty Progression**: Structured learning paths
5. **Performance Analytics**: Detailed progress charts