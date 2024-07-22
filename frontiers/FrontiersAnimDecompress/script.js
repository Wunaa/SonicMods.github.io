document.addEventListener('DOMContentLoaded', function() {
    const repoUrl = 'https://api.github.com/repos/AdelQue/FrontiersAnimDecompress';

    // Fetch repository information
    fetch(repoUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('description').textContent = data.description;
            document.getElementById('stars').textContent = data.stargazers_count;
            document.getElementById('forks').textContent = data.forks_count;
            document.getElementById('issues').textContent = data.open_issues_count;
        })
        .catch(error => console.error('Error fetching repository information:', error));

    // Fetch latest release
    fetch(`${repoUrl}/releases/latest`)
        .then(response => response.json())
        .then(data => {
            const latestReleaseUrl = data.assets[0].browser_download_url; // Link to the latest release asset
            document.getElementById('download-link').href = latestReleaseUrl;
        })
        .catch(error => console.error('Error fetching latest release:', error));

    // Fetch latest commits
    fetch(`${repoUrl}/commits`)
        .then(response => response.json())
        .then(data => {
            const commitList = document.getElementById('commit-list');
            data.slice(0, 5).forEach(commit => {
                const listItem = document.createElement('li');
                listItem.textContent = `${commit.commit.message} - ${commit.commit.author.name}`;
                commitList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching commits:', error));
});
