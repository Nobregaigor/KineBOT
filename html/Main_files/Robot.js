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
    this.n_frames = null;
    this.frames = Array.apply(null, Array(this.n_frames));
    this.frameTMs = Array.apply(null, Array(this.n_frames));
    this.frameRMs = Array.apply(null, Array(this.n_frames));
    this.framePMs = Array.apply(null, Array(this.n_frames));
    this.frameVMs = Array.apply(null, Array(this.n_frames));
    this.frameWMs = Array.apply(null, Array(this.n_frames));
    this.IM = null;


    this.stringTM = [['cos(th)', '-sin(th)','0','a'],
          ['sin(th)*cos(be)', 'cos(th)*cos(be)', '-sin(be)', '-sin(be)*d'],
          ['sin(th)*sin(be)', 'cos(th)*sin(be)', 'cos(be), cos(be)*d'],
          ['0', '0', '0', '1']
        ];

            // TEST ZONE WITHIN THE CONSOLE
            // Use this zone to test calculations on the browser's CONSOLE


            // TEST ZONE WITHIN THE CONSOLE
  }


  matrix_to_vector(matrix) {
    // if matrix is 1x3, convert to 3x1 to extract elements and form a vector out of the matrix
    // vector is needed to calculate cross products, according to testing and nerdamer's documentation
    if ((matrix.symbol.rows() == 1) && (matrix.symbol.cols() == 3)) {
      matrix = nerdamer.transpose(matrix)
    }
    var vector = nerdamer.vector(matrix.symbol.elements[0], matrix.symbol.elements[1], matrix.symbol.elements[2])
    return vector // returns 1x3 vector
  }


  vector_to_matrix(vector) {
    // takes an 1xN vector as an input
    // matrix is needed to perform matrix operations and transpositions
    var matrix = nerdamer.transpose(nerdamer.matrix(vector))
    return matrix // returns 3x1 matrix
  }


  initJacobianCalc() {
    // initializing variables for inverse kinematic and Jacobian calculation
    this.IM = nerdamer.imatrix(this.n_frames); //Needs to be -1 when end effector begins to be taken in consideration
    this.Z11 = nerdamer.matrix(0,0,1);
    this.frameVMs[0] = nerdamer.vector(0,0,0); //VM11 and WM11 started as vectors to compute calculations
    this.frameWMs[0] = nerdamer.vector(0,0,0); //Subsequent VMs generated will be stored as vectors as well
  }


  createFrame(i) { //Table is a string, values are numbers
    // For individual frame creation (function runs in for loop)
    var be = Number(this.TABLE.rows[i + 1].cells[1].innerHTML) * 0.01745329251;
    var a = Number(this.TABLE.rows[i + 1].cells[2].innerHTML);
    var d = Number(this.TABLE.rows[i + 1].cells[3].innerHTML);
    var th = Number(this.TABLE.rows[i + 1].cells[4].innerHTML) * 0.01745329251;
    // Frame is created by creating and updating the TM, RM, PM and type by using the frame's properties (be,a,d,th)
    this.frames[i] = new Frame(be, a, d, th);
    this.frames[i].createTM(this.stringTM);
    this.frames[i].updateTM();
    this.frames[i].updateRM();
    this.frames[i].updatePM();
    this.frames[i].updateType(0);
  }


  updateFrameValues(frame, val) { // Function updates the angle or prismatic distance, depending on frame type
    if (frame.type == 0) { //revolute
      frame.updateAngles(val);
    } else if (frame.type == 1) { //prismatic
      frame.updateDistance(val);
    } else {
      alert("Error f<updateFrameValues> in Robot.js\nFrame type not specified.")
    }
  }


  buildRobot() { // Function creates the frames necessary for the robot to be alive
    //Update Table values;
    this.n_frames = this.TABLE.rows.length - 1;
    this.TABLE = document.getElementById('DHtable');
    for (var i = 0; i < this.n_frames; i++) {
      this.createFrame(i);
    };
    this.initJacobianCalc();
  }


  updateFK(i) { // Function creates all TMs 0-to-N, stores them, and also stores its respective RMs and PMs
    // When run on a loop of n-length, it creates, T01, T02, ... T0n-1, T0n, and extracts its respective R and P
    // console.log('TM0' + (i+1).toString())
    if (i == 0) {
      this.frameTMs[i] = this.frames[i].TM;
    } else {
      this.frameTMs[i] = this.frameTMs[i - 1].multiply(this.frames[i].TM);
    }
    // console.log(this.frameTMs[i].toString())
    this.frameRMs[i] = nerdamer.matrix(
        this.frameTMs[i].symbol.elements[0].slice(0,3),
        this.frameTMs[i].symbol.elements[1].slice(0,3),
        this.frameTMs[i].symbol.elements[2].slice(0,3));
    this.framePMs[i] = nerdamer.matrix(
        [this.frameTMs[i].symbol.elements[0][3]],
        [this.frameTMs[i].symbol.elements[1][3]],
        [this.frameTMs[i].symbol.elements[2][3]]);
  }


  updateVM(RM, VM, WM, PM, d, ZM, type) { // Function creates linear velocity matrix Vnn to compute Jacobian
    if (type == 0) { //revolute
      var vMatrix = nerdamer(nerdamer.transpose(RM)).multiply(this.vector_to_matrix(nerdamer(VM).add(nerdamer.cross(WM,this.matrix_to_vector(PM)))));
      //Complex mumbo-jumbo translates into comment below:
      //vMatrix = transpose(rmat)*(vmat + cross(wmat,pmat));
    } else if (type == 1) { //prismatic
      var vMatrix = nerdamer(nerdamer(nerdamer.transpose(RM)).multiply(this.vector_to_matrix(nerdamer(VM).add(nerdamer.cross(WM,this.matrix_to_vector(PM)))))).add(nerdamer(d).multiply(ZM));
      //Complex mumbo-jumbo translates into comment below:
      //vMatrix = transpose(rmat)*(vmat + cross(wmat,pmat)) + dp*zmat;
    } else {
      alert("Error f<updateVM> in Robot.js\nFrame type not specified.")
    }
    return this.matrix_to_vector(vMatrix); //returns vector form of the VM for further calculations
  }


  updateWM(RM, WM, th, ZM, type) { // Function creates angular velocity matrix Wnn to compute Jacobian
    if (type == 0) { //revolute
      var wMatrix = nerdamer(nerdamer(nerdamer.transpose(RM)).multiply(this.vector_to_matrix(WM))).add(nerdamer(th).multiply(ZM));
      //Complex mumbo-jumbo translates into comment below:
      //WMatrix = transpose(rmat)*wmat + thp*zmat;
    } else if (type == 1) { //prismatic
      var wMatrix = nerdamer(nerdamer.transpose(RM)).multiply(this.vector_to_matrix(WM));
      //Complex mumbo-jumbo translates into comment below:
      //WMatrix = transpose(rmat)*wmat;
    } else {
      alert("Error f<updateWM> in Robot.js\nFrame type not specified.")
    }
    return this.matrix_to_vector(wMatrix); //returns vector form of the WM for further calculations
  }


  updateIK(i) {
    if (i == 0) {
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


  // updateXYZ(i) {
  //   // for (var i = 0; i < this.n_arms; i++) {
  //   if (i == 0) {
  //     this.frames[i].coordinates.x = [0, this.frameTMs[i][0][3]];
  //     this.frames[i].coordinates.y = [0, this.frameTMs[i][1][3]];
  //     this.frames[i].coordinates.z = [0, this.frameTMs[i][2][3]];
  //   } else {
  //     this.frames[i].coordinates.x = [this.frameTMs[i - 1][0][3], this.frameTMs[i][0][3]];
  //     this.frames[i].coordinates.y = [this.frameTMs[i - 1][1][3], this.frameTMs[i][1][3]];
  //     this.frames[i].coordinates.z = [this.frameTMs[i - 1][2][3], this.frameTMs[i][2][3]];
  //   }
  //   // }
  // }


  updateRobot() { //put everything here when we need to update the robot
    for (var i = 0; i < this.n_frames; i++) {
      this.frames[i].updateTM();
      this.frames[i].updateRM();
      this.frames[i].updatePM();
      this.updateFK(i);
      this.updateIK(i);
      //this.updateXYZ(i);
    }
  }


}
