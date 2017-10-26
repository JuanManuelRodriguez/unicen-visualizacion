class Hero {
  constructor(x, y) {
    this.y = y;
    this.x = x;
    this.div = document.getElementById('hero');
    this.acc = 0;
    this.vel = 0;
    this.state = 'jump';
    this.ground = true;
    this.right = this.x + this.div.offsetWidth;
    this.bottom = this.y + this.div.offsetHeight;
  }

  update() {
    this.vel += this.acc;
    this.y += this.vel;
    this.acc = 0;
    if (this.y >= 312 && this.state == 'jump') {
      this.ground = true;
      this.state = 'jump';
    }
    this.right = this.x + this.div.offsetWidth;
    this.bottom = this.y + this.div.offsetHeight;
  }

  draw(animation) {
    this.div.className = animation;
    this.div.style.left = this.x.toString() + 'px';
    this.div.style.top = this.y.toString() + 'px';
  }

  addAcc(acc) {
    this.acc += acc;
  }

  floor() {
    if (this.y >= 312) {
      this.vel *= 0;
      this.y = 312;
    }
  }

  intersects(other) {

    let left = this.x;
    let right = this.right;
    let top = this.y;
    let bottom = this.bottom;
    let oLeft = other.x;
    let oRight = other.right ;
    let oTop = other.y;
    let oBottom = other.bottom;
    return !(left > oRight || right < oLeft );
    
  }

}