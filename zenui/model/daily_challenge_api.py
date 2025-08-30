from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import random
import json
import os
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

class DailyChallengeSystem:
    def __init__(self):
        self.df = pd.read_csv("leetcode_questions.csv")
        self.history_file = "history.csv"
        self.user_profile_file = "user_profile.json"
        self.knowledge_level = 50  # Default starting level
        self.load_user_profile()
        
    def load_user_profile(self):
        """Load user profile and knowledge level"""
        if os.path.exists(self.user_profile_file):
            with open(self.user_profile_file, 'r') as f:
                profile = json.load(f)
                self.knowledge_level = profile.get('knowledge_level', 50)
        
    def save_user_profile(self):
        """Save user profile"""
        profile = {
            'knowledge_level': self.knowledge_level,
            'last_updated': datetime.now().isoformat()
        }
        with open(self.user_profile_file, 'w') as f:
            json.dump(profile, f)
    
    def adjust_knowledge_level(self, correct):
        """Adjust knowledge level based on answer"""
        if correct:
            self.knowledge_level = min(100, self.knowledge_level + 5)
        else:
            self.knowledge_level = max(0, self.knowledge_level - 5)
        self.save_user_profile()
    
    def get_daily_question(self):
        """Get a question based on current knowledge level"""
        # Filter questions based on acceptance rate (inverse of difficulty)
        suitable_questions = self.df[
            (self.df['AcceptanceRate'] >= self.knowledge_level - 20) & 
            (self.df['AcceptanceRate'] <= self.knowledge_level + 20)
        ]
        
        if suitable_questions.empty:
            suitable_questions = self.df
        
        # Select random question
        question = suitable_questions.sample(n=1).iloc[0]
        
        # Create multiple choice question about the problem
        question_types = [
            self._create_difficulty_question(question),
            self._create_topic_question(question),
            self._create_acceptance_question(question)
        ]
        
        return random.choice(question_types)
    
    def _create_difficulty_question(self, question):
        """Create a question about difficulty"""
        correct_difficulty = question['Difficulty']
        difficulties = ['EASY', 'MEDIUM', 'HARD']
        options = [correct_difficulty]
        
        # Add other difficulties as wrong options
        for diff in difficulties:
            if diff != correct_difficulty and len(options) < 4:
                options.append(diff)
        
        # Fill remaining slots with random difficulties
        while len(options) < 4:
            options.append(random.choice(difficulties))
        
        random.shuffle(options)
        correct_index = options.index(correct_difficulty)
        
        return {
            'id': int(question['ID']),
            'question': f"What is the difficulty level of '{question['Title']}'?",
            'options': options,
            'correct': correct_index,
            'explanation': f"'{question['Title']}' is a {correct_difficulty} level problem.",
            'leetcode_link': question['Link'],
            'topics': question['Topics'],
            'acceptance_rate': question['AcceptanceRate']
        }
    
    def _create_topic_question(self, question):
        """Create a question about topics"""
        topics = question['Topics'].split(', ') if pd.notna(question['Topics']) else ['General']
        correct_topic = random.choice(topics)
        
        # Get other topics from dataset
        all_topics = set()
        for _, row in self.df.sample(n=20).iterrows():
            if pd.notna(row['Topics']):
                all_topics.update(row['Topics'].split(', '))
        
        options = [correct_topic]
        other_topics = list(all_topics - {correct_topic})
        
        # Add 3 random wrong options
        for _ in range(3):
            if other_topics and len(options) < 4:
                wrong_topic = random.choice(other_topics)
                if wrong_topic not in options:
                    options.append(wrong_topic)
                    other_topics.remove(wrong_topic)
        
        random.shuffle(options)
        correct_index = options.index(correct_topic)
        
        return {
            'id': int(question['ID']),
            'question': f"Which topic is associated with '{question['Title']}'?",
            'options': options,
            'correct': correct_index,
            'explanation': f"'{question['Title']}' involves {correct_topic}.",
            'leetcode_link': question['Link'],
            'topics': question['Topics'],
            'acceptance_rate': question['AcceptanceRate']
        }
    
    def _create_acceptance_question(self, question):
        """Create a question about acceptance rate"""
        correct_rate = round(question['AcceptanceRate'])
        
        # Create ranges around the correct rate
        options = [f"{correct_rate}%"]
        
        # Add some wrong options
        wrong_rates = [
            max(0, correct_rate - 20),
            min(100, correct_rate + 20),
            max(0, correct_rate - 10)
        ]
        
        for rate in wrong_rates:
            if f"{rate}%" not in options and len(options) < 4:
                options.append(f"{rate}%")
        
        random.shuffle(options)
        correct_index = options.index(f"{correct_rate}%")
        
        return {
            'id': int(question['ID']),
            'question': f"What is the approximate acceptance rate of '{question['Title']}'?",
            'options': options,
            'correct': correct_index,
            'explanation': f"'{question['Title']}' has an acceptance rate of {correct_rate}%.",
            'leetcode_link': question['Link'],
            'topics': question['Topics'],
            'acceptance_rate': question['AcceptanceRate']
        }
    
    def submit_answer(self, question_id, user_answer, correct_answer):
        """Process user answer and update knowledge level"""
        is_correct = user_answer == correct_answer
        self.adjust_knowledge_level(is_correct)
        
        # Log to history
        self._log_to_history(question_id, is_correct)
        
        return {
            'correct': is_correct,
            'new_knowledge_level': self.knowledge_level,
            'xp_gained': 10 if is_correct else 2
        }
    
    def _log_to_history(self, question_id, correct):
        """Log question attempt to history"""
        history_entry = {
            'timestamp': datetime.now().isoformat(),
            'question_id': question_id,
            'correct': correct,
            'knowledge_level': self.knowledge_level
        }
        
        # Append to CSV
        if os.path.exists(self.history_file):
            history_df = pd.read_csv(self.history_file)
            new_row = pd.DataFrame([history_entry])
            history_df = pd.concat([history_df, new_row], ignore_index=True)
        else:
            history_df = pd.DataFrame([history_entry])
        
        history_df.to_csv(self.history_file, index=False)

