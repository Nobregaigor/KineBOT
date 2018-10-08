class Simulation {
  constructor(robot) {

    this.robot = robot;
    this.GRAPH_3D = document.getElementById('GRAPH_3D');

    this.GRAPH_2D_RANGE_X = [-11, 11];
    this.GRAPH_2D_RANGE_Y = [-11, 11];

    this.GRAPH_3D_RANGE_X = [-11, 11];
    this.GRAPH_3D_RANGE_Y = [-11, 11];
    this.GRAPH_3D_RANGE_Z = [-11, 11];

    //Array that holds all traces. Used to plot later.
    this.LineTraces = Array.apply(null, Array(this.robot.n_frames).map(Number.prototype.valueOf, 0));
    this.data = {
      xs: Array.apply(null, Array(this.robot.n_frames).map(Number.prototype.valueOf, 0)),
      ys: Array.apply(null, Array(this.robot.n_frames).map(Number.prototype.valueOf, 0)),
      zs: Array.apply(null, Array(this.robot.n_frames).map(Number.prototype.valueOf, 0)),
      indices: Array.apply(null, Array(this.robot.n_frames).map(Number.prototype.valueOf, 0)),
    }
  }

  createTraces() {
    for (var i = 0; i < this.robot.n_frames; i++) {
      this.LineTraces[i] = this.CreateColorTrace_3D(this.robot.frames[i].coordinates.x, this.robot.frames[i].coordinates.y, this.robot.frames[i].coordinates.z, 'Frames' + i.toString(), 'rgb(91, 27, 223)');
    }
  }

  updateTraces() {
    var _data = {
      xs: Array.apply(null, Array(this.robot.n_frames).map(Number.prototype.valueOf, 0)),
      ys: Array.apply(null, Array(this.robot.n_frames).map(Number.prototype.valueOf, 0)),
      zs: Array.apply(null, Array(this.robot.n_frames).map(Number.prototype.valueOf, 0)),
      indices: Array.apply(null, Array(this.robot.n_frames).map(Number.prototype.valueOf, 0)),
    }

    for (var i = 0; i < this.robot.n_frames; i++) {
      _data.xs[i] = this.robot.frames[i].coordinates.x;
      _data.ys[i] = this.robot.frames[i].coordinates.y;
      _data.zs[i] = this.robot.frames[i].coordinates.z;
      _data.indices[i] = i;
    }
    return _data;

  }


  updateGraphs() {
    var _data = this.updateTraces();
    console.log(_data);
    Plotly.restyle(this.GRAPH_3D, { //needs to be an array cointaing the x value for each frame
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
