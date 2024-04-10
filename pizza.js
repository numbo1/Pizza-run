//board
let board;
let boardWidth = window.innerWidth;
let boardHeight = window.innerHeight;
let context;

//Freddy
let freddyWidth = 60;
let freddyHeight = 150;
let freddyX = boardWidth/9;
let freddyY = boardHeight/2
let freddyImg;

let freddy = {
    x : freddyX,
    y : freddyY,
    width : freddyWidth,
    height : freddyHeight

}

//physics
let velocityX = 0; 
let velocityY = 0;
let gameOver = false;
let score = 0;



window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //Drawing on the canvas

    //load the images
freddyImg = new Image();
freddyImg.src = "/photos/temporary_freddy.png";
freddyImg.onload = function(){
    context.drawImage(freddyImg, freddy.x, freddy.y, freddy.width, freddy.height);

}

document.addEventListener("keydown", moveFreddy);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //Freddy
    freddy.y += velocityY;
    freddy.y = Math.max(freddy.y + velocityY, 0);
    context.drawImage(austronautImg, austronaut.x, austronaut.y, austronaut.width, austronaut.height);

    if (freddy.y > board.height) {
        gameOver = true;
}
}

//score
context.fillStyle = "white";
context.font = "80px sans-serif"
context.fillText(score, 20, 80);

if (gameOver) {
    context.fillText("GAME OVER", 700, 400);
    context.fillText("Press W to restart", 630, 500);
}

//Character movement
function moveFreddy(e) {
    switch (e.key) {
        case "w":
            //Move upwards
            velocityY = -3;

            //reset game
            if (gameOver) {
                freddy.y = freddyY;
                score = 0;
                gameOver = false;
            }
            break;
        
        case "s":
            //Move downwards
            velocityY = 3;
            break;

        case "d":
            velocityX = -3;
            break;

        case "a":
            velocityX = 3;
            break;
    }
}