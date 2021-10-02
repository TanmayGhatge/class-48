var player1, iplayer, iplayer1, iplayer2, iplayer3;
var enemy, enemy1, enemy2, enemy3
var punch, sniper, pistol, kinfe, akm, bullet, bullet1;
var main_menu;
var score = 0;
var lives = 3;
var flag = false;
var flag1 = false;
var enemyGrp, enemy1Grp, enemy2Grp, enemy3Grp;
var bullet_grp;
var Edges
var game_over, resetbtn;
var Bg;

function preload(){
    punch = loadImage("Images/punch.png");
    akm = loadImage("Images/AKM.png");
    pistol = loadImage("Images/p1_pistol.png");
    sniper = loadImage("Images/Sniper.png");
    kinfe = loadImage("Images/knife.png");

    bullet1 = loadImage("Images/bullet.png")

    enemy = loadImage("Images/obj.png");
    enemy1 = loadImage("Images/obj1.png");
    enemy2 = loadImage("Images/obj2.png");
    enemy3 = loadImage("Images/obj3.png");

    game_over = loadImage("Images/Game_Over.png");
    resetbtn = loadImage("Images/reset_button.png")

}

function setup(){
    createCanvas(1200,700);
    //Creating Edges
    Edges = createEdgeSprites();

    player1 = createSprite(500,620);
    player1.addImage(punch);
    player1.scale = 0.4;
    player1.debug = true;

    main_menu = createSprite(1100,10,250,1500)
    main_menu.shapeColor = "lightblue";

    iplayer = createSprite(1005,200);
    iplayer.addImage(punch);
    iplayer.scale = .35;    

    iplayer1 = createSprite(1005,300);
    iplayer1.addImage(akm);
    iplayer1.scale = .35;

    iplayer2 = createSprite(1005,400);
    iplayer2.addImage(pistol);
    iplayer2.scale = .35;

    iplayer3 = createSprite(1000,500);
    iplayer3.addImage(sniper);
    iplayer3.scale = .35;

    iplayer3 = createSprite(1010,600);
    iplayer3.addImage(kinfe);
    iplayer3.scale = .35;

    enemyGrp = new Group();
    enemy1Grp = new Group();
    enemy2Grp = new Group();
    enemy3Grp = new Group();
    bullet_grp = new Group();
}

