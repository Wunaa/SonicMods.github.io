// Function to open a window
function openWindow(id) {
    document.getElementById(id).style.display = 'block';
}

// Function to close a window
function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

// Add event listeners to taskbar items
document.querySelectorAll('.taskbar-item').forEach(item => {
    item.addEventListener('click', function() {
        const windowId = this.getAttribute('data-window');
        openWindow(windowId);
    });
});
