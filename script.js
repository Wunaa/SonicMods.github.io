function dragWindow(e, windowId) {
  const win = document.getElementById(windowId);
  let offsetX = e.clientX - win.offsetLeft;
  let offsetY = e.clientY - win.offsetTop;

  function move(e) {
    win.style.left = `${e.clientX - offsetX}px`;
    win.style.top = `${e.clientY - offsetY}px`;
  }

  function stop() {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", stop);
  }

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", stop);
}
