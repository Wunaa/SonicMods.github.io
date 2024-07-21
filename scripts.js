// Function to open a window
function openWindow(id) {
    document.getElementById(id).style.display = 'block';
}

// Function to close a window
function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

// Toggle Start menu visibility
document.getElementById('start-button').addEventListener('click', function() {
    const menu = document.getElementById('start-menu-content');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

// Add event listeners to taskbar items
document.querySelectorAll('.taskbar-item').forEach(item => {
    item.addEventListener('click', function() {
        const windowId = this.getAttribute('data-window');
        openWindow(windowId);
    });
});

// Make windows draggable
document.querySelectorAll('.window').forEach(windowElement => {
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    windowElement.querySelector('.window-titlebar').addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = windowElement.offsetLeft;
        startTop = windowElement.offsetTop;
        e.preventDefault(); // Prevent text selection during drag
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            windowElement.style.left = Math.min(window.innerWidth - windowElement.offsetWidth, Math.max(0, startLeft + dx)) + 'px';
            windowElement.style.top = Math.min(window.innerHeight - windowElement.offsetHeight, Math.max(0, startTop + dy)) + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});
