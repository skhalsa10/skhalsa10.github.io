var cnv;
var canvasDiv;



function setup() {
  canvasDiv = createDiv();
  canvasDiv.parent("test");
  canvasDiv.id("waterCanvas");
  canvasDiv.addClass("img-fluid mb-3 mb-lg-0");
  //console.log(width);
  //console.log(windowWidth);
  console.log(canvasDiv.size().width);
  console.log(canvasDiv.size().height);
  cnv = createCanvas(canvasDiv.size().width, 400);
  cnv.parent("waterCanvas");
  //resizeCanvas(windowWidth, windowHeight);
  //centerCanvas();
}

function windowResized() {
  resizeCanvas(canvasDiv.size().width, 400);
}

function draw() {
  if(mouseIsPressed){
    background(150);
  }else {
    background(30);
  }
 
}