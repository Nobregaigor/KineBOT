$(document).ready(function() {
  'use strict';

  var Simu = new Simulation();
  document.getElementById("Slider1Value").innerHTML = pad(parseFloat(document.getElementById("Slider1").value).toFixed(0),3);
  document.getElementById("Slider2Value").innerHTML = pad(parseFloat(document.getElementById("Slider2").value).toFixed(0),3);
  document.getElementById("Slider3Value").innerHTML = pad(parseFloat(document.getElementById("Slider3").value).toFixed(0),3);

  //Adding input event to Slider1
  document.getElementById("Slider1").addEventListener("input", function() {
    document.getElementById("Slider1Value").innerHTML = pad(parseFloat(this.value).toFixed(0),3);
    Simu.changeAngle(1,this.value);
    Simu.updateGraphs();
  });
  //Adding input event to Slider2
  document.getElementById("Slider2").addEventListener("input", function() {
    document.getElementById("Slider2Value").innerHTML = pad(parseFloat(this.value).toFixed(0),3);
    Simu.changeAngle(2,this.value);
    Simu.updateGraphs();
  });
  //Adding input event to Slider3
  document.getElementById("Slider3").addEventListener("input", function() {
    document.getElementById("Slider3Value").innerHTML = pad(parseFloat(this.value).toFixed(0),3);
    Simu.changeAngle(3,this.value);
    Simu.updateGraphs();
  });

  function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}





  //Adding change event to Slider1
  document.getElementById("Slider1").addEventListener("change", function() {
    // Simu.updateULslope(this.value);
    // Simu.updateUserLine();
  });



  //Adding Click event to Run Button
  // document.getElementById("RunButton").addEventListener("click", function() {
  // Simu.RunSimulation();
  // });

  //Adding Click event to Reset Button
  // document.getElementById("ResetButton").addEventListener("click", function() {
  // Simu.resetUL();
  // Simu.startLayout();
  // });


  Simu.startLayout();
  // Plotly.Plots.resize(Simu.GRAPH_XY);

  console.log('Numerical Methods Simulation. Develop by Igor Nobrega, in assossiation with Dr. Kaw.');
});
