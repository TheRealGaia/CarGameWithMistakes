class Game{
    constructor(){
    }

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value" , (data)=>{
            gameState = data.val();
        })
    }

    update(state){
        database.ref('/').update({
            gameState : state
        })
    }

    async start(){
        if(gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref("playerCount").once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();

            car1 = createSprite(100, 200);
            car1.addImage(carImg1);
            car2 = createSprite(300, 200);
            car2.addImage(carImg2);
            car3 = createSprite(500, 200);
            car3.addImage(carImg3);
            car4 = createSprite(700, 200);
            car4.addImage(carImg4);

            cars = [car1, car2, car3, car4];

            reachFinishPoint = false;
        }

    }

    play(){
        form.hide();
        Player.getPlayerInfo();
        player.getFinishedPlayers();
        console.log(finishPlayers);
        if(allPlayers !== undefined){
            var index = 0;
            var x = 210;
            var y;
            background(190);
            image(trackImg, 0, -displayHeight*4, displayWidth, displayHeight*5);
            for(var plr in allPlayers){
                index = index + 1;
                x = x + 220;
                y = displayHeight - allPlayers[plr].distance;
                cars[index - 1].x = x;
                cars[index - 1].y = y;

                if(index === player.index){
                    cars[index - 1].shapeColor = "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index - 1].y;
                }

                textSize(25);
                fill("yellow");
                textAlign(CENTER);
                text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 100)

            }

        }
        if(keyDown(UP_ARROW) && player.index !== null && reachFinishPoint !== true){
            player.distance = player.distance + 10;
            player.update();
        }
        if(player.distance > 4300 && reachFinishPoint == false){
            Player.updateFinishPlayers();
            player.rank = finishPlayers;
            player.update();
            reachFinishPoint = true;
        } 
        drawSprites();

    }
    displayRank(){
        camera.position.x = 0;
        camera.position.y  = 0;
        Player.getPlayerInfo();
        imageMode(CENTER);
        image(bronzeImg, -displayWidth/4, displayHeight/8, 200, 250);
        image(silverImg, displayWidth/4, displayHeight/9, 200, 250);
        image(goldImg, 0, 100, 220, 270);
        textAlign(CENTER);
        textSize(50);
        for(var plr in allPlayers){
            if(allPlayers[plr].rank == 1){
                text("1st: "+ allPlayers[plr].name, 0, 200);
            }
            else if(allPayers[plr].rank == 2){
                text("2nd: "+ allPlayers[plr].name, displayWidth/4, displayHeight/9 + 100);
            }
            else if(allPlayers[plr].rank == 3){
                text("3rd: "+ allPlayers[plr].name, -displayWidth/4, displayheight/8 + 100);
            }
            else{
                textSize(30);
                text("Better Luck Next Time "+ allPlayers[plr].name, 0, 350)
            }
        }
    }
}