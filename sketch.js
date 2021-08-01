var START = 0;
var PlAY = 1;
var END = 2;
var gameState = START;
var bg,robber,robberLeft,robberRight,robberImg,hidingSpot,mouthMonsterLeftEnd,mouthMonsterRightEnd;
var mouthMonster,mouthMonsterLeft,mouthMonsterRight;
var leftTop1,leftTop2,bottomLeft,bottom1,bottomRight,bottom2,topRight1,topRight2,topRight3;
var startImg,winImg,loseImg,resetImg,start,win,lose,reset;
var diamond,diamondImg,portion,portionImg,thunderImg;
var createWall = true;

function preload() {
    robberImg = loadImage("Images/robberImg.png");
    robberLeft = loadAnimation("Images/robberLeft1.png","Images/robberLeft2.png","Images/robberLeft3.png","Images/robberLeft4.png");
    robberRight = loadAnimation("Images/robberRight1.png","Images/robberRight2.png","Images/robberRight3.png","Images/robberRight4.png");
    bg = loadImage("Images/bg1.png");
    mouthMonsterRight = loadAnimation("Images/mouthRight1.png","Images/mouthRight2.png","Images/mouthRight3.png","Images/mouthRight4.png");
    mouthMonsterLeft = loadAnimation("Images/mouthLeft1.png","Images/mouthLeft2.png","Images/mouthLeft3.png","Images/mouthLeft4.png");
    skullLeft = loadAnimation("Images/skullLeft1.png","Images/skullLeft2.png","Images/skullLeft3.png","Images/skullLeft4.png");
    skullRight = loadAnimation("Images/skullRight1.png","Images/skullRight2.png","Images/skullRight3.png","Images/skullRight4.png");
    loseImg = loadImage("Images/lose.png");
    resetImg = loadImage("Images/reset.png");
    startImg = loadImage("Images/start.png");
    winImg = loadImage("Images/win.png");
    diamondImg = loadImage("Images/diamond.png");
    portionImg = loadImage("Images/portion.png");
    thunderImg = loadAnimation("Images/thunder1.png","Images/thunder2.png","Images/thunder3.png");
}

function setup() {
    var canvas = createCanvas(windowWidth,windowHeight);

    robber = createSprite(width/7,height/10);
    robber.addImage("standing",robberImg);
    robber.addAnimation("right",robberLeft);
    robber.addAnimation("left",robberRight);

    diamond = createSprite(width/7+1075,height/10+110,20,20);
    diamond.addImage("diamond",diamondImg);
    diamond.scale = 0.4;

    portion = createSprite(width/7+530,-20+height/10,20,20);
    portion.addImage("portion",portionImg);
    portion.scale = 0.2;

    mouthMonster = createSprite(width-200,height/2+250,10,10);
    mouthMonster.addAnimation("right",mouthMonsterRight);
    mouthMonster.addAnimation("left",mouthMonsterLeft);
    mouthMonster.scale = 0.5;
    mouthMonster.velocityX = 2;

    mouthMonsterLeftEnd = createSprite(width-400,height/3+350,10,50);
    mouthMonsterLeftEnd.visible = false;

    mouthMonsterRightEnd = createSprite(width-50,height/3+350,10,50);
    mouthMonsterRightEnd.visible = false;

    skullLeftEnd = createSprite(width/7+330,height/10+120,10,50);
    skullLeftEnd.visible = false;


    skull = createSprite(width/7+520,height/10+110,10,10);
    skull.addAnimation("right",skullRight);
    skull.addAnimation("left",skullLeft);
    skull.scale = 0.5;
    skull.velocityX = 2;

    

    leftTop1 = createSprite(width/7,height/10+10,400,20);
    leftTop1.visible = false;
    leftTop1.debug = true;

    leftTop1Base = createSprite(width/7,height/10+25,400,5);
    leftTop1Base.visible = false;

    leftTop2 = createSprite(width/9,height/3+35,300,20);
    leftTop2.visible = false;
    leftTop2.debug = true;

    bottomLeft = createSprite(width/5+12,height/3+290,20,460);
    bottomLeft.visible = false;
    bottomLeft.debug = true;

    bottom1 = createSprite(width/5+120,height/3+530,210,20);
    bottom1.visible = false;
    bottom1.debug = true;

    bottomRight = createSprite(width/5+240,height/3+450,20,150);
    bottomRight.visible = false;
    bottomRight.debug = true;

    bottom2 = createSprite(width/5+680,height/3+390,880,20);
    bottom2.visible = false;
    bottom2.debug = true;

    topRight1 = createSprite(width/7+520,height/10+150,390,20);
    topRight1.visible = false;
    topRight1.debug = true;

    topRight1Base = createSprite(width/7+520,height/10+165,390,5);
    topRight1Base.visible = false;

    topRight2 = createSprite(width/7+750,height/10+120,70,320);
    topRight2.visible = false;
    topRight2.debug = true;

    topRight3 = createSprite(width/7+950,height/10+250,430,70);
    topRight3.visible = false;
    topRight3.debug = true;

    topRight3Base = createSprite(width/7+950,height/10+290,430,5);
    topRight3Base.visible = false;

    topStairs = createSprite(width/7+545,height/10+40,20,340);
    topStairs.rotation = 80-25;
    topStairs.visible = false;

    bottomStair1 = createSprite(width/5+180,height/10+315,350,20);
    bottomStair1.rotation = 60-25;
    bottomStair1.visible = false;

    invisibleStairs = createSprite(width/5+380,height/10+455,150,20);
    invisibleStairs.rotation = 60-25;
    invisibleStairs.visible = false;

    bottomStair2 = createSprite(width/5+485,height/10+525,100,20);
    bottomStair2.rotation = 60-25;
    bottomStair2.visible = false;

    start = createSprite(width/7+520,height/10+150,20,20);
    start.addImage(startImg);
  
    win = createSprite(width/7+520,height/10+150,20,20);
    win.addImage(winImg);
  
    lose = createSprite(width/7+520,height/10+150,20,20);
    lose.addImage("loseImage",loseImg);
  
    reset = createSprite(width/7+520,height/10+350,20,20);
    reset.addImage("resetImage",resetImg);
  
    win.scale = 0.5;
    start.scale = 0.5;
    lose.scale = 0.5;
    reset.scale = 0.5;
 
    win.visible = false;
    start.visible = false;
    lose.visible = false;
    reset.visible = false;
}

