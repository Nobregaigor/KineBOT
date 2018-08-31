class Robot {
  constructor() {

    this.TABLE = document.getElementById('DHtable');

    this.n_arms = this.TABLE.rows.length -1;
    this.arms = Array.apply(null, Array(this.n_arms).map(Number.prototype.valueOf, 0)); // empty
    this.armTMs = Array.apply(null, Array(this.n_arms).map(Number.prototype.valueOf, 0));

  }

  createArm(i) {
    var be = Number(this.TABLE.rows[i+1].cells[0].innerHTML);
    console.log(i);
    var a = Number(this.TABLE.rows[i+1].cells[1].innerHTML);
    var d = Number(this.TABLE.rows[i+1].cells[2].innerHTML);
    var th = Number(this.TABLE.rows[i+1].cells[3].innerHTML);
    this.arms[i] = new Arm(be, a, d, th);
    this.arms[i].updateTM();
    this.arms[i].updateType();
  }

  //can only update the angle or a prismatic distance
  updateArmValues(arm, val) {
    if (this.arms[arm].type == 1) { //prismatic
      this.arms[arm].updateDistance(val);
    } else if (this.arms[arm].type == 0) { //revolute
      this.arms[arm].updateAngle(val);
    } else {
      alert("Error f<updateArm> in Robot.js")
    }
  }

  buildRobot() {
    for (var i = 0; i < this.n_arms; i++) {
      this.createArm(i);
    }
    console.log(this.arms);
  }

  createIM() {
    var IM = Array.apply(null, Array(this.n_arms).map(Number.prototype.valueOf, 0));
    for (var i = 0; i < this.n_arms; i++) {
      IM[i] = Array.apply(null, Array(this.n_arms).map(Number.prototype.valueOf, 0));
      for (var j = 0; j < this.n_arms; j++) {
        if (i == j) {
          IM[i][j] = 1;
        } else {
          IM[i][j] = 0;
        }
      }
    }
  }

  updateFwKin(arms) {
    this.armTMs[0] = this.arms[0].TM;
    for (var i = 1; i < this.n_arms; i++) {
      this.armTMs[i] = math.multiply(this.armTMs[i-1],this.arms[i].TM)
    }

  }


}
