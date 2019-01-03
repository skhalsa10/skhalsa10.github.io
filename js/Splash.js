class Splash {
    constructor(x, scale) {
        this.x1 = x;
        this.x2 = x;
        this.x3 = x;
        this.y1 = height;
        this.y2 = height;
        this.y3 = height;
        this.scale = scale;
        this.vel1 = -int(random(1,7));
        this.vel2 = int(random(-1,1));
        this.vel3 = int(random(1,7));
        this.frame = 10;
        this.counter = 0;


        //get x
        this.getX = function () {
            return this.x;
        };


        //set fill
        this.setFill = function () {
            if (!mouseIsPressed) {
                fill(133);
            }
            else {
                fill(0);
            }
        };

        //draw  current state
        this.render = function() {
            noStroke();
            this.setFill();
            ellipse(this.x1, this.y1, 1*scale, 1*scale);
            ellipse(this.x2, this.y2, 1*scale, 1*scale);
            ellipse(this.x3, this.y3, 1*scale, 1*scale);
            this.update();
        };

        this.update = function(){
            this.update1();
            this.update2();
            this.update3();
            this.frame--;
        };

        this.update1 = function(){
            if((this.frame <= 0)&& this.y1 >= height-1){
                this.y1 = height-1;
                return;
              }
              this.x1 += this.vel1;
              if(this.frame>0){
                this.y1 -=(3);
              }else{
                this.y1 +=(3);
              }
        };

        this.update2 = function(){
            if((this.frame <= 0)&&this.y2 >= height-1){
                this.y2 = height-1;
                return;
              }
              this.x2 += this.vel2;
              if(this.frame>0){
                this.y2 -=(3);
              }else{
                this.y2 +=(3);
              } 
        };

        this.update3 = function(){
            if((this.frame <= 0)&&this.y3 >= height-1){
                this.y3 = height-1;
                return;
              }
              this.x3 += this.vel3;
              if(this.frame>0){
                this.y3 -=(3);
              }else{
                this.y3 +=(3);
              }
        };

        this.isComplete = function(){
            if((this.frame<=0)&& (this.y1 <= height) && 
            (this.y2 <= height) && (this.y3 <= height)){
                if(this.counter == 100){
                    return true;
                }else {
                    this.counter++;  
                }
            }
                return false;
        };
    }
}

