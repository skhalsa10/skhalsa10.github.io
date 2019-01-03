class Drop {
    constructor(x, scale) {
        this.x = x;
        this.scale = scale;
        this.waterState = 0;
        this.readyToDrop = false;

        //adds water
        this.addWater = function () {
            if (this.waterState == 4) {
                this.readyToDrip = true;
                this.waterState = 0;
                return true;
            }
            else {
                this.waterState++;
                return false;
            }
        };

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
        this.render = function () {
            if (this.waterState == 0) {
                return;
            }
            if (this.waterState == 1) {
                noStroke();
                //fill(133);
                this.setFill();
                ellipse(this.x + 2 * scale, 1, 4 * scale, 2 * scale);
                return;
            }
            if (this.waterState == 2) {
                noStroke();
                this.setFill();
                ellipse(this.x, 1, 4 * scale, 2 * scale);
                ellipse(this.x + 4 * scale, 1, 4 * scale, 2 * scale);
                return;
            }
            if (this.waterState == 3) {
                noStroke();
                this.setFill();
                ellipse(this.x, 1, 4 * scale, 2 * scale);
                ellipse(this.x + 4, 1, 4 * scale, 2 * scale);
                ellipse(this.x + 2, 1, 4 * scale, 2 * scale);
                return;
            }
            if (this.waterState == 4) {
                noStroke();
                this.setFill();
                ellipse(this.x, 1, 4 * scale, 2 * scale);
                ellipse(this.x + 4 * scale, 1, 4 * scale, 2 * scale);
                ellipse(this.x + 2 * scale, 1, 4 * scale, 2 * scale);
                ellipse(this.x + 2 * scale, 3, 4 * scale, 2 * scale);
                return;
            }
        };
    }
}

