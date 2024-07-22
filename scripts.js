// Handle start menu toggle
document.getElementById('start-button').addEventListener('click', () => {
    const startMenuContent = document.getElementById('start-menu-content');
    startMenuContent.style.display = startMenuContent.style.display === 'block' ? 'none' : 'block';
});

// Open and close windows
document.querySelectorAll('.taskbar-item').forEach(item => {
    item.addEventListener('click', () => {
        const windowId = item.getAttribute('data-window');
        const windowElement = document.getElementById(windowId);
        windowElement.style.display = 'block';
        windowElement.classList.add('open');
    });
});

function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.classList.remove('open');
    setTimeout(() => {
        windowElement.style.display = 'none';
    }, 300); // Match this with CSS transition duration
}

// Drag and drop functionality for desktop icons
document.querySelectorAll('.desktop-icon').forEach(icon => {
    icon.addEventListener('mousedown', function(e) {
        let offsetX = e.clientX - icon.getBoundingClientRect().left;
        let offsetY = e.clientY - icon.getBoundingClientRect().top;

        function onMouseMove(e) {
            icon.style.left = `${Math.max(0, e.clientX - offsetX)}px`;
            icon.style.top = `${Math.max(0, e.clientY - offsetY)}px`;
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});

// Set initial positions for icons (can be adjusted)
document.querySelectorAll('.desktop-icon').forEach((icon, index) => {
    icon.style.left = `${(index % 4) * 100 + 10}px`;
    icon.style.top = `${Math.floor(index / 4) * 120 + 10}px`;
});
