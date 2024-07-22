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
            document.getElementById('download-link').href = data.html_url + '/archive/refs/heads/main.zip'; // Link to download the main branch as a zip file
        })
        .catch(error => console.error('Error fetching repository information:', error));

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
