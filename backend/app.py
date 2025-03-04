from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable communication with React Native frontend

# Load trained models
depression_model = joblib.load('models/depression_model.pkl')
stress_model = joblib.load('models/stress_model.pkl')
anxiety_model = joblib.load('models/anxiety_model.pkl')

# Define severity classification functions
def classify_depression(score):
    if score <= 9:
        return "Normal"
    elif 10 <= score <= 13:
        return "Mild"
    elif 14 <= score <= 20:
        return "Moderate"
    elif 21 <= score <= 27:
        return "Severe"
    else:
        return "Extremely Severe"

def classify_stress(score):
    if score <= 14:
        return "Normal"
    elif 15 <= score <= 18:
        return "Mild"
    elif 19 <= score <= 25:
        return "Moderate"
    elif 26 <= score <= 33:
        return "Severe"
    else:
        return "Extremely Severe"

def classify_anxiety(score):
    if score <= 7:
        return "Normal"
    elif 8 <= score <= 9:
        return "Mild"
    elif 10 <= score <= 14:
        return "Moderate"
    elif 15 <= score <= 19:
        return "Severe"
    else:
        return "Extremely Severe"

@app.route('/')
def home():
    return jsonify({"message": "DASS-42 Prediction API is running. Use /predict to analyze responses."})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if not data or 'responses' not in data or len(data['responses']) != 42:
        return jsonify({"error": "Invalid input, must contain 42 responses"}), 400

    responses = np.array(data['responses']).reshape(1, -1)

    # Predict severity levels
    depression_level = classify_depression(depression_model.predict(responses)[0])
    stress_level = classify_stress(stress_model.predict(responses)[0])
    anxiety_level = classify_anxiety(anxiety_model.predict(responses)[0])

    # Response with severity levels
    result = {
        "Depression": depression_level,
        "Stress": stress_level,
        "Anxiety": anxiety_level
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
