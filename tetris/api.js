export default class Tetris{
  constructor(option) {
    this.root = option.root;

    this.figure = option.figure || ['pyramid', 'band', 'hookLeft', 'hookRight', 'square', 'figureS', 'figureZ'];

    this.getRandomFigure = option.getRandomFigure;
    this.speed = option.speed || 500;

    this.widthRoot = root.children[0].childElementCount - 1;
    this.heightRoot = root.childElementCount - 1;;

    // this.gameOverPosition = 2 || 2;
    this.start = true;

    this.nawOperand = null;

    this.positionY = option.positionX || 0;
    this.positionX = option.positionX || 4;
    this.interval = null;

    this.init();
  }

  gameOver() {
    this.start = false;
    this.gravities(false);
    const dele = this.root.getElementsByClassName(this.nawOperand.styleName);
    dele[0].classList.remove(this.nawOperand.styleName);
    dele[0].classList.remove(this.nawOperand.styleName);
    dele[0].classList.remove(this.nawOperand.styleName);
    dele[0].classList.remove(this.nawOperand.styleName);

    let indexCell = 0; // индекс клетки с масива
    const y = [4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15];
    const x = [1, 2, 5, 9, 11, 14, 15, 16, 0, 4, 6, 8, 10, 12, 14, 0, 4, 5, 6, 8, 12, 14, 15, 16, 0, 2, 4, 6, 8, 12, 14, 1, 2, 4, 6, 8, 12, 14, 15, 16, 1, 2, 5, 7, 9, 10, 11, 13, 14, 15, 0, 3, 5, 7, 9, 13, 15, 0, 3, 5, 7, 9, 10, 11, 13, 14, 0, 3, 5, 7, 9, 13, 15, 1, 2, 6, 9, 10, 11, 13, 15];
    const colors = ['red', 'green', 'yellow', 'purple', 'skyblue', 'orange', 'blue'];

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    let stepX = 0;
    let stepY = 0;

    function lope(_this){
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

      setTimeout(() => lope(_this), 20);
    }

    lope(this);
  }

  gravities(start) {
    if (start) {
      console.log(this.nawOperand);
      console.log(this.positionX);
      console.log(this.positionY);
      this.interval = setInterval(() => {
        this.goDown();
      }, this.speed);
      return
    }

    clearInterval(this.interval);
  }

  _addControls() {
    document.addEventListener('keydown', (event) => this._clickSorting(event.keyCode));
  }

  _clickSorting(keyCode) {
    if (!(this.start)) {
      console.log('gg');
      return;
    }
    switch(keyCode) {
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

  goLeft() {
    this.positionX -= 1;
    if(this.checkMap()){
      this.moveStep();
      return;
    }
    this.positionX += 1;
  }

  goRight() {
    this.positionX += 1;
    if(this.checkMap()){
      this.moveStep();
      return;
    }
    this.positionX -= 1;
  }

  goDown() {
    this.positionY += 1;
    if(this.checkMap(true)){
      this.moveStep();
      return;
    }
    this.positionY -= 1;
  }

  _findClassIn(classList, className) {
    if (typeof classList === 'string') classList = classList.split(' ');
    let check = false;

    for (var i = 0; i < classList.length; i += 1) {
      if (classList[i] === className) check = true;
    }
    return check;
  }

  checkMap(goDown) {
    if (goDown) {
      for (let i = 0; i < 4; i += 1){
        const x = this.positionX + this.nawOperand.x[i];
        const y = this.positionY + this.nawOperand.y[i];

        if (!this.root.children[y]) {
          this.turningIntoWall();
          return false;
        }
        const check = this._findClassIn(this.root.children[y].children[x].classList.value, 'wall')

        if (check) {
          this.turningIntoWall();
          return false;
        }
      }

      return true;
    }

    for (let i = 0; i < 4; i += 1){
      const x = this.positionX + this.nawOperand.x[i];
      const y = this.positionY + this.nawOperand.y[i];

      if (!this.root.children[y].children[x]) {
        return false;
      }

      const check = this._findClassIn(this.root.children[y].children[x].classList.value, 'wall')

        if (check) {
        return false;
      }
    }

    return true;
  }

  moveStep() {
    const arrCell = document.getElementsByClassName(this.nawOperand.styleName);
    const clear = [];

    for (let i = 0; i < arrCell.length; i++) {
      const check = this._findClassIn(arrCell[i].classList.value, 'wall');

      if (!check) {
        clear.push(arrCell[i]);
      }
    }

    if (!!clear.length) {
      for (let i = clear.length - 1; i >= 0; i -= 1) {
        clear[i].classList.remove(this.nawOperand.styleName);
      }
    }

    for (let i = 0; i < 4; i += 1) {
      const x = this.positionX + this.nawOperand.x[i];
      const y = this.positionY + this.nawOperand.y[i];

      this.root.children[y].children[x].classList.add(this.nawOperand.styleName);
    }
  }

  removalCheck() {
    let removableRows = [];
    const root = this.root;

    const heightTabele = root.childElementCount - 1;
    const widthTabele = root.children[0].childElementCount - 1;

    for (let y = heightTabele; y >= 0; y -= 1) {

      function checkRow() {
        for (let x = widthTabele; x >= 0; x -= 1){
          if (!root.children[y].children[x].classList.length) {
            return false;
          }
        }

        return true;
      }

      const fillingRow = checkRow();
      if (fillingRow) removableRows.push(y);
    }

    if (!!removableRows.length) {
      this.rowCleaning(removableRows);
    }
    return true;
  }

  pressDown(indexRowClean) {
    let arrayItem = null;

    for (let iRow = indexRowClean - 1; iRow >= 0; iRow -= 1) {
      arrayItem = this.root.children[iRow].getElementsByClassName('wall');

      if (!arrayItem.length) return;

      for (let i = arrayItem.length - 1; i >= 0; i -= 1) {
        const classList = arrayItem[i].classList.value;
        const cellIndex = arrayItem[i].cellIndex;

        arrayItem[i].classList.value = '';

        this.root.children[iRow + 1].children[cellIndex].classList = classList;
      }
    }
  }

  rowCleaning(indexArray) {
    this.gravities(false);

    let i = 0;

    const rowClear = (indexRow) => {
      let x = 0;

      const clearCell = () => {
        this.root.children[indexRow].children[x].classList = '';
        x += 1;

        if (x <= this.widthRoot) {
          setTimeout(() => clearCell(), 20);
        } else {
          this.pressDown(indexArray[i] + i);

          i += 1;

          if (!!indexArray[i]) {
            rowClear(indexArray[i] + i);
          } else {
            this.gravities(true);
          }
        }
      }

      clearCell();
    }
    rowClear(indexArray[i]);
  }

  turningIntoWall() {
    function trace() {
      try {
        throw new Error('Моя ошибка');
      }
      catch(e) {
        console.log(e.stack);
      }
    }
    trace();

    for (let i = 0; i < 4; i += 1) {
      const x = this.positionX + this.nawOperand.x[i];
      const y = this.positionY + this.nawOperand.y[i] - 1;

      if (y === 0) {
        this.gameOver();
        return;
      };
      this.root.children[y].children[x].classList.add('wall');
    }
    const check = this.removalCheck();
    if (check) this.createOperand();
  }

  createOperand() {
    this.positionX = 4;
    this.positionY = 0;

    this.getRandomFigure();
    this.moveStep();

    this.positionY = 1;
  }

  init() {
    this._addControls();

    this.gravities(true);

    this.getRandomFigure();
    this.moveStep();
  }
}
