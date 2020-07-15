var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var snakeW=10;
var snakeH=10;
var dir="right";
let score =0;

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";



function drawsnake(x,y){

ctx.fillStyle="#25f505";
ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
ctx.fillStyle="black";
ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);

}
 var len =3;
  var snake = [];
  for(var i=len-1;i>=0;i--){
    snake.push({
        x:i,
        y:0
    })
}
document.addEventListener("keydown",control)
function control(e){
    
    if(e.keyCode==37 && dir!="right"){
        dir="left";
        left.play();
    }
    else if(e.keyCode==38 && dir!="down"){
        dir="up";
        up.play();
    }
    else if(e.keyCode==39 && dir!="left"){
        dir="right";
        right.play();
    }
    else if(e.keyCode==40 && dir!="up"){
        dir="down";
        down.play();
    }


}

var food ={
    x:Math.round(Math.random()*(cvs.width/snakeW-1)+1),
    y:Math.round(Math.random()*(cvs.height/snakeH-2)+3)

}

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x === array[i].x && head.y === array[i].y){
            return true;
        }
    }
    return false;
}


function drawfood(x,y){

ctx.fillStyle="red";
ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
ctx.fillStyle="black";
ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);


}


function draw(){

ctx.clearRect(0,0,cvs.width,cvs.height);

for(var i=0;i<snake.length;i++){
    
    var X =snake[i].x;
    var Y = snake[i].y;
    drawsnake(X,Y);

}
drawfood(food.x,food.y);
   var snakeX = snake[0].x;
   var snakeY = snake[0].y;

  
  
   if(dir=="right"){
    snakeX++
   }
   else if(dir=="left"){
    snakeX--
   }
   else if(dir=="up"){
    snakeY--
   }
   else if(dir=="down"){
    snakeY++
   }
   if(snakeX==food.x &&snakeY==food.y){
       
       score++;
    food ={
         x:Math.round(Math.random()*(cvs.width/snakeW)+1),
         y:Math.round(Math.random()*(cvs.height/snakeH)+1)

          
        }
        eat.play();

  
   }else{

snake.pop();

}
 
 var newhead={
    x:snakeX,
    y:snakeY
      }
       
       if(snakeX<0||snakeY<0||snakeX>=(cvs.width/snakeW)||snakeY>=(cvs.height/snakeH)||collision(newhead,snake)){
    
     
     dead.play();
     
     clearInterval(game);
         
   }




snake.unshift(newhead);


}
var game=setInterval(draw,50);
