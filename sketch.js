var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var position,database;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonposition = database.ref("balloon/position");
    balloonposition.on("value",readPosition,showError);
}

// function to display UI
function draw() {
  background(bg);
  
  if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
      balloon.addAnimation("hotAirBalloon",balloonImage2);
      //write code to move air balloon in left direction
      writePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      balloon.addAnimation("hotAirBalloon",balloonImage2);
      //write code to move air balloon in right direction
      writePosition(3,0);
   }
    else if(keyDown(UP_ARROW)){
      balloon.addAnimation("hotAirBalloon",balloonImage2);
      //write code to move air balloon in up direction
      writePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
      balloon.addAnimation("hotAirBalloon",balloonImage2);
       //write code to move air balloon in down direction
       writePosition(0,3);
    }
  }
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(x,y){
  database.ref("balloon/position").set({
    x:position.x+x,
    y:position.y+y

  })
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("this is error");
}
