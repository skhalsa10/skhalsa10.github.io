class Raindrop {
  constructor() {
    this.x = random(width);
    this.y = random(-500, -50);
    this.z = random(0, 20); // depth for parallax
    this.len = map(this.z, 0, 20, 10, 20);
    this.yspeed = map(this.z, 0, 20, 1, 20);
  }

  fall() {
    this.y = this.y + this.yspeed;
    // Add a little bit of gravity effect based on depth
    let grav = map(this.z, 0, 20, 0, 0.2);
    this.yspeed = this.yspeed + grav;

    if (this.y > height) {
      this.y = random(-200, -100);
      this.yspeed = map(this.z, 0, 20, 4, 10);
      // Optional: simulate splash on bottom
      // this.splash();
    }
  }

  render() {
    let thick = map(this.z, 0, 20, 1, 3);
    strokeWeight(thick);
    if (!mouseIsPressed) {
      stroke('#ff9955');
    } else {
      stroke('#423D3D');
    }
    line(this.x, this.y, this.x, this.y + this.len);
  }
}
