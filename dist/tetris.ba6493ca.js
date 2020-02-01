// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"tetris/getRandomFigure.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRandomFigure;

// ============ Model Block ================
function getRandomFigure() {
  var rand = 0 + Math.random() * (this.figure.length - 1);
  rand = Math.round(rand);

  switch (this.figure[rand]) {
    //'pyramid', 'band', 'hookLeft', 'hookRight', 'square', 'figureS', 'figureZ'
    case 'pyramid':
      this.nawOperand = pyramid(this);
      break;

    case 'band':
      this.nawOperand = band(this);
      break;

    case 'hookLeft':
      this.nawOperand = hookLeft(this);
      break;

    case 'hookRight':
      this.nawOperand = hookRight(this);
      break;

    case 'square':
      this.nawOperand = square(this);
      break;

    case 'figureS':
      this.nawOperand = figureS(this);
      break;

    case 'figureZ':
      this.nawOperand = figureZ(this);
      break;
    // case 'gameOver':
    // this.nawOperand = gameOver(this);
    //   break;
  }
} // function gameOver(call) { // ==
//   return {
//     name: 'gameOver',
//     y: [4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15],
//     x: [1, 2, 5, 9, 11, 14, 15, 16, 0, 4, 6, 8, 10, 12, 14, 0, 4, 5, 6, 8, 12, 14, 15, 16, 0, 2, 4, 6, 8, 12, 14, 1, 2, 4, 6, 8, 12, 14, 15, 16, 1, 2, 5, 7, 9, 10, 11, 13, 14, 16, 0, 3, 5, 7, 9, 13, 16, 0, 3, 5, 7, 9, 10, 11, 13, 15, 0, 3, 5, 7, 9, 13, 16, 1, 2, 6, 9, 10, 11, 13, 16],
//     spine: () => { console.log('spin')}
//   };
// }


function square(call) {
  // ==
  return {
    name: 'square',
    styleName: 'purple',
    y: [0, 0, 1, 1],
    x: [0, 1, 0, 1],
    spine: function spine() {
      console.log('spin');
    }
  };
}

function band(call) {
  //  ----
  return {
    name: 'band',
    styleName: 'red',
    position: 0,
    x: [0, 0, 0, 0],
    y: [0, 1, 2, 3],
    spine: function spine() {
      switch (call.nawOperand.position) {
        case 1:
          call.nawOperand.position = 0;
          call.nawOperand.x = [0, 0, 0, 0];
          call.nawOperand.y = [0, 1, 2, 3];
          break;

        case 0:
          call.nawOperand.position = 1;
          call.nawOperand.x = [0, 1, 2, 3];
          call.nawOperand.y = [0, 0, 0, 0];
          break;
      }

      for (var i = 0; i < 4; i += 1) {
        if (call.checkMap()) {
          console.log('spin');
          call.moveStep();
          return;
        }

        call.positionX -= 1;
      }
    }
  };
}

function pyramid(call) {
  return {
    name: 'pyramid',
    styleName: 'skyblue',
    position: 0,
    // 0, 1, 2, 3.
    y: [0, 0, 0, 1],
    x: [0, 1, 2, 1],
    spine: function spine() {
      switch (call.nawOperand.position) {
        case 3:
          call.nawOperand.position = 0;
          call.nawOperand.y = [0, 0, 0, 1];
          call.nawOperand.x = [0, 1, 2, 1];
          break;

        case 0:
          call.nawOperand.position = 1;
          call.nawOperand.y = [0, 1, 2, 1];
          call.nawOperand.x = [0, 0, 0, 1];
          break;

        case 1:
          call.nawOperand.position = 2;
          call.nawOperand.y = [1, 1, 1, 0];
          call.nawOperand.x = [0, 1, 2, 1];
          break;

        case 2:
          call.nawOperand.position = 3;
          call.nawOperand.y = [0, 1, 2, 1];
          call.nawOperand.x = [1, 1, 1, 0];
          break;
      }

      for (var i = 0; i < 4; i += 1) {
        if (call.checkMap()) {
          console.log('spin');
          call.moveStep();
          return;
        }

        call.positionX -= 1;
      }
    }
  };
}

