import './style.css';
const gameloop = require('./gameloop.js');

let game = new gameloop;
game.initializeDOM();
game.initializeDummyShipPlacement();
game.updateDOM();
game.getPlayerArray()[0].attack(game.getPlayerArray()[1])
game.getPlayerArray()[1].attack(game.getPlayerArray()[0])
game.updateDOM();
// game.play();

