
var monkey;
var monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var ground;
var Background;
var Frame;
var survivalTime = 0;
function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  ObstaclesImage = loadImage("obstacle.png");
  forest = loadImage("trees.png");
  forest2 = loadImage("trees.png");

  frame = loadImage("frame.png")
}

function setup() {
  createCanvas(700,500)
  Background = createSprite(190,200,40,40);
  Background.addImage(forest);
  Background.scale=1.7;
  Background.velocityX=-2
  
  Background2 = createSprite(1000,200,40,40);
  Background2.addImage(forest);
  Background2.scale=1.7;
  
  
  Frame = createSprite(340,250,10,10);
  Frame.addImage(frame);
  Frame.scale = 1.25;
  
  monkey = createSprite(230,200,20,20);
  monkey.addAnimation("Running", monkey_running);
  monkey.scale = 0.15;
  monkey.velocityY = 5;
 
  ground = createSprite (400,380,800,10);
  ground.x=ground.width/2
  ground.velocityX = -4;
  ground.visible = false;
  bananaGroup = createGroup();
  obsticalGroup = createGroup();


  
}


function draw() {
background(90,170,255);
  monkey.velocityY = monkey.velocityY+1
    monkey.collide(ground);
  Food();
  Obstacles();
 
  if(monkey.isTouching(bananaGroup)) {
  score = score+1
  bananaGroup.destroyEach();
  }
  if(monkey.isTouching(obsticalGroup)) {
   Background.velocityX = 0;
   Background2.velocityX = 0;
   ground.velocityX = 0
   bananaGroup.setVelocityXEach(0);
   obsticalGroup.setVelocityXEach(0);
   obsticalGroup.setLifetimeEach(-1);                                          bananaGroup.setLifetimeEach(-1);

  }
  stroke("white")
  textSize(20);
  fill("white")
  
  stroke("black");
  textSize(20);
  fill("white");
    survivalTime = Math.ceil(frameCount/frameRate())
  
  if(keyDown("space")) {
    monkey.y= monkey.y-20;
  }
  
  if(ground.x<200){
    ground.x = 400;
  }
   
  if(Background.x<190){
    Background2.velocityX=-2;
    Background.x = Background.x*2;

  }
   if(Background2.x<190){
    Background2.x = Background.x*2;
    Background.velocityX=-2;

  }
  drawSprites();
    text("Survival Time:" + survivalTime,100,50);
    text("Score: " + score,450,50);

}
function Food() {
  if(frameCount % 80 === 0&&ground.velocityX===-4) {
    banana = createSprite(monkey.x+220,random(120,200),10,10)
    banana.addImage(bananaImage);
    banana.scale = 0.18;
    banana.velocityX = -2;
    banana.lifetime = 800;
    bananaGroup.add(banana);
    
  }
}
function Obstacles() {
  if(frameCount % 300 === 0&&ground.velocityX===-4) {
    obstacles = createSprite(monkey.x+220,370,10,10)
    obstacles.addImage(ObstaclesImage);
    obstacles.scale = 0.18;
    obstacles.velocityX = -2;
    obstacles.lifetime = 800;
    obsticalGroup.add(obstacles);
  }
}
