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
