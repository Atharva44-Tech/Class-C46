class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
    boundary=createSprite(250,-displayHeight*1.2,5, displayHeight*5);
   boundary.shapeColor="white"
   boundary2=createSprite(displayWidth-245,-displayHeight*1.2,5, displayHeight*5);
   boundary2.shapeColor="red"
}

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getRank();
    

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 230 
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 220;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          if(keyDown(LEFT_ARROW) && player.index !== null){
          cars[index - 1].x-=10;
          }
    
          if(keyDown(RIGHT_ARROW) && player.index !== null){
            cars[index - 1].x+=10;
            }      
          
          stroke(10);
          fill("red");
          ellipse(cars[index - 1].x,cars[index - 1].y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
        
        if(player.distance > 2500 && player.distance<3000){
          //gameState = 2;
         //lap2=createSprite(700,500);

         textSize(50);
         text("        lap2",x,y);
         
        }

        
    
       
       // textSize(15);
       // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
      if(frameCount%10 ===0){
        var hurdles=Math.round(random(2,10));
        console.log(hurdles);
        barricading=createSprite(displayWidth/hurdles,-displayHeight*5/hurdles);
        barricading.addImage("barricadingImage", barricadingImage);
        barricading.scale=0.2;
        barricading.velocityY=5
        barricading.velocityX=5
      }
         
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
  
   // for(var i=0;i<20;i++){

    if(player.distance > 4500){
      gameState = 2;
     lap2=createSprite(700,500);
      player.rank+=1;
      textSize(50);
         text(player.name+" "+player.rank,500,y+50);
      Player.updateRank(player.rank);
     
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
