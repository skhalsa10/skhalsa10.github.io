let canvas; //may need to be var instead of let?
let world;
const SCALE = 15;
let gw;
let gh;
let originalWidth;
let originalHeight;
let newWidth;
let newHeight;
let initCanvasWidth;
let initCanvasHeight;

function setup() {
  initCanvasWidth = select('#simpleworld-canvas-fig').size().width;
  initCanvasHeight = select('#simpleworld-canvas-fig').size().height;
  originalWidth = 1344;
  originalHeight = 756;

  newWidth = initCanvasWidth;
  newHeight = initCanvasHeight;
  canvas = createCanvas(initCanvasWidth, initCanvasHeight);
  canvas.parent('#simpleworld-canvas-div');
  canvas.id('simpleworld');

  gw = originalWidth / SCALE;
  gh = originalHeight / SCALE;

  world = new SimpleWorld(SCALE, gw, gh);

  let ranW = Math.trunc(random(gw));
  let ranH = Math.trunc(random(gh));
  world.setCell(ranW, ranH, new Plant(108));
  ranW = Math.trunc(random(gw));
  ranH = Math.trunc(random(gh));
  world.setCell(ranW, ranH, new PlantEater(108, true));

  print("canvas width: " + canvas.size().width);
  print("canvas height: " + canvas.size().height);


}


function draw() {
  scale((newWidth / originalWidth), (newHeight / originalHeight));

  if (mouseIsPressed) {
    background(94);
  } else {
    background('#423D3D');
  }
  if (world !== null) {
    world.render();
    world.step();
  }
}





// function mouseClicked() {
//   noLoop();
// }

function windowResized() {

  newWidth = select('#simpleworld-canvas-fig').size().width;
  newHeight = select('#simpleworld-canvas-fig').size().height;

  print("(newWidth/originalWidth) = " + (newWidth / originalWidth));
  print("(newHeight/originalHeight) = " + (newHeight / originalHeight));
  resizeCanvas(newWidth, newHeight);


}
