class Enemy {
  constructor(x, y) {
    this.y = y;
    this.x = x;
    this.div = document.getElementById('enemy');
    this.right = this.x + this.div.offsetWidth;
    this.bottom = this.y + this.div.offsetHeight;
  }

  update() {
    if (this.x < -50) {
      this.x = 1000;
      let topBot = Math.floor((Math.random()*2)+1);
      if(topBot == 1){
        this.y = 330;
      }
      else if(topBot == 2){
        this.y = 435;
      }
    }
    this.x -= 10;
    this.right = this.x + this.div.offsetWidth;
    this.bottom = this.y + this.div.offsetHeight;
  }

  draw(animation) {
    this.div.className = animation;
    this.div.style.left = this.x.toString() + 'px';
    this.div.style.top = this.y.toString() + 'px';
  }

}