class Simulation {
  constructor(robot) {
    // this.parameters = {
    //   L1: 5,
    //   L2: 5,
    //   RP: 0,
    // }
    // this.angles = {
    //   theta1: Math.PI / 6,
    //   theta2: Math.PI / 4,
    //   theta3: 0,
    // }
    // this.coordinates = {
    //   x: 0,
    //   y: 0,
    //   z: 0,
    // }
    // this.Line1 = {
    //   x: [0, 5],
    //   y: [0, 0],
    //   z: [0, 0],
    //   trace: null,
    // }
    // this.Line2 = {
    //   x: [5, 5],
    //   y: [0, 5],
    //   z: [0, 0],
    //   trace: null,
    // }

    // this.GRAPH_XY = document.getElementById('GRAPH_XY');
    // this.GRAPH_XZ = document.getElementById('GRAPH_XZ');
    // this.GRAPH_YZ = document.getElementById('GRAPH_YZ');
    this.robot = robot;
    this.GRAPH_3D = document.getElementById('GRAPH_3D');

    this.GRAPH_2D_RANGE_X = [-11, 11];
    this.GRAPH_2D_RANGE_Y = [-11, 11];

    this.GRAPH_3D_RANGE_X = [-11, 11];
    this.GRAPH_3D_RANGE_Y = [-11, 11];
    this.GRAPH_3D_RANGE_Z = [-11, 11];

    //Array that holds all traces. Used to plot later.
    this.LineTraces = Array.apply(null, Array(this.robot.n_arms).map(Number.prototype.valueOf, 0));
    this.data = {
      xs: Array.apply(null, Array(this.robot.n_arms).map(Number.prototype.valueOf, 0)),
      ys: Array.apply(null, Array(this.robot.n_arms).map(Number.prototype.valueOf, 0)),
      zs: Array.apply(null, Array(this.robot.n_arms).map(Number.prototype.valueOf, 0)),
      indices: Array.apply(null, Array(this.robot.n_arms).map(Number.prototype.valueOf, 0)),
    }
  }


  // changeAngle(a, val) {
  //
  //   if (a == 1) {
  //     this.angles.theta1 = (val * (Math.PI / 180));
  //   } else if (a == 2) {
  //     this.angles.theta2 = (val * (Math.PI / 180));
  //   } else if (a == 3) {
  //     this.angles.theta3 = (val * (Math.PI / 180));
  //   }
  // }

  // apply_forwardKinematics() {
  //   this.coordinates.x = (this.parameters.L1 * Math.cos(this.angles.theta1) + this.parameters.L2 * Math.cos(this.angles.theta1 + this.angles.theta2))*Math.sin(this.angles.theta3);
  //
  //   this.coordinates.y = this.parameters.L1 * Math.sin(this.angles.theta1) + this.parameters.L2 * Math.sin(this.angles.theta1 + this.angles.theta2);
  //
  //   this.coordinates.z = (this.parameters.L1 * Math.cos(this.angles.theta1) + this.parameters.L2 * Math.cos(this.angles.theta1 + this.angles.theta2))*Math.cos(this.angles.theta3);
  //
  // }

  // updateLines() {
  //
  //   this.Line1.x[1] = this.parameters.L1 * Math.cos(this.angles.theta1);
  //   this.Line1.y[1] = this.parameters.L1 * Math.sin(this.angles.theta1);
  //
  //   this.Line2.x[0] = this.Line1.x[1];
  //   this.Line2.y[0] = this.Line1.y[1];
  //   this.Line2.z[0] = this.Line1.z[1];
  //
  //   this.Line2.x[1] = this.coordinates.x;
  //   this.Line2.y[1] = this.coordinates.y;
  //
  //   this.Line1.z[1] = this.parameters.L1 * Math.sin(this.angles.theta3);
  //   this.Line2.z[1] = this.coordinates.z;
  //
  // }

  // RunSimulation() {
  //   this.apply_forwardKinematics();
  //   this.updateLines();
  // }

  createTraces() {
    for (var i = 0; i < this.robot.n_arms; i++) {
      this.LineTraces[i] = this.CreateColorTrace_3D(this.robot.arms[i].coordinates.x, this.robot.arms[i].coordinates.y, this.robot.arms[i].coordinates.z, 'Arm' + i.toString(), 'rgb(91, 27, 223)');
    }
  }

  updateTraces() {
    var _data = {
      xs: Array.apply(null, Array(this.robot.n_arms).map(Number.prototype.valueOf, 0)),
      ys: Array.apply(null, Array(this.robot.n_arms).map(Number.prototype.valueOf, 0)),
      zs: Array.apply(null, Array(this.robot.n_arms).map(Number.prototype.valueOf, 0)),
      indices: Array.apply(null, Array(this.robot.n_arms).map(Number.prototype.valueOf, 0)),
    }

    for (var i = 0; i < this.robot.n_arms; i++) {
      _data.xs[i] = this.robot.arms[i].coordinates.x;
      _data.ys[i] = this.robot.arms[i].coordinates.y;
      _data.zs[i] = this.robot.arms[i].coordinates.z;
      _data.indices[i] = i;
    }
    return _data;

  }


