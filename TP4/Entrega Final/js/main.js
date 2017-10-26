let gravity = 0.2;
let player = new Hero(0, 312);
let enemy = new Enemy(500, 340);

document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  switch (keyName) {
    case 'ArrowUp':
      if (player.ground) {
        player.addAcc(-7);
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
  const keyName = event.key;
  switch (keyName) {
    case 'ArrowDown':
      player.state = 'run';
      break;
  }
});

function update() {
  player.addAcc(gravity);
  player.floor();
  player.update();
  enemy.update();
  if(player.intersects(enemy)){
    console.log("asdf");
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
  }

  enemy.draw();
}

function mainLoop() {
  update();
  draw();
  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
