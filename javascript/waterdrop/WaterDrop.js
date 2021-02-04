var ledge = [];
const SCALE = 3;

var canvas;


function setup() {


  canvas = createCanvas(select('#water-canvas-fig').size().width, select('#water-canvas-fig').size().height);
  print(select('#water-canvas-fig').size().width);
  canvas.parent('#water-canvas-div');
  canvas.id('water');

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
      background('#423D3D');
    }


  addDrop();

  for(var i = 0; i< ledge.length; i++){
    ledge[i].render();
  }

  update();
}

 function windowResized() {
   resizeCanvas(select('#water-canvas-fig').size().width, select('#water-canvas-fig').size().height);

   ledge.length = int(width/(8*SCALE));
   for(var i = 0; i< ledge.length;i++){
     if(ledge[i] == null){
       ledge[i] = new Drop((i*8*SCALE)+((width%(8*SCALE))/2), SCALE);
     }else if(ledge[i] instanceof Drop && ledge[i].waterState>1){
       ledge[i] = new Drip(ledge[i].getX()+ (8*SCALE)/2, SCALE);
     }
   }

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
