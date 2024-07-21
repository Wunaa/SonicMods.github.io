// Function to open a window
function openWindow(id) {
    document.getElementById(id).style.display = 'block';
}

// Function to close a window
function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

// Add event listeners to taskbar items
document.querySelector('.taskbar-items').addEventListener('click', function(e) {
    if (e.target.classList.contains('taskbar-item')) {
        let windowId = e.target.textContent.toLowerCase().replace(' ', '-') + '-window';
        openWindow(windowId);
    }
});
