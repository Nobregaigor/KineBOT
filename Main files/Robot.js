class Robot {
  constructor() {

    this.initialPos = {
      th1 = null,
      th2 = null,
      th3 = null,
      th4 = null,
      th5 = null,
      th6 = null,
    }

    this.n_arms = 4; // USER INPUT (going to fix later)

    this.arms = Array.apply(null, Array(this.n_arms).map(Number.prototype.valueOf, 0));, // empty

    this.TABLE = document.getElementById('DHtable');

  }

  createArm(i) {
    var be = this.TABLE.rows[i].cells[0].value;
    var a = this.TABLE.rows[i].cells[1].value;
    var d = this.TABLE.rows[i].cells[2].value;
    var th = this.TABLE.rows[i].cells[3].value;
    this.arms[i] = new Arm(be,a,d,th);
    this.arms[i].updateTM();
  }

  updateArm(){

  }

  buildRobot() {
    for (var i = 0; i < this.TABLE.rows.length; i++) {
      this.createArm(i)
  }
}


  createFwKin(qi){


  }


}
