class Player{
    constructor(){
        this.name = null;
        this.distance = 0;
        this.index = null;
        this.rank = 0;

    }
    getCount(){
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", (data)=>{
            playerCount = data.val()
        })
    }

    updateCount(count){
        database.ref('/').update({
            playerCount:count
        })
    }

    update(){
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name:this.name,
            distance:this.distance,
            rank:this.rank,
        })
    }

    static getPlayerInfo(){
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value", (data)=>{
            allPlayers = data.val()
        })
    }

    getFinishedPlayers(){
        var finishPlayersRef = database.ref('finishPlayers');
        finishPlayersRef.on("value", (data)=>{
            finishPlayers = data.val()
        })
    }

    static updateFinishPlayers(){
        database.ref("/").update({
            finishPlayers:finishPlayers + 1,
        })
        this.rank += 1;
    }
}