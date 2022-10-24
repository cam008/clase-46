class juego{
    constructor(){
        this.resettitle = createElement("h2")
        this.resetbutton = createButton("")
        this.leatherboardtitle = createElement("h2")
        this.leather1 = createElement("h2")
        this.leather2 =createElement("h2")
    }

    getState(){
        console.log("entramos a getState")
        var gameStateRef= database.ref("gameState")
        gameStateRef.on("value", function(data){
        gameState = data.val();
        console.log("gameState:", gameState)

        })  
    }

    update(state){
        console.log ("valor de state",state)
        database.ref("/").update({
            gameState: state
        })
        console.log("SALIMOS DE UPDATE")
    }

    start(){
        console.log("entramos a start")
        jugador1 = new jugador()
        playerCount= jugador1.getCount()
        console.log("playerCount:",playerCount)
        formulario1=  new formulario()
        formulario1.display()
        car1 = createSprite(width/2 -50,height -100)
       // car1.addImage("car1",car1Img)
      //  car1.scale = 0.07
       // car2.addImage("car2",car2Img)
      //  car2.scale = 0.07
        cars= [car1, car2]
        fuels= new Group()
        powerCoins = new Group()
        obstacles= new Group()
        var obstaclesPosition = [
        {x: width/2+250, y: height-800, image: obstacle2Image},
        {x: width/2-150, y: height-1300, image: obstacle1Image},
        {x: width/2+250, y: height-1800, image: obstacle1Image},
        {x: width/2-180, y: height-2300, image: obstacle2Image},
        {x: width/2, y:height-280,image:obstacle2Image},
        {x: width/2-180, y: height-3300, image: obstacle1Image},
        {x: width/2+180, y: height-3300, image: obstacle2Image},
        {x: width/2+250, y: height-3800, image: obstacle2Image},
        {x: width/2-150, y: height-4300, image: obstacle1Image},
        ]
        this.addSprites (fuels,4,fuelImage,0.02)
        this.addSprites(powerPoints,18,powerCoinImage,0.09)
        this.addSprites(obstaclesPosition,obstaclesPosition.length,obstacle1Image,0.04,obstaclesPosition)
    }

    addSprites(spriteGroup,numberOfSprites,spriteImage,scale,positions=[]){
        for (var i = 0;i < numberOfSprites;i ++){
            var x 
            var y
            if (positions.length> 0){
                x= positions[i].x
                y= positions[i].y
                SpriteImage= positions[i].image
            }
            else{
                x= random(width/2 + 150, width/2 -150)
                y= random(-height*4.5,height-400)
            }
            var sprite = createSprite(x,y)
            sprite.addImage("sprites",spriteImage)
            sprite.scale= scale
            spriteGroup.add(sprite)
        }
    }

    handleelement(){
        formulario1.hide()
        formulario1.titleImg.position(40,50)
        formulario1.titleImg.class("gametitleaftereffects")
        this.resettitle.html("reiniciar juego")
        this.resettitle.class("resetText")
        this.resettitle.position(width/2+200,40)
        this.resetbutton.class("resetButton")
        this.resetbutton.position(width/2+230,100)
        this.leatherboardtitle.html("puntuacion")
        this.leatherboardtitle.class("resetText")
        this.leatherboardtitle.position(width/3-60,40)
        this.leather1.class("leatherText")
        this.leather1.position(width/3-50,80)
        this.leather2.class("leatherText")
        this.leather2.position(width/3-50,130)
    }

    play(){
        this.handleelement()
        this.handleresetbutton()
        jugador.getplayersinfo()

        if(allplayers !== undefined){
            image(track,0, -height*5, width, height*6)
            this.showleatherboard()
            var index = 0
            for(var plr in allPlayers){
                index= index+1 
                var x = allPlayers[plr].positionX
                var y = height-allPlayers[plr].positionY
                cars[index-1].position.x = x
                cars[index-1].position.y = y
                if( index === jugador1.index){
                    stroke(10)
                    fill("red")
                    ellipse(x,y,60,60)
                    this.handleFuel(index)
                    this.handlePowerCoins(index)
                    camera.position.y= cars[index-1].position.y

                }
            }
            this.handleplayerscontrols()
            drawSprites()
        }
    }
    
    handleresetbutton(){
        this.resetbutton.mousePressed(()=>{
            database.ref("/").set({
                playerCount:0,
                players: {},
                gameState: 0
            })
        })
        window.location.reload()
    }

    showleatherboard(){
         var leather1
         var leather2
         var players = Object.values(allplayers)
         if ((players[0].rank === 0 && players[1].rank === 0) || (players[0].rank ===1 )){
            leather1 = players[0].rank + "&emsp" + players[0].name + "&emsp" + players[0].score 
            leather2 = players[1].rank + "&emsp" + players[1].name + "&emsp" + players[1].score
         }

         if (players[1].rank === 1){
            leather1 = players[1].rank + "&emsp" + players[1].name + "&emsp" + players[1].score
            leather2 = players[0].rank + "&emsp" + players[0].name + "&emsp" + players[0].score
         }
         
         this.leather1.html(leather1)
         this.leather2.html(leather2)
    }

    handleplayerscontrols(){
        if(keyIsDown(UP_ARROW)){
            jugador1.positionY += 10
            jugador1.update()
        }
        
        if(keyIsDown(LEFT_ARROW)&& jugador1.positionX > width/3 -50){
            jugador1.positionX -= 5
            jugador1.update()
        }

        if(keyIsDown(RIGHT_ARROW)&& jugador1.positionX < width/2 +300){
            jugador1.positionX += 5
            jugador1.update()
        }
    }

    handleFuel(index){
    cars[index-1].overlap(fuels,function(collector, collected){
        jugador1.fuel= 185
        jugador1.update()
        collected.remove()
    })
    }

    handlePowerCoins(index){
        cars[index-1].overlap(powerCoins,function(collector, collected){
            jugador1.score += 21
            jugador1.update()
            collected.remove()
        })
    }

    handleResetButton(){
        this.resetbutton.mousePressed(()=>{
            database.ref("/").set({playerCount: 0, gameState: 0, players:{}})
            window.location.reload()
        })
    }
}

