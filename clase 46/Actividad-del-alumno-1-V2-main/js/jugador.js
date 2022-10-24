class jugador{
    constructor(){
        this.index = null
        this. distance = 0
        this.name = null
        this.positionX = 0
        this.positionY = 0
        this.rank = 0
        this.fuel = 0
        this.score = 0
    }

    addPlayer(){
       var playerIndex = "players/player"+this.index
       if(this.index === 1){
        console.log("un jugador")
        this.positionX = width/2 -100
       }
       else{
        console.log("dos jugadores")
        this.positionX = width/2 +100
       }

       database.ref(playerIndex).set({
        name:this.name, 
        positionX: this.positionX,
        positionY: this.positionY,
        rank: this.rank,
        score: this.score

       })
    }

    getDistance(){
        var playerDistanceRef = database.ref("players/player"+this.index)
        playerDistanceRef.on("value",data=>{
        var data = data.val()
        this.positionX= data.positionX
        this.positionY = data.positionY
        })
    }

    getCount(){
       console.log("entramos a getCount")
        var playerCountRef = database.ref("playerCount")
       playerCountRef.on("value",data=>{
           playerCount = data.val();
           console.log("valor playerCount", playerCountRef)
       })
    }
 
    updateCount(count){
        database.ref("/").update({ 
            playerCount: count
        })

    }

    update(){
        var playerIndex = "players/player" + this.index
        database.ref(playerIndex).update({
            positionX: this.positionX,
            positionY: this.positionY,
            rank: this.rank,
            score: this.score
        })
    }

    static getplayersinfo(){
        var playersinforef=database.ref("players")
        playersinforef.on("value",data =>{
            allplayers= data.val()
        })

    }
}