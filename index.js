class Graph {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
    this.aspectRatio = this.canvas.height / this.canvas.width;
    this.r = 20
    this.center = { x: 0, y: 0 };
    this.iterations = 200;
    this.indexToCoord = this.indexToCoord.bind(this);
    this.render = this.render.bind(this);
  }

  indexToCoord(i) {
    let index = i / 4;
    let coord = { 
      x: index % this.canvas.width,
      y: Math.floor(index / this.canvas.width)
    }

    coord.x = 
      (((coord.x * this.r / this.canvas.width) - this.r / 2) + 
        (this.center.x * this.aspectRatio)) / this.aspectRatio;

    coord.y = 
      (((coord.y * this.r / this.canvas.width) - this.r / 2) *  
        -1) + this.center.y;
    return coord;
  }

  render(predicate) {
    for (let i = 0; i < this.canvas.width * this.canvas.height * 4; i += 4) {
      let val = predicate(this.indexToCoord(i));
      let set = val[0] ? 0 : (val[1] / this.iterations) * 0x1D8348;
      this.imageData.data[i] = (set & 0xff0000) >> 16;
      this.imageData.data[i + 1] = (set & 0x00ff00) >> 8;
      this.imageData.data[i + 2] = set & 0x0000ff;
      this.imageData.data[i + 3] = 255; 
    }
    this.ctx.putImageData(this.imageData, 0, 0);
  }
}

const isMandlebrot = (coord) => {
  let cr = coord.x;
  let ci = coord.y;
  let zr = cr;
  let zi = ci;
  let i;

  for(i = 0; i < 200; i++) {
    if (zr**2 + zi**2 > 4) {
      return [false, i];
    }

    newZr = (zr * zr) - (zi * zi) + cr;
    newZi = ((zr * zi) * 2) + ci;
    zr = newZr;
    zi = newZi;
  }
  return [true, i];
}

let graph = new Graph('mandlebrot');
graph.center.x = -1.25066;
graph.center.y = 0.02012;
graph.r = 0.00005;
graph.render(isMandlebrot);