  updateGraphs() {
    var _data = this.updateTraces();
    console.log(_data);
    Plotly.restyle(this.GRAPH_3D, { //needs to be an array cointaing the x value for each arm
          'x': _data.xs,
          'y': _data.ys,
          'z': _data.zs,
        },
        _data.indices,
      );
  }

  updateSquares() {
    var _data = {
      xs: Array.apply(null, Array(this.squaresArray.length).map(Number.prototype.valueOf, 0)),
      ys: Array.apply(null, Array(this.squaresArray.length).map(Number.prototype.valueOf, 0)),
      indice: Array.apply(null, Array(this.squaresArray.length).map(Number.prototype.valueOf, 0)),
    }
    // var datax = Array.apply(null, Array(this.squaresArray.length).map(Number.prototype.valueOf, 0));
    // var datay = Array.apply(null, Array(this.squaresArray.length).map(Number.prototype.valueOf, 0));

    for (var i = 0; i < this.squaresArray.length; i++) {
      var square = this.CalculateSquarePoints(this.GraphDATA.x[i], this.GraphDATA.y[i]);
      // console.log(square);
      this.squaresArray[i] = this.CreateColorShades(square.x, square.y, 'rgb(255, 98, 157)');
      _data.xs[i] = this.squaresArray[i].x;
      _data.ys[i] = this.squaresArray[i].y;
      _data.indice[i] = i + 2;
    }

    if (this.GRAPH.data.length < 3) {
      Plotly.addTraces(this.GRAPH, this.squaresArray);
    } else {
      Plotly.restyle(this.GRAPH, {
          'x': _data.xs,
          'y': _data.ys,
        },
        _data.indice,
      );
    }

  }

  startLayout() {
    this.createTraces();
    var layout3D = this.CreateLayout_3D('X vs. Y', this.GRAPH_3D_RANGE_X, this.GRAPH_3D_RANGE_Y, this.GRAPH_3D_RANGE_Z);

    Plotly.newPlot(this.GRAPH_3D, this.LineTraces, layout3D);

  }

  CreateLayout(name, rangex, rangey) {
    var layout = {
      // backgroundcolor: 'rgb(255,0,0)',
      xaxis: {
        range: rangex
      },
      yaxis: {
        hoverformat: '.3f',
        range: rangey
      },
      showlegend: false,
      title: name,
      margin: {
        l: 40,
        r: 25,
        b: 25,
        t: 40,
        pad: 10
      },

    };
    return layout;
  }

  CreateLayout_3D(name, rangex, rangey, rangez) {
    var layout = {
      // backgroundcolor: 'rgb(255,0,0)',
      scene: {
        aspectmode: 'manual',
        aspectratio: {
          x: 1,
          y: 1,
          z: 1,
        },
        xaxis: {
          hoverformat: '.3f',
          nticks: 11, //will be an input later on
          range: rangex,
        },
        yaxis: {
          hoverformat: '.3f',
          nticks: 11,
          range: rangey,
        },
        zaxis: {
          hoverformat: '.3f',
          nticks: 11,
          range: rangez,
        }
      },
      showlegend: false,
      title: name,
      margin: {
        l: 40,
        r: 25,
        b: 25,
        t: 40,
        pad: 10
      },

    };
    return layout;
  }



  CreateColorTrace(xpoints, ypoints, name, RGBcolor) {
    var BlueTRACES = {
      x: xpoints,
      y: ypoints,
      mode: 'lines+markers',
      name: name,
      line: {
        color: RGBcolor,
        size: 20,
        width: 2
      },
      marker: {
        color: RGBcolor,
        symbol: "circle-open-dot",
        size: 5
      }
    }
    return BlueTRACES;
  }

  CreateColorTrace_3D(xpoints, ypoints, zpoints, name, RGBcolor) {
    var BlueTRACES = {
      x: xpoints,
      y: ypoints,
      z: zpoints,
      type: 'scatter3d',
      mode: 'lines+markers',
      name: name,
      line: {
        color: RGBcolor,
        size: 20,
        width: 2
      },
      marker: {
        color: RGBcolor,
        symbol: "circle-open-dot",
        size: 5
      }
    }
    return BlueTRACES;
  }

  CreateColorTrace_3D(xpoints, ypoints, zpoints, name, RGBcolor) {
    var BlueTRACES = {
      x: xpoints,
      y: ypoints,
      z: zpoints,
      type: 'scatter3d',
      mode: 'lines+markers',
      name: name,
      line: {
        color: RGBcolor,
        size: 20,
        width: 2
      },
      marker: {
        color: RGBcolor,
        symbol: "circle-open-dot",
        size: 5
      }
    }
    return BlueTRACES;
  }








}
