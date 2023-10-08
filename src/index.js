import './style.css';
const gameloop = require('./gameloop.js');

let head = document.querySelector('head');
let fontAwesomeStuff = document.createElement('script');
fontAwesomeStuff.src = 'https://kit.fontawesome.com/b0de09027a.js';
fontAwesomeStuff.crossOrigin = 'anonymous';
head.appendChild(fontAwesomeStuff);

let game = new gameloop;
game.play();

