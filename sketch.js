var solo, nuvem, nuvemimage, nuvemgroup
var rex, reximage, rexcollideimg
var obs1, obs2, obs3, obs4, obs5, obs6, grupodeobs
var chao, chaoimg
var gameover, gameimg
var reset, resetimg
var somorte, somsalto
var jogar
var estadodejogo=jogar
var estadodejogo=perder
var perder=0
var pontos=0


function preload() {
  
reximage=loadAnimation("trex1.png", "trex3.png", "trex4.png")
 
  
  nuvemimage=loadImage("cloud.png")
  
   obs1=loadImage("obstacle1.png")
   obs2=loadImage("obstacle2.png")
   obs3=loadImage("obstacle3.png")
   obs4=loadImage("obstacle4.png")
   obs5=loadImage("obstacle5.png")
   obs6=loadImage("obstacle6.png")
   gameimg=loadImage("gameOver.png")
   chaoimg=loadImage("ground2.png")
   resetimg=loadImage("restart.png")
   somorte=loadSound("morte.mp3")
   somsalto=loadSound("jump.mp3")
   rexcollideimg=loadImage("trex_collided.png")
  
}

function setup() {
  createCanvas(600,200)
  
  
  chao=createSprite(200,180, 400,20)
  chao.addImage(chaoimg)
  chao.velocityX=-6
  
  gameover=createSprite(300,100, 40,40)
  gameover.addImage(gameimg)
  gameover.scale=0.5
  gameover.visible=false
  
  reset=createSprite(300,135, 40, 40)
  reset.addImage(resetimg)
  reset.scale=0.4
  reset.visible=false
  
  
  rex=createSprite(50,160,20,50)
  rex.addAnimation("running", reximage)
  rex.addAnimation("collided", rexcollideimg)
  rex.scale=0.6
  
  
  solo=createSprite(200,190,400,20)
  solo.visible=false
  
  grupodeobs=createGroup()
  nuvemgroup=createGroup()
  
}

function draw() {
  background("white")
  
  
  if(estadodejogo===jogar) {
  
  
  if(keyDown("space")&&rex.y>=100)  {
    rex.velocityY=-10
    somsalto.play()
  }
  
   
    text("Pontuação:"+pontos, 500,20)
    
    if(frameCount%1===0){
      pontos=pontos+1
    }
    
  if(chao.x<0) {
    chao.x=chao.width/2
  }
    
    rex.velocityY=rex.velocityY+0.8  
    
  rex.collide(solo)
    
  nuvens()
    
  gerarobjetos() 
    
  if(grupodeobs.isTouching(rex)) {
    estadodejogo=perder;
    rex.changeAnimation("collided", rexcollideimg)
    somorte.play()
    
  }
  }
  
  
  
  if (estadodejogo===perder){
    chao.velocityX=0
    rex.velocityY=0
    gameover.visible=true
    reset.visible=true
    
    //COLOCAR A TROCA DE ANIMAÇÃO
    
    grupodeobs.setVelocityXEach(0) 
    nuvemgroup.setVelocityXEach(0)
  }
  
  if(mousePressedOver(reset)) {
    restart()
    pontos=perder
  }
  
  drawSprites()
  }
    
function restart(){
  estadodejogo=jogar
  gameover.visible=false
  reset.visible=false
  grupodeobs.destroyEach()
  nuvemgroup.destroyEach()
  chao.velocityX=-6
  rex.changeAnimation("running", reximage)
  
}

  
function nuvens() {
  if(frameCount%75===0) {
  nuvem=createSprite(650,100, 40,10)
  nuvem.y=Math.round(random(10,40))
  nuvem.addImage(nuvemimage)
  nuvem.scale=0.7
  nuvem.velocityX= -3 
  nuvem.lifetime=270
  nuvem.depth=rex.depth
  rex.depth=rex.depth+1
  nuvemgroup.add(nuvem) }
}
  
  function gerarobjetos() {
    if(frameCount%60===0) {
      var obstaculo=createSprite(650,165, 10,40)
      obstaculo.velocityX=-6 
      var obscase=Math.round(random(1,6))
      switch(obscase){
          case 1:
         obstaculo.addImage(obs1)
          break;
          
          case 2:
         obstaculo.addImage(obs2)
          break;
          
          case 3:
         obstaculo.addImage(obs3)
          break;
          
          case 4:
         obstaculo.addImage(obs4)
          break;
          
          case 5:
         obstaculo.addImage(obs5)
          break;
          
          case 6:
         obstaculo.addImage(obs6)
          break; }
      
     obstaculo.scale=0.5 
      grupodeobs.add(obstaculo)
  }
    
}