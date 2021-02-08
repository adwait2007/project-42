var backImage,backgr;
var player, player_running,player_standing;
var ground,ground_img;
var bananas,bananas_IMG;
var stone,stone_IMG;
var foodGroup,stoneGroup;
var gameOver_IMG,gameOver_Sound,gameOver;
var reset,reset_IMG;
var eating_Sound;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananas_IMG=loadImage("banana.png");
  stone_IMG=loadImage("stone.png");
  gameOver_IMG=loadImage("gameOver.png");
  gameOver_Sound=loadSound("game over sound.mp4");
  player_standing=loadImage("Monkey_01.png");
  reset_IMG=loadImage("Reset.png");
  eating_Sound=loadSound("jump.mp3");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.addAnimation("Standing",player_standing);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver=createSprite(400,200,20,50);
  gameOver.addImage(gameOver_IMG);
  gameOver.scale=0.5;
  gameOver.visible=false;

  reset=createSprite(400,100,20,50);
  reset.addImage(reset_IMG);
  reset.scale=0.5;
  reset.visible=false;
  
  foodGroup=new Group();
  stoneGroup=new Group();

}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
   if(backgr.x<100){
     backgr.x=backgr.width/2;
   }
  
    if(keyDown("space") &&  player.y>270) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnBananas();
    spawnObstacles();
   
    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score=score+2;
      player.scale+= +0.03;
      eating_Sound.play();
     
    }

    if(stoneGroup.isTouching(player)){
      gameState=END;
      gameOver_Sound.play();
    }
  }
  if(gameState===END){
    backgr.velocityX=0;
    player.velocityY=0;
    player.changeAnimation("Standing",player_standing);
    gameOver.visible=true;
    reset.visible=true;
    foodGroup.setLifetimeEach(-1);
    stoneGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    stoneGroup.setVelocityXEach(0);
    ground.velocityX=0;
    player.collide(ground);
  }

  if(mousePressedOver(reset)){
    gameState=PLAY;
    foodGroup.destroyEach();
    stoneGroup.destroyEach();
    gameOver.visible=false;
    reset.visible=false;
    player.changeAnimation("Running",player_running);
    backgr.velocityX=-4;
    score=0;
    player.scale=0.1;
  }


  drawSprites();

  fill("white");
  textSize(25);
  text("score:"+score,700,20);

}

function spawnBananas(){
    if(frameCount%80===0){
      bananas=createSprite(850,250,40,10);
      bananas.y=Math.round(random(120,220));
      bananas.addImage(bananas_IMG);
      bananas.scale=0.09;
      bananas.velocityX=-4;
      bananas.lifetime=200;
      player.depth=bananas.depth+1;
      foodGroup.add(bananas);
    }
}

function spawnObstacles(){
  if(frameCount%100===0){
    stone=createSprite(900,340,20,50);
    stone.addImage(stone_IMG);
    stone.scale=0.12;
    stone.velocityX=-4;
    stone.lifetime=200;
    player.depth=stone.depth+1;
    stoneGroup.add(stone);
  }
}
