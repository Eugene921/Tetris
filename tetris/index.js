import getRandomFigure from './getRandomFigure';
import Tetris from './api';

const figures = ['band', 'square']; //['band', 'pyramid', 'hookLeft', 'hookRight', 'square', 'figureS', 'figureZ']


const tetris = new Tetris ({
  root: document.getElementById('root'),
  getRandomFigure: getRandomFigure,
  figure: figures,
  // positionX: document.getElementById('start_position_x'),
  // positionY: document.getElementById('start_position_y'),
});



const elementSpeed = document.getElementById('speed');
const fla = document.querySelectorAll('.options input[type="button"]');
const elementOptions = document.getElementById('options');

let checkReload = false;

elementOptions.addEventListener('mouseenter', (event) => {
  tetris.gravities(false);
});
elementOptions.addEventListener('mouseleave', (event) => {
  tetris.gravities(true);
});

elementSpeed.addEventListener('input', () => {
  console.log(elementSpeed.value);
});
elementSpeed.addEventListener('change', () => {
  tetris.speed = elementSpeed.value;
});


for (let i = 0; i < fla.length; i += 1) {
  fla[i].addEventListener('click', ()=> {
    toggleFigures(fla[i].id);
    fla[i].classList.toggle('activeFigure');
  });
}

function addFiguresColor() {
  figures.forEach((item) => {
    for (let i = 0; i < 7; i += 1) {
      if (fla[i].id === item) fla[i].classList.add('activeFigure');
    }
  });
}

function toggleFigures(figure) {
  let clear = true;
  figures.forEach((item, i) => {
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
