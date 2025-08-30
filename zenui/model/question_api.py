from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import random

app = Flask(__name__)
CORS(app)

# Load dataset
df = pd.read_csv("leetcode_questions.csv")
df['Complexity'] = 100 - df['AcceptanceRate']

@app.route('/random_question')
def get_random_question():
    try:
        # Select random question
        question = df.sample(n=1).iloc[0]
        
        # Create multiple choice options from similar difficulty questions
        similar = df[df['Difficulty'] == question['Difficulty']].sample(n=3)
        options = [question['Title']] + similar['Title'].tolist()[:3]
        random.shuffle(options)
        
        return jsonify({
            'id': int(question['ID']),
            'question': f"What is the difficulty of: {question['Title']}?",
            'options': [question['Difficulty'], 'EASY', 'MEDIUM', 'HARD'],
            'correct': 0,
            'title': question['Title'],
            'topics': question['Topics'],
            'link': question['Link']
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=8000, debug=True)