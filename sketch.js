var gameState = 0;
var playerCount;
var allPlayers;
var form,game,player;            
var database;
var car1, car2, car3, car4;
var cars;
var carImg1, carImg2, carImg3, carImg4;
var trackImg;
var finishPlayers, reachFinishPoint;
var goldImg, silverImg, bronzeImg;

function preload(){
  carImg1 = loadImage("Images/car1.png");
  carImg2 = loadImage("Images/car2.png");
  carImg3 = loadImage("Images/car3.png");
  carImg4 = loadImage("Images/car4.png");
  trackImg = loadImage("Images/track.jpg");
  goldImg = loadImage("Images/gold.PNG");
  silverImg = loadImage("Images/silver.PNG");
  bronzeImg = loadImage("Images/bronze.PNG");
}

function setup(){
    createCanvas(displayWidth-20, displayHeight-30);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();

}

function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.displayRank();
  }
  if(finishPlayers === 4){
    game.update(2);
  }
}


