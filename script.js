const papers = document.querySelectorAll(".paper");
let highestZ = 1;

papers.forEach((paper) => {
  if (paper.classList.contains("heart")) return;

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  // rotação inicial aleatória
  const rotation = Math.random() * 20 - 10;
  paper.dataset.rotation = rotation;
  paper.style.transform = `rotate(${rotation}deg)`;

  function startDrag(clientX, clientY) {
    const rect = paper.getBoundingClientRect();

    isDragging = true;
    paper.style.zIndex = highestZ++;

    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
  }

  function moveDrag(clientX, clientY) {
    if (!isDragging) return;

    const x = clientX - offsetX;
    const y = clientY - offsetY;

    paper.style.left = `${x}px`;
    paper.style.top = `${y}px`;
    paper.style.transform = `rotate(${paper.dataset.rotation}deg)`;
  }

  function endDrag() {
    isDragging = false;
  }

  // Mouse
  paper.addEventListener("mousedown", (e) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  });

  document.addEventListener("mousemove", (e) => {
    moveDrag(e.clientX, e.clientY);
  });

  document.addEventListener("mouseup", endDrag);

  // Touch
  paper.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
    },
    { passive: false }
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      moveDrag(touch.clientX, touch.clientY);
    },
    { passive: false }
  );

  document.addEventListener("touchend", endDrag);
  document.addEventListener("touchcancel", endDrag);
});
