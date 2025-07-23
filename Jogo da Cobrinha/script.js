// Seletores
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let scoreDisplay = document.getElementById("score");
let gameOverScreen = document.getElementById("gameOver");
let finalScoreDisplay = document.getElementById("finalScore");

let box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "right";
let food = generateFood();
let score = 0;
let game;

// Eventos
document.addEventListener("keydown", updateDirection);

// Reinicia o jogo
function restartGame() {
  snake = [{ x: 10 * box, y: 10 * box }];
  direction = "right";
  food = generateFood();
  score = 0;
  scoreDisplay.textContent = score;
  gameOverScreen.classList.add("hidden");
  game = setInterval(drawGame, 100);
}

// Atualiza direção
function updateDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (event.key === "ArrowUp" && direction !== "down") direction = "up";
  if (event.key === "ArrowRight" && direction !== "left") direction = "right";
  if (event.key === "ArrowDown" && direction !== "up") direction = "down";
}

// Gera comida em posição aleatória
function generateFood() {
  return {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
}

// Desenha o jogo
function drawGame() {
  // Fundo
  context.fillStyle = "#111";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Cobra
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = i === 0 ? "#00ff88" : "#66ffcc";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Comida
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);

  // Movimento
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "right") headX += box;
  if (direction === "left") headX -= box;
  if (direction === "up") headY -= box;
  if (direction === "down") headY += box;

  // Verifica colisão com parede ou corpo
  if (
    headX < 0 || headY < 0 ||
    headX >= canvas.width || headY >= canvas.height ||
    checkCollision(headX, headY)
  ) {
    clearInterval(game);
    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove("hidden");
    return;
  }

  // Come a comida
  if (headX === food.x && headY === food.y) {
    score++;
    scoreDisplay.textContent = score;
    food = generateFood();
  } else {
    snake.pop();
  }

  snake.unshift({ x: headX, y: headY });
}

// Colisão com o corpo
function checkCollision(x, y) {
  return snake.some(segment => segment.x === x && segment.y === y);
}

// Inicia o jogo
game = setInterval(drawGame, 100);
