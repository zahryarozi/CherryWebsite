const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause-button');
const volumeSlider = document.getElementById('volume-slider');
const progressSlider = document.getElementById('progress-slider');
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
        progressSlider.max = audioPlayer.duration;
    }
}

// Call updateDurationDisplay on loadedmetadata
audioPlayer.addEventListener('loadedmetadata', updateDurationDisplay);

// Call updateDurationDisplay on canplay as well
audioPlayer.addEventListener('canplay', updateDurationDisplay);

// Also call it once when the script loads, in case metadata is already available
updateDurationDisplay();

playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused || audioPlayer.ended) {
        audioPlayer.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playPauseButton.textContent = 'Play';
    }
});

volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});

audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = formatTime(audioPlayer.currentTime);
    currentTimeDisplay.textContent = currentTime;
    progressSlider.value = audioPlayer.currentTime;
});

progressSlider.addEventListener('input', () => {
    audioPlayer.currentTime = progressSlider.value;
});