function draw() {
  background(70);

  if(mouthMonster.isTouching(mouthMonsterRightEnd)) {
      mouthMonster.velocityX = -2;
      mouthMonster.changeAnimation("left",mouthMonsterLeft);
    }

  if(mouthMonster.isTouching(mouthMonsterLeftEnd)) {
      mouthMonster.velocityX = 2;
      mouthMonster.changeAnimation("right",mouthMonsterRight);
    }

  if(skull.isTouching(topRight2)) {
      skull.velocityX = -2;
      skull.changeAnimation("left",skullLeft);
    }

  if(skull.isTouching(skullLeftEnd)) {
      skull.velocityX = 2;
      skull.changeAnimation("right",skullRight);
    } 

  if(gameState === START) {

      robber.visible = false;
      portion.visible = false;
      diamond.visible = false;
      mouthMonster.visible = false;
      skull.visible = false;


      start.visible = true;
      start.scale = 1.5;

      stroke("black");
      strokeWeight(2);
      textAlign(CENTER);
      fill("white");
      textSize(20);
      text("Instructions: u have to steal the diamond from the vault without being caught by the monster or the skull.",width/2-15,height/2);
      text("There are secret traps everywhere which will send u in the pit.",width/2-15,height/2+30); 
      text("There is also a door which will help u to get out of the pit.",width/2-15,height/2+60); 
      text("Beware of the monsters and the traps and get the diamond to win the game.",width/2-15,height/2+90);

      if(mousePressedOver(start)) {
        gameState = 1;
      }

  } else if(gameState === PlAY) {
      background(bg);

      fill(70);
      rect(width-40,height/10+225,30,60);
      
      robber.visible = true;
      portion.visible = true;
      diamond.visible = true;
      mouthMonster.visible = true;
      skull.visible = true;

      skull.collide(leftTop1);
      
      if(createWall === true) {
        invisibleWall = createSprite(width/5+450,height/10+330,10,350);
        invisibleWall.addAnimation("thunder",thunderImg);
        invisibleWall.scale = 1.3;
        invisibleWall.debug = true;
        invisibleWall.visible = false;
        createWall = false;
      }

      start.visible = false;

      mouthMonster.collide(bottom2);

      robber.collide(bottom1);
      robber.collide(leftTop1);
      robber.collide(leftTop2);
      robber.collide(bottomLeft);
      robber.collide(bottom1);
      robber.collide(bottomRight);
      robber.collide(bottom2);
      robber.collide(topRight1);
      robber.collide(topRight2);
      robber.collide(topRight3);
      robber.collide(topStairs);
      robber.collide(bottomStair1);
      robber.collide(bottomStair2);

      

      if(robber.isTouching(leftTop1Base) || robber.isTouching(topRight1Base) || robber.isTouching(topRight3Base) && robber.x != portion.x) {
        robber.x = width/2-250;
        robber.y = height/2+310;
      }

      if(keyDown(RIGHT_ARROW) && robber.y > 20) {
        robber.x = robber.x + 5;
        robber.changeAnimation("right",robberRight);
      }

      if(keyDown(LEFT_ARROW)) {
        robber.x = robber.x - 5;
        robber.changeAnimation("left",robberLeft);
      }

        if(keyDown(UP_ARROW) && robber.y > 20) {
          robber.y = robber.y - 10;
          
        }

        robber.y = robber.y + 2.2;

        if(robber.x === portion.x) {
          invisibleWall.destroy();
        }

        if(robber.isTouching(invisibleWall) && robber.x != portion.x) {
          invisibleWall.visible = true;
          robber.x = width/2-250;
          robber.y = height/2+310;
        } else {
          invisibleWall.visible = false;
        }

        if(robber.isTouching(leftTop1Base) || robber.isTouching(topRight1Base) || robber.isTouching(topRight3Base) && robber.x === portion.x) {
          robber.x = width/2-250;
          robber.y = height/2+310;
          portion.x = robber.x;
          portion.y = robber.y;
        }

        if(robber.isTouching(portion)) {
          portion.visible = false;
          portion.x = robber.x;
          portion.y = robber.y;
        }

        if(robber.isTouching(skull) || robber.isTouching(mouthMonster)) {
          gameState = 2;
          lose.visible = true;
          reset.visible = true;
        }

        if(robber.isTouching(diamond)) {
          gameState = 2;
          win.visible = true;
          reset.visible = true;
          diamond.visible = false;
        }

  } else if(gameState === END) {
    background(bg);

    robber.x = width/7;
    robber.y = height/10;

    skull.velocityX = 0;
    mouthMonster.velocityX = 0;

      if(mousePressedOver(reset)) {
        gameState = 0;
        
        reset.visible = false;
        lose.visible = false;
        win.visible = false;
        diamond.visible = true;
       
        portion.visible = true;
        portion.x = width/7+530;
        portion.y = -20+height/10;

        skull.velocityX = -2;
        mouthMonster.velocityX = -2;

        createWall = true;
      }
  }  
  drawSprites();
}