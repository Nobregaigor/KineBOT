$(document).ready(function() {
  'use strict';
  var Bot = new Robot();
  var Simu = new Simulation(Bot);
  // document.getElementById("Slider1Value").innerHTML = pad(parseFloat(document.getElementById("Slider1").value).toFixed(0), 3);
  // document.getElementById("Slider2Value").innerHTML = pad(parseFloat(document.getElementById("Slider2").value).toFixed(0), 3);
  // document.getElementById("Slider3Value").innerHTML = pad(parseFloat(document.getElementById("Slider3").value).toFixed(0), 3);

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
    createSliders();
    console.log(Bot);
    document.getElementById("forwardKinematics").style.display = "block";
    // document.getElementById("inverseKinematics").style.display = "block";


  });

  //Adding input event to Slider1
  // document.getElementById("Slider1").addEventListener("input", function() {
  //   document.getElementById("Slider1Value").innerHTML = pad(parseFloat(this.value).toFixed(0), 3); //updating the "number displayed" next to slider
  //   Bot.updateArmValues(Bot.arms[0], this.value);
  //   Bot.updateRobot();
  //   Simu.updateGraphs();
  //
  // });

  //Adding input event to Slider2
  // document.getElementById("Slider2").addEventListener("input", function() {
  //   document.getElementById("Slider2Value").innerHTML = pad(parseFloat(this.value).toFixed(0), 3);
  //   Bot.updateArmValues(Bot.arms[1], this.value);
  //   Bot.updateRobot();
  //   Simu.updateGraphs();
  //
  // });
  //Adding input event to Slider3
  // document.getElementById("Slider3").addEventListener("input", function() {
  //   document.getElementById("Slider3Value").innerHTML = pad(parseFloat(this.value).toFixed(0), 3);
  //   Bot.updateArmValues(Bot.arms[2], this.value);
  //   Bot.updateRobot();
  //   Simu.updateGraphs();
  //
  // });



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
        cell.setAttribute("contenteditable", "true");
      }
    }
  }

  function createSliders() {
    // Container <div> where dynamic content will be placed
    var DIVsliders = document.getElementById("DIVsliders");
    var table = document.getElementById("DHtable");
    var ii = 0;
    // Clear previous contents of the container
    while (DIVsliders.hasChildNodes()) {
      DIVsliders.removeChild(DIVsliders.lastChild);
    }
    for (var i = 0; i < table.rows.length -1; i++) {
      // Append a node with a random text
      DIVsliders.appendChild(document.createTextNode("Member " + (i + 1)));
      // Create an <input> element, set its type and name attributes

      // ___________________________________ DO NOT KNOW WHY ______________________________ //
      // _____________________________ LABELS AND SPAN VALUE ARE NOT WORKING ______________ //
      // _____________________________ LABELS AND SPAN VALUE ARE NOT WORKING ______________ //
      var label = document.createElement("label");
      label.setAttribute("for", "input");
      var span = document.createElement("span");
      span.setAttribute("class", "SliderValue");
      DIVsliders.appendChild(label);
      DIVsliders.appendChild(span);
      // _____________________________ LABELS AND SPAN VALUE ARE NOT WORKING ______________ //
      // _____________________________ LABELS AND SPAN VALUE ARE NOT WORKING ______________ //
      // ___________________________________ DO NOT KNOW WHY ______________________________ //

      var input = document.createElement("input");
      input.id = "slider" + i;
      input.type = 'range';
      input.max = 0;
      input.max = 360;
      input.step = 1;
      input.value = "45";
      input.setAttribute("class", "slider");
      addSliderFunctions(input,i);
      DIVsliders.appendChild(input);

    }
  }

  function addSliderFunctions(slider,armval){
    slider.addEventListener("input", function() {
      // document.getElementById("Slider3Value").innerHTML = pad(parseFloat(this.value).toFixed(0), 3);
      Bot.updateArmValues(Bot.arms[armval], this.value);
      Bot.updateRobot();
      Simu.updateGraphs();
      console.log(Bot.arms[armval]);

    });
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
