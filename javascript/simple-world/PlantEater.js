class PlantEater {

  constructor(myHue, isFirst) {
    this.scale = SCALE;
    this.isFirst = isFirst;
    this.myHue = myHue;
    this.REPLICATE_MAGIC = 100;
    this.DEATH_MAGIC = 50;
    this.tillReplicate = this.REPLICATE_MAGIC;
    this.tillDeath = this.DEATH_MAGIC;
    this.foodFound = false;
    this.world = world; //may need to add this as a param
  }

  step(world, x, y) {
    //print("PlantEater step begin");
    // force integer type
    x = Math.trunc(x);
    y = Math.trunc(y);

    this.foodFound = false;
    //see if food is around should I randomize this?
    this.checkForFoodRand(x, y);
    if (this.foodFound) {

      this.isFirst = false;
      this.tillDeath = this.DEATH_MAGIC;

      if (this.tillReplicate == 0) {

        this.tillReplicate = this.REPLICATE_MAGIC;
        world.setCell(x, y, new PlantEater(this.myHue + 10, false));
      }
      //print("PlantEater step end");
      return;
    }

    if (!this.isFirst) {

      this.tillDeath--;
    }

    if (this.tillDeath == 0) {
      delete world.clearCell(x, y);
      //print("PlantEater step end");
      return;
    }
    this.moveRandom(x, y);
    //print("PlantEater step end");
  }

  checkForFoodRand(x, y) {
    //print("checkForFoodRand begin");
    // force integer type
    x = Math.trunc(x);
    y = Math.trunc(y);

    let allDir = [false, false, false, false];
    let dir = -1;
    while (!(allDir[0] && allDir[1] && allDir[2] && allDir[3])) {

      dir = Math.trunc(random(4));
      //print("dir = " + dir);
      //north
      if (dir === 0 && !allDir[0]) {
        allDir[0] = true;
        this.checkForFood(x, y, x, y - 1);
      }
      //east
      if (dir === 1 && !allDir[1]) {
        allDir[1] = true;
        this.checkForFood(x, y, x + 1, y);
      }
      //south
      if (dir === 2 && !allDir[2]) {
        allDir[2] = true;
        this.checkForFood(x, y, x, y + 1);
      }
      //west
      if (dir === 3 && !allDir[3]) {
        allDir[3] = true;
        this.checkForFood(x, y, x - 1, y);
      }
    }
    //print("checkForFoodRand ends");
  }

  moveRandom(x, y) {

    // force integer type
    x = Math.trunc(x);
    y = Math.trunc(y);

    let direction = Math.trunc(random(4));
    if (direction == 0) {
      this.move(x, y, x, y - 1);
    }
    if (direction == 1) {
      this.move(x, y, x + 1, y);
    }
    if (direction == 2) {
      this.move(x, y, x, y + 1);
    }
    if (direction == 3) {
      this.move(x, y, x - 1, y);
    }
  }

  move(x, y, a, b) {
    // force integer type
    x = Math.trunc(x);
    y = Math.trunc(y);
    a = Math.trunc(a);
    b = Math.trunc(b);

    if (this.world.exists(a, b) && this.world.getCell(a, b) == null) {
      this.world.setCell(a, b, this.world.clearCell(x, y));
    }
  }

  checkForFood(x, y, a, b) {
    //print("checkForFood has begun");
    // force integer type
    x = Math.trunc(x);
    y = Math.trunc(y);
    a = Math.trunc(a);
    b = Math.trunc(b);
    //let testbool = !this.foodFound && this.world.exists(a, b);
    //print(testbool);
    if (!this.foodFound && this.world.exists(a, b)) {
      //print("ENTERED");
      //let test2 = this.world.getCell(a, b) instanceof Plant;
      //print("test2 = " + test2);
      if (this.world.getCell(a, b) instanceof Plant) {
        this.foodFound = true;
        delete this.world.clearCell(a, b);
        this.world.setCell(a, b, this.world.clearCell(x, y));
        this.tillReplicate--;
      }
    }
    //print("checkForFood has ended");
  }

  render(x, y, l) {
    // print("rendering a plant eater");
    // print("myHue: " + this.myHue);
    // print("x: " + x);
    // print("y: " + y);
    // print("l: " + l);
    colorMode(HSB, 360, 100, 100, 100);
    fill(this.myHue, 100, 100);
    ellipseMode(CORNER);
    circle(x * l, y * l, this.scale);
  }
}
