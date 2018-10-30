class Frame {
  constructor(be, a, d, th) {

    this.type = null; // type of frame: 0 if revolute, 1 if prismatic.

    this.properties = { // angles and distances from DH parameters.
      be: be,
      a: a,
      d: d,
      th: th,
    }

    this.TM = [ // transformation matrix.
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [0, 0, 0, 1]
    ];

    this.RM = [ // rotation matrix.
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    this.PM = [ // position matrix.
      [null],
      [null],
      [null]
    ];

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


  updateTM(symTM) { // Takes symbolic transformation matrix and evaluates using 'properties' values.
    console.log(symTM)
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        this.TM[i][j] = symTM[i][j].eval(this.properties);
      }
    }
    console.log(this.TM)
  }


  updateRM() { // Updates rotation matrix from transformation matrix.
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        this.RM[i][j] = this.TM[i][j];
      }
    }
  }


  updatePM() { // Updates position matrix from transformation matrix.
    for (var i = 0; i < 3; i++) {
      this.PM[i][0] = this.TM[i][3];
    }
  }


  // updateCoordinates(cord, val) { //NOT SURE IF THIS WORK. BUT IF IT WORKS, ITS DOPE!!!
  //   this.cordinate.cord = val;
  // }

}