function hookLeft(call) {
  return {
    name: 'hookLeft',
    styleName: 'green',
    position: 0,
    // 0, 1, 2, 3.
    y: [0, 1, 2, 2],
    x: [1, 1, 1, 0],
    spine: function spine() {
      switch (call.nawOperand.position) {
        case 3:
          call.nawOperand.position = 0;
          call.nawOperand.y = [0, 1, 2, 2];
          call.nawOperand.x = [1, 1, 1, 0];
          break;

        case 0:
          call.nawOperand.position = 1;
          call.nawOperand.y = [0, 0, 0, 1];
          call.nawOperand.x = [0, 1, 2, 2];
          break;

        case 1:
          call.nawOperand.position = 2;
          call.nawOperand.y = [0, 1, 2, 0];
          call.nawOperand.x = [0, 0, 0, 1];
          break;

        case 2:
          call.nawOperand.position = 3;
          call.nawOperand.y = [1, 1, 1, 0];
          call.nawOperand.x = [0, 1, 2, 0];
          break;
      }

      for (var i = 0; i < 4; i += 1) {
        if (call.checkMap()) {
          console.log('spin');
          call.moveStep();
          return;
        }

        call.positionX -= 1;
      }
    }
  };
}

function hookRight(call) {
  return {
    name: 'hookRight',
    styleName: 'yellow',
    position: 0,
    // 0, 1, 2, 3.
    y: [0, 1, 2, 2],
    x: [0, 0, 0, 1],
    spine: function spine() {
      switch (call.nawOperand.position) {
        case 3:
          call.nawOperand.position = 0;
          call.nawOperand.y = [0, 1, 2, 2];
          call.nawOperand.x = [0, 0, 0, 1];
          break;

        case 0:
          call.nawOperand.position = 1;
          call.nawOperand.y = [0, 0, 0, 1];
          call.nawOperand.x = [0, 1, 2, 0];
          break;

        case 1:
          call.nawOperand.position = 2;
          call.nawOperand.y = [0, 1, 2, 0];
          call.nawOperand.x = [1, 1, 1, 0];
          break;

        case 2:
          call.nawOperand.position = 3;
          call.nawOperand.y = [1, 1, 1, 0];
          call.nawOperand.x = [0, 1, 2, 2];
          break;
      }

      for (var i = 0; i < 4; i += 1) {
        if (call.checkMap()) {
          console.log('spin');
          call.moveStep();
          return;
        }

        call.positionX -= 1;
      }
    }
  };
}

function figureZ(call) {
  return {
    name: 'figureZ',
    styleName: 'blue',
    position: 0,
    // 0, 1, 2, 3.
    y: [0, 0, 1, 1],
    x: [0, 1, 1, 2],
    spine: function spine() {
      switch (call.nawOperand.position) {
        case 1:
          call.nawOperand.position = 0;
          call.nawOperand.y = [0, 0, 1, 1];
          call.nawOperand.x = [0, 1, 1, 2];
          break;

        case 0:
          call.nawOperand.position = 1;
          call.nawOperand.y = [0, 1, 1, 2];
          call.nawOperand.x = [1, 1, 0, 0];
          break;
      }

      for (var i = 0; i < 4; i += 1) {
        if (call.checkMap()) {
          console.log('spin');
          call.moveStep();
          return;
        }

        call.positionX -= 1;
      }
    }
  };
}

