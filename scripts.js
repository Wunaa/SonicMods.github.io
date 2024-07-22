// Boot screen fade out
window.addEventListener('load', () => {
    const bootScreen = document.querySelector('.boot-screen');
    setTimeout(() => {
        bootScreen.style.opacity = 0;
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 1000);
    }, 2000);
});

// Real-time Clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock(); // Initial call to set the clock immediately

// Window functionality
const windows = document.querySelectorAll('.window');
const taskbarItems = document.querySelectorAll('.taskbar-item');
const startButton = document.getElementById('start-button');
const startMenuContent = document.getElementById('start-menu-content');
const desktopIcons = document.querySelectorAll('.icon-button');

// Open/Close Windows
taskbarItems.forEach(item => {
    item.addEventListener('click', () => {
        const windowId = item.getAttribute('data-window');
        toggleWindow(windowId);
    });
});

desktopIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const windowId = icon.getAttribute('data-window');
        toggleWindow(windowId);
    });
});

function toggleWindow(id) {
    const window = document.getElementById(id);
    if (window.style.display === 'block') {
        closeWindow(id);
    } else {
        openWindow(id);
    }
}

function openWindow(id) {
    const window = document.getElementById(id);
    window.style.display = 'block';
    window.classList.add('open');
}

function closeWindow(id) {
    const window = document.getElementById(id);
    window.classList.remove('open');
    setTimeout(() => {
        window.style.display = 'none';
    }, 300);
}

// Start Menu
startButton.addEventListener('click', () => {
    startMenuContent.style.display = startMenuContent.style.display === 'block' ? 'none' : 'block';
});

// Draggable Windows
let currentDrag = null;

windows.forEach(window => {
    window.addEventListener('mousedown', (e) => {
        currentDrag = window;
        const shiftX = e.clientX - window.getBoundingClientRect().left;
        const shiftY = e.clientY - window.getBoundingClientRect().top;

        function onMouseMove(e) {
            const newX = e.clientX - shiftX;
            const newY = e.clientY - shiftY;
            currentDrag.style.left = `${Math.max(0, Math.min(window.innerWidth - currentDrag.clientWidth, newX))}px`;
            currentDrag.style.top = `${Math.max(0, Math.min(window.innerHeight - currentDrag.clientHeight, newY))}px`;
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});
