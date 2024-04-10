//board
let board;
let boardWidth = window.innerWidth;
let boardHeight = window.innerHeight;
let context;

//Freddy
let freddyWidth = 100;
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

//Plum Freddy
let freddyPWidth = 100;
let freddyPHeight = 150;
let freddyPX = boardWidth/1.1;
let freddyPY = boardHeight/2
let freddyPImg;

let freddyP = {
    x : freddyPX,
    y : freddyPY,
    width : freddyPWidth,
    height : freddyPHeight
}

//Pizzas
let randomNumber = parseInt(Math.round(Math.random() * 2) + Math.random() + 1);
let pizzaArray = ["/photos/pepPizza.png"]
let pizzaHeight = 70;
let pizzaWidth = 70;
let pizzaX = boardWidth/randomNumber;
let pizzaY = boardHeight/randomNumber;
let pizzaImg;

let pizza = {
    x : pizzaX,
    y : pizzaY,
    width : pizzaWidth,
    height : pizzaHeight
}

//physics
let velocityX = 0; 
let velocityY = 0;
let velocityXP = 0;
let velocityYP = 0;
let gameOver = false;
let score = 0;

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //Drawing on the canvas

    //load the images
    //Freddy
    freddyImg = new Image();
    freddyImg.src = "/photos/freddy.png";
    freddyImg.onload = function(){
        context.drawImage(freddyImg, freddy.x, freddy.y, freddy.width, freddy.height);

    }

    //Freddy P
    freddyPImg = new Image();
    freddyPImg.src = "/photos/freddyPurple.png";
    freddyPImg.onload = function(){
        context.drawImage(freddyPImg, freddyP.x, freddyP.y, freddyP.width, freddyP.height);

    }

    //Pizzas
    pizzaImg = new Image();
    pizzaImg.src = "/photos/pepPizza.png";
    pizzaImg.onload = function(){
        context.drawImage(pizzaImg, pizza.x, pizza.y, pizza.width, pizza.height);

    }


    function stopMoving() {
            velocityY = 0;
            velocityX = 0;
            velocityYP = 0;
            velocityXP = 0;
    }
    requestAnimationFrame(update);
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', stopMoving);

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
    freddy.y = Math.min(freddy.y + velocityY, 890)
    freddy.x += velocityX;
    freddy.x = Math.max(freddy.x + velocityX, 0);
    freddy.x = Math.min(freddy.x + velocityX, 1860);
    context.drawImage(freddyImg, freddy.x, freddy.y, freddy.width, freddy.height);

    //Freddy P
    freddyP.y += velocityYP;
    freddyP.y = Math.max(freddyP.y + velocityYP, 0);
    freddyP.y = Math.min(freddyP.y + velocityYP, 890)
    freddyP.x += velocityXP;
    freddyP.x = Math.max(freddyP.x + velocityXP, 0);
    freddyP.x = Math.min(freddyP.x + velocityXP, 1860);
    context.drawImage(freddyPImg, freddyP.x, freddyP.y, freddyP.width, freddyP.height);

    // Draw pizza only if not collided
    if (!detectCollision(freddy, pizza)) {
        context.drawImage(pizzaImg, pizza.x, pizza.y, pizza.width, pizza.height);
    } else {
        // Increment score and regenerate pizza
        score += 1;
        pizza.x = Math.random() * (boardWidth - pizzaWidth);
        pizza.y = Math.random() * (boardHeight - pizzaHeight);
    }

    // Draw score
    context.font = "70px Arial";
    context.fillStyle = "red";
    context.fillText(score, 40, 80);
}



if (gameOver) {
    context.fillText("GAME OVER", 700, 400);
    context.fillText("Press W to restart", 630, 500);
}

//Character movement
function keyPressed(event) {
    switch (event.key) {
        case "w":
            //Move upwards
            velocityY = -2;

            //reset game
            if (gameOver) {
                freddy.y = freddyY;
                score = 0;
                gameOver = false;
            }
            break;
        
        case "s":
            //Move downwards
            velocityY = 2;
            break;

        case "a":
            velocityX = -2;
            break;

        case "d":
            velocityX = 2;
            break;
        
        case "ArrowUp":
            velocityYP = -1;
            break;

        case "ArrowDown":
            velocityYP = 1;
            break;

        case "ArrowLeft":
            velocityXP = -1;
            break;

        case "ArrowRight":
            velocityXP = 1;
            break;
        
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
} 