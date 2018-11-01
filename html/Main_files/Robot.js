class Robot {
  constructor() {

    this.TABLE = document.getElementById('DHtable');

    //Initializing all variables

    //n_frames: number of frames of robot
    //frames: array of all frames
    //frameTMs: array of all frame transformation matrices
    //frameRMs: array of all frame rotation matrices
    //framePMs: array of all frame position matrices
    //frameVs: array of all linear velocity matrices, first half of Jacobian
    //frameWs: array of all angular velocity matrices, second half of Jacobian
    //IM: identity matrix
    this.n_frames = 4;
    //this.frames = Array.apply(null, Array(this.n_frames).map(Number.prototype.valueOf, 0)); // empty
    this.frames = Array.apply(null, Array(this.n_frames));
    this.frameTMs = Array.apply(null, Array(this.n_frames));
    this.frameRMs = Array.apply(null, Array(this.n_frames));
    this.framePMs = Array.apply(null, Array(this.n_frames));
    this.frameVs = Array.apply(null, Array(this.n_frames));
    this.frameWs = Array.apply(null, Array(this.n_frames));
    this.IM = null;

    // For Jacobian calculation.
    this.Z11 = math.zeros(1, 3);
    this.frameVs[0] = math.zeros(1, 3);
    this.frameWs[0] = math.zeros(1, 3);

    this.symTM = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ];

    this.stringTM = '[' +
    '[cos(th), -sin(th), 0, a],' +
    '[sin(th)*cos(be), cos(th)*cos(be), -sin(be), -sin(be)*d],' +
    '[sin(th)*sin(be), cos(th)*sin(be), cos(be), cos(be)*d],' +
    '[0, 0, 0, 1]' +
    ']';

    this.nerdamerTM = nerdamer(this.stringTM)

    this.stringTM2 = [['cos(th)', '-sin(th)','0','a'],
          ['sin(th)*cos(be)', 'cos(th)*cos(be)', '-sin(be)', '-sin(be)*d'],
          ['sin(th)*sin(be)', 'cos(th)*sin(be)', 'cos(be), cos(be)*d'],
          ['0', '0', '0', '1']
        ];

    this.nerdamerTM2 = nerdamer.matrix(this.stringTM2[0],this.stringTM2[1],this.stringTM2[2],this.stringTM2[3])
    console.log(this.nerdamerTM2)
    console.log(this.nerdamerTM2.toString())
    this.nerdamerTM3 = nerdamer.matrix([this.nerdamerTM2.symbol.elements[0][3]],[this.nerdamerTM2.symbol.elements[1][3]],[this.nerdamerTM2.symbol.elements[2][3]])
    console.log(this.nerdamerTM3)
    console.log(this.nerdamerTM3.toString())
    console.log((nerdamer(this.nerdamerTM3, {d: 10, be: 45*0.01745329251, a: 15*0.01745329251}, ['numer'])).text('decimals'))
    this.nerdamerTM4 = this.nerdamerTM3.multiply(nerdamer.transpose(this.nerdamerTM3))
    console.log(this.nerdamerTM4)
    console.log(this.nerdamerTM4.toString())

    // TESTING WHATSUP WHATSUP
    // this.example1 = nerdamer.matrix(math.string(this.stringTM)); // stringTM input is 1 array.
    // console.log(this.stringTM.toString()); // This won't work because it spits array of arrays as all elements in string.
    // console.log("Example 2: ")
    // this.example2 = nerdamer.matrix(this.stringTM[0],this.stringTM[1],this.stringTM[2]); //stringTM.elements input is 3 arrays.
    // console.log(this.example2.toString())
    // console.log(this.example2.multiply('sin(y)').toString()) // Multiplication is possible. Also matrix multiplication is possible.

    // Working, but the conventional way (not using nerdamer.matrix)
    // console.log(nerdamer(this.nerdamerTM).symbol)
    // console.log(nerdamer(this.nerdamerTM.symbol.elements[0].elements[0]).multiply('th')) //This is how we multiply elements from a matrix with something.
    // console.log(nerdamer([this.nerdamerTM.symbol.elements[0].elements[0],this.nerdamerTM.symbol.elements[0].elements[1]]).toString())
    // console.log(nerdamer.transpose(nerdamer.matrix([this.nerdamerTM.symbol.elements[0].elements[0]],[this.nerdamerTM.symbol.elements[0].elements[1]]).multiply(5)))
    //console.log(nerdamer(this.nerdamerTM).evaluate())

    //console.log(nerdamer.diff(this.nerdTM.symbol.elements[0],'th'));
    //console.log("__________");
    //console.log(this.nerdTM.toString())



    //console.log(nerdamer.diff(nerdamer(this.nerdTM.toString()),'th'));


    // this.nerdTM1[0] = nerdamer.diff(nerdamer(this.stringTM[0]),'th');
    // this.nerdTM1[1] = nerdamer.diff(nerdamer(this.stringTM[1]),'th');
    // this.nerdTM2 = nerdamer.matrix(this.nerdTM1.toString());

    //console.log(this.nerdTM2.multiply('2').toString())

    // for (var i = 0; i < 3; i++) {
    //   this.symTMnerd[i] = nerdamer('[' + this.stringTM[i].toString() + ']');
    //   console.log(this.symTMnerd[i].toString());
    // }
    //
    // for (var i = 0; i < 3; i++) {
    //   this.symTMnerdDiff[i] = nerdamer('diff([' + this.stringTM[i].toString() + '], th, 1)');
    //   //this.symTMnerd[i] = nerdamer('diff([' + this.stringTM[i].toString() + '], th, 1)').toString();
    //   console.log(this.symTMnerdDiff[i].toString());
    // }
    // //console.log(this.symTMnerd)

  }

  calculateJacobian() {
    for (i = 0; i < this.n_frames; i++) {
      this.frameVs = updateIK(i)
    }
  }


  createFrame(i) { //Table is a string, values are numbers
    var be = Number(this.TABLE.rows[i + 1].cells[1].innerHTML) * 0.01745329251;
    var a = Number(this.TABLE.rows[i + 1].cells[2].innerHTML);
    var d = Number(this.TABLE.rows[i + 1].cells[3].innerHTML);
    var th = Number(this.TABLE.rows[i + 1].cells[4].innerHTML) * 0.01745329251;
    this.frames[i] = new Frame(be, a, d, th);
    // this.frames[i].updateTM(this.symTM);
    // this.frames[i].updateRM();
    // this.frames[i].updatePM();
    this.frames[i].updateType(0);
  }

  //can only update the angle or a prismatic distance
  updateFrameValues(frame, val) {
    if (frame.type == 0) { //revolute
      frame.updateAngles(val);
    } else if (frame.type == 1) { //prismatic
      frame.updateDistance(val);
    } else {
      alert("Error f<updateFrameValues> in Robot.js\nFrame type not specified.")
    }
  }

  compileSymTM() {
    var nodeTM = [null, null, null];
    for (var i = 0; i < 3; i++) {
      nodeTM[i] = math.parse(this.stringTM[i]);
      for (var j = 0; j < 4; j++) {
        this.symTM[i][j] = nodeTM[i][j].compile();
      }
    }
  }


  compileSymTMnerd() {

  }


  buildRobot() {
    //Update Table values;
    this.n_frames = this.TABLE.rows.length - 1;
    this.createIM(this.n_frames)
    this.TABLE = document.getElementById('DHtable');
    this.compileSymTM();
    for (var i = 0; i < this.n_frames; i++) {
      this.createFrame(i);
    };
  }

  createIM(numberOfFrames) {
    this.IM = math.identity(numberOfFrames);
  }

  updateFK(i) { //THIS IS WHERE THE PROBLEM IS
    if (i == 0) {
      this.frameTMs[0] = this.frames[0].TM;
    } else {
      // for (var i = 1; i < this.n_arms; i++) {
      this.frameTMs[i] = math.multiply(this.frameTMs[i - 1], this.frames[i].TM);
    }
    // }
  }

  updateIK(i) {
    if (i == 0) {
      continue
    } else {
      this.frameVMs[i] = this.updateVM(
        this.frameRMs[i],
        this.frameVMs[i - 1],
        this.frameWMs[i - 1],
        this.framePMs[i - 1],
        this.frames[i].properties.d,
        this.Z11,
        this.frames[i].type);

      this.frameWMs[i] = this.updateWM(
        this.frameRMs[i],
        this.frameWMs[i - 1],
        this.frames[i].properties.th,
        this.Z11,
        this.frames[i].type);
    }
  }

  updateVM(RM, VM, WM, PM, d, ZM, type) {
    if (type == 0) {
      vMatrix = math.multiply(math.transpose(RM), (VM + math.cross(WM, PM)));
    } else if (type == 1) {
      vMatrix = math.multiply(math.transpose(RM), (VM + math.cross(WM, PM))) + math.multiply(d, ZM);
    } else {
      alert("Error f<updateVM> in Robot.js\nFrame type not specified.")
    }
    return vMatrix;
  }

  updateWM(RM, WM, th, ZM, type) {
    if (type == 0) {
      wMatrix = math.multiply(math.transpose(RM), WM) + math.multiply(th, ZM);
    } else if (type == 1) {
      wMatrix = math.multiply(math.transpose(RM), WM);
    } else {
      alert("Error f<updateWM> in Robot.js\nFrame type not specified.")
    }
    return wMatrix;
  }

  updateXYZ(i) {
    // for (var i = 0; i < this.n_arms; i++) {
    if (i == 0) {
      this.frames[i].coordinates.x = [0, this.frameTMs[i][0][3]];
      this.frames[i].coordinates.y = [0, this.frameTMs[i][1][3]];
      this.frames[i].coordinates.z = [0, this.frameTMs[i][2][3]];
    } else {
      this.frames[i].coordinates.x = [this.frameTMs[i - 1][0][3], this.frameTMs[i][0][3]];
      this.frames[i].coordinates.y = [this.frameTMs[i - 1][1][3], this.frameTMs[i][1][3]];
      this.frames[i].coordinates.z = [this.frameTMs[i - 1][2][3], this.frameTMs[i][2][3]];
    }
    // }
  }

  updateRobot() { //put everything here when we need to update the robot
    for (var i = 0; i < this.n_frames; i++) {
      this.frames[i].updateTM(this.symTM);
      this.frames[i].updateRM();
      this.frames[i].updatePM();
      //this.updateFK(i);
      //this.updateXYZ(i);
    }
  }

  updateRobot2() {
    for (var i = 0; i < this.n_frames; i++) {
      // this.frames[i].updateTM();
      this.updateIK(i);
    }
  }
  //console.log(this.arms);
  //console.log(this.armTMs);
  // console.log(this.arms[1].coordinates.x[0])
  // console.log(this.arms[1].coordinates.x[1])
}


// createIM() {
//   var IM = Array.apply(null, Array(this.n_arms).map(Number.prototype.valueOf, 0));
//   for (var i = 0; i < this.n_arms; i++) {
//     IM[i] = Array.apply(null, Array(this.n_arms).map(Number.prototype.valueOf, 0));
//     for (var j = 0; j < this.n_arms; j++) {
//       if (i == j) {
//         IM[i][j] = 1;
//       } else {
//         IM[i][j] = 0;
//       }
//     }
//   }
// }
