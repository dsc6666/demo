// API endpoints
const JOKE_API_GENERAL = 'https://official-joke-api.appspot.com/random_joke';
const JOKE_API_CATEGORY = 'https://official-joke-api.appspot.com/jokes/{category}/random';
const JOKE_API_KNOCK_KNOCK = 'https://official-joke-api.appspot.com/jokes/knock-knock/random';

// DOM elements
const jokeText = document.getElementById('jokeText');
const getJokeBtn = document.getElementById('getJokeBtn');
const shareBtn = document.getElementById('shareBtn');
const copyBtn = document.getElementById('copyBtn');
const categorySelect = document.getElementById('categorySelect');
const loading = document.getElementById('loading');
const notification = document.getElementById('notification');

let currentJoke = '';

// Event listeners
getJokeBtn.addEventListener('click', fetchJoke);
shareBtn.addEventListener('click', shareJoke);
copyBtn.addEventListener('click', copyJoke);
categorySelect.addEventListener('change', fetchJoke);

// Fetch joke from API
async function fetchJoke() {
    try {
        showLoading(true);
        getJokeBtn.disabled = true;
        
        const category = categorySelect.value;
        let apiUrl;
        
        if (category === 'programming') {
            apiUrl = 'https://official-joke-api.appspot.com/jokes/programming/random';
        } else if (category === 'knock-knock') {
            apiUrl = JOKE_API_KNOCK_KNOCK;
        } else {
            apiUrl = JOKE_API_GENERAL;
        }
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle array responses (when fetching multiple jokes)
        const joke = Array.isArray(data) ? data[0] : data;
        
        // Format the joke text
        if (joke.setup && joke.delivery) {
            currentJoke = `${joke.setup}\n\n${joke.delivery}`;
            jokeText.textContent = `${joke.setup}\n\n${joke.delivery}`;
        } else if (joke.joke) {
            currentJoke = joke.joke;
            jokeText.textContent = joke.joke;
        }
        
        // Update button states
        shareBtn.disabled = false;
        copyBtn.disabled = false;
        
        showLoading(false);
    } catch (error) {
        console.error('Error fetching joke:', error);
        jokeText.textContent = 'Oops! Failed to load a joke. Please try again.';
        showNotification('Failed to load joke. Please check your internet connection.', 'error');
        showLoading(false);
    } finally {
        getJokeBtn.disabled = false;
    }
}

// Share joke
function shareJoke() {
    if (!currentJoke) return;
    
    const text = `Check out this joke: "${currentJoke}"`;
    
    // Try to use Web Share API if available
    if (navigator.share) {
        navigator.share({
            title: 'Funny Joke',
            text: text,
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard and show notification
        copyToClipboard(text);
        showNotification('Joke copied to clipboard! You can paste it anywhere.', 'success');
    }
}

// Copy joke to clipboard
function copyJoke() {
    if (!currentJoke) return;
    copyToClipboard(currentJoke);
    showNotification('Joke copied to clipboard!', 'success');
}

// Helper function to copy text
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Show/hide loading state
function showLoading(show) {
    if (show) {
        loading.classList.add('show');
    } else {
        loading.classList.remove('show');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification show ${type}`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Load initial joke when page loads
window.addEventListener('load', fetchJoke);
