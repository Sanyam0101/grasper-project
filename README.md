# Grasper Project

_A modern text analysis web application built with Flask and advanced NLP techniques._

---

## Description

Grasper is an advanced **text analysis tool** that provides insights from natural language data using state-of-the-art processing methods. It supports sentiment analysis, key phrase extraction, and entity recognition, within a user-friendly and responsive web interface.

---

## Features

- **Sentiment Analysis**: Detect and visualize sentiment (positive, negative, neutral) using deep learning models.
- **Key Phrase Extraction**: Automatic detection and highlighting of relevant keywords.
- **Named Entity Recognition**: Identification of persons, organizations, locations, and more.
- **Dark/Light Mode**: Easy switching for eye comfort.
- **Responsive Design**: Works across desktop, tablet, and mobile devices.

---

## Technologies Used

- Flask (Backend Framework)
- Transformers (NLP Models)
- KeyBERT (Keyword Extraction)
- spaCy (Named Entity Recognition)
- JavaScript (Frontend Interactivity)
- CSS (Styling)

---

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip
- (Recommended) virtualenv for isolated environments

### Installation
## Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- (Recommended) virtualenv for isolated environments

### Steps

1. **Clone the repository**

    ```
    git clone https://github.com/YOUR_USERNAME/grasper-project.git
    cd grasper-project
    ```

2. **Create and activate a virtual environment**

    ```
    python -m venv .venv
    # Activate the environment:
    source .venv/bin/activate      # On Windows: .venv\Scripts\activate
    ```

3. **Install dependencies**

    ```
    pip install -r requirements.txt
    ```
## Usage

1. Run the Flask development server:
    ```
    flask run
    ```
2. Open your browser to [http://localhost:5000](http://localhost:5000)
3. Enter or upload text to see sentiment, key phrases, and entity results.

### Example

**Input:**  
> "OpenAI released a new version of GPT in San Francisco."

**Output:**  
- Sentiment: Neutral  
- Key Phrases: OpenAI, GPT, San Francisco  
- Entities: Organization (OpenAI), Location (San Francisco)

---

## Project Structure
grasper-project/
├── app/            # Main application logic
├── static/         # CSS, JS, images
├── templates/      # HTML Jinja templates
├── requirements.txt
├── README.md
└── ...

---

## Contributing

Contributions are welcome!

- Follow [PEP8](https://peps.python.org/pep-0008/) coding style
- Use feature branches for new changes
- Please submit pull requests for review

Report bugs or suggestions via [GitHub Issues](https://github.com/YOUR_USERNAME/grasper-project/issues).

---

## License

Licensed under the [MIT License](LICENSE).  
See the LICENSE file for more details.

---

## Maintainers & Support

- Maintainer: **YOUR NAME**
- Email: your-email@example.com

---

## Demo Screenshot

![Grasper Project Screenshot](image.jpg)

---
<img width="1069" height="588" alt="Screenshot 2024-10-27 022443" src="https://github.com/user-attachments/assets/3fd3375f-643b-4493-93b5-6bb5ee1f5079" />




