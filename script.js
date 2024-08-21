document.getElementById('start-button').addEventListener('click', function() {
    const startMenu = document.getElementById('start-menu');
    startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
});

// Function to make windows draggable
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

// Example of creating a new window
function openWindow(title) {
    const newWindow = document.createElement('div');
    newWindow.classList.add('window');
    newWindow.innerHTML = `<div class="window-title">${title}</div>`;
    document.getElementById('windows').appendChild(newWindow);
    makeDraggable(newWindow);
}

// Add more JavaScript to handle additional features