function draw(){
    background('#717171');

    if (keyDown(LEFT_ARROW)) {
        player1.x = player1.x - 8;
    }
    if (keyDown(RIGHT_ARROW)) {
        player1.x = player1.x + 8;
    }

    if (keyDown("1")) {
        player1.addImage(punch)
        flag = false; 
        flag1 = true;      
    }

    if (keyDown("2")) {
        player1.addImage(akm) 
        flag = true;    
        flag1 = false;      
   
    }

    if (keyDown("3")) {
        player1.addImage(pistol)
        flag = true;   
        flag1 = false;      
     
    }

    if (keyDown("4")) {
        player1.addImage(sniper)
        flag = true;  
        flag1 = false;      
      
    }

    if (keyDown("5")) {
        player1.addImage(kinfe)
        flag = false;  
        flag1 = true;      
      
    }

    // loop for obstacles
    var enemy_reapeter = Math.round(random(1,4));
    //console.log(select_balloon)
    
    if (World.frameCount % 80 == 0) {
      if (enemy_reapeter == 1) {
        Enemy();
      } else if (enemy_reapeter == 2) {
        Enemy1();
      } else if (enemy_reapeter == 3) {
        Enemy2();
      } else {
        Enemy3();
      }
    }

    player1.collide(main_menu);

  if (keyDown("space") && flag === true) {
      //var shoot_ammo = createBullet();
      //shoot_ammo.addImage(bullet1);
      //shoot_ammo.y = akm.y;
      //shoot_ammo.y = sniper.y;
      //shoot_ammo.y = pistol.y;
      createBullet();
  }

  if (keyDown("k") && enemy3Grp.isTouching(player1)){
    score = score + 100
    console.log("score")

      for (var i = 0; i < enemy3Grp.length; i++){ 
        if(player1.isTouching(enemy3Grp.get(i))){
           score = score + 150;
           enemy3Grp.get(i).destroy();
        } 
      }
  }

  if (bullet_grp.isTouching(enemyGrp) || bullet_grp.isTouching(enemy1Grp) || bullet_grp.isTouching(enemy2Grp) 
    || bullet_grp.isTouching(enemy3Grp)) {
      for (var i = 0; i < enemyGrp.length; i++){ 
         if(bullet_grp.isTouching(enemyGrp.get(i))){
            score = score + 50;
            enemyGrp.get(i).destroy();
            bullet_grp.destroyEach();
        } 
      }

      for (var i = 0; i < enemy1Grp.length; i++){ 
        if(bullet_grp.isTouching(enemy1Grp.get(i))){
           score = score + 100;
           enemy1Grp.get(i).destroy();
           bullet_grp.destroyEach();
        } 
      }

      for (var i = 0; i < enemy2Grp.length; i++){ 
        if(bullet_grp.isTouching(enemy2Grp.get(i))){
           score = score + 200;
           enemy2Grp.get(i).destroy();
           bullet_grp.destroyEach();
        } 
      }

      for (var i = 0; i < enemy3Grp.length; i++){ 
        if(bullet_grp.isTouching(enemy3Grp.get(i))){
           score = score + 150;
           enemy3Grp.get(i).destroy();
           bullet_grp.destroyEach();
        } 
      }

  }

  if (lives === 0){
    Bg = createSprite(475,250,1200,700);
    Bg.addImage(game_over)
    Bg1 = createSprite(475,500, 1200,700)
    Bg1.addImage(resetbtn)
    Bg1.scale = 0.5
    enemyGrp.destroyEach();
    enemy1Grp.destroyEach();
    enemy2Grp.destroyEach();
    enemy3Grp.destroyEach();
    player1.destroy();
    background("Black");
  }

    drawSprites();
    if (enemyGrp.collide(Edges[3]) || enemy1Grp.collide(Edges[3]) || enemy2Grp.collide(Edges[3]) || enemy3Grp.collide(Edges[3]) || 
    enemyGrp.isTouching(player1) || enemy1Grp.isTouching(player1) || enemy2Grp.isTouching(player1) || enemy3Grp.isTouching(player1)){
      //lives = lives - 1;
      console.log("Lives: ",lives)

      for (var i = 0; i < enemyGrp.length; i++){ 
        if(player1.isTouching(enemyGrp.get(i))){
           lives = lives - 1;
           enemyGrp.get(i).destroy();
          console.log("lives")
       } 
     }

     for (var i = 0; i < enemy1Grp.length; i++){ 
       if(player1.isTouching(enemy1Grp.get(i))){
          lives = lives - 1;
          enemy1Grp.get(i).destroy();
          console.log("lives1")
       } 
     }

     for (var i = 0; i < enemy2Grp.length; i++){ 
       if(player1.isTouching(enemy2Grp.get(i))){
          lives = lives - 1;
          enemy2Grp.get(i).destroy();
          console.log("lives2")
       } 
     }

     for (var i = 0; i < enemy3Grp.length; i++){ 
       if(player1.isTouching(enemy3Grp.get(i))){
          lives = lives - 1;
          enemy3Grp.get(i).destroy();
          console.log("lives3")
       } 
     }
    

    }
    textSize(12)
    fill("black");
    text("press 1 to choose punch", 1050, 200);
    text("press 2 to choose AKM", 1050, 300);
    text("press 3 to choose p1_Pistol", 1050, 400);
    text("press 4 to choose sniper", 1050, 500);
    text("press 5 to choose knife", 1050, 600);
    textSize(30);
    fill("black");
    text("Score: "+ score, 975, 50);
    console.log(score);
    text("Lives: "+ lives, 975, 100);

}
  
  function createBullet(){
      bullet= createSprite(100, 480, 5, 10);
      bullet.addImage(bullet1);
      bullet.velocityY = -6;
      bullet.scale = 0.3;
      bullet.lifetime = 100;
      //return bullet;
      bullet.x = player1.x;
      bullet_grp.add(bullet)

    }


  function Enemy() {
    var red = createSprite(Math.round(random(150, 900)),0, 10, 10);
    red.addImage(enemy);
    red.velocityY = 3;
    red.lifetime = 250;
    red.scale = 0.5
    enemyGrp.add(red);
    //red.debug = true;
    red.setCollider("rectangle",0,0,275,265)
  }
  
  function Enemy1() {
    var blue = createSprite(Math.round(random(150, 900)),0, 10, 10);
    blue.addImage(enemy1);
    blue.velocityY = 3;
    blue.lifetime = 250;
    blue.scale = 0.5
    enemy1Grp.add(blue);
    //blue.debug = true;
    blue.setCollider("rectangle",0,0,275,265)
  }
  
  function Enemy2() {
    var green = createSprite(Math.round(random(150, 900)),0, 10, 10);
    green.addImage(enemy2);
    green.velocityY = 3;
    green.lifetime = 250;
    green.scale = 0.5
    enemy2Grp.add(green);
    //green.debug = true;
    green.setCollider("rectangle",0,0,275,265)
  }
  
  function Enemy3() {
    var pink = createSprite(Math.round(random(150, 900)),0, 10, 10);
    pink.addImage(enemy3);
    pink.velocityY = 3;
    pink.lifetime = 250;
    pink.scale = 0.2
    enemy3Grp.add(pink);
    //pink.debug = true;
    pink.setCollider("rectangle",0,0,275,275)
  }

    

