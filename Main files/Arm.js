class Arm {
  constructor(be, a, d, th) {

    this.type = null;

    this.properties = {
      be: null,
      a: null,
      d: null,
      th: null,
    }

    this.TM = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [0, 0, 1, 0]
    ];

    this.coordinates = {
      x: null,
      y: null,
      z: null,
    }
  }
  updateType() {
    if (this.properties.d == '') {

    }

  }

  updateTM() {

    this.TM[0][0] = Math.cos(this.properties.th);
    this.TM[0][1] = -Math.sin(this.properties.th);
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


}
