document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('nav ul li a');

    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Show the home section by default
    showSection('home');

    // Fetch GitHub releases and display in the download section
    fetch('https://api.github.com/repos/Wunaa/DefinitiveShadow/releases')
        .then(response => response.json())
        .then(data => {
            const releasesDiv = document.getElementById('releases');
            if (data.length > 0) {
                data.forEach(release => {
                    const releaseElement = document.createElement('div');
                    releaseElement.classList.add('release');
                    releaseElement.innerHTML = `
                        <h3>${release.name}</h3>
                        <p>${release.body}</p>
                        <a href="${release.html_url}" target="_blank">Download</a>
                    `;
                    releasesDiv.appendChild(releaseElement);
                });
            } else {
                releasesDiv.innerHTML = '<p>No releases found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching releases:', error);
            document.getElementById('releases').innerHTML = '<p>Error fetching releases.</p>';
        });
});
