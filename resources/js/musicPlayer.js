const audioPlayer = document.getElementById('audio-player');
const playPauseButtonContainer = document.getElementById('play-pause-button-container'); // Target the container div
const playPauseIcon = document.getElementById('play-pause-icon'); // Still need to target the icon for text change
const volumeSlider = document.getElementById('volume-slider');
const progressBar = document.getElementById('progress-bar'); // Target the div for progress
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
}

// Function to update the duration display
function updateDurationDisplay() {
    if (audioPlayer.duration) {
        const duration = formatTime(audioPlayer.duration);
        durationDisplay.textContent = duration;
    }
}

// Call updateDurationDisplay on loadedmetadata and canplay
audioPlayer.addEventListener('loadedmetadata', updateDurationDisplay);
audioPlayer.addEventListener('canplay', updateDurationDisplay);
updateDurationDisplay(); // Also call it once when the script loads

playPauseButtonContainer.addEventListener('click', () => { // Event listener on the container
    if (audioPlayer.paused || audioPlayer.ended) {
        audioPlayer.play();
        playPauseIcon.textContent = 'pause'; // Change icon to 'pause'
    } else {
        audioPlayer.pause();
        playPauseIcon.textContent = 'play_arrow'; // Change icon to 'play_arrow'
    }
});

volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});

audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = formatTime(audioPlayer.currentTime);
    currentTimeDisplay.textContent = currentTime;

    // Calculate progress percentage and update the width of the progress bar div
    if (audioPlayer.duration) {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
});

// Implement click-to-seek functionality for the progress bar container
progressBar.parentElement.addEventListener('click', (e) => {
    if (audioPlayer.duration) { // Ensure audio duration is available
        const clickX = e.offsetX; // Get X coordinate of click relative to the container
        const progressBarWidth = progressBar.parentElement.offsetWidth; // Get total width of the container
        const seekTime = (clickX / progressBarWidth) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    }
});

// Reset icon when audio ends
audioPlayer.addEventListener('ended', () => {
    playPauseIcon.textContent = 'play_arrow';
    progressBar.style.width = '0%'; // Reset progress bar
});