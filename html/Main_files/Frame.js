class Frame {
  constructor(be, a, d, th) {

    this.type = null; // type of frame: 0 if revolute, 1 if prismatic.

    this.properties = { // angles and distances from DH parameters.
      be: be,
      a: a,
      d: d,
      th: th,
    }

    this.symTM = null; // Different symbolic and numerical matrices for calculations
    this.TM = null;
    this.RM = null;
    this.PM = null;

    this.coordinates = { // coordinates of frame for plotting purposes.
      x: [null, null],
      y: [null, null],
      z: [null, null]
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


  updateAngles(val) { // Updates angle values 'th' of 'properties' values.
    this.properties.th = val * 0.01745329251; // (Math.PI/180);
  }


  updateDistance(val) { // Updates distance values 'd' of 'properties' values.
    this.properties.d = val;
  }


  createTM(stringTM) { // Takes general stringTM and converts it to symbolicTM.
    this.symTM = nerdamer.matrix(stringTM[0],stringTM[1],stringTM[2],stringTM[3]);
  }


  updateTM() { // Updates transformation matrix, converts from symbolic to numerical.
    this.TM = nerdamer(this.symTM, this.properties, ['numer']);
  }


  updateRM() { // Updates rotation matrix from transformation matrix.
    this.RM = nerdamer.matrix(this.TM.symbol.elements[0].slice(0,3),this.TM.symbol.elements[1].slice(0,3),this.TM.symbol.elements[2].slice(0,3))
  }


  updatePM() { // Updates position matrix from transformation matrix.
    this.PM = nerdamer.matrix([this.TM.symbol.elements[0][3]],[this.TM.symbol.elements[1][3]],[this.TM.symbol.elements[2][3]])
  }


  // updateCoordinates(cord, val) { //NOT SURE IF THIS WORK. BUT IF IT WORKS, ITS DOPE!!!
  //   this.cordinate.cord = val;
  // }

}
