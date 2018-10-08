class Robot {
  constructor() {

    this.TABLE = document.getElementById('DHtable');

    this.n_frames = null;
    this.frames = Array.apply(null, Array(this.n_frames).map(Number.prototype.valueOf, 0)); // empty
    this.frameTMs = Array.apply(null, Array(this.n_frames).map(Number.prototype.valueOf, 0));
    this.IM = null;

  }

  createFrame(i) { //Table is a string, values are numbers
    var be = Number(this.TABLE.rows[i + 1].cells[1].innerHTML) * 0.01745329251;
    var a = Number(this.TABLE.rows[i + 1].cells[2].innerHTML);
    var d = Number(this.TABLE.rows[i + 1].cells[3].innerHTML);
    var th = Number(this.TABLE.rows[i + 1].cells[4].innerHTML) * 0.01745329251;
    this.frames[i] = new Frame(be, a, d, th);
    this.frames[i].updateTM();
    this.frames[i].updateType(0);
  }

  //can only update the angle or a prismatic distance
  updateFrameValues(frame, val) {
    if (frame.type == 0) { //revolute
      frame.updateAngles(val);
    }
    else if (frame.type == 1) { //prismatic
      frame.updateDistance(val);
    }
    else {
      alert("Error f<updateFrame> in Robot.js")
    }
  }

  buildRobot() {
    //Update Table values;
    this.n_frames = this.TABLE.rows.length - 1;
    this.createIM(this.n_frames)
    this.TABLE = document.getElementById('DHtable');
    for (var i = 0; i < this.n_frames; i++) {
      console.log(i);
      this.createFrame(i);
    };
  }

  createIM(numberOfFrames) {
    this.IM = math.identity(numberOfFrames);
  }

  updateFwKin(i) { //THIS IS WHERE THE PROBLEM IS
    if (i == 0) {
      this.frameTMs[0] = this.frames[0].TM;
    } else {
      // for (var i = 1; i < this.n_arms; i++) {
      this.frameTMs[i] = math.multiply(this.frameTMs[i - 1], this.frames[i].TM);
    }
    // }
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
      this.frames[i].updateTM();
      this.updateFwKin(i);
      this.updateXYZ(i);
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

}
