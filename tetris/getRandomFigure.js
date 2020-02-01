// ============ Model Block ================

export default function getRandomFigure() {
  let rand = 0 + Math.random() * (this.figure.length - 1)
  rand = Math.round(rand);

  switch (this.figure[rand]) { //'pyramid', 'band', 'hookLeft', 'hookRight', 'square', 'figureS', 'figureZ'
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
}

// function gameOver(call) { // ==
//   return {
//     name: 'gameOver',
//     y: [4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15],
//     x: [1, 2, 5, 9, 11, 14, 15, 16, 0, 4, 6, 8, 10, 12, 14, 0, 4, 5, 6, 8, 12, 14, 15, 16, 0, 2, 4, 6, 8, 12, 14, 1, 2, 4, 6, 8, 12, 14, 15, 16, 1, 2, 5, 7, 9, 10, 11, 13, 14, 16, 0, 3, 5, 7, 9, 13, 16, 0, 3, 5, 7, 9, 10, 11, 13, 15, 0, 3, 5, 7, 9, 13, 16, 1, 2, 6, 9, 10, 11, 13, 16],
//     spine: () => { console.log('spin')}
//   };
// }

function square(call) { // ==
  return {
    name: 'square',
    styleName: 'purple',
    y: [0, 0, 1, 1],
    x: [0, 1, 0, 1],
    spine: () => { console.log('spin')}
  };
}

function band(call) {  //  ----
  return {
    name: 'band',
    styleName: 'red',
    position: 0,
    x: [0, 0, 0, 0],
    y: [0, 1, 2, 3],
    spine: () => {
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

      for (let i = 0; i < 4; i += 1) {
        if(call.checkMap()){
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
    position: 0, // 0, 1, 2, 3.
    y: [0, 0, 0, 1],
    x: [0, 1, 2, 1],
    spine: () => {
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

      for (let i = 0; i < 4; i += 1) {
        if(call.checkMap()){
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
    position: 0, // 0, 1, 2, 3.
    y: [0, 1, 2, 2],
    x: [1, 1, 1, 0],
    spine: () => {
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

      for (let i = 0; i < 4; i += 1) {
        if(call.checkMap()){
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
    position: 0, // 0, 1, 2, 3.
    y: [0, 1, 2, 2],
    x: [0, 0, 0, 1],
    spine: () => {
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

      for (let i = 0; i < 4; i += 1) {
        if(call.checkMap()){
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
    position: 0, // 0, 1, 2, 3.
    y: [0, 0, 1, 1],
    x: [0, 1, 1, 2],
    spine: () => {
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

      for (let i = 0; i < 4; i += 1) {
        if(call.checkMap()){
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
    position: 0, // 0, 1, 2, 3.
    y: [1, 1, 0, 0],
    x: [0, 1, 1, 2],
    spine: () => {
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

      for (let i = 0; i < 4; i += 1) {
        if(call.checkMap()){
          console.log('spin');
          call.moveStep();
          return;
        }
        call.positionX -= 1;
      }
    }
  };
}
