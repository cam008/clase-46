var playerCount
var gameState 
var distance = 0
var allPlayers 
var fondo
var database
var juego1
var jugador1
var formulario1
var car1
var car2
var car1Img
var car2Img
var fuels
var powerCoins
var obstacles
var track
var fuelImage
var powerCoinImage
var obstacle1Image
var obstacle2Image
var cars = []


function preload(){
  //fondo = loadImage("../imagenes/background.png")
 /* car1Img = loadImage("./imagenes/car1.png")
  car2Img = loadImage("./imagenes/car2.png")
  track = loadImage("./imagenes/track.jpeg")
  fuelImage = loadImage("./imagenes/fuel.png")
  powerCoinImage = loadImage("./imagenes/goldCoin.png")
  obstacle1Image = loadImage("./imagenes/obstacle1.png")
  obstacle2Image = loadImage("./imagenes/obstacle2.png")*/

}


function setup(){
  createCanvas(windowWidth, windowHeight);
  database = firebase.database()
  juego1 = new juego()
  console.log("PASO UNO SE CREA NUEVO JUEGO")
  juego1.getState()
  console.log("SE OBTIENE EL ESTADO DEL JUEGO", juego1.getState)
  juego1.start()
  console.log("SE INICIA EL JUEGO")
}

function draw(){
  background("red");
  console.log("valor playerCount ****", playerCount)
  if(playerCount === 2){
    console.log("playercount del sketch", playerCount)//validar el rastreo
    juego1.update(1)
  }

  if(gameState === 1){
    juego1.play()
  }
    
  if(gameState === 2){
    juego1.end()
  }
  
}



