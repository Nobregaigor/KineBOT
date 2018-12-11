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

    // Here we take stringTM2 and we take each row and use it on nerdamer to create a full 4x4 matrix called nerdamerTM2
    console.log('    stringTM2 converted to matrix 4x4 (nerdamerTM2)')
    this.nerdamerTM2 = nerdamer.matrix(this.stringTM2[0],this.stringTM2[1],this.stringTM2[2],this.stringTM2[3])
    console.log(this.nerdamerTM2)
    console.log(this.nerdamerTM2.toString())
    // Here we extract the position matrix 3x1 from nerdamerTM2
    console.log('    extracted position matrix from nerdamerTM2 and converted to matrix 3x1 (nerdamerTM3)')
    this.nerdamerTM3 = nerdamer.matrix([this.nerdamerTM2.symbol.elements[0][3]],[this.nerdamerTM2.symbol.elements[1][3]],[this.nerdamerTM2.symbol.elements[2][3]])
    console.log(this.nerdamerTM3)
    console.log(this.nerdamerTM3.toString())
    // Here we substitute symbolic variables for values to get the values of the position matrix
    console.log((nerdamer(this.nerdamerTM3, {d: 10, be: 45*0.01745329251, a: 15*0.01745329251}, ['numer'])).text('decimals'))
    // Here we take the transpose of nerdamerTM3 and multiply it by itself to test this ability
    console.log('    transpose of nerdamerTM3 multiplied by nerdamerTM3 results in 3x3 (nerdamerTM4)')
    this.nerdamerTM4 = this.nerdamerTM3.multiply(nerdamer.transpose(this.nerdamerTM3))
    console.log(this.nerdamerTM4)
    console.log(this.nerdamerTM4.toString())


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
