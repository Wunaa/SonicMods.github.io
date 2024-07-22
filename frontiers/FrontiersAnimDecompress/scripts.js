document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.container');
    const navLinks = document.querySelectorAll('nav a');
    let activeSection = document.querySelector('.container.active');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            if (activeSection && activeSection !== targetSection) {
                activeSection.classList.remove('active');
            }
            targetSection.classList.add('active');
            activeSection = targetSection;
        });
    });

    // Fetch repository info
    fetch('https://api.github.com/repos/AdelQue/FrontiersAnimDecompress')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch repository info');
            return response.json();
        })
        .then(data => {
            document.getElementById('repo-description').textContent = data.description || 'No description available';
            document.getElementById('stars').textContent = data.stargazers_count || 'N/A';
            document.getElementById('forks').textContent = data.forks_count || 'N/A';
            document.getElementById('issues').textContent = data.open_issues_count || 'N/A';
            document.getElementById('download-link').href = data.html_url + '/releases/latest';
        })
        .catch(error => {
            console.error('Error fetching repository info:', error);
        });

    // Fetch README.md
    fetch('https://raw.githubusercontent.com/AdelQue/FrontiersAnimDecompress/main/README.md')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch README.md');
            return response.text();
        })
        .then(text => {
            document.getElementById('readme-content').textContent = text;
        })
        .catch(error => {
            console.error('Error fetching README.md:', error);
            document.getElementById('readme-content').textContent = 'Failed to load README.md';
        });

    // Fetch latest commits
    fetch('https://api.github.com/repos/AdelQue/FrontiersAnimDecompress/commits')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch commits');
            return response.json();
        })
        .then(commits => {
            const commitsList = document.getElementById('commits-list');
            commitsList.innerHTML = commits.slice(0, 5).map(commit => `
                <li>
                    <strong>${commit.commit.author.name}</strong>: ${commit.commit.message}
                    <br><small>${new Date(commit.commit.author.date).toLocaleString()}</small>
                </li>
            `).join('');
        })
        .catch(error => {
            console.error('Error fetching commits:', error);
        });
});
