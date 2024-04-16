//board
let board;
let boardWidth = window.innerWidth;
let boardHeight = window.innerHeight;
let context;

//sound
let bgMusic = new Audio('/music/music.mp3');

//Walls

//left wall
let leftWallImg;
let leftWall = {
    x : 0,
    y : 0,
    width : 100,
    height : 500
}


//Freddy
let freddyWidth = 80;
let freddyHeight = 120;
let freddyX = boardWidth/18;
let freddyY = boardHeight/2
let freddyImg;

let freddy = {
    x : freddyX,
    y : freddyY,
    width : freddyWidth,
    height : freddyHeight

}

//Plum Freddy
let freddyPWidth = 80;
let freddyPHeight = 120;
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
let randomNumber = Math.floor(Math.random() * 100)
let pizzaArray = ["/photos/pizza1.png", "/photos/pizza2.png", "/photos/pizza3.png"]; 
let pizzaHeight = 60;
let pizzaWidth = 60;
let pizzaX = Math.floor(Math.random() * boardWidth);
let pizzaY = Math.floor(Math.random() * boardHeight);
let pizzaImg;

let pizza = {
    x : pizzaX,
    y : pizzaY,
    width : pizzaWidth,
    height : pizzaHeight
}
//Pizza 1
let pizza1Array = ["/photos/pizza4.png", "/photos/pizza5.png", "/photos/pizza6.png"]
let pizza1X = Math.floor(Math.random() * boardWidth);
let pizza1Y = Math.floor(Math.random() * boardHeight);
let pizza1 = {
    x : pizza1X,
    y : pizza1Y,
    width : 40,
    height : 40
}
let pizza1Img;

// Pizza 2
let pizza2Array = ["/photos/pizza7.png"]
let pizza2X = Math.floor(Math.random() * boardWidth);
let pizza2Y = Math.floor(Math.random() * boardHeight);
let pizza2 = {
    x : pizza2X,
    y : pizza2Y,
    width : pizzaWidth,
    height : pizzaHeight
}
let pizza2Img;

function randomPizza() {
    let randomPizzaIndex = Math.floor(Math.random() * pizzaArray.length);
    let randomPizzaUrl = pizzaArray[randomPizzaIndex];
    return randomPizzaUrl;
}
function randomPizza1() {
    let randomPizzaIndex = Math.floor(Math.random() * pizza1Array.length);
    let randomPizzaUrl = pizza1Array[randomPizzaIndex];
    return randomPizzaUrl;
}
function randomPizza2() {
    let randomPizzaIndex = Math.floor(Math.random() * pizza2Array.length);
    let randomPizzaUrl = pizza2Array[randomPizzaIndex];
    return randomPizzaUrl;
}


