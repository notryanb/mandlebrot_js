class Graph {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
    this.aspectRatio = this.canvas.height / this.canvas.width;
    this.r = 4;
    this.center = { x: 0, y: 0 };
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
    //for (let i = 0; i < this.imageData.data.length; i += 1) {
      //this.imageData.data[i] = Math.random() * 255;
    //}
    //this.ctx.putImageData(this.imageData, 0, 0);
    //
    for (let i = 0; i < this.canvas.width * this.canvas.height * 4; i += 4) {
      set = predicate(this.indexToCoord(i)) ? 255 : 0;
      this.imageData.data[i] = 0;
      this.imageData.data[i + 1] = 0;
      this.imageData.data[i + 2] = 0;
      this.imageData.data[i + 3] = set; 
    }
    this.ctx.putImageData(this.imageData, 0, 0);
  }
}

const isMandlebrot = (coord) => {
  let cr = coord.x;
  let ci = coord.y;
  let zr = cr;
  let zi = ci;

  for(let i = 0; i < 100; i++) {
    if (zr**2 + zi**2 > 4) {
      return false;
    }

    newZr = (zr * zr) - (zi * zi) + cr;
    newZi = ((zr * zi) * 2) + ci;
    zr = newZr;
    zi = newZi;
  }
  return true;
}

let graph = new Graph('mandlebrot');
graph.render(isMandlebrot);
