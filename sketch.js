
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime=0
var score=0;
var jungle,backgroundJungleImage;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  backgroundJungleImage=loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(800,400);
  monkey=createSprite(100,340,50,50);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  
  jungle=createSprite(0,0,800,400);
  jungle.addImage(backgroundJungleImage);
  jungle.scale=1.5;
  jungle.velocityX=-2;

  jungle.x=jungle.width/2;
  
  ground = createSprite(200,350,1200,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  ground.visible=false;
  
   obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
  

  
}


function draw() {
  background("white");
drawSprites();
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
   if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
if(keyDown("space")) {
    
        monkey.velocityY = -12;
      
    }
  monkey.velocityY = monkey.velocityY + 0.8
  spawnbananas();
  
monkey.collide(ground);
    spawnObstacles();
  var survivaltime=0;
  stroke("black");
  textSize(20);
  fill("black");
  
  text("score:"+score,500,50);
  
  survivaltime=Math.ceil(frameCount/frameRate())
  text("survival Time:"+ survivaltime,100,50);
  
  
  
  
  if(bananaGroup.isTouching(monkey)){
    score+=1;
    
    bananaGroup.destroyEach();
  }
  
  switch(score){
    case 1:monkey.scale=0.12;
      break;
    case 2:monkey.scale=0.14;
      break;
    case 3:monkey.scale=0.16;
      break;
    case 4:monkey.scale=0.18;
      break;
      default:
      break;
  }
  
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(400,337,10,40);
   obstacle.velocityX = -(4+3*survivaltime/100);
    obstacle.addImage(obstacleImage);
    
   
   
   
             
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnbananas() {
  
  if (frameCount % 80 === 0) {
     banana = createSprite(200,460,40,10);
    banana.y = Math.round(random(10,60));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(4+3*survivaltime/100);
    
    
    banana.lifetime = 134;
    
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
   bananaGroup.add(banana);
    }
}