//physics
let velocityX = 0; 
let velocityY = 0;
let velocityXP = 0;
let velocityYP = 0;
let gameOver = false;
let win = false;
let score = 0;

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //Drawing on the canvas
    bgMusic.play()
    //load the images
    //Walls
    //left wall
    leftWallImg = new Image();
    leftWallImg.src = "/photos/5x1_xxl_wall.png";
    leftWallImg.onload = function(){
        context.drawImage(leftWallImg, leftWall.x, leftWall.y, leftWall.width, leftWall.height);

    }

    //Freddy
    freddyImg = new Image();
    freddyImg.src = "/photos/freddy.png";
    freddyImg.onload = function(){
        context.drawImage(freddyImg, freddy.x, freddy.y, freddy.width, freddy.height);

    }

    //Freddy P
    freddyPImg = new Image();
    freddyPImg.src = "/photos/freddyP.png";
    freddyPImg.onload = function(){
        context.drawImage(freddyPImg, freddyP.x, freddyP.y, freddyP.width, freddyP.height);

    }

    //Pizzas
    function pizzaSpawn() {
        pizzaImg = new Image();
        pizzaImg.src = randomPizza();
        requestAnimationFrame(update);
        pizzaImg.onload = function(){
            context.drawImage(pizzaImg, pizza.x, pizza.y, pizza.width, pizza.height);
        }
    }
    function pizza1Spawn() {
        pizza1Img = new Image();
        pizza1Img.src = randomPizza1();
        requestAnimationFrame(update);
        pizza1Img.onload = function(){
            context.drawImage(pizza1Img, pizza1.x, pizza1.y, pizza1.width, pizza1.height);
        }
    }
    function pizza2Spawn() {
        pizza2Img = new Image();
        pizza2Img.src = randomPizza2();
        requestAnimationFrame(update);
        pizza2Img.onload = function(){
            context.drawImage(pizza2Img, pizza2.x, pizza2.y, pizza2.width, pizza2.height);
        }
    }
    pizzaSpawn()
    pizza1Spawn()
    pizza2Spawn()


    // function stopMoving() {
    //         velocityY = 0;
    //         velocityX = 0;
    //         velocityYP = 0;
    //         velocityXP = 0;
    // }
    requestAnimationFrame(update);
    document.addEventListener('keydown', keyPressed);
    // document.addEventListener('keyup', stopMoving);

}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        bgMusic.pause()
        // let mySound = new Audio('/music/game_over3.mp3')
        // mySound.play()
        return;
    }

    if (win) {
        bgMusic.pause()
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //Freddy
    let freddyBottomLimit = boardHeight - freddyHeight;
    let freddyRightLimit = boardWidth - freddyWidth;

    freddy.y += velocityY;
    freddy.y = Math.min(Math.max(freddy.y + velocityY, 0), freddyBottomLimit);
    freddy.x += velocityX;
    freddy.x = Math.min(Math.max(freddy.x + velocityX, 0), freddyRightLimit);
    context.drawImage(freddyImg, freddy.x, freddy.y, freddy.width, freddy.height);

    //Freddy P
    let freddyPBottomLimit = boardHeight - freddyPHeight;
    let freddyPRightLimit = boardWidth - freddyPWidth;

    freddyP.y += velocityYP;
    freddyP.y = Math.min(Math.max(freddyP.y + velocityYP, 0), freddyPBottomLimit);
    freddyP.x += velocityXP;
    freddyP.x = Math.min(Math.max(freddyP.x + velocityXP, 0), freddyPRightLimit);
    context.drawImage(freddyPImg, freddyP.x, freddyP.y, freddyP.width, freddyP.height);

    // Draw pizza only if not collided
    if (!detectCollision(freddy, pizza) && !detectCollision(freddy, pizza1) && !detectCollision(freddy, pizza2)) {
        context.drawImage(pizzaImg, pizza.x, pizza.y, pizza.width, pizza.height);
        context.drawImage(pizza1Img, pizza1.x, pizza1.y, pizza1.width, pizza1.height);
        context.drawImage(pizza2Img, pizza2.x, pizza2.y, pizza2.width, pizza2.height);
    } else if (detectCollision(freddy, pizza)) {
        score += 2;
        pizza.x = Math.random() * (boardWidth - pizzaWidth);
        pizza.y = Math.random() * (boardHeight - pizzaHeight);
    } else if (detectCollision(freddy, pizza1)) {
        score += 1;
        pizza1.x = Math.random() * (boardWidth - 50);
        pizza1.y = Math.random() * (boardHeight - 50);
    } else if (detectCollision(freddy, pizza2)) {
        gameOver = true;
    }
    

    //Freddy P collision
    if (detectCollision(freddyP, freddy)) {
        gameOver = true;
    } else if (detectCollision(freddyP, pizza)) {
        score -= 1;
        pizza.x = Math.random() * (boardWidth - pizzaWidth);
        pizza.y = Math.random() * (boardHeight - pizzaHeight);
    } else if (detectCollision(freddyP, pizza1)) {
        pizza1.x = Math.random() * (boardWidth - pizzaWidth);
        pizza1.y = Math.random() * (boardHeight - pizzaHeight);
    } else if (detectCollision(freddyP, pizza2)) {
        velocityXP *= 2;
        velocityYP *= 2;
        pizza2.x = Math.random() * (boardWidth - pizzaWidth);
        pizza2.y = Math.random() * (boardHeight - pizzaHeight);
    }

    // Draw score
    context.font = "70px Arial";
    context.fillStyle = "maroon";
    context.fillText(score, 40, 80);

    if (score >= 20) {
        win = true;
        context.clearRect(0, 0, board.width, board.height);
        context.font = "100px Arial"
        document.getElementById("board").style.backgroundImage = "url('black.jpg')"
        context.fillStyle = "#90EE90";
        context.textAlign = "center";
        context.fillText("You win!", boardWidth/2, 400);
        context.fillStyle = "white";
        context.fillText("Press R to restart",boardWidth/2, 500);
    } else if (score <= -5) {
        gameOver = true;
    }

    if (gameOver) {
        context.clearRect(0, 0, board.width, board.height);
        context.font = "100px Arial"
        document.getElementById("board").style.backgroundImage = "url('black.jpg')"
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("GAME OVER", boardWidth/2, 400);
        context.fillText("Press R to restart",boardWidth/2, 500);
    }

}


//Character movement
function keyPressed(event) {
    switch (event.key) {
        case "w":
            //Move upwards
            velocityY = -0.6;
            break;
        
        case "s":
            //Move downwards
            velocityY = 0.6;
            break;

        case "a":
            velocityX = -0.6;
            break;

        case "d":
            velocityX = 0.6;
            break;
        
        case "ArrowUp":
            velocityYP = -0.3;
            break;

        case "ArrowDown":
            velocityYP = 0.3;
            break;

        case "ArrowLeft":
            velocityXP = -0.3;
            break;

        case "ArrowRight":
            velocityXP = 0.3;
            break;
        
        case "r":
            location.reload();
        //reset game
        // if (gameOver) {
        //     freddy.y = freddyY;
        //     freddy.x = freddyX;
        //     freddyP.x = freddyPX;
        //     freddyP.y = freddyPY;
        //     score = 0;
        //     gameOver = false;
        // }
        break;
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
} 