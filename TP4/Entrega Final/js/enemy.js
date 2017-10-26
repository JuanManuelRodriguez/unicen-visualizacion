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