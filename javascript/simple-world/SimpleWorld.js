class SimpleWorld {
  constructor(scale, gridWidth, gridHeight) {
    this._scale = scale;
    this._gridWidth = gridWidth;
    this._gridHeight = gridHeight;
    this.grid = [];
    for (let x = 0; x < this._gridWidth; x++) {
      this.grid[x] = [];
      for (let y = 0; y < this._gridHeight; y++) {
        this.grid[x][y] = null;
      }
    }
  }

  step() {
    //print("WORLD STEP BEGINS");
    let loop = Math.trunc(this._gridWidth * this._gridHeight);
    if (loop === 0) {
      loop = 1;
    }

    while (loop > 0) {
      //print("loop is " + loop);
      let xr = Math.trunc(random(this._gridWidth));
      let yr = Math.trunc(random(this._gridHeight));
      if (this.grid[xr][yr] !== null) {
        //print("this.grid[xr][yr] instance of Plant is " + this.grid[xr][yr] instanceof Plant);
        this.grid[xr][yr].step(world, xr, yr);
      }
      loop--;
    }
    //print("WORLD STEP ENDS");
  }


  get gridWidth() {
    return this._gridWidth;
  }

  get gridHeight() {
    return this._gridHeight
  }

  getCell(x, y) {
    x = Math.trunc(x);
    y = Math.trunc(y);
    if (!this.exists(x, y)) {
      return null;
    }
    return this.grid[x][y];
  }

  exists(x, y) {
    x = Math.trunc(x);
    y = Math.trunc(y);
    if ((x >= 0 && x < this._gridWidth) && (y >= 0 && y < this._gridHeight)) {
      return true;
    } else {
      return false;
    }
  }

  clearCell(x, y) {
    x = Math.trunc(x);
    y = Math.trunc(y);
    if (!this.exists(x, y)) {
      return null;
    }
    let temp = this.grid[x][y];
    this.grid[x][y] = null;
    return temp;
  }

  setCell(x, y, cell) {
    x = Math.trunc(x);
    y = Math.trunc(y);
    if (!this.exists(x, y)) {
      println("error in setcell");
      return;
    }
    if(this.grid[x][y] !==null){
      delete this.grid[x][y]
      this.grid[x][y] = null;
    }
    this.grid[x][y] = cell;
  }

  render() {
    //print("starting to render the world");
    for (let x = 0; x < this._gridWidth; x++) {
      for (let y = 0; y < this._gridHeight; y++) {
        if (this.grid[x][y] != null) {
          this.grid[x][y].render(x, y, this._scale);
        }
      }
    }
    //print("finished rendering world");
  }

}
