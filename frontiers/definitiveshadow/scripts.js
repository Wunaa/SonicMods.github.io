document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 0.5; // Set volume to 50%

    // Function to show music modal
    function showMusicModal() {
        const musicModal = document.getElementById('musicModal');
        musicModal.style.display = 'flex';
        setTimeout(() => {
            musicModal.classList.add('show-modal');
        }, 50); // Delay for smoother animation
    }

    // Function to hide music modal with animation
    function hideMusicModal() {
        const musicModal = document.getElementById('musicModal');
        musicModal.classList.remove('show-modal');
        setTimeout(() => {
            musicModal.style.display = 'none';
        }, 500); // Duration of animation
    }

    // Event listener for music modal buttons
    const musicYesBtn = document.getElementById('musicYes');
    const musicNoBtn = document.getElementById('musicNo');

    musicYesBtn.addEventListener('click', () => {
        localStorage.setItem('playMusic', 'true');
        bgMusic.play();
        hideMusicModal();
    });

    musicNoBtn.addEventListener('click', () => {
        localStorage.setItem('playMusic', 'false');
        bgMusic.pause();
        hideMusicModal();
    });

    // Event listeners for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Show the home section by default
    showSection('home');

    // Function to fetch release information
    const fetchReleaseInfo = () => {
        fetch('https://api.github.com/repos/Wunaa/DefinitiveShadow/releases')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    const latestRelease = data[0];
                    const latestReleaseInfo = document.getElementById('latest-release-info');
                    latestReleaseInfo.innerHTML = `
                        <strong>${latestRelease.name}</strong>
                        <p>${latestRelease.body}</p>
                        <a href="${latestRelease.html_url}" target="_blank" class="download-button">Download</a>
                    `;

                    const downloadList = document.getElementById('download-list');
                    downloadList.innerHTML = '';

                    data.slice(1).forEach(release => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <strong>${release.name}</strong>
                            <p>${release.body}</p>
                            <a href="${release.html_url}" target="_blank" class="download-button">Download</a>
                        `;
                        downloadList.appendChild(li);
                    });
                } else {
                    const latestReleaseInfo = document.getElementById('latest-release-info');
                    latestReleaseInfo.textContent = 'No releases found.';
                }
            })
            .catch(error => {
                console.error('Error fetching release information:', error);
                const latestReleaseInfo = document.getElementById('latest-release-info');
                latestReleaseInfo.textContent = 'Error fetching release information.';
            });
    };

    // Fetch release information initially
    fetchReleaseInfo();

    // Function to fetch update log information
    const fetchUpdateLog = () => {
        const updateList = document.getElementById('update-list');
        fetch('https://api.github.com/repos/Wunaa/DefinitiveShadow/releases')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                updateList.innerHTML = '';
                data.forEach(release => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <strong>${release.name}</strong>
                        <p>${release.body}</p>
                    `;
                    updateList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error fetching update log information:', error);
                const li = document.createElement('li');
                li.textContent = 'Error fetching update information.';
                updateList.appendChild(li);
            });
    };

    // Fetch update log information initially
    fetchUpdateLog();

    // Toggle visibility of previous releases list
    const viewPreviousReleasesButton = document.getElementById('view-previous-releases');
    const downloadList = document.getElementById('download-list');

    viewPreviousReleasesButton.addEventListener('click', () => {
        if (downloadList.style.display === 'none') {
            downloadList.style.display = 'block';
            viewPreviousReleasesButton.textContent = 'Hide Previous Releases';
        } else {
            downloadList.style.display = 'none';
            viewPreviousReleasesButton.textContent = 'View Previous Releases';
        }
    });

    // Show or hide sections based on navigation
    function showSection(sectionId) {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    // Check local storage for music preference
    const playMusic = localStorage.getItem('playMusic');
    if (playMusic === 'true') {
        bgMusic.play();
    } else {
        showMusicModal();
    }
});