# Initialize the system
challenge_system = DailyChallengeSystem()

@app.route('/daily-challenge', methods=['GET'])
def get_daily_challenge():
    """Get today's daily challenge question"""
    try:
        question = challenge_system.get_daily_question()
        return jsonify({
            'success': True,
            'question': question,
            'knowledge_level': challenge_system.knowledge_level
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/submit-answer', methods=['POST'])
def submit_answer():
    """Submit answer for daily challenge"""
    try:
        data = request.json
        question_id = data.get('question_id')
        user_answer = data.get('user_answer')
        correct_answer = data.get('correct_answer')
        
        result = challenge_system.submit_answer(question_id, user_answer, correct_answer)
        
        return jsonify({
            'success': True,
            'result': result
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/user-stats', methods=['GET'])
def get_user_stats():
    """Get user statistics"""
    try:
        stats = {
            'knowledge_level': challenge_system.knowledge_level,
            'total_questions': 0,
            'correct_answers': 0,
            'streak': 0
        }
        
        if os.path.exists(challenge_system.history_file):
            history_df = pd.read_csv(challenge_system.history_file)
            stats['total_questions'] = len(history_df)
            stats['correct_answers'] = len(history_df[history_df['correct'] == True])
            
            # Calculate streak (consecutive correct answers from recent)
            recent_history = history_df.tail(10)['correct'].tolist()
            streak = 0
            for correct in reversed(recent_history):
                if correct:
                    streak += 1
                else:
                    break
            stats['streak'] = streak
        
        return jsonify({
            'success': True,
            'stats': stats
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/reset-progress', methods=['POST'])
def reset_progress():
    """Reset user progress"""
    try:
        challenge_system.knowledge_level = 50
        challenge_system.save_user_profile()
        
        return jsonify({
            'success': True,
            'message': 'Progress reset successfully'
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting Daily Challenge API on http://localhost:5000")
    app.run(host='localhost', port=5000, debug=True)