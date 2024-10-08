document.addEventListener('DOMContentLoaded', () => {
    const latestReleaseInfo = document.getElementById('latest-release-info');
    const downloadList = document.getElementById('download-list');
    const updateList = document.getElementById('update-list');
    const viewPreviousReleasesButton = document.getElementById('view-previous-releases');

    // Function to fetch release information
    const fetchReleaseInfo = () => {
        fetch('https://api.github.com/repos/angryzor/sonic-frontiers-devtools/releases')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    const latestRelease = data[0];
                    latestReleaseInfo.innerHTML = `
                        <strong>${latestRelease.name}</strong>
                        <p>${latestRelease.body}</p>
                        <a href="${latestRelease.html_url}" target="_blank" class="download-button">Download</a>
                    `;

                    // Clear previous download list items
                    downloadList.innerHTML = '';

                    // Add previous releases to download list
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
                    latestReleaseInfo.textContent = 'No releases found.';
                }
            })
            .catch(error => {
                console.error('Error fetching release information:', error);
                latestReleaseInfo.textContent = 'Error fetching release information.';
            });
    };

    // Fetch release information initially
    fetchReleaseInfo();

    // Fetch update log information
    fetch('https://api.github.com/repos/angryzor/sonic-frontiers-devtools/releases')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Clear previous update log items
            updateList.innerHTML = '';

            // Add update log entries
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

    // Toggle visibility of previous releases list
    viewPreviousReleasesButton.addEventListener('click', () => {
        if (downloadList.style.display === 'none') {
            downloadList.style.display = 'block';
            viewPreviousReleasesButton.textContent = 'Hide Previous Releases';
        } else {
            downloadList.style.display = 'none';
            viewPreviousReleasesButton.textContent = 'View Previous Releases';
        }
    });
});
