from flask import Flask, request, jsonify, render_template
from transformers import pipeline
from keybert import KeyBERT
import spacy
import os

app = Flask(__name__)

# Configure models (load only once, globally)
models = {}

def load_models():
    models['sentiment'] = pipeline("sentiment-analysis")
    models['keyphrase'] = KeyBERT()
    try:
        models['ner'] = spacy.load("en_core_web_sm")
    except OSError:
        print("Downloading en_core_web_sm...")
        os.system("python -m spacy download en_core_web_sm")
        models['ner'] = spacy.load("en_core_web_sm")

# Add home route to render the HTML template
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze_text():
    try:
        data = request.get_json()
        text = data.get('text', '').strip()  # Handle missing or empty text

        if not text:
            return jsonify({'error': 'Input text is required'}), 400  # Bad Request

        # Perform analysis using pre-loaded models
        sentiment = models['sentiment'](text)
        key_phrases = models['keyphrase'].extract_keywords(text, top_n=5, keyphrase_ngram_range=(1, 2))
        doc = models['ner'](text)
        entities = [{'text': ent.text, 'label': ent.label_} for ent in doc.ents]

        return jsonify({
            'sentiment': sentiment,
            'key_phrases': key_phrases,
            'entities': entities
        })

    except Exception as e:
        app.logger.error(f"Analysis error: {e}")  # Log the error for debugging
        return jsonify({'error': 'An error occurred during analysis'}), 500  # Internal Server Error

# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# Load models on app startup
with app.app_context():
    load_models()

if __name__ == '__main__':
    app.run(debug=True)  # Set debug=False in production
