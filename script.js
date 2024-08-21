function showPage(pageId) {
    // Hide all sections
    const sections = document.querySelectorAll('.page');
    sections.forEach(section => section.style.display = 'none');

    // Show the selected section
    document.getElementById(pageId).style.display = 'block';
}

// Show the home page by default
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});
