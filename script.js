// Toggle Start Menu visibility
document.getElementById('start-button').addEventListener('click', function() {
    const startMenu = document.getElementById('start-menu');
    startMenu.classList.toggle('hidden');
});

// Make windows draggable
function makeDraggable(el) {
    el.onmousedown = function(e) {
        let shiftX = e.clientX - el.getBoundingClientRect().left;
        let shiftY = e.clientY - el.getBoundingClientRect().top;

        document.onmousemove = function(e) {
            el.style.left = e.pageX - shiftX + 'px';
            el.style.top = e.pageY - shiftY + 'px';
        };

        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}

// Create a new window
function openWindow(title, content) {
    const newWindow = document.createElement('div');
    newWindow.classList.add('window');
    newWindow.innerHTML = `
        <div class="title-bar">
            <span>${title}</span>
            <div class="title-bar-buttons">
                <div class="button minimize">_</div>
                <div class="button close">X</div>
            </div>
        </div>
        <div class="window-content">
            ${content}
        </div>
    `;
    document.getElementById('windows').appendChild(newWindow);
    makeDraggable(newWindow);

    // Close button functionality
    newWindow.querySelector('.close').addEventListener('click', () => {
        newWindow.remove();
    });
}

// Example usage: open a window when a desktop icon is clicked
document.querySelector('.desktop-icon').addEventListener('click', function() {
    openWindow('My Computer', '<p>This is my computer content.</p>');
});
