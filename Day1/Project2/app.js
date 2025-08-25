var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var paddleWidth = 100;
var paddleHeight = 10;
var paddleX = canvas.width / 2 - paddleWidth / 2;
var paddleSpeed = 7;
var paddleDX = 0;
var ballRadius = 10;
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballDX = 4;
var ballDY = -4;
var score = 0;
// Draw paddle
function drawPaddle() {
    ctx.fillStyle = "blue";
    ctx.fillRect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
}
// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    document.getElementById("score").textContent = score.toString();
}
// Move paddle
function movePaddle() {
    paddleX += paddleDX;
    if (paddleX < 0)
        paddleX = 0;
    if (paddleX + paddleWidth > canvas.width)
        paddleX = canvas.width - paddleWidth;
}
// Move ball
function moveBall() {
    ballX += ballDX;
    ballY += ballDY;
    // Wall collisions
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0)
        ballDX *= -1;
    if (ballY - ballRadius < 0)
        ballDY *= -1;
    // Paddle collision
    if (ballY + ballRadius > canvas.height - paddleHeight - 10 &&
        ballX > paddleX &&
        ballX < paddleX + paddleWidth) {
        ballDY *= -1;
        score++;
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
    ballDX = 4;
    ballDY = -4;
    score = 0;
}
// Key handlers
function keyDown(e) {
    if (e.key === "ArrowRight")
        paddleDX = paddleSpeed;
    else if (e.key === "ArrowLeft")
        paddleDX = -paddleSpeed;
}
function keyUp(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft")
        paddleDX = 0;
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
