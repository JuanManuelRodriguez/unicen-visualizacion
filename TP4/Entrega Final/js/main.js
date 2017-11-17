let gravity = 0.3;
let player = new Hero(0, 312);
let enemy = new Enemy(1000, 330);
let points = 0;
let gameContainer=$('#game-over');

document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  switch (keyName) {
    case 'ArrowUp':
      if (player.ground) {
        player.addAcc(-10);
        player.state = 'jump';
        player.ground = false;
      }
      break;
    case 'ArrowDown':
      player.state = 'slide';
      break;
  }
});
document.addEventListener('keyup', (event) => {
  if(player.state != 'dead'){
    const keyName = event.key;
    switch (keyName) {
      case 'ArrowDown':
        player.state = 'run';
        break;
    }
  }
});

function update() {
  if(player.state != 'dead'){
    player.addAcc(gravity);
    player.floor();
    player.update();
    enemy.update();
    points+= 0.1;
    document.getElementById('points').innerHTML= 'Points: '+points.toFixed(0);
    if(player.intersects(enemy)){
      if(!(enemy.y == 330 && player.state == 'slide' || enemy.y == 435 && player.state == 'jump')){
        console.log("Has muerto");
        if(player.y < 312){
          player.y = 312;
        }
        player.state = 'dead';
        document.getElementById('layer1').style.animationPlayState='paused';
        document.getElementById('layer2').style.animationPlayState='paused';
        document.getElementById('layer3').style.animationPlayState='paused';
        document.getElementById('layer4').style.animationPlayState='paused';
        document.getElementById('layer5').style.animationPlayState='paused';

        //modal de GAME OVER
        gameContainer.addClass('game-over text-center text-white');
        let perdio=`PERDIO <br> Su puntaje es: ${points.toFixed(0)} <br> Presione F5 para volver a jugar`;
        gameContainer.append(perdio);
      }
    }
  }
}

function draw() {
  switch (player.state) {
    case 'run':
      player.draw('run');
      break;
    case 'jump':
      player.draw('jump');
      break;
    case 'slide':
      player.draw('slide');
      break;
    case 'dead':
      player.draw('dead');
      break;
  }

  enemy.draw('fly');
}

function mainLoop() {
  update();
  draw();
  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
