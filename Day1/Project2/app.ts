const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const paddleWidth = 100;
const paddleHeight = 10;
let paddleX = canvas.width / 2 - paddleWidth / 2;
const paddleSpeed = 8;  // slightly faster paddle
let paddleDX = 0;

const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = 5; // initial speed
let ballDY = -5;

let score = 0;

// Draw paddle with glow
function drawPaddle() {
    ctx.fillStyle = "#00ffff";
    ctx.shadowColor = "#00ffff";
    ctx.shadowBlur = 15;
    ctx.fillRect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
    ctx.shadowBlur = 0;
}

// Draw ball with glow
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.shadowColor = "red";
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0;
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    document.getElementById("score")!.textContent = score.toString();
}

// Move paddle
function movePaddle() {
    paddleX += paddleDX;
    if (paddleX < 0) paddleX = 0;
    if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;
}

// Move ball
function moveBall() {
    ballX += ballDX;
    ballY += ballDY;

    // Wall collisions
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) ballDX *= -1;
    if (ballY - ballRadius < 0) ballDY *= -1;

    // Paddle collision
    if (
        ballY + ballRadius > canvas.height - paddleHeight - 10 &&
        ballX > paddleX &&
        ballX < paddleX + paddleWidth
    ) {
        ballDY *= -1;
        score++;

        // Gradually increase speed every 3 points
        if (score % 3 === 0) {
            ballDX *= 1.1;
            ballDY *= 1.1;
        }
    }

    // Bottom collision - Game Over
    if (ballY + ballRadius > canvas.height) {
        alert("Game Over! Your score: " + score);
        resetGame();
    }
}

// Reset game
function resetGame() {
    paddleX = canvas.width / 2 - paddleWidth / 2;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballDX = 5;
    ballDY = -5;
    score = 0;
}

// Key handlers
function keyDown(e: KeyboardEvent) {
    if (e.key === "ArrowRight") paddleDX = paddleSpeed;
    else if (e.key === "ArrowLeft") paddleDX = -paddleSpeed;
}

function keyUp(e: KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") paddleDX = 0;
}

// Game loop
function update() {
    movePaddle();
    moveBall();
    draw();
    requestAnimationFrame(update);
}

// Event listeners
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Start game
update();
