class Robot {
  constructor() {

    this.TABLE = document.getElementById('DHtable');

    this.n_arms = this.TABLE.rows.length - 1;
    this.arms = Array.apply(null, Array(this.n_arms).map(Number.prototype.valueOf, 0)); // empty
    this.armTMs = Array.apply(null, Array(this.n_arms).map(Number.prototype.valueOf, 0));

  }

  createArm(i) { //Table is a string, values are numbers
    var be = Number(this.TABLE.rows[i + 1].cells[1].innerHTML) * 0.01745329251;
    var a = Number(this.TABLE.rows[i + 1].cells[2].innerHTML);
    var d = Number(this.TABLE.rows[i + 1].cells[3].innerHTML);
    var th = Number(this.TABLE.rows[i + 1].cells[4].innerHTML) * 0.01745329251;
    this.arms[i] = new Arm(be, a, d, th);
    this.arms[i].updateTM();
    this.arms[i].updateType(0);
  }

  //can only update the angle or a prismatic distance
  updateArmValues(arm, val) {
    console.log(arm);
    if (arm.type == 0) { //revolute
      arm.updateAngles(val);
    }
    else if (arm.type == 1) { //prismatic
      arm.updateDistance(val);
    }
    else {
      alert("Error f<updateArm> in Robot.js")
    }
  }

  buildRobot() {
    for (var i = 0; i < this.n_arms; i++) {
      this.createArm(i);
    };
  }

  updateFwKin(i) { //THIS IS WHERE THE PROBLEM IS
    if (i == 0) {
      this.armTMs[0] = this.arms[0].TM;
    } else {
      // for (var i = 1; i < this.n_arms; i++) {
      this.armTMs[i] = math.multiply(this.armTMs[i - 1], this.arms[i].TM);
    }
    // }
  }

  updateXYZ(i) {
    // for (var i = 0; i < this.n_arms; i++) {
    if (i == 0) {
      this.arms[i].coordinates.x = [0, this.armTMs[i][0][3]];
      this.arms[i].coordinates.y = [0, this.armTMs[i][1][3]];
      this.arms[i].coordinates.z = [0, this.armTMs[i][2][3]];
    } else {
      this.arms[i].coordinates.x = [this.armTMs[i - 1][0][3], this.armTMs[i][0][3]];
      this.arms[i].coordinates.y = [this.armTMs[i - 1][1][3], this.armTMs[i][1][3]];
      this.arms[i].coordinates.z = [this.armTMs[i - 1][2][3], this.armTMs[i][2][3]];
    }
    // }
  }

  updateRobot() { //put everything here when we need to update the robot
    for (var i = 0; i < this.n_arms; i++) {
      this.arms[i].updateTM();
      this.updateFwKin(i);
      this.updateXYZ(i);
    }
    //console.log(this.arms);
    //console.log(this.armTMs);
    console.log(this.arms[1].coordinates.x[0])
    console.log(this.arms[1].coordinates.x[1])
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
