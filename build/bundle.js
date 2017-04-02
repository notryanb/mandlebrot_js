/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Graph = function () {
  function Graph(canvasId) {
    _classCallCheck(this, Graph);

    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
    this.aspectRatio = this.canvas.height / this.canvas.width;
    this.r = 20;
    this.center = { x: 0, y: 0 };
    this.iterations = 200;
    this.indexToCoord = this.indexToCoord.bind(this);
    this.render = this.render.bind(this);
  }

  _createClass(Graph, [{
    key: 'indexToCoord',
    value: function indexToCoord(i) {
      var index = i / 4;
      var coord = {
        x: index % this.canvas.width,
        y: Math.floor(index / this.canvas.width)
      };

      coord.x = (coord.x * this.r / this.canvas.width - this.r / 2 + this.center.x * this.aspectRatio) / this.aspectRatio;

      coord.y = (coord.y * this.r / this.canvas.width - this.r / 2) * -1 + this.center.y;
      return coord;
    }
  }, {
    key: 'render',
    value: function render(predicate) {
      for (var i = 0; i < this.canvas.width * this.canvas.height * 4; i += 4) {
        var val = predicate(this.indexToCoord(i));
        var set = val[0] ? 0 : val[1] / this.iterations * 0x1D8348;
        this.imageData.data[i] = (set & 0xff0000) >> 16;
        this.imageData.data[i + 1] = (set & 0x00ff00) >> 8;
        this.imageData.data[i + 2] = set & 0x0000ff;
        this.imageData.data[i + 3] = 255;
      }
      this.ctx.putImageData(this.imageData, 0, 0);
    }
  }]);

  return Graph;
}();

var isMandlebrot = function isMandlebrot(coord) {
  var cr = coord.x;
  var ci = coord.y;
  var zr = cr;
  var zi = ci;
  var i = void 0;

  for (i = 0; i < 200; i++) {
    if (zr ** 2 + zi ** 2 > 4) {
      return [false, i];
    }

    newZr = zr * zr - zi * zi + cr;
    newZi = zr * zi * 2 + ci;
    zr = newZr;
    zi = newZi;
  }
  return [true, i];
};

var graph = new Graph('mandlebrot');
graph.center.x = -1.25066;
graph.center.y = 0.02012;
graph.r = 0.00005;
graph.render(isMandlebrot);

/***/ })
/******/ ]);