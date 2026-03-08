const papers = document.querySelectorAll('.paper');
let highestZ = 1;

papers.forEach((paper) => {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  // posição inicial aleatória leve
  let currentX = 0;
  let currentY = 0;
  let rotation = Math.random() * 20 - 10;

  paper.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;

  function startDrag(clientX, clientY) {
    isDragging = true;
    paper.style.zIndex = highestZ++;
    offsetX = clientX - paper.getBoundingClientRect().left;
    offsetY = clientY - paper.getBoundingClientRect().top;
  }

  function moveDrag(clientX, clientY) {
    if (!isDragging) return;

    const x = clientX - offsetX;
    const y = clientY - offsetY;

    paper.style.left = `${x}px`;
    paper.style.top = `${y}px`;
    paper.style.transform = `rotate(${rotation}deg)`;
  }

  function endDrag() {
    isDragging = false;
  }

  // Mouse
  paper.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  });

  document.addEventListener('mousemove', (e) => {
    moveDrag(e.clientX, e.clientY);
  });

  document.addEventListener('mouseup', endDrag);

  // Touch
  paper.addEventListener(
    'touchstart',
    (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
    },
    { passive: false }
  );

  document.addEventListener(
    'touchmove',
    (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      moveDrag(touch.clientX, touch.clientY);
    },
    { passive: false }
  );

  document.addEventListener('touchend', endDrag);
  document.addEventListener('touchcancel', endDrag);
});let highestZ = 1;

class Paper {
  holdingPaper = false;
  prevX = 0;
  prevY = 0;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;
  touchStartX = 0;
  touchStartY = 0;
  currentRotation = Math.random() * 30 - 15;

  init(paper) {
    paper.style.transform = `translate(0px, 0px) rotate(${this.currentRotation}deg)`;

    paper.addEventListener("pointerdown", (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.prevX = e.clientX;
      this.prevY = e.clientY;

      if (e.pointerType === "touch") {
        paper.setPointerCapture(e.pointerId);
      }
    });

    paper.addEventListener("pointermove", (e) => {
      if (!this.holdingPaper) return;

      const deltaX = e.clientX - this.prevX;
      const deltaY = e.clientY - this.prevY;

      this.currentPaperX += deltaX;
      this.currentPaperY += deltaY;

      this.prevX = e.clientX;
      this.prevY = e.clientY;

      paper.style.transform =
        `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.currentRotation}deg)`;
    });

    const stopHolding = () => {
      this.holdingPaper = false;
    };

    paper.addEventListener("pointerup", stopHolding);
    paper.addEventListener("pointercancel", stopHolding);
  }
}

const papers = document.querySelectorAll(".paper");

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

