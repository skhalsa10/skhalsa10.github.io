/**
 *  This is a plant cell it take totalSteps before it expands
 *  After it expands it no longer grows anymore.
 **/
class Plant {

  constructor(myHue) {
    this.scale = SCALE;
    this.maxSteps = 25;
    this.isExpanded = false;
    this.steps = 1;
    this.myHue = (myHue % 360);
  }

  step(world, x, y) {
    //print("Plant step begin");
    // force integer type
    x = Math.trunc(x);
    y = Math.trunc(y);

    if (this.isExpanded) {
      return;
    }
    this.steps++;
    if (this.steps === this.maxSteps) {
      this.isExpanded = true;
      this.expand(world, x, y);
    }
    //print("Plant step End");
  }

  //this will add more plants to the board.
  expand(world, x, y) {

    // force integer type
    x = Math.trunc(x);
    y = Math.trunc(y);

    //expand north
    if (world.exists(x, y - 1) && (world.getCell(x, y - 1) == null)) {
      world.setCell(x, y - 1, new Plant(this.myHue++));
    }
    //expand east
    if (world.exists(x + 1, y) && (world.getCell(x + 1, y) == null)) {
      world.setCell(x + 1, y, new Plant(this.myHue++));
    }
    //expand south
    if (world.exists(x, y + 1) && (world.getCell(x, y + 1) == null)) {
      world.setCell(x, y + 1, new Plant(this.myHue++));
    }
    //expand west
    if (world.exists(x - 1, y) && (world.getCell(x - 1, y) == null)) {
      world.setCell(x - 1, y, new Plant(this.myHue++));
    }
  }

  //this will render the current state of this cell
  render(x, y, l) {

    colorMode(HSB, 360, 100, 100, 100);
    noStroke();
    fill(this.myHue, 100, 40);

    if (!this.isExpanded) {

      let rectx = ((x * this.scale) + (l / 2));
      let recty = ((y * this.scale) + (l / 2));
      let rectw = (l * (this.steps / this.maxSteps));
      let recth = (l * (this.steps / this.maxSteps));
      // print("rectx = " + rectx);
      // print("recty = " + recty);
      // print("rectw = " + rectw);
      // print("recth = " + recth);
      rectMode(CENTER);

      // rect(rectx, recty, rectw, recth);
      rect(Math.round(rectx), Math.round(recty), Math.round(rectw), Math.round(recth));
    } else {
      //print("RENDERING PLANT is expanded");
      rectMode(CORNER);
      rect(Math.round((x * this.scale)), Math.round((y * this.scale)), Math.round(l), Math.round(l));
    }
  }
}
