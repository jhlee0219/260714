const balls = document.querySelector("#balls");
const bonusArea = document.querySelector("#bonus-area");
const bonusBall = document.querySelector("#bonus");
const drawButton = document.querySelector("#draw-button");

function colorFor(number) {
  if (number <= 10) return "yellow";
  if (number <= 20) return "blue";
  if (number <= 30) return "red";
  if (number <= 40) return "gray";
  return "green";
}

function pickNumbers() {
  const pool = Array.from({ length: 45 }, (_, index) => index + 1);
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return { winning: pool.slice(0, 6).sort((a, b) => a - b), bonus: pool[6] };
}

const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

async function draw() {
  drawButton.disabled = true;
  drawButton.innerHTML = '<span class="button-light"></span><b>LOADING...</b><small>번호를 섞는 중</small>';
  balls.replaceChildren();
  bonusArea.hidden = true;

  const result = pickNumbers();
  for (const [index, number] of result.winning.entries()) {
    const ball = document.createElement("span");
    ball.className = `ball ${colorFor(number)}`;
    ball.textContent = number;
    ball.style.animationDelay = `${index * 35}ms`;
    balls.append(ball);
    await delay(170);
  }

  bonusBall.textContent = result.bonus;
  bonusArea.hidden = false;
  drawButton.disabled = false;
  drawButton.innerHTML = '<span class="button-light"></span><b>REPLAY</b><small>다시 추첨하기</small>';
}

drawButton.addEventListener("click", draw);
