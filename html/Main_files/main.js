$(document).ready(function() {
  'use strict';
  var Bot = new Robot();
  var Simu = new Simulation(Bot);

  document.getElementById("forwardKinematics").style.display = "none";
  // document.getElementById("inverseKinematics").style.display = "none";

  //Add a row to table
  document.getElementById("addFrameButton").addEventListener("click", function() {
    var table = document.getElementById("DHtable");
    if (table.rows.length < 11) {
      addRow(table);
    } else {
      alert("Hey, that is too many rows for me to handle!\n(Maximum number of rows added).");
    }
  });

  document.getElementById("removeFrameButton").addEventListener("click", function() {
    var table = document.getElementById("DHtable");
    deleteRow(table);
  });

  //put everything here when we need to create the first instance of the robot
  document.getElementById("DoneButton").addEventListener("click", function() {
    Bot.buildRobot();
    Bot.updateRobot();
    Simu.startLayout();
    createSliders();
    console.log("Robot Object below:")
    console.log(Bot);
    document.getElementById("forwardKinematics").style.display = "block";
    // document.getElementById("inverseKinematics").style.display = "block";


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
        cell.setAttribute("contenteditable", "true");
      }
    }
  }

  function deleteRow(table) {
    if ((table.rows.length - 1) > 2) {
      table.deleteRow(table.rows.length - 1);
    } else {
      alert("Hey, don't delete everything!!!\n(Minimum number of rows added.)");
    }
  }

  function createSliders() {
    // Container <div> where dynamic content will be placed
    var DIVsliders = document.getElementById("DIVsliders");
    var table = document.getElementById("DHtable");
    // Clear previous contents of the container
    while (DIVsliders.hasChildNodes()) {
      DIVsliders.removeChild(DIVsliders.lastChild);
    }
    for (var i = 0; i < table.rows.length -1; i++) {
      // Append a node with a random text
      DIVsliders.appendChild(document.createTextNode("Member " + (i + 1)));
      // Create an <input> element, set its type and name attributes

      // // ___________________________________ DO NOT KNOW WHY ______________________________ //
      // // _____________________________ LABELS AND SPAN VALUE ARE NOT WORKING ______________ //
      // // _____________________________ LABELS AND SPAN VALUE ARE NOT WORKING ______________ //
      // var label = document.createElement("label");
      // var labelfor = "slider" + i;
      // label.setAttribute("for", labelfor);
      // var span = document.createElement("span");
      // span.setAttribute("class", "SliderValue");
      // input.appendChild(span);
      // DIVsliders.appendChild(label);
      // // _____________________________ LABELS AND SPAN VALUE ARE NOT WORKING ______________ //
      // // _____________________________ LABELS AND SPAN VALUE ARE NOT WORKING ______________ //
      // // ___________________________________ DO NOT KNOW WHY ______________________________ //

      var input = document.createElement("input");
      input.id = "slider" + i;
      input.type = 'range';
      input.min = 0;
      input.max = 360;
      input.step = 1;
      input.value = "45"; //needs to get from table
      input.setAttribute("class", "slider");
      addSliderFunctions(input,i);

      DIVsliders.appendChild(input);

    }
  }

  function addSliderFunctions(slider,frameval){
    slider.addEventListener("input", function() {
      // document.getElementById("Slider3Value").innerHTML = pad(parseFloat(this.value).toFixed(0), 3);
      Bot.updateFrameValues(Bot.frames[frameval], this.value);
      Bot.updateRobot();
      Simu.updateGraphs();
      //console.log(Bot.frames[frameval]);

    });
  }

  console.log('3-DoF Simulation of Kinematic Robot, developed by Igor Nobrega and Azael del Rosario.');
});
