class Drip {
    //TODO why in the world are all the functions inside of the constructor?
    constructor(x, scale) {
        this.x = x;
        this.y = 0;
        this.scale = scale;
        this.hasHitBottom = false;
        this.counter = 0;


        //get x
        /*
        i guess javascript
        */
        this.getX = function () {
            return this.x;
        };

        this.hitBottom = function(){
            return this.hasHitBottom;
        };

        //set fill
        this.setFill = function () {
            if (!mouseIsPressed) {
                fill('#FDE1C8');
            }
            else {
                fill('#423D3D');
            }
        };

        //draw  current state
        this.render = function () {
            noStroke();
            this.setFill();
            ellipse(this.x, this.y, 3*scale, 3*scale);
            ellipse(this.x, this.y-3, 2*scale, 3*scale);
            ellipse(this.x, this.y-6, 1*scale, 2*scale);
            this.y= this.y+(1+this.counter);
            this.counter++;

            if (this.y>= height){
              //println(height);
              this.hasHitBottom = true;
            }
        };
    }
}
