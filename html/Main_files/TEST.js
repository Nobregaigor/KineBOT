// ================FROM ROBOT.JS

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


// compileSymTM() {
//   var nodeTM = [null, null, null];
//   for (var i = 0; i < 3; i++) {
//     nodeTM[i] = math.parse(this.stringTM[i]);
//     for (var j = 0; j < 4; j++) {
//       this.symTM[i][j] = nodeTM[i][j].compile();
//     }
//   }
// }



// ================FROM FRAME.JS
// Works with math.js
  // updateTM(symTM) { // Takes symbolic transformation matrix and evaluates using 'properties' values.
  //   console.log(symTM)
  //   for (var i = 0; i < 3; i++) {
  //     for (var j = 0; j < 4; j++) {
  //       this.TM[i][j] = symTM[i][j].eval(this.properties);
  //     }
  //   }
  //   console.log(this.TM)
  // }

  // updateTM(stringTM) { // Takes string transformation matrix and converts to
  //   console.log(symTM)
  //   for (var i = 0; i < 3; i++) {
  //     for (var j = 0; j < 4; j++) {
  //       this.TM[i][j] = symTM[i][j].eval(this.properties);
  //     }
  //   }
  //   this.TM = nerdamer(this.TM)
  //   console.log(this.TM)
  // }




// =================FROM TESTING PURPOSES
  // console.log('TEST ZONE:\n')
  // // Here we take stringTM and we take each row and use it on nerdamer to create a full 4x4 matrix called nerdTM
  // console.log('\n    stringTM converted to matrix 4x4 (nerdTM)')
  // this.nerdTM = nerdamer.matrix(this.stringTM[0],this.stringTM[1],this.stringTM[2],this.stringTM[3])
  // console.log(this.nerdTM)
  // console.log(this.nerdTM.toString())
  // // Here we extract the position matrix 3x1 from nerdTM
  // console.log('\n    extracted position matrix from nerdTM and converted to matrix 3x1 (nerdTM2)')
  // this.nerdTM2 = nerdamer.matrix([this.nerdTM.symbol.elements[0][3]],[this.nerdTM.symbol.elements[1][3]],[this.nerdTM.symbol.elements[2][3]])
  // console.log(this.nerdTM2)
  // console.log(this.nerdTM2.toString())
  // // Here we substitute symbolic variables for values to get the values of the position matrix
  // this.nerdTM6 = nerdamer(this.nerdTM2, {d: 10, be: 45*0.01745329251, a: 15*0.01745329251}, ['numer'])
  // console.log(this.nerdTM6)
  // console.log(nerdamer.matget(this.nerdTM6,1,0).valueOf())
  // // Here we take the transpose of nerdTM2 and multiply it by itself to test this ability
  // console.log('\n    transpose of nerdTM2 multiplied by nerdTM2 results in 3x3 (nerdTM3)')
  // this.nerdTM3 = this.nerdTM2.multiply(nerdamer.transpose(this.nerdTM2))
  // console.log(this.nerdTM3)
  // console.log(this.nerdTM3.toString())
  // // Here we extract the rotation matrix from nerdTM to create a 3x3 called nerdTM4
  // console.log('\n    extracted rotation matrix from nerdTM and converted to matrix 3x3 (nerdTM4)')
  // this.nerdTM4 = nerdamer.matrix(this.nerdTM.symbol.elements[0].slice(0,3),this.nerdTM.symbol.elements[1].slice(0,3),this.nerdTM.symbol.elements[2].slice(0,3))
  // console.log(this.nerdTM4)
  // console.log(this.nerdTM4.toString())
  // // Here we multiply nerdTM4 by the identity matrix to see if it works using math.js matrices
  // console.log('\n    multiplied nerdTM4 by the identity matrix (nerdTM5)')
  // this.imagIM = nerdamer.imatrix(3)
  // console.log(this.imagIM)
  // this.nerdTM5 = this.nerdTM4.multiply(this.imagIM)
  // console.log(this.nerdTM5)
  // console.log(this.nerdTM5.toString())

  // =======================================================================================
  // this.RM = nerdamer.transpose(nerdamer.matrix([1,0,0],[0,1,0],[0,0,1]))
  // console.log(this.RM.toString())

  // from matrix to vector, vector to matrix
  // this.WM = nerdamer.vector(0,0,0)
  // this.WM = nerdamer.transpose(nerdamer.matrix(nerdamer.vector(0,0,0))) // from vector to matrix, it can be done.
  // this.WM = nerdamer.matrix(0,0,0)
  // this.WM = nerdamer.vector(this.WM.symbol.elements[0], this.WM.symbol.elements[1], this.WM.symbol.elements[2]) //from matrix to vector, it can be done.
  // console.log(this.WM.toString())

  // this.hello1 = nerdamer.matrix(0,0,0)
  // console.log(this.hello1.symbol.rows())
  // console.log(this.hello1.symbol.col(1))
  // this.hello2 = nerdamer.matrix([0,0,0])
  // console.log(this.hello2.symbol.cols())
  // console.log(this.hello2.symbol.row(1))

  // this.RM = nerdamer.matrix([1,2,-1],[3,1,5],[7,2,1])
  // console.log('Rotation Matrix:')
  // console.log(this.RM)
  // this.PM = nerdamer.matrix(10,0,3)
  // this.PM = nerdamer.vector(this.PM.symbol.elements[0], this.PM.symbol.elements[1], this.PM.symbol.elements[2])
  // console.log('Position Matrix:')
  // console.log(this.PM.toString())
  // this.VM = nerdamer.matrix(1,2,1)
  // this.VM = nerdamer.vector(this.VM.symbol.elements[0], this.VM.symbol.elements[1], this.VM.symbol.elements[2])
  // console.log('Linear Vel Matrix:')
  // console.log(this.VM.toString())
  // this.WM = nerdamer.matrix(2,1,0)
  // this.WM = nerdamer.vector(this.WM.symbol.elements[0], this.WM.symbol.elements[1], this.WM.symbol.elements[2])
  // console.log('Angular Vel Matrix:')
  // console.log(this.WM.toString())
  // this.dp = 3;
  // this.thp = 2;
  // this.ZM = nerdamer.matrix(0,0,1)
  // this.ZM = nerdamer.vector(this.ZM.symbol.elements[0], this.ZM.symbol.elements[1], this.ZM.symbol.elements[2])
  // console.log(this.ZM.toString())

  // console.log('\nExperimenting:')
  // console.log(nerdamer.transpose(this.RM).toString())
  // console.log(nerdamer(nerdamer.transpose(this.RM)).multiply(nerdamer.transpose(nerdamer.matrix(this.WM))).toString())
  // console.log(nerdamer(nerdamer(nerdamer.transpose(this.RM)).multiply(nerdamer.transpose(nerdamer.matrix(this.WM)))).add(nerdamer(this.thp).multiply(this.ZM)).toString())
  // console.log(nerdamer.cross(this.WM,this.PM).toString())
  // console.log(nerdamer(nerdamer.transpose(this.RM)).multiply(nerdamer.transpose(nerdamer.matrix(nerdamer(this.VM).add(nerdamer.cross(this.WM,this.PM))))).toString())
  // console.log(nerdamer(nerdamer.transpose(this.RM)).multiply(nerdamer(this.VM).add(nerdamer.cross(this.WM,this.PM))).toString())
  // console.log(nerdamer(this.dp).multiply(this.ZM).toString())
