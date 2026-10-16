let drops = [];
let canvas;

function setup() {
  canvas = createCanvas(
    select("#water-canvas-fig").size().width,
    select("#water-canvas-fig").size().height
  );
  canvas.parent("#water-canvas-div");
  canvas.id("water");

  for (let i = 0; i < 500; i++) {
    drops.push(new Raindrop());
  }
}

function draw() {
  if (mouseIsPressed) {
    background(133);
  } else {
    background("#423D3D");
  }

  for (let i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].render();
  }
}

function windowResized() {
  resizeCanvas(
    select("#water-canvas-fig").size().width,
    select("#water-canvas-fig").size().height
  );
}
