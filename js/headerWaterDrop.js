var waterDrop1 = function(p) {
  //empty ledge dont need to set the size in javascript it handles growing it accordingle
  p.ledge = [];
  //this will change the rendor size play with the numbers here!
  p.SCALE = 2;

  //I needed to create these to get it on the website the way I wanted
  p.canvas = null;

  p.setup = function() {
    //processing library that you can draw on
    p.canvas = createCanvas(select('header').size().width, select('header').size().height);
    p.canvas.parent('water-canvas-div');
    p.canvas.id('water');


    print('canvas: ' + canvas.size());

    //initialize array the size changes by the scale to fit in the width
    for (var i = 0; i < width / (8 * p.SCALE); i++) {
      p.ledge[i] = new Drop((i * 8 * p.SCALE) + ((width % (8 * p.SCALE)) / 2), p.SCALE);
    }
  }

  p.draw = function() {
    //reverse color scheme on button click
    if (mouseIsPressed) {
      background(133);
    } else {
      background(0);
    }


    p.addDrop();

    //render every particle
    for (var i = 0; i < p.ledge.length; i++) {
      p.ledge[i].render();
    }

    p.update();
  }

  p.update = function(){
    var s = p.ledge.length;

    //converts Drips to Splashes
    for (var i = 0; i < s; i++) {
      if ((p.ledge[i] instanceof Drip) && p.ledge[i].hitBottom()) {
        p.ledge[i] = new Splash(p.ledge[i].getX(), p.SCALE);
      }

      //converts splashes back to Drops
      if ((ledge[i] instanceof Splash) && ledge[i].isComplete()) {
        ledge[i] = new Drop((i * 8 * SCALE) + ((width % (8 * SCALE)) / 2), SCALE);
      }

    }
  }

  p.addDrop = function() {
    var i = int(random(0, p.ledge.length));

    if (p.ledge[i] instanceof Drop) {
      if (p.ledge[i].addWater()) {
        p.ledge[i] = new Drip(p.ledge[i].getX() + (8 * p.SCALE) / 2, p.SCALE);
      }
    }
  }
}

var myp51 = new p5(waterDrop1);
