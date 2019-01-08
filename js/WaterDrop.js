var ledge = [];
const SCALE = 6;

var cnv;
var canvasDiv;

function setup() {

  //set up to fit in HTML DIV how come it only works when I have an ID of test
  canvasDiv = createDiv();
  canvasDiv.id("waterCanvas");
  canvasDiv.addClass("img-fluid mb-3 mb-lg-0");
  canvasDiv.parent("waterCanvasDiv");

  cnv = createCanvas(canvasDiv.size().width, 400);
  cnv.parent("waterCanvas");
  //initialize array
  for(var i = 0; i<width/(8*SCALE);i++){
    ledge[i] = new Drop((i*8*SCALE)+((width%(8*SCALE))/2), SCALE);
  }
  
}


function draw() {
    //reverse color scheme on button click
    if(mouseIsPressed){
      background(133);
    }else {
      background(0);
    }


  addDrop();

  for(var i = 0; i< ledge.length; i++){
    ledge[i].render();
  }

  update();
}

function windowResized() {
  resizeCanvas(canvasDiv.size().width, 400);
}

function update(){
  var s = ledge.length;

  for(var i = 0; i < s; i++){
    if ((ledge[i] instanceof Drip) && ledge[i].hitBottom()){
      ledge[i] = new Splash(ledge[i].getX(), SCALE);
    } 

    if ((ledge[i] instanceof Splash) && ledge[i].isComplete()){
      ledge[i] = new Drop((i*8*SCALE)+((width%(8*SCALE))/2), SCALE);
    } 

  }
}

function addDrop(){
  var i = int(random(0, ledge.length));
  
  if (ledge[i] instanceof Drop){
    if(ledge[i].addWater()){
      ledge[i] = new Drip(ledge[i].getX()+ (8*SCALE)/2, SCALE);
    }
  }
}