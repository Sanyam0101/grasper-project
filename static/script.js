// Theme Switching Functionality
const darkModeRadio = document.getElementById('dark-mode');
const lightModeRadio = document.getElementById('light-mode');

// Apply dark mode
function applyDarkMode() {
    document.body.classList.add('dark-mode');
}

// Apply light mode
function applyLightMode() {
    document.body.classList.remove('dark-mode');
}

// Save theme with debounce
function saveThemeDebounced(theme) {
    clearTimeout(this.themeTimeout);
    this.themeTimeout = setTimeout(() => {
        localStorage.setItem('theme', theme);
    }, 300);
}

// Theme event listeners
darkModeRadio.addEventListener('change', () => {
    applyDarkMode();
    saveThemeDebounced('dark');
});

lightModeRadio.addEventListener('change', () => {
    applyLightMode();
    saveThemeDebounced('light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    if (savedTheme === 'dark') {
        darkModeRadio.checked = true;
        applyDarkMode();
    } else {
        lightModeRadio.checked = true;
        applyLightMode();
    }
} else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        darkModeRadio.checked = true;
        applyDarkMode();
    } else {
        lightModeRadio.checked = true;
        applyLightMode();
    }
}

// Text Analysis Functionality
document.querySelector('.send-btn').addEventListener('click', handleAnalysis);
document.querySelector('.message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleAnalysis();
    }
});

async function handleAnalysis() {
    const inputElement = document.querySelector('.message-input');
    const text = inputElement.value.trim();
    
    if (!text) {
        showError('Please enter some text to analyze');
        return;
    }

    try {
        showLoading();
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text })
        });

        if (!response.ok) {
            throw new Error('Analysis request failed');
        }

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        showError('Analysis failed. Please try again.');
        console.error('Analysis error:', error);
    } finally {
        hideLoading();
    }
}

// File Upload Handling
document.getElementById('file-upload').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['text/plain', 'application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type)) {
        showError('Please upload a text, PDF, or Word document.');
        return;
    }

    try {
        showLoading();
        const text = await readFileContent(file);
        document.querySelector('.message-input').value = text;
    } catch (error) {
        showError('Error reading file. Please try again.');
        console.error('File reading error:', error);
    } finally {
        hideLoading();
    }
});

// Utility Functions
function showLoading() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <div class="loading-text">Analyzing your text...</div>
        </div>
    `;
    resultDiv.style.display = 'block';
}

function hideLoading() {
    const loadingContainer = document.querySelector('.loading-container');
    if (loadingContainer) {
        loadingContainer.remove();
    }
}

function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            ${message}
        </div>
    `;
    resultDiv.style.display = 'block';
    
    setTimeout(() => {
        resultDiv.style.display = 'none';
    }, 3000);
}

async function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        
        if (file.type === 'application/pdf') {
            // Handle PDF files (requires pdf.js library)
            // Add PDF handling logic here
            reject(new Error('PDF handling not implemented yet'));
        } else {
            reader.readAsText(file);
        }
    });
}

function displayResults(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="analysis-results">
            <div class="result-section sentiment">
                <h4>Sentiment Analysis</h4>
                <div class="result-content">
                    <div class="sentiment-score">
                        <span class="label">${data.sentiment[0].label}</span>
                        <span class="score">${(data.sentiment[0].score * 100).toFixed(1)}%</span>
                    </div>
                </div>
            </div>
            
            <div class="result-section keyphrases">
                <h4>Key Phrases</h4>
                <div class="result-content">
                    <ul>
                        ${data.key_phrases.map(phrase => `
                            <li><span class="phrase-tag">${phrase}</span></li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="result-section entities">
                <h4>Named Entities</h4>
                <div class="result-content">
                    <ul>
                        ${data.entities.map(entity => `
                            <li>
                                <span class="entity-text">${entity.text}</span>
                                <span class="entity-label">${entity.label}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    resultDiv.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
    const analyzeButton = document.getElementById('analyzeButton');
    const textInput = document.getElementById('textInput');
    const resultsDiv = document.getElementById('results');

    analyzeButton.addEventListener('click', async function () {
        const text = textInput.value.trim();

        if (text === '') {
            alert("Please enter some text to analyze.");
            return;
        }

        // Clear previous results
        resultsDiv.innerHTML = '';
        
        // Show loading message
        resultsDiv.innerHTML = '<p>Analyzing...</p>';

        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Check if there's an error message in the response
            if (data.error) {
                resultsDiv.innerHTML = `<p class="error">${data.error}</p>`;
                return;
            }

            // Display sentiment analysis results
            const sentiment = data.sentiment[0];
            resultsDiv.innerHTML += `<h3>Sentiment:</h3>
                                      <p>${sentiment.label} (Score: ${sentiment.score.toFixed(4)})</p>`;

            // Display key phrases
            resultsDiv.innerHTML += `<h3>Key Phrases:</h3>
                                      <ul>${data.key_phrases.map(phrase => `<li>${phrase[0]} (Score: ${phrase[1].toFixed(4)})</li>`).join('')}</ul>`;

            // Display named entities
            resultsDiv.innerHTML += `<h3>Named Entities:</h3>
                                      <ul>${data.entities.map(entity => `<li>${entity.text} (${entity.label})</li>`).join('')}</ul>`;
        } catch (error) {
            resultsDiv.innerHTML = `<p class="error">An error occurred: ${error.message}</p>`;
        }
    });
});

