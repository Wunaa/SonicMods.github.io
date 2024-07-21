// Function to open a window with animation
function openWindow(id) {
    const windowElement = document.getElementById(id);
    windowElement.style.display = 'block';
    setTimeout(() => {
        windowElement.classList.add('open');
    }, 10);
}

// Function to close a window with animation
function closeWindow(id) {
    const windowElement = document.getElementById(id);
    windowElement.classList.remove('open');
    setTimeout(() => {
        windowElement.style.display = 'none';
    }, 300);
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
        const windowElement = document.getElementById(windowId);
        if (windowElement.style.display === 'none' || windowElement.style.display === '') {
            openWindow(windowId);
        } else {
            closeWindow(windowId);
        }
    });
});

// Draggable windows functionality
document.querySelectorAll('.window').forEach(windowElement => {
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    windowElement.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = parseInt(windowElement.style.left, 10) || 0;
        startTop = parseInt(windowElement.style.top, 10) || 0;
        e.preventDefault(); // Prevent text selection during drag
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const newLeft = startLeft + (e.clientX - startX);
            const newTop = startTop + (e.clientY - startY);
            const windowWidth = windowElement.offsetWidth;
            const windowHeight = windowElement.offsetHeight;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Constrain window within viewport
            windowElement.style.left = `${Math.min(Math.max(newLeft, 0), viewportWidth - windowWidth)}px`;
            windowElement.style.top = `${Math.min(Math.max(newTop, 0), viewportHeight - windowHeight)}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});
