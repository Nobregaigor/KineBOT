class Simulation {
  constructor() {
    this.parameters = {
      L1: 5,
      L2: 5,
      RP: 0,
    }
    this.angles = {
      theta1: Math.PI / 6,
      theta2: Math.PI / 4,
      theta3: 0,
    }
    this.coordinates = {
      x: 0,
      y: 0,
      z: 0,
    }
    this.Line1 = {
      x: [0, 5],
      y: [0, 0],
      z: [0, 0],
      trace: null,
    }
    this.Line2 = {
      x: [5, 5],
      y: [0, 5],
      z: [0, 0],
      trace: null,
    }

    this.GRAPH_XY = document.getElementById('GRAPH_XY');
    this.GRAPH_XZ = document.getElementById('GRAPH_XZ');
    this.GRAPH_YZ = document.getElementById('GRAPH_YZ');
    this.GRAPH_3D = document.getElementById('GRAPH_3D');

    this.GRAPH_2D_RANGE_X = [-11, 11];
    this.GRAPH_2D_RANGE_Y = [-11, 11];

    this.GRAPH_3D_RANGE_X = [-11, 11];
    this.GRAPH_3D_RANGE_Y = [-11, 11];
    this.GRAPH_3D_RANGE_Z = [-11, 11];

  }

  changeParamenter(p, val) {
    try {
      this.parameters.p = val;
    } catch (err) {
      console.log(err.message);
    }
  }

  changeAngle(a, val) {

    if (a == 1) {
      this.angles.theta1 = (val * (Math.PI / 180));
    } else if (a == 2) {
      this.angles.theta2 = (val * (Math.PI / 180));
    } else if (a == 3) {
      this.angles.theta3 = (val * (Math.PI / 180));
    }
  }

  apply_forwardKinematics() {
    this.coordinates.x = (this.parameters.L1 * Math.cos(this.angles.theta1) + this.parameters.L2 * Math.cos(this.angles.theta1 + this.angles.theta2))*Math.sin(this.angles.theta3);

    this.coordinates.y = this.parameters.L1 * Math.sin(this.angles.theta1) + this.parameters.L2 * Math.sin(this.angles.theta1 + this.angles.theta2);

    this.coordinates.z = (this.parameters.L1 * Math.cos(this.angles.theta1) + this.parameters.L2 * Math.cos(this.angles.theta1 + this.angles.theta2))*Math.cos(this.angles.theta3);

  }

  updateLines() {

    this.Line1.x[1] = this.parameters.L1 * Math.cos(this.angles.theta1);
    this.Line1.y[1] = this.parameters.L1 * Math.sin(this.angles.theta1);

    this.Line2.x[0] = this.Line1.x[1];
    this.Line2.y[0] = this.Line1.y[1];
    this.Line2.z[0] = this.Line1.z[1];

    this.Line2.x[1] = this.coordinates.x;
    this.Line2.y[1] = this.coordinates.y;

    this.Line1.z[1] = this.parameters.L1 * Math.sin(this.angles.theta3);
    this.Line2.z[1] = this.coordinates.z;

  }

  RunSimulation() {
    this.apply_forwardKinematics();
    this.updateLines();
  }



  updateGraphs() {
    this.RunSimulation();
    Plotly.restyle(this.GRAPH_XY, {
      'x': [this.Line1.x, this.Line2.x],
      'y': [this.Line1.y, this.Line2.y],
      'z': [this.Line1.z, this.Line2.z],
    }, [0, 1], );
  }

  startLayout() {
    this.RunSimulation();

    var layout_XY = this.CreateLayout_3D('X x Y', this.GRAPH_3D_RANGE_X, this.GRAPH_3D_RANGE_Y, this.GRAPH_3D_RANGE_Z);

    // this.Line1.trace = this.CreateColorTrace(this.Line1.x, this.Line1.y, 'Arm1','rgb(91, 27, 223)');
    // this.Line2.trace = this.CreateColorTrace(this.Line2.x, this.Line2.y, 'Arm2','rgb(91, 27, 223)');

    this.Line1.trace = this.CreateColorTrace_3D(this.Line1.x, this.Line1.y, this.Line1.z, 'Arm1','rgb(91, 27, 223)');
    this.Line2.trace = this.CreateColorTrace_3D(this.Line2.x, this.Line2.y, this.Line2.z, 'Arm2','rgb(242, 70, 33)');


    Plotly.newPlot(this.GRAPH_XY, [this.Line1.trace, this.Line2.trace], layout_XY);

  }

  CreateLayout(name,rangex,rangey){
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

  CreateLayout_3D(name,rangex,rangey,rangez){
    var layout = {
      // backgroundcolor: 'rgb(255,0,0)',
      xaxis: {
        range: rangex,
      },
      yaxis: {
        hoverformat: '.3f',
        range: rangey,
      },
      zaxis: {
        hoverformat: '.3f',
        range: rangez,
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
        size: 15
      }
    }
    return BlueTRACES;
  }

  CreateColorTrace_3D(xpoints, ypoints, zpoints, name, RGBcolor) {
    var BlueTRACES = {
      x: xpoints,
      y: ypoints,
      z: zpoints,
      type:'scatter3d',
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
        size: 15
      }
    }
    return BlueTRACES;
  }

  CreateColorTrace_3D(xpoints, ypoints, zpoints, name, RGBcolor) {
    var BlueTRACES = {
      x: xpoints,
      y: ypoints,
      z: zpoints,
      type:'scatter3d',
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
        size: 15
      }
    }
    return BlueTRACES;
  }








}
