let highestZ = 1;

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
