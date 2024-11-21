const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const mp3Upload = document.getElementById('mp3Upload');
const coverUpload = document.getElementById('coverUpload');
const vinyl = document.querySelector('.vinyl');
const coverArt = document.querySelector('.cover-art');

let isPlaying = false;

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Play';
        vinyl.style.animationPlayState = 'paused';
    } else {
        audio.play();
        playPauseBtn.textContent = 'Pause';
        vinyl.style.animationPlayState = 'running';
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
        vinyl.style.animationPlayState = 'paused'; // Stop spinning
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
