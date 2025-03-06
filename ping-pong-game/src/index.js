const rod1 = document.getElementById("rod1");
const rod2 = document.getElementById("rod2");
const ball = document.querySelector(".ball");
const gameContainer = document.querySelector(".gameContainer");

let rodSpeed = 20;
let ballSpeedX = 2;
let ballSpeedY = 2;
let ballMoving = false;
let ballDirectionY = 1;
let ballDirectionX = 1;
let playerName = "Player";
let score = 0;
let maxScore = localStorage.getItem("maxScore") || 0;
let maxPlayer = localStorage.getItem("maxPlayer") || "No one";

alert(`Highest Score: ${maxScore} by ${maxPlayer}`);

document.addEventListener("keydown", function (event) {
    let rodRect = rod1.getBoundingClientRect();

    if (event.key === "ArrowLeft" && rodRect.left > 0) {
        rod1.style.left = rod1.offsetLeft - rodSpeed + "px";
        rod2.style.left = rod2.offsetLeft - rodSpeed + "px";
    }
    if (event.key === "ArrowRight" && rodRect.right < window.innerWidth) {
        rod1.style.left = rod1.offsetLeft + rodSpeed + "px";
        rod2.style.left = rod2.offsetLeft + rodSpeed + "px";
    }
    if (event.key === "Enter" && !ballMoving) {
        ballMoving = true;
        moveBall();
    }
});

function moveBall() {
    let ballInterval = setInterval(() => {
        let ballRect = ball.getBoundingClientRect();
        let rod1Rect = rod1.getBoundingClientRect();
        let rod2Rect = rod2.getBoundingClientRect();

        if (ballRect.left <= 0 || ballRect.right >= window.innerWidth) {
            ballDirectionX *= -1;
        }

        if (ballRect.top <= rod1Rect.bottom && ballRect.left >= rod1Rect.left && ballRect.right <= rod1Rect.right) {
            ballDirectionY = 1;
            score++;
        }
        if (ballRect.bottom >= rod2Rect.top && ballRect.left >= rod2Rect.left && ballRect.right <= rod2Rect.right) {
            ballDirectionY = -1;
            score++;
        }

        if (ballRect.top <= 0 || ballRect.bottom >= window.innerHeight) {
            clearInterval(ballInterval);
            ballMoving = false;
            alert(`${playerName} lost! Score: ${score}`);
            if (score > maxScore) {
                maxScore = score;
                maxPlayer = playerName;
                localStorage.setItem("maxScore", maxScore);
                localStorage.setItem("maxPlayer", maxPlayer);
                alert("New High Score!");
            }
            resetGame();
        }

        ball.style.left = ball.offsetLeft + ballSpeedX * ballDirectionX + "px";
        ball.style.top = ball.offsetTop + ballSpeedY * ballDirectionY + "px";
    }, 10);
}

function resetGame() {
    ball.style.left = "50%";
    ball.style.top = "50%";
    rod1.style.left = "50%";
    rod2.style.left = "50%";
    score = 0;
}