function figureS(call) {
  return {
    name: 'figureS',
    styleName: 'orange',
    position: 0,
    // 0, 1, 2, 3.
    y: [1, 1, 0, 0],
    x: [0, 1, 1, 2],
    spine: function spine() {
      switch (call.nawOperand.position) {
        case 1:
          call.nawOperand.position = 0;
          call.nawOperand.y = [1, 1, 0, 0];
          call.nawOperand.x = [0, 1, 1, 2];
          break;

        case 0:
          call.nawOperand.position = 1;
          call.nawOperand.y = [0, 1, 1, 2];
          call.nawOperand.x = [0, 0, 1, 1];
          break;
      }

      for (var i = 0; i < 4; i += 1) {
        if (call.checkMap()) {
          console.log('spin');
          call.moveStep();
          return;
        }

        call.positionX -= 1;
      }
    }
  };
}
},{}],"tetris/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tetris =
/*#__PURE__*/
function () {
  function Tetris(option) {
    _classCallCheck(this, Tetris);

    this.root = option.root;
    this.figure = option.figure || ['pyramid', 'band', 'hookLeft', 'hookRight', 'square', 'figureS', 'figureZ'];
    this.getRandomFigure = option.getRandomFigure;
    this.speed = option.speed || 500;
    this.widthRoot = root.children[0].childElementCount - 1;
    this.heightRoot = root.childElementCount - 1;
    ; // this.gameOverPosition = 2 || 2;

    this.start = true;
    this.nawOperand = null;
    this.positionY = option.positionX || 0;
    this.positionX = option.positionX || 4;
    this.interval = null;
    this.init();
  }

  _createClass(Tetris, [{
    key: "gameOver",
    value: function gameOver() {
      this.start = false;
      this.gravities(false);
      var dele = this.root.getElementsByClassName(this.nawOperand.styleName);
      dele[0].classList.remove(this.nawOperand.styleName);
      dele[0].classList.remove(this.nawOperand.styleName);
      dele[0].classList.remove(this.nawOperand.styleName);
      dele[0].classList.remove(this.nawOperand.styleName);
      var indexCell = 0; // индекс клетки с масива

      var y = [4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15];
      var x = [1, 2, 5, 9, 11, 14, 15, 16, 0, 4, 6, 8, 10, 12, 14, 0, 4, 5, 6, 8, 12, 14, 15, 16, 0, 2, 4, 6, 8, 12, 14, 1, 2, 4, 6, 8, 12, 14, 15, 16, 1, 2, 5, 7, 9, 10, 11, 13, 14, 15, 0, 3, 5, 7, 9, 13, 15, 0, 3, 5, 7, 9, 10, 11, 13, 14, 0, 3, 5, 7, 9, 13, 15, 1, 2, 6, 9, 10, 11, 13, 15];
      var colors = ['red', 'green', 'yellow', 'purple', 'skyblue', 'orange', 'blue'];

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

      var stepX = 0;
      var stepY = 0;

      function lope(_this) {
        if (stepY === y[indexCell] && stepX === x[indexCell]) {
          _this.root.children[stepY].children[stepX].classList = '';
          indexCell += 1;
        } else {
          _this.root.children[stepY].children[stepX].classList = colors[getRandomInt(0, 7)];
        }

        stepX += 1;

        if (stepX === 17) {
          stepX = 0;
          stepY += 1;
        }

        setTimeout(function () {
          return lope(_this);
        }, 20);
      }

      lope(this);
    }
  }, {
    key: "gravities",
    value: function gravities(start) {
      var _this2 = this;

      if (start) {
        console.log(this.nawOperand);
        console.log(this.positionX);
        console.log(this.positionY);
        this.interval = setInterval(function () {
          _this2.goDown();
        }, this.speed);
        return;
      }

      clearInterval(this.interval);
    }
  }, {
    key: "_addControls",
    value: function _addControls() {
      var _this3 = this;

      document.addEventListener('keydown', function (event) {
        return _this3._clickSorting(event.keyCode);
      });
    }
  }, {
    key: "_clickSorting",
    value: function _clickSorting(keyCode) {
      if (!this.start) {
        console.log('gg');
        return;
      }

      switch (keyCode) {
        case 65:
          this.goLeft();
          break;

        case 87:
          this.nawOperand.spine();
          break;

        case 68:
          this.goRight();
          break;

        case 83:
          this.goDown();
          break;

        default:
          console.log(keyCode);
          break;
      }
    }
  }, {
    key: "goLeft",
    value: function goLeft() {
      this.positionX -= 1;

      if (this.checkMap()) {
        this.moveStep();
        return;
      }

      this.positionX += 1;
    }
  }, {
    key: "goRight",
    value: function goRight() {
      this.positionX += 1;

      if (this.checkMap()) {
        this.moveStep();
        return;
      }

      this.positionX -= 1;
    }
  }, {
    key: "goDown",
    value: function goDown() {
      this.positionY += 1;

      if (this.checkMap(true)) {
        this.moveStep();
        return;
      }

      this.positionY -= 1;
    }
  }, {
    key: "_findClassIn",
    value: function _findClassIn(classList, className) {
      if (typeof classList === 'string') classList = classList.split(' ');
      var check = false;

      for (var i = 0; i < classList.length; i += 1) {
        if (classList[i] === className) check = true;
      }

      return check;
    }
  }, {
    key: "checkMap",
    value: function checkMap(goDown) {
      if (goDown) {
        for (var i = 0; i < 4; i += 1) {
          var x = this.positionX + this.nawOperand.x[i];
          var y = this.positionY + this.nawOperand.y[i];

          if (!this.root.children[y]) {
            this.turningIntoWall();
            return false;
          }

          var check = this._findClassIn(this.root.children[y].children[x].classList.value, 'wall');

          if (check) {
            this.turningIntoWall();
            return false;
          }
        }

        return true;
      }

      for (var _i = 0; _i < 4; _i += 1) {
        var _x = this.positionX + this.nawOperand.x[_i];

        var _y = this.positionY + this.nawOperand.y[_i];

        if (!this.root.children[_y].children[_x]) {
          return false;
        }

        var _check = this._findClassIn(this.root.children[_y].children[_x].classList.value, 'wall');

        if (_check) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "moveStep",
    value: function moveStep() {
      var arrCell = document.getElementsByClassName(this.nawOperand.styleName);
      var clear = [];

      for (var i = 0; i < arrCell.length; i++) {
        var check = this._findClassIn(arrCell[i].classList.value, 'wall');

        if (!check) {
          clear.push(arrCell[i]);
        }
      }

      if (!!clear.length) {
        for (var _i2 = clear.length - 1; _i2 >= 0; _i2 -= 1) {
          clear[_i2].classList.remove(this.nawOperand.styleName);
        }
      }

      for (var _i3 = 0; _i3 < 4; _i3 += 1) {
        var x = this.positionX + this.nawOperand.x[_i3];
        var y = this.positionY + this.nawOperand.y[_i3];
        this.root.children[y].children[x].classList.add(this.nawOperand.styleName);
      }
    }
  }, {
    key: "removalCheck",
    value: function removalCheck() {
      var removableRows = [];
      var root = this.root;
      var heightTabele = root.childElementCount - 1;
      var widthTabele = root.children[0].childElementCount - 1;

      var _loop = function _loop(y) {
        function checkRow() {
          for (var x = widthTabele; x >= 0; x -= 1) {
            if (!root.children[y].children[x].classList.length) {
              return false;
            }
          }

          return true;
        }

        var fillingRow = checkRow();
        if (fillingRow) removableRows.push(y);
      };

      for (var y = heightTabele; y >= 0; y -= 1) {
        _loop(y);
      }

      if (!!removableRows.length) {
        this.rowCleaning(removableRows);
      }

      return true;
    }
  }, {
    key: "pressDown",
    value: function pressDown(indexRowClean) {
      var arrayItem = null;

      for (var iRow = indexRowClean - 1; iRow >= 0; iRow -= 1) {
        arrayItem = this.root.children[iRow].getElementsByClassName('wall');
        if (!arrayItem.length) return;

        for (var i = arrayItem.length - 1; i >= 0; i -= 1) {
          var classList = arrayItem[i].classList.value;
          var cellIndex = arrayItem[i].cellIndex;
          arrayItem[i].classList.value = '';
          this.root.children[iRow + 1].children[cellIndex].classList = classList;
        }
      }
    }
  }, {
    key: "rowCleaning",
    value: function rowCleaning(indexArray) {
      var _this4 = this;

      this.gravities(false);
      var i = 0;

      var rowClear = function rowClear(indexRow) {
        var x = 0;

        var clearCell = function clearCell() {
          _this4.root.children[indexRow].children[x].classList = '';
          x += 1;

          if (x <= _this4.widthRoot) {
            setTimeout(function () {
              return clearCell();
            }, 20);
          } else {
            _this4.pressDown(indexArray[i] + i);

            i += 1;

            if (!!indexArray[i]) {
              rowClear(indexArray[i] + i);
            } else {
              _this4.gravities(true);
            }
          }
        };

        clearCell();
      };

      rowClear(indexArray[i]);
    }
  }, {
    key: "turningIntoWall",
    value: function turningIntoWall() {
      function trace() {
        try {
          throw new Error('Моя ошибка');
        } catch (e) {
          console.log(e.stack);
        }
      }

      trace();

      for (var i = 0; i < 4; i += 1) {
        var x = this.positionX + this.nawOperand.x[i];
        var y = this.positionY + this.nawOperand.y[i] - 1;

        if (y === 0) {
          this.gameOver();
          return;
        }

        ;
        this.root.children[y].children[x].classList.add('wall');
      }

      var check = this.removalCheck();
      if (check) this.createOperand();
    }
  }, {
    key: "createOperand",
    value: function createOperand() {
      this.positionX = 4;
      this.positionY = 0;
      this.getRandomFigure();
      this.moveStep();
      this.positionY = 1;
    }
  }, {
    key: "init",
    value: function init() {
      this._addControls();

      this.gravities(true);
      this.getRandomFigure();
      this.moveStep();
    }
  }]);

  return Tetris;
}();

exports.default = Tetris;
},{}],"tetris/index.js":[function(require,module,exports) {
"use strict";

var _getRandomFigure = _interopRequireDefault(require("./getRandomFigure"));

var _api = _interopRequireDefault(require("./api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var figures = ['band', 'square']; //['band', 'pyramid', 'hookLeft', 'hookRight', 'square', 'figureS', 'figureZ']

var tetris = new _api.default({
  root: document.getElementById('root'),
  getRandomFigure: _getRandomFigure.default,
  figure: figures // positionX: document.getElementById('start_position_x'),
  // positionY: document.getElementById('start_position_y'),

});
var elementSpeed = document.getElementById('speed');
var fla = document.querySelectorAll('.options input[type="button"]');
var elementOptions = document.getElementById('options');
var checkReload = false;
elementOptions.addEventListener('mouseenter', function (event) {
  tetris.gravities(false);
});
elementOptions.addEventListener('mouseleave', function (event) {
  tetris.gravities(true);
});
elementSpeed.addEventListener('input', function () {
  console.log(elementSpeed.value);
});
elementSpeed.addEventListener('change', function () {
  tetris.speed = elementSpeed.value;
});

var _loop = function _loop(i) {
  fla[i].addEventListener('click', function () {
    toggleFigures(fla[i].id);
    fla[i].classList.toggle('activeFigure');
  });
};

for (var i = 0; i < fla.length; i += 1) {
  _loop(i);
}

function addFiguresColor() {
  figures.forEach(function (item) {
    for (var _i = 0; _i < 7; _i += 1) {
      if (fla[_i].id === item) fla[_i].classList.add('activeFigure');
    }
  });
}

function toggleFigures(figure) {
  var clear = true;
  figures.forEach(function (item, i) {
    if (item === figure) {
      clear = false;
      figures.splice(i, 1);
      tetris.figures = figures;
    }
  });

  if (clear) {
    figures.push(figure);
    tetris.figures = figures;
  }
}

addFiguresColor();
},{"./getRandomFigure":"tetris/getRandomFigure.js","./api":"tetris/api.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56655" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","tetris/index.js"], null)
//# sourceMappingURL=/tetris.ba6493ca.js.map