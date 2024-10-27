window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.fade-in, .slide-up');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        el.classList.add('visible');
    });
});
