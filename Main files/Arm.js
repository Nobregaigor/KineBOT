class Arm {
  constructor(be, a, d, th) {

    this.type = null;

    this.properties = {
      be: be,
      a: a,
      d: d,
      th: th,
    }

    this.TM = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [0, 0, 0, 1]
    ];

    this.coordinates = {
      x: [null, null],
      y: [null, null],
      z: [null, null],
    }

  }

  updateType(val) {
    // if ((isNaN(this.properties.d) == true) && (isNaN(this.properties.th) == false)) {
    //   this.type = 1;
    // } else if ((isNaN(this.properties.th) == false) && (isNaN(this.properties.d) == true)) {
    //   this.type = 0;
    // } else {
    //   alert("Error f<updateType> in Arms.js\nPlease, check links.");
    // }
    this.type = val; // 0 is revolute and 1 is prismatic
  }

  updateAngles(val) {
    this.properties.th = val * 0.01745329251; //(Math.PI/180);
  }
  updateDistance(val) {
    this.properties.d = val;
  }

  updateTM() {
    this.TM[0][0] = Math.cos(this.properties.th);
    this.TM[0][1] = -1 * Math.sin(this.properties.th);
    this.TM[0][2] = 0;
    this.TM[0][3] = this.properties.a;

    this.TM[1][0] = Math.sin(this.properties.th) * Math.cos(this.properties.be);
    this.TM[1][1] = Math.cos(this.properties.th) * Math.cos(this.properties.be);
    this.TM[1][2] = -Math.sin(this.properties.be);
    this.TM[1][3] = -Math.sin(this.properties.be) * this.properties.d;

    this.TM[2][0] = Math.sin(this.properties.th) * Math.sin(this.properties.be);
    this.TM[2][1] = Math.cos(this.properties.th) * Math.sin(this.properties.be);
    this.TM[2][2] = Math.cos(this.properties.be);
    this.TM[2][3] = Math.cos(this.properties.be) * this.properties.d;
  }


  updateCoordinates(cord, val) { //NOT SURE IF THIS WORK. BUT IF IT WORKS, ITS DOPE!!!
    this.cordinate.cord = val;
  }

}
