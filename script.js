const hit = document.querySelector("#hit");
const time = document.querySelector("#time");
const score = document.querySelector("#score");
const bubblesDiv = document.querySelector("#bubbles");

let timer = 60;
let currentScore = 0;
let hitNumber;

// ---------- Generate Bubbles ----------
function generateBubbles() {
  let clutter = "";
  let totalBubbles;

  // Responsive bubble count
  if (window.innerWidth <= 400) {
    totalBubbles = 25;
  } else if (window.innerWidth <= 600) {
    totalBubbles = 45;
  } else if (window.innerWidth <= 992) {
    totalBubbles = 63;
  } else {
    totalBubbles = 72;
  }

  for (let i = 0; i < totalBubbles; i++) {
    const randomNum = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble">${randomNum}</div>`;
  }

  bubblesDiv.innerHTML = clutter;
}

// ---------- Set Hit Number ----------
function getNewHit() {
  hitNumber = Math.floor(Math.random() * 10);
  hit.textContent = hitNumber;
}

// ---------- Increase Score ----------
function increaseScore() {
  currentScore += 1;
  score.textContent = currentScore;
}

// ---------- Countdown Timer ----------
function startTimer() {
  const countdown = setInterval(() => {
    if (timer > 0) {
      timer--;
      time.textContent = timer;
    } else {
      clearInterval(countdown);
      bubblesDiv.innerHTML = `<h2 style="color:chocolate; font-size:2rem;">Game Over!<br>Your Score: ${currentScore}</h2>`;
    }
  }, 1000);
}

// ---------- Bubble Click Logic ----------
bubblesDiv.addEventListener("click", (e) => {
  const clickedNum = Number(e.target.textContent);

  if (!isNaN(clickedNum)) {
    if (clickedNum === hitNumber) {
      increaseScore();
      generateBubbles();
      getNewHit();
    }
  }
});

// ---------- Initialize Game ----------
function startGame() {
  generateBubbles();
  getNewHit();
  startTimer();
}

startGame();

// ---------- Optional: Regenerate bubbles on resize ----------
window.addEventListener("resize", () => {
  generateBubbles();
});
