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
