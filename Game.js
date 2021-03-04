class Game {
  constructor(){}
  
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
  }

  play(){
    form.hide();
    textSize(20);
    text("Game has Started", 200, 150);
    
    Player.getPlayerInfo();

    if (allPlayers !== undefined){
      var ypos = 175;
      
      for (var plr in allPlayers){
        ypos+=20;
        textSize(12);
        text(allPlayers[plr].name+":"+allPlayers[plr].distance, 200, ypos);
      
        if (plr === "player"+player.index){
          fill("red");
        }
        else {
          fill("black");
        }
      }
    }
  
    if (keyIsDown(UP_ARROW)&&player.index !== null){
      player.distance+= 50;
      player.update();
    }
  }
}