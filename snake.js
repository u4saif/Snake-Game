const cvs=document.getElementById("snake");
const ctx=cvs.getContext("2d");
let score=0;
const box=32;

//Add Images
let ground=new Image();
ground.src="img/ground.png";
let foodImage=new Image();
foodImage.src="img/bird.png";

let food={
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}
let snake=[];
snake[0]={
    x:9*box,
    y:10*box
}
//Snake Control 
let d;
document.addEventListener("keydown",direction);

function direction(event){
    let key=event.keyCode;
    if(key==37 && d !="RIGHT"){
        d="LEFT";
    }else if (key==38 && d !="DOWN"){
        d="UP";
    }else if (key==39 && d !="LEFT"){
        d="RIGHT";
    }else if (key==40 && d !="UP"){
        d="DOWN";
    }
    console.log(d);
}
//Colision checking of snake
function colision(head, arr){
    for ( let i=0; i<arr.length;i++){
        if (head.x == arr[i].x && head.y == arr[i].y) {
            return true;
        }
        
    }
    return false;

}

//Draw on Canvas
function draw(){
    ctx.drawImage(ground,0,0);
    ctx.drawImage(foodImage,food.x,food.y,25,25);
//Score printed at the top    
    ctx.fillStyle="white";
    ctx.font="45px Berlin Sans FB";
    ctx.fillText(score,2*box,1.6*box);
//Snake created using above snake array
    for (let i=0; i<snake.length;i++){
        ctx.fillStyle=(i==0)? "green":"white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle="red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
//snake old head position 
    let snakeX=snake[0].x;
    let snakeY=snake[0].y;
   
//which direction 
    if (d=="LEFT") snakeX -= box;
    if (d=="UP") snakeY -= box;
    if (d=="RIGHT") snakeX += box;
    if (d=="DOWN") snakeY += box;
//Add new Head
let newHead={
    x:snakeX,
    y:snakeY
}
if(snakeX==food.x && snakeY==food.y){
    score++;
    food={
        x : Math.floor(Math.random()*17+1) * box,
        y : Math.floor(Math.random()*15+3) * box
    }  

}
else {snake.pop(); }//remove tail

snake.unshift(newHead);
let gover="Game Over"
//Game over rule
if(snakeX < box || snakeX>17*box || snakeY < 3*box || snakeY>17*box ){
    ctx.fillStyle="white";
    ctx.font="45px Berlin Sans FB";
    ctx.fillText(gover,10*box,1.6*box);
    clearInterval(game);
}


}

let game=setInterval(draw,100);