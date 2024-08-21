document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});

function showPage(pageId) {
    // Play click sound
    document.getElementById('click-sound').play();

    // Hide all sections with animation
    const sections = document.querySelectorAll('.page');
    sections.forEach(section => {
        section.classList.remove('show');
        setTimeout(() => {
            section.style.display = 'none';
        }, 500); // Match the transition duration
    });

    // Show the selected section with animation
    const page = document.getElementById(pageId);
    page.style.display = 'block';
    setTimeout(() => {
        page.classList.add('show');
    }, 10); // Delay to allow display to be applied
}
