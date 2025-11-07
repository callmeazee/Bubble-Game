const hit = document.querySelector("#hit");
const time = document.querySelector("#time");
const score = document.querySelector("#score");
const bubblesDiv = document.querySelector("#bubbles");
const playBtn = document.querySelector("#play-btn");

let timer = 60;
let currentScore = 0;
let hitNumber;
let countdown; // store the timer interval

// ---------- Generate Bubbles ----------
function generateBubbles() {
  let clutter = "";
  let totalBubbles;

  if (window.innerWidth <= 400) totalBubbles = 25;
  else if (window.innerWidth <= 600) totalBubbles = 45;
  else if (window.innerWidth <= 992) totalBubbles = 63;
  else totalBubbles = 72;

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
  currentScore++;
  score.textContent = currentScore;
}

// ---------- Countdown Timer ----------
function startTimer() {
  countdown = setInterval(() => {
    if (timer > 0) {
      timer--;
      time.textContent = timer;
    } else {
      clearInterval(countdown);
      endGame();
    }
  }, 1000);
}

// ---------- End Game ----------
function endGame() {
  bubblesDiv.innerHTML = `
    <h2 style="color:chocolate; font-size:2rem;">Game Over!<br>Your Score: ${currentScore}</h2>
    <button id="play-btn" class="play-btn">🔁 Play Again</button>
  `;

  // Reconnect play button for replay
  document.querySelector("#play-btn").addEventListener("click", startGame);
}

// ---------- Handle Bubble Clicks ----------
bubblesDiv.addEventListener("click", (e) => {
  const clickedNum = Number(e.target.textContent);
  if (!isNaN(clickedNum) && clickedNum === hitNumber) {
    increaseScore();
    generateBubbles();
    getNewHit();
  }
});

// ---------- Start Game ----------
function startGame() {
  timer = 60;
  currentScore = 0;
  score.textContent = currentScore;
  time.textContent = timer;

  generateBubbles();
  getNewHit();
  clearInterval(countdown);
  startTimer();
}

// ---------- Start Only When Button Clicked ----------
playBtn.addEventListener("click", () => {
  startGame();
});
