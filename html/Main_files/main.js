$(document).ready(function() {
  'use strict';
  var Bot = new Robot();
  var Simu = new Simulation(Bot);
  document.getElementById("Slider1Value").innerHTML = pad(parseFloat(document.getElementById("Slider1").value).toFixed(0), 3);
  document.getElementById("Slider2Value").innerHTML = pad(parseFloat(document.getElementById("Slider2").value).toFixed(0), 3);
  document.getElementById("Slider3Value").innerHTML = pad(parseFloat(document.getElementById("Slider3").value).toFixed(0), 3);

  document.getElementById("forwardKinematics").style.display = "none";
  document.getElementById("inverseKinematics").style.display = "none";

  //Add a row to table
  document.getElementById("addFrameButton").addEventListener("click", function() {
    var table = document.getElementById("DHtable");
    if (table.rows.length < 10) {
      addRow(table);
    } else {
      alert("Maximum number of rows achieved");
    }
  });

  //put everything here when we need to create the first instance of the robot
  document.getElementById("DoneButton").addEventListener("click", function() {
    Bot.buildRobot();
    Bot.updateRobot();
    Simu.startLayout();
    console.log(Bot);
    document.getElementById("forwardKinematics").style.display = "block";
    document.getElementById("inverseKinematics").style.display = "block";


  });

  //Adding input event to Slider1
  document.getElementById("Slider1").addEventListener("input", function() {
    document.getElementById("Slider1Value").innerHTML = pad(parseFloat(this.value).toFixed(0), 3); //updating the "number displayed" next to slider
    Bot.updateArmValues(Bot.arms[0], this.value);
    Bot.updateRobot();
    Simu.updateGraphs();

  });

  //Adding input event to Slider2
  document.getElementById("Slider2").addEventListener("input", function() {
    document.getElementById("Slider2Value").innerHTML = pad(parseFloat(this.value).toFixed(0), 3);
    Bot.updateArmValues(Bot.arms[1], this.value);
    Bot.updateRobot();
    Simu.updateGraphs();

  });
  //Adding input event to Slider3
  document.getElementById("Slider3").addEventListener("input", function() {
    document.getElementById("Slider3Value").innerHTML = pad(parseFloat(this.value).toFixed(0), 3);
    Bot.updateArmValues(Bot.arms[2], this.value);
    Bot.updateRobot();
    Simu.updateGraphs();

  });



  function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
  }

  // var table = document.getElementById("myTable");

  function addRow(table) {
    var row = table.insertRow(table.rows.length);
    var cell = null;
    for (var i = 0; i < 5; i++) {
      cell = row.insertCell(i);
      if (i == 0) {
        cell.innerHTML = table.rows.length - 1;
      } else {
        cell.innerHTML = "<div contenteditable></div>";
      }
    }

    // row.cell[0].innerHTML = table.length;
    // row.insertCell(0);
    // var cell2 = row.insertCell(1);
    // var cell3 = row.insertCell(0);
    // var cell4 = row.insertCell(1);
    //
    // cell1.innerHTML = "NEW CELL1";
    // cell2.innerHTML = "NEW CELL2";
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


  // Simu.startLayout();
  // Plotly.Plots.resize(Simu.GRAPH_XY);

  console.log('3-DoF Simulation of Kinematic Robot, developed by Igor Nobrega and Azael del Rosario.');
});
