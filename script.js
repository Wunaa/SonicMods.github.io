document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});

function showPage(pageId) {
    // Play click sound
    document.getElementById('click-sound').play();

    // Get the current page and the new page
    const currentPage = document.querySelector('.page.show');
    const newPage = document.getElementById(pageId);

    if (currentPage) {
        // Hide the current page with animation
        currentPage.classList.remove('show');
        setTimeout(() => {
            currentPage.style.display = 'none';
        }, 500); // Match the duration of the fade-out transition
    }

    // Show the new page
    newPage.style.display = 'block';
    setTimeout(() => {
        newPage.classList.add('show');
    }, 10); // Short delay to ensure display is applied before animation starts
}
