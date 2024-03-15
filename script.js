const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause-button");
const volumeControl = document.getElementById("volume-control");
const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const totalTimeDisplay = document.getElementById("total-time");
const seek = document.getElementById('seek');
const seekTooltip = document.getElementById('seek-tooltip');

let isPlaying = false;

// add events to play button

playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = "";
        playPauseButton.classList.remove("pause-icon");
        playPauseButton.classList.add("play-icon");
    } else {
        audio.play();
        playPauseButton.textContent = "";
        playPauseButton.classList.add("pause-icon");
        playPauseButton.classList.remove("play-icon");
    }
    isPlaying = !isPlaying;
});

// add volume control

volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

// display time update in current time and progress bar

document.addEventListener("DOMContentLoaded", initializeAudio);
audio.addEventListener('loadedmetadata', initializeAudio);
audio.addEventListener("timeupdate", timeUpdate);
audio.addEventListener('timeupdate', updateProgress);
seek.addEventListener('input', skipAhead);

// dispay total time on load 

function initializeAudio() {
    const duration = audio.duration;
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);
    totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    seek.setAttribute('max', duration);
}

// update

function timeUpdate() {
    const currentTime = audio.currentTime;
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
}

// updateProgress indicates how far through the video
// the current playback is by updating the progress bar

function updateProgress() {
    seek.value = Math.floor(audio.currentTime);
}

// skipAhead jumps to a different point in the video when
// the progress bar is clicked

function skipAhead(event) {
    const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
    audio.currentTime = skipTo;
    seek.value = skipTo;
  }
