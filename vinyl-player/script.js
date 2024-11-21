const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const mp3Upload = document.getElementById('mp3Upload');
const coverUpload = document.getElementById('coverUpload');
const coverArt = document.querySelector('.cover-art');
const rewindBtn = document.getElementById('rewind');
const forwardBtn = document.getElementById('forward');
const speedDownBtn = document.getElementById('speedDown');
const speedUpBtn = document.getElementById('speedUp');
const reverseBtn = document.getElementById('reverse');

let isPlaying = false;
let playbackRate = 1;

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Play';
        coverArt.style.animationPlayState = 'paused';
    } else {
        audio.play();
        playPauseBtn.textContent = 'Pause';
        coverArt.style.animationPlayState = 'running';
    }
    isPlaying = !isPlaying;
});

// Handle MP3 file upload
mp3Upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'audio/mpeg') {
        const fileURL = URL.createObjectURL(file);
        audio.src = fileURL;
        playPauseBtn.textContent = 'Play'; // Reset play button
        isPlaying = false; // Reset playing state
        coverArt.style.animationPlayState = 'paused'; // Stop spinning
    } else {
        alert('Please upload a valid MP3 file.');
    }
});

// Handle album cover upload
coverUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const fileURL = URL.createObjectURL(file);
        coverArt.style.backgroundImage = `url('${fileURL}')`;
    } else {
        alert('Please upload a valid image file.');
    }
});

// Rewind functionality
rewindBtn.addEventListener('click', () => {
    audio.currentTime = Math.max(0, audio.currentTime - 5); // Rewind 5 seconds
    console.log('Rewound 5 seconds');
});

// Forward functionality
forwardBtn.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 5); // Forward 5 seconds
    console.log('Forwarded 5 seconds');
});

// Speed control
speedDownBtn.addEventListener('click', () => {
    playbackRate = Math.max(0.5, playbackRate - 0.1); // Minimum speed: 0.5x
    audio.playbackRate = playbackRate;
    console.log(`Playback speed decreased to ${playbackRate}`);
});

speedUpBtn.addEventListener('click', () => {
    playbackRate = Math.min(3, playbackRate + 0.1); // Maximum speed: 3x
    audio.playbackRate = playbackRate;
    console.log(`Playback speed increased to ${playbackRate}`);
});

// Reverse playback
let isReversed = false;
reverseBtn.addEventListener('click', () => {
    if (isReversed) {
        playbackRate = Math.abs(playbackRate); // Reset to positive rate
    } else {
        playbackRate = -Math.abs(playbackRate); // Set to negative rate
    }
    audio.playbackRate = playbackRate;
    console.log(`Playback reversed: ${isReversed}`);
    isReversed = !isReversed;
});
