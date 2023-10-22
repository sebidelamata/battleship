(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["main"],{

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ship = __webpack_require__(/*! ../src/ship */ "./src/ship.js");
module.exports = class gameboard {
  constructor() {
    this.board = [];
    for (let i = 0; i < 10; i++) {
      this.board.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    this.shipArray = [];
  }
  showBoard = () => {
    return this.board;
  };
  setSeaOfMissesTest = () => {
    this.board = [];
    for (let i = 0; i < 10; i++) {
      this.board.push([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    }
    this.board[0][0] = 0;
  };
  getShipArray = () => {
    return this.shipArray;
  };
  placeShip = (shipLength, noseRow, noseColumn, noseDirection) => {
    let newShip = new ship(shipLength);
    this.getShipArray().push(newShip);
    let newShipIndex = this.getShipArray().length - 1;
    if (noseDirection == 'left') {
      for (let i = 0; i < shipLength; i++) {
        if (noseColumn + i > 9) {
          return 'Can not place ship off of the board!';
        }
      }
      for (let i = 0; i < shipLength; i++) {
        if (this.board[noseRow][noseColumn + i] == 1) {
          return 'Can not place ship on top of another ship';
        }
      }
      for (let i = 0; i < shipLength; i++) {
        this.board[noseRow][noseColumn + i] = 1;
      }
      this.getShipArray()[newShipIndex].setShipCoords(noseRow, noseColumn, noseDirection);
    }
    if (noseDirection == 'right') {
      for (let i = 0; i < shipLength; i++) {
        if (noseColumn - i < 0) {
          return 'Can not place ship off of the board!';
        }
      }
      for (let i = 0; i < shipLength; i++) {
        if (this.board[noseRow][noseColumn - i] == 1) {
          return 'Can not place ship on top of another ship';
        }
      }
      for (let i = 0; i < shipLength; i++) {
        this.board[noseRow][noseColumn - i] = 1;
      }
      this.getShipArray()[newShipIndex].setShipCoords(noseRow, noseColumn, noseDirection);
    }
    if (noseDirection == 'up') {
      for (let i = 0; i < shipLength; i++) {
        if (noseRow + i > 9) {
          return 'Can not place ship off of the board!';
        }
      }
      for (let i = 0; i < shipLength; i++) {
        if (this.board[noseRow + i][noseColumn] == 1) {
          return 'Can not place ship on top of another ship';
        }
      }
      for (let i = 0; i < shipLength; i++) {
        this.board[noseRow + i][noseColumn] = 1;
      }
      this.getShipArray()[newShipIndex].setShipCoords(noseRow, noseColumn, noseDirection);
    }
    if (noseDirection == 'down') {
      for (let i = 0; i < shipLength; i++) {
        if (noseRow - i < 0) {
          return 'Can not place ship off of the board!';
        }
      }
      for (let i = 0; i < shipLength; i++) {
        if (this.board[noseRow - i][noseColumn] == 1) {
          return 'Can not place ship on top of another ship';
        }
      }
      for (let i = 0; i < shipLength; i++) {
        this.board[noseRow - i][noseColumn] = 1;
      }
      this.getShipArray()[newShipIndex].setShipCoords(noseRow, noseColumn, noseDirection);
    }
  };

  // checks the ship objects board to see if those coords match the shot and hits the ship
  checkShipHit = (attackRow, attackColumn) => {
    for (let i = 0; i < this.shipArray.length; i++) {
      if (this.getShipArray()[i].getShipCoords()[attackRow][attackColumn] === 1) {
        this.getShipArray()[i].hit();
      }
    }
  };
  receiveAttack = (attackRow, attackColumn) => {
    // hit
    if (this.board[attackRow][attackColumn] === 1) {
      this.board[attackRow][attackColumn] = 2;
      this.checkShipHit(attackRow, attackColumn);
    }
    // miss
    if (this.board[attackRow][attackColumn] === 0) {
      this.board[attackRow][attackColumn] = -1;
    }
    // already tried this
    if (this.board[attackRow][attackColumn] === 2 || this.board[attackRow][attackColumn] == -1) {
      return "You've already tried these coords!";
    }
  };
  checkGameOver = () => {
    let shipCount = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.showBoard()[i][j] === 1) {
          shipCount += 1;
        }
      }
    }
    if (shipCount === 0) {
      return true;
    } else {
      return false;
    }
  };
};

/***/ }),

/***/ "./src/gameloop.js":
/*!*************************!*\
  !*** ./src/gameloop.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const player = __webpack_require__(/*! ./player.js */ "./src/player.js");
module.exports = class gameloop {
  constructor() {
    this.playerArray = [new player('human'), new player('robot')];
    this.shipLengths = [5, 4, 3, 3, 2];
    this.unsetShips = this.shipLengths.length - 1;
  }
  getPlayerArray = () => {
    return this.playerArray;
  };
  getShipLengths = () => {
    return this.shipLengths;
  };
  getUnsetShips = () => {
    return this.unsetShips;
  };
  setUnsetShips = () => {
    this.unsetShips -= 1;
  };
  updateStartGameDOM = () => {
    let startDefenseBoard = document.querySelector('#start-screen-defense-board');
    let startDefenseBoardSquares = startDefenseBoard.querySelectorAll('.gameboard-square');
    for (let i = 0; i < 100; i++) {
      let rowNumber = (i - i % 10) / 10;
      let columnNumber = i % 10;
      if (this.getPlayerArray()[0].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 1) {
        startDefenseBoardSquares[i].style.backgroundColor = 'green';
      }
      if (this.getPlayerArray()[0].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 0 || this.getPlayerArray()[1].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 1) {
        startDefenseBoardSquares[i].style.backgroundColor = 'aqua';
      }
    }
  };
  startGameScreen = inputShipLength => {
    let body = document.querySelector('body');
    let greyout = document.createElement('div');
    greyout.id = 'greyout-start';
    body.appendChild(greyout);
    let startScreenTitle = document.createElement('div');
    startScreenTitle.id = 'start-screen-title';
    startScreenTitle.textContent = "Direct Your Fleet to Defense Positions!";
    body.appendChild(startScreenTitle);
    let startScreenBody = document.createElement('div');
    startScreenBody.id = 'start-screen-body';
    body.appendChild(startScreenBody);
    let defenseBoardDiv = document.createElement('div');
    defenseBoardDiv.id = 'start-screen-defense-board';
    startScreenBody.appendChild(defenseBoardDiv);
    let turnShipDiv = document.createElement('div');
    turnShipDiv.id = 'turn-ship-div';
    defenseBoardDiv.appendChild(turnShipDiv);
    let turnButton = document.createElement('div');
    turnButton.id = 'turn-button';
    let turnButtonText = document.createElement('div');
    turnButtonText.id = 'turn-button-text';
    turnButtonText.textContent = 'Turn Ship';
    turnButton.appendChild(turnButtonText);
    turnShipDiv.appendChild(turnButton);
    // make a var to store turn state
    let turnState = 'up';
    const getTurnState = () => {
      return turnState;
    };
    const setTurnState = newDirection => {
      turnState = newDirection;
    };
    turnButton.addEventListener('click', () => {
      if (getTurnState() === 'up') {
        setTurnState('right');
      } else if (getTurnState() === 'right') {
        setTurnState('down');
      } else if (getTurnState() === 'down') {
        setTurnState('left');
      } else if (getTurnState() === 'left') {
        setTurnState('up');
      }
    });
    let boardDiv2 = document.createElement('div');
    boardDiv2.id = 'start-defense-board';
    boardDiv2.classList.add('gameboard');
    defenseBoardDiv.appendChild(boardDiv2);
    let boardRowArray2 = [];
    // first entry will be row div followed by the ten child divs for that row
    for (let i = 0; i < 11; i++) {
      boardRowArray2.push([]);
    }
    for (let i = 0; i < 10; i++) {
      boardRowArray2[i][0] = document.createElement('div');
      boardRowArray2[i][0].id = `start-defense-row-${i + 1}`;
      boardRowArray2[i][0].classList.add('row');
      boardDiv2.appendChild(boardRowArray2[i][0]);
      for (let j = 1; j < 11; j++) {
        boardRowArray2[i][j] = document.createElement('div');
        boardRowArray2[i][j].id = `start-defense-row-${i + 1}-column-${j}`;
        boardRowArray2[i][j].classList.add('gameboard-square');
        boardRowArray2[i][0].appendChild(boardRowArray2[i][j]);
      }
    }

    // update to match player board
    this.updateStartGameDOM();

    // this adds the event handler that allows the click on the gameboard and gets added
    // when the mouse hovers over the square if the square allows a placemnt for that direction
    const gameSquareEventHandlerClick = (inputShipLength, row, col, direction) => {
      this.getPlayerArray()[0].showPlayerBoard().placeShip(inputShipLength, row, col, direction);
      this.setUnsetShips();
      this.updateStartGameDOM();
      // clean up body
      let body = document.body;
      let child = body.lastElementChild;
      while (child) {
        body.removeChild(child);
        child = body.lastElementChild;
      }
      if (this.getUnsetShips() >= 0) {
        this.startGameScreen(this.getShipLengths()[this.getUnsetShips()]);
      }
      // if all of the ships have been set, start the game
      if (this.getUnsetShips() < 0) {
        this.initializeDOM();
        this.initializeRobotShipPlacement();
        this.updateDOM();
        this.attackDOM();
      }
    };

    // this is the event listener that handles when the mouse hovers over the square
    // it checks if the ship would fit given the square direction and length of 
    // ship, if it passes it allows the click function to be applied (from above)
    const mouseHoverEventHandler = e => {
      this.updateStartGameDOM();
      let rowAndCol = e.target.id.split('start-defense-row-')[1].split('-column-');
      let row = rowAndCol[0] - 1;
      let col = rowAndCol[1] - 1;
      if (getTurnState() === 'up' && row + inputShipLength < 11) {
        for (let i = 0; i < inputShipLength; i++) {
          let gameboardRow = document.querySelector('.gameboard').children[row + i];
          let gameboardSquareDOM = gameboardRow.children[col];
          gameboardSquareDOM.style.backgroundColor = 'green';
        }
      }
      if (getTurnState() === 'right' && col - inputShipLength > -2) {
        for (let i = 0; i < inputShipLength; i++) {
          let gameboardRow = document.querySelector('.gameboard').children[row];
          let gameboardSquareDOM = gameboardRow.children[col - i];
          gameboardSquareDOM.style.backgroundColor = 'green';
        }
      }
      if (getTurnState() === 'down' && row - inputShipLength > -2) {
        for (let i = 0; i < inputShipLength; i++) {
          let gameboardRow = document.querySelector('.gameboard').children[row - i];
          let gameboardSquareDOM = gameboardRow.children[col];
          gameboardSquareDOM.style.backgroundColor = 'green';
        }
      }
      if (getTurnState() === 'left' && col + inputShipLength < 11) {
        for (let i = 0; i < inputShipLength; i++) {
          let gameboardRow = document.querySelector('.gameboard').children[row];
          let gameboardSquareDOM = gameboardRow.children[col + i];
          gameboardSquareDOM.style.backgroundColor = 'green';
        }
      }
    };

    // determine if ship spots are available
    const shipSpotsClean = (playerNumber, inputShipLength, row, col, direction) => {
      let out = true;
      if (direction == 'up') {
        for (let i = 0; i < inputShipLength; i++) {
          if (this.getPlayerArray()[playerNumber].showPlayerBoard().showBoard()[row + i][col] === 1) {
            out = false;
          }
        }
      }
      if (direction == 'right') {
        for (let i = 0; i < inputShipLength; i++) {
          if (this.getPlayerArray()[playerNumber].showPlayerBoard().showBoard()[row][col - i] === 1) {
            out = false;
          }
        }
      }
      if (direction == 'down') {
        for (let i = 0; i < inputShipLength; i++) {
          if (this.getPlayerArray()[playerNumber].showPlayerBoard().showBoard()[row - i][col] === 1) {
            out = false;
          }
        }
      }
      if (direction == 'left') {
        for (let i = 0; i < inputShipLength; i++) {
          if (this.getPlayerArray()[playerNumber].showPlayerBoard().showBoard()[row][col + i] === 1) {
            out = false;
          }
        }
      }
      return out;
    };

    //separate click from hover
    const mouseClickEventHandler = e => {
      let rowAndCol = e.target.id.split('start-defense-row-')[1].split('-column-');
      let row = rowAndCol[0] - 1;
      let col = rowAndCol[1] - 1;
      if (getTurnState() === 'up' && row + inputShipLength < 11 && shipSpotsClean(0, inputShipLength, row, col, 'up') === true) {
        gameSquareEventHandlerClick(inputShipLength, row, col, 'up');
      }
      if (getTurnState() === 'right' && col - inputShipLength > -2 && shipSpotsClean(0, inputShipLength, row, col, 'right') === true) {
        gameSquareEventHandlerClick(inputShipLength, row, col, 'right');
      }
      if (getTurnState() === 'down' && row - inputShipLength > -2 && shipSpotsClean(0, inputShipLength, row, col, 'down') === true) {
        gameSquareEventHandlerClick(inputShipLength, row, col, 'down');
      }
      if (getTurnState() === 'left' && col + inputShipLength < 11 && shipSpotsClean(0, inputShipLength, row, col, 'left') === true) {
        gameSquareEventHandlerClick(inputShipLength, row, col, 'left');
      }
    };

    // a listener to show where ships will be on defense board
    let gameboardSquares = document.querySelectorAll('.gameboard-square');
    gameboardSquares.forEach(square => {
      square.addEventListener('mouseover', mouseHoverEventHandler);
      square.addEventListener('click', mouseClickEventHandler);
    });
  };
  initializeDOM = () => {
    let attackBoard = document.createElement('div');
    attackBoard.id = 'attack-div';
    attackBoard.classList.add('player-div');
    let boardDiv1 = document.createElement('div');
    boardDiv1.id = 'attack-board';
    boardDiv1.classList.add('gameboard');
    attackBoard.appendChild(boardDiv1);
    let boardRowArray1 = [];
    // first entry will be row div followed by the ten child divs for that row
    for (let i = 0; i < 11; i++) {
      boardRowArray1.push([]);
    }
    for (let i = 0; i < 10; i++) {
      boardRowArray1[i][0] = document.createElement('div');
      boardRowArray1[i][0].id = `attack-row-${i + 1}`;
      boardRowArray1[i][0].classList.add('row');
      boardDiv1.appendChild(boardRowArray1[i][0]);
      for (let j = 1; j < 11; j++) {
        boardRowArray1[i][j] = document.createElement('div');
        boardRowArray1[i][j].id = `attack-row-${i + 1}-column-${j}`;
        boardRowArray1[i][j].classList.add('gameboard-square');
        boardRowArray1[i][0].appendChild(boardRowArray1[i][j]);
      }
    }
    let defenseBoard = document.createElement('div');
    defenseBoard.id = 'defense-div';
    defenseBoard.classList.add('player-div');
    let boardDiv2 = document.createElement('div');
    boardDiv2.id = 'defense-board';
    boardDiv2.classList.add('gameboard');
    defenseBoard.appendChild(boardDiv2);
    let boardRowArray2 = [];
    // first entry will be row div followed by the ten child divs for that row
    for (let i = 0; i < 11; i++) {
      boardRowArray2.push([]);
    }
    for (let i = 0; i < 10; i++) {
      boardRowArray2[i][0] = document.createElement('div');
      boardRowArray2[i][0].id = `defense-row-${i + 1}`;
      boardRowArray2[i][0].classList.add('row');
      boardDiv2.appendChild(boardRowArray2[i][0]);
      for (let j = 1; j < 11; j++) {
        boardRowArray2[i][j] = document.createElement('div');
        boardRowArray2[i][j].id = `defense-row-${i + 1}-column-${j}`;
        boardRowArray2[i][j].classList.add('gameboard-square');
        boardRowArray2[i][j].draggable = true;
        boardRowArray2[i][0].appendChild(boardRowArray2[i][j]);
      }
    }
    let body = document.querySelector('body');
    let header = document.createElement('div');
    header.id = 'header';
    let titleLeft = document.createElement('div');
    titleLeft.id = 'title-left';
    titleLeft.classList.add('title');
    let titleMiddle = document.createElement('div');
    titleMiddle.id = 'title-middle';
    titleMiddle.classList.add('title');
    let titleRight = document.createElement('div');
    titleRight.id = 'title-right';
    titleRight.classList.add('title');
    header.appendChild(titleLeft);
    header.appendChild(titleMiddle);
    titleMiddle.textContent = 'BATTLESHIP';
    header.appendChild(titleRight);
    body.appendChild(header);
    body.appendChild(attackBoard);
    body.appendChild(defenseBoard);
    let footer = document.createElement('div');
    footer.id = 'footer';
    body.appendChild(footer);
  };
  updateDOM = () => {
    let attackBoard = document.querySelector('#attack-board');
    let attackSquares = attackBoard.querySelectorAll('.gameboard-square');
    let defenseBoard = document.querySelector('#defense-board');
    let defenseSquares = defenseBoard.querySelectorAll('.gameboard-square');
    // defense board
    for (let i = 0; i < 100; i++) {
      let rowNumber = (i - i % 10) / 10;
      let columnNumber = i % 10;
      if (this.getPlayerArray()[0].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 1) {
        defenseSquares[i].style.backgroundColor = 'black';
      }
      if (this.getPlayerArray()[0].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 0) {
        defenseSquares[i].style.backgroundColor = 'aqua';
      }
      if (this.getPlayerArray()[0].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 2) {
        defenseSquares[i].style.backgroundColor = 'red';
      }
      if (this.getPlayerArray()[0].showPlayerBoard().showBoard()[rowNumber][columnNumber] === -1) {
        defenseSquares[i].style.backgroundColor = 'white';
      }
    }
    // attack board
    for (let i = 0; i < 100; i++) {
      let rowNumber = (i - i % 10) / 10;
      let columnNumber = i % 10;
      if (this.getPlayerArray()[1].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 2) {
        attackSquares[i].style.backgroundColor = 'green';
      }
      if (this.getPlayerArray()[1].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 0 || this.getPlayerArray()[1].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 1) {
        attackSquares[i].style.backgroundColor = 'aqua';
      }
      if (this.getPlayerArray()[1].showPlayerBoard().showBoard()[rowNumber][columnNumber] === -1) {
        attackSquares[i].style.backgroundColor = 'white';
      }
    }
  };
  initializeRobotShipPlacement = () => {
    for (let i = 0; i < this.getShipLengths().length; i++) {
      let shipLength = this.getShipLengths()[i];
      let shipPlacementOkay = false;
      let row = null;
      let col = null;
      let direction = null;
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        direction = Math.floor(Math.random() * 4);
        if (direction === 0) {
          direction = 'up';
          let spotsTaken = false;
          for (let j = 0; j < shipLength; j++) {
            if (row + shipLength >= 11 || this.getPlayerArray()[1].showPlayerBoard().showBoard()[row + j][col] === 1) {
              spotsTaken = true;
            }
          }
          if (spotsTaken === false) {
            shipPlacementOkay = true;
          }
        }
        if (direction === 1) {
          direction = 'right';
          let spotsTaken = false;
          for (let j = 0; j < shipLength; j++) {
            if (col - shipLength <= -2 || this.getPlayerArray()[1].showPlayerBoard().showBoard()[row][col - j] === 1) {
              spotsTaken = true;
            }
          }
          if (spotsTaken === false) {
            shipPlacementOkay = true;
          }
        }
        if (direction === 2) {
          direction = 'down';
          let spotsTaken = false;
          for (let j = 0; j < shipLength; j++) {
            if (row - shipLength <= -2 || this.getPlayerArray()[1].showPlayerBoard().showBoard()[row - j][col] === 1) {
              spotsTaken = true;
            }
          }
          if (spotsTaken === false) {
            shipPlacementOkay = true;
          }
        }
        if (direction === 3) {
          direction = 'left';
          let spotsTaken = false;
          for (let j = 0; j < shipLength; j++) {
            if (col + shipLength >= 11 || this.getPlayerArray()[1].showPlayerBoard().showBoard()[row][col + j] === 1) {
              spotsTaken = true;
            }
          }
          if (spotsTaken === false) {
            shipPlacementOkay = true;
          }
        }
      } while (shipPlacementOkay === false);
      this.getPlayerArray()[1].showPlayerBoard().placeShip(this.getShipLengths()[i], row, col, direction);
    }
    ;
  };
  generateEndgameDOM = winLoseBool => {
    let docBody = document.querySelector('body');
    let greyout = document.createElement('div');
    greyout.id = 'greyout';
    docBody.appendChild(greyout);
    let modal = document.createElement('div');
    modal.id = 'endgame-modal';
    docBody.appendChild(modal);
    let modalText = document.createElement('div');
    modalText.id = 'modal-text';
    modal.appendChild(modalText);
    let modalButtonDiv = document.createElement('div');
    modalButtonDiv.id = 'modal-button-div';
    modal.appendChild(modalButtonDiv);
    let modalButton = document.createElement('div');
    modalButton.id = 'modal-button';
    modalButton.textContent = 'Play Again';
    modalButtonDiv.appendChild(modalButton);
    if (winLoseBool === false) {
      modalText.textContent = 'You Lose!';
    }
    if (winLoseBool === true) {
      modalText.textContent = 'You Win!';
    }
    modalButtonDiv.addEventListener('click', () => {
      window.location.reload();
    });
  };
  attackDOM = () => {
    let attackBoard = document.querySelector('#attack-board');
    let gameboardSquares = attackBoard.querySelectorAll('.gameboard-square');
    const proccessClick = async e => {
      let rowAndCol = e.target.id.split('row-')[1].split('-column-');
      let row = rowAndCol[0] - 1;
      let col = rowAndCol[1] - 1;
      this.getPlayerArray()[0].attack(this.getPlayerArray()[1], row, col);
      this.updateDOM();
      if (this.getPlayerArray()[1].showTurn() === true && this.getPlayerArray()[0].showPlayerBoard().checkGameOver() === false && this.getPlayerArray()[1].showPlayerBoard().checkGameOver() === false) {
        await new Promise(r => setTimeout(r, 500));
        this.getPlayerArray()[1].attack(this.getPlayerArray()[0]);
        this.updateDOM();
      }
      if (this.getPlayerArray()[0].showPlayerBoard().checkGameOver() === true) {
        this.generateEndgameDOM(false);
      }
      if (this.getPlayerArray()[1].showPlayerBoard().checkGameOver() === true) {
        this.generateEndgameDOM(true);
      }
    };
    gameboardSquares.forEach(function (square) {
      square.addEventListener('click', proccessClick);
    });
  };
  play = () => {
    this.startGameScreen(this.getShipLengths()[this.getUnsetShips()]);
  };
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");

const gameloop = __webpack_require__(/*! ./gameloop.js */ "./src/gameloop.js");
let head = document.querySelector('head');
let fontAwesomeStuff = document.createElement('script');
fontAwesomeStuff.src = 'https://kit.fontawesome.com/b0de09027a.js';
fontAwesomeStuff.crossOrigin = 'anonymous';
head.appendChild(fontAwesomeStuff);
let game = new gameloop();
game.play();

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const gameboard = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
module.exports = class player {
  constructor(playerType) {
    this.playerBoard = new gameboard();
    this.playerType = playerType;
    this.turn = true;
  }
  showPlayerBoard = () => {
    return this.playerBoard;
  };
  showTurn = () => {
    return this.turn;
  };
  setTurn = boolInput => {
    this.turn = boolInput;
  };
  getPlayerType = () => {
    return this.playerType;
  };
  generateRobotAttack = opposingPlayer => {
    let outArray = [null, null];
    do {
      outArray[0] = Math.floor(Math.random() * 10);
      outArray[1] = Math.floor(Math.random() * 10);
    } while (opposingPlayer.showPlayerBoard().showBoard()[outArray[0]][outArray[1]] !== 1 && opposingPlayer.showPlayerBoard().showBoard()[outArray[0]][outArray[1]] !== 0);
    return outArray;
  };
  attack = (opposingPlayer, shotRow, shotColumn) => {
    if (this.showTurn() == true) {
      if (shotRow === undefined && shotColumn === undefined) {
        let robotAttack = this.generateRobotAttack(opposingPlayer);
        shotRow = robotAttack[0];
        shotColumn = robotAttack[1];
      }
      if (opposingPlayer.showPlayerBoard().showBoard()[shotRow][shotColumn] === 2 || opposingPlayer.showPlayerBoard().showBoard()[shotRow][shotColumn] === -1) {
        return;
      }
      opposingPlayer.showPlayerBoard().receiveAttack(shotRow, shotColumn);
      this.setTurn(false);
      if (opposingPlayer.showTurn() == false) {
        opposingPlayer.setTurn(true);
      }
    }
  };
};

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

module.exports = class ship {
  constructor(inputLength) {
    this.shipLength = inputLength;
    this.hits = 0;
    this.sunk = false;
    this.shipCoords = [];
    for (let i = 0; i < 10; i++) {
      this.shipCoords.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
  }
  getHits = () => {
    return this.hits;
  };
  hit = () => {
    this.hits += 1;
    if (this.hits >= this.shipLength) {
      this.sunk = true;
    }
  };
  getSunk = () => {
    return this.sunk;
  };
  getShipCoords = () => {
    return this.shipCoords;
  };
  setShipCoords = (noseRow, noseColumn, noseDirection) => {
    if (noseDirection == 'left') {
      for (let i = 0; i < this.shipLength; i++) {
        this.shipCoords[noseRow][noseColumn + i] = 1;
      }
    }
    if (noseDirection == 'right') {
      for (let i = 0; i < this.shipLength; i++) {
        this.shipCoords[noseRow][noseColumn - i] = 1;
      }
    }
    if (noseDirection == 'up') {
      for (let i = 0; i < this.shipLength; i++) {
        this.shipCoords[noseRow + i][noseColumn] = 1;
      }
    }
    if (noseDirection == 'down') {
      for (let i = 0; i < this.shipLength; i++) {
        this.shipCoords[noseRow - i][noseColumn] = 1;
      }
    }
  };
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `*:not(iframe){
    margin: 0;
    padding: 0;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

body{
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template-rows: 10% 1fr 1fr 10%;
}

#header{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    justify-content: center;
    align-items: center;
}

.title{
    display: grid;
    justify-content: center;
    align-items: center;
    font-size: xx-large;
    font-weight: 900;
}

.player-div{
    display: grid;
    justify-content: center;
    align-items: center;
}

.gameboard{
    display: grid;
    width: 25vw;
    height: 25vw;
    background-color: aqua;
    grid-auto-rows: 10%;
    border-radius: 20px;
    border: 5px solid #e6e6e6;
}

.row{
    display: grid;
    grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
}

.gameboard-square{
    display: grid;
    border-color: black;
    border-width: 1px;
    border: 3px solid #e6e6e6;
    border-radius: 3px;
}
.gameboard-square:hover{
    background-color: rgb(74, 209, 164);
    transition: 0.4s ease-in-out background-color;
}

#defense-board{
    transform:
        perspective(750px)
        translate3d(0px, 0px, -250px)
        rotateX(27deg)
        scale(0.9, 0.9);
    box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2);
    transition: 0.4s ease-in-out transform;

  &:hover {
    transform: translate3d(0px, 0px, -250px);
  }
}

#attack-board{
    transform:
        perspective(750px)
        translate3d(0px, 0px, -250px)
        rotateX(-27deg)
        scale(0.9, 0.9);
    box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2);
    transition: 0.4s ease-in-out transform;

  &:hover {
    transform: translate3d(0px, 0px, -250px);
  }
}

#greyout{
    display: grid;
    background-color: gray;
    position: absolute;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    opacity: 80%;
    z-index: 2;
}

#endgame-modal{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 4fr 1fr;
    background-color: rgb(48, 44, 44);
    position: absolute;
    justify-content: center;
    align-items: center;
    height: 30vh;
    width: 50vw;
    z-index: 3;
    top: 35%;
    left: 25%;
    border-radius: 5%;
    color: #e6e6e6;
}

#modal-text{
    display: grid;
    justify-content: center;
    justify-items: center;
    font-size: xx-large;
}

#modal-button-div{
    display: grid;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 30%;
    height: 80%;
    width: 40%;
    background-color: gray;
    border-radius: 8px;
    transition: font-size 0.3s ease-in, scaleY 0.3s ease-in, scaleX 0.3s ease-in;
}
#modal-button-div:hover{
    transform: scaleY(1.05);
    transform: scaleX(1.05);
    font-size: large;
}

#greyout-start{
    display: grid;
    grid-template-rows: 10vh 90vh;
    background-color: gray;
    position: absolute;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    opacity: 80%;
    z-index: 2;
}

#start-screen-title{
    display: grid;
    justify-content: center;
    align-items: center;
    font-size: xx-large;
    color: #e6e6e6;
    z-index: 3;
}

#start-screen-body{
    display: grid;
    grid-template-columns: 1fr;
    height: 90vh;
}

#ship-yard{
    display: grid;
    grid-template-rows: 1fr 2fr;
    justify-content: center;
    align-items: center;
}

#turn-ship-div{
    display: grid;
    justify-content: center;
    align-items: center;
}

#turn-button{
    display: grid;
    justify-content: center;
    align-items: center;
    color: #e6e6e6;
    z-index: 3;
}

#turn-button-text{
    display: grid;
    justify-content: center;
    align-items: center;
    font-size: x-large;
    border-style: solid;
    border-color: #e6e6e6;
    border-radius: 8px;
    border-width: 1px;
    padding: 24px;
    transition: font-size 0.3s ease-out, scaleY 0.3s ease-out, scaleX 0.3s ease-out;
}
#turn-button-text:hover{
    transform: scaleY(1.05);
    transform: scaleX(1.05);
    font-size: xx-large;
}

#start-screen-defense-board{
    display: grid;
    justify-content: center;
    align-items: center;
    z-index: 3;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,UAAU;IACV,sEAAsE;AAC1E;;AAEA;IACI,aAAa;IACb,YAAY;IACZ,aAAa;IACb,mCAAmC;AACvC;;AAEA;IACI,aAAa;IACb,kCAAkC;IAClC,uBAAuB;IACvB,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,WAAW;IACX,YAAY;IACZ,sBAAsB;IACtB,mBAAmB;IACnB,mBAAmB;IACnB,yBAAyB;AAC7B;;AAEA;IACI,aAAa;IACb,8DAA8D;AAClE;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,iBAAiB;IACjB,yBAAyB;IACzB,kBAAkB;AACtB;AACA;IACI,mCAAmC;IACnC,6CAA6C;AACjD;;AAEA;IACI;;;;uBAImB;IACnB,gDAAgD;IAChD,sCAAsC;;EAExC;IACE,wCAAwC;EAC1C;AACF;;AAEA;IACI;;;;uBAImB;IACnB,gDAAgD;IAChD,sCAAsC;;EAExC;IACE,wCAAwC;EAC1C;AACF;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,kBAAkB;IAClB,uBAAuB;IACvB,mBAAmB;IACnB,aAAa;IACb,YAAY;IACZ,YAAY;IACZ,UAAU;AACd;;AAEA;IACI,aAAa;IACb,0BAA0B;IAC1B,2BAA2B;IAC3B,iCAAiC;IACjC,kBAAkB;IAClB,uBAAuB;IACvB,mBAAmB;IACnB,YAAY;IACZ,WAAW;IACX,UAAU;IACV,QAAQ;IACR,SAAS;IACT,iBAAiB;IACjB,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,qBAAqB;IACrB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,kBAAkB;IAClB,SAAS;IACT,WAAW;IACX,UAAU;IACV,sBAAsB;IACtB,kBAAkB;IAClB,4EAA4E;AAChF;AACA;IACI,uBAAuB;IACvB,uBAAuB;IACvB,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,sBAAsB;IACtB,kBAAkB;IAClB,uBAAuB;IACvB,mBAAmB;IACnB,aAAa;IACb,YAAY;IACZ,YAAY;IACZ,UAAU;AACd;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,cAAc;IACd,UAAU;AACd;;AAEA;IACI,aAAa;IACb,0BAA0B;IAC1B,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,2BAA2B;IAC3B,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,cAAc;IACd,UAAU;AACd;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,kBAAkB;IAClB,mBAAmB;IACnB,qBAAqB;IACrB,kBAAkB;IAClB,iBAAiB;IACjB,aAAa;IACb,+EAA+E;AACnF;AACA;IACI,uBAAuB;IACvB,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,UAAU;AACd","sourcesContent":["*:not(iframe){\n    margin: 0;\n    padding: 0;\n    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;\n}\n\nbody{\n    display: grid;\n    width: 100vw;\n    height: 100vh;\n    grid-template-rows: 10% 1fr 1fr 10%;\n}\n\n#header{\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    grid-template-rows: 1fr;\n    justify-content: center;\n    align-items: center;\n}\n\n.title{\n    display: grid;\n    justify-content: center;\n    align-items: center;\n    font-size: xx-large;\n    font-weight: 900;\n}\n\n.player-div{\n    display: grid;\n    justify-content: center;\n    align-items: center;\n}\n\n.gameboard{\n    display: grid;\n    width: 25vw;\n    height: 25vw;\n    background-color: aqua;\n    grid-auto-rows: 10%;\n    border-radius: 20px;\n    border: 5px solid #e6e6e6;\n}\n\n.row{\n    display: grid;\n    grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;\n}\n\n.gameboard-square{\n    display: grid;\n    border-color: black;\n    border-width: 1px;\n    border: 3px solid #e6e6e6;\n    border-radius: 3px;\n}\n.gameboard-square:hover{\n    background-color: rgb(74, 209, 164);\n    transition: 0.4s ease-in-out background-color;\n}\n\n#defense-board{\n    transform:\n        perspective(750px)\n        translate3d(0px, 0px, -250px)\n        rotateX(27deg)\n        scale(0.9, 0.9);\n    box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2);\n    transition: 0.4s ease-in-out transform;\n\n  &:hover {\n    transform: translate3d(0px, 0px, -250px);\n  }\n}\n\n#attack-board{\n    transform:\n        perspective(750px)\n        translate3d(0px, 0px, -250px)\n        rotateX(-27deg)\n        scale(0.9, 0.9);\n    box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2);\n    transition: 0.4s ease-in-out transform;\n\n  &:hover {\n    transform: translate3d(0px, 0px, -250px);\n  }\n}\n\n#greyout{\n    display: grid;\n    background-color: gray;\n    position: absolute;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n    width: 100vw;\n    opacity: 80%;\n    z-index: 2;\n}\n\n#endgame-modal{\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-template-rows: 4fr 1fr;\n    background-color: rgb(48, 44, 44);\n    position: absolute;\n    justify-content: center;\n    align-items: center;\n    height: 30vh;\n    width: 50vw;\n    z-index: 3;\n    top: 35%;\n    left: 25%;\n    border-radius: 5%;\n    color: #e6e6e6;\n}\n\n#modal-text{\n    display: grid;\n    justify-content: center;\n    justify-items: center;\n    font-size: xx-large;\n}\n\n#modal-button-div{\n    display: grid;\n    justify-content: center;\n    align-items: center;\n    position: relative;\n    left: 30%;\n    height: 80%;\n    width: 40%;\n    background-color: gray;\n    border-radius: 8px;\n    transition: font-size 0.3s ease-in, scaleY 0.3s ease-in, scaleX 0.3s ease-in;\n}\n#modal-button-div:hover{\n    transform: scaleY(1.05);\n    transform: scaleX(1.05);\n    font-size: large;\n}\n\n#greyout-start{\n    display: grid;\n    grid-template-rows: 10vh 90vh;\n    background-color: gray;\n    position: absolute;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n    width: 100vw;\n    opacity: 80%;\n    z-index: 2;\n}\n\n#start-screen-title{\n    display: grid;\n    justify-content: center;\n    align-items: center;\n    font-size: xx-large;\n    color: #e6e6e6;\n    z-index: 3;\n}\n\n#start-screen-body{\n    display: grid;\n    grid-template-columns: 1fr;\n    height: 90vh;\n}\n\n#ship-yard{\n    display: grid;\n    grid-template-rows: 1fr 2fr;\n    justify-content: center;\n    align-items: center;\n}\n\n#turn-ship-div{\n    display: grid;\n    justify-content: center;\n    align-items: center;\n}\n\n#turn-button{\n    display: grid;\n    justify-content: center;\n    align-items: center;\n    color: #e6e6e6;\n    z-index: 3;\n}\n\n#turn-button-text{\n    display: grid;\n    justify-content: center;\n    align-items: center;\n    font-size: x-large;\n    border-style: solid;\n    border-color: #e6e6e6;\n    border-radius: 8px;\n    border-width: 1px;\n    padding: 24px;\n    transition: font-size 0.3s ease-out, scaleY 0.3s ease-out, scaleX 0.3s ease-out;\n}\n#turn-button-text:hover{\n    transform: scaleY(1.05);\n    transform: scaleX(1.05);\n    font-size: xx-large;\n}\n\n#start-screen-defense-board{\n    display: grid;\n    justify-content: center;\n    align-items: center;\n    z-index: 3;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyxnRkFBZ0YsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssUUFBUSxPQUFPLGFBQWEsY0FBYyxNQUFNLFlBQVksTUFBTSxNQUFNLEtBQUssUUFBUSxPQUFPLGFBQWEsY0FBYyxNQUFNLFlBQVksTUFBTSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsdUNBQXVDLGdCQUFnQixpQkFBaUIsNkVBQTZFLEdBQUcsU0FBUyxvQkFBb0IsbUJBQW1CLG9CQUFvQiwwQ0FBMEMsR0FBRyxZQUFZLG9CQUFvQix5Q0FBeUMsOEJBQThCLDhCQUE4QiwwQkFBMEIsR0FBRyxXQUFXLG9CQUFvQiw4QkFBOEIsMEJBQTBCLDBCQUEwQix1QkFBdUIsR0FBRyxnQkFBZ0Isb0JBQW9CLDhCQUE4QiwwQkFBMEIsR0FBRyxlQUFlLG9CQUFvQixrQkFBa0IsbUJBQW1CLDZCQUE2QiwwQkFBMEIsMEJBQTBCLGdDQUFnQyxHQUFHLFNBQVMsb0JBQW9CLHFFQUFxRSxHQUFHLHNCQUFzQixvQkFBb0IsMEJBQTBCLHdCQUF3QixnQ0FBZ0MseUJBQXlCLEdBQUcsMEJBQTBCLDBDQUEwQyxvREFBb0QsR0FBRyxtQkFBbUIscUlBQXFJLHVEQUF1RCw2Q0FBNkMsZUFBZSwrQ0FBK0MsS0FBSyxHQUFHLGtCQUFrQixzSUFBc0ksdURBQXVELDZDQUE2QyxlQUFlLCtDQUErQyxLQUFLLEdBQUcsYUFBYSxvQkFBb0IsNkJBQTZCLHlCQUF5Qiw4QkFBOEIsMEJBQTBCLG9CQUFvQixtQkFBbUIsbUJBQW1CLGlCQUFpQixHQUFHLG1CQUFtQixvQkFBb0IsaUNBQWlDLGtDQUFrQyx3Q0FBd0MseUJBQXlCLDhCQUE4QiwwQkFBMEIsbUJBQW1CLGtCQUFrQixpQkFBaUIsZUFBZSxnQkFBZ0Isd0JBQXdCLHFCQUFxQixHQUFHLGdCQUFnQixvQkFBb0IsOEJBQThCLDRCQUE0QiwwQkFBMEIsR0FBRyxzQkFBc0Isb0JBQW9CLDhCQUE4QiwwQkFBMEIseUJBQXlCLGdCQUFnQixrQkFBa0IsaUJBQWlCLDZCQUE2Qix5QkFBeUIsbUZBQW1GLEdBQUcsMEJBQTBCLDhCQUE4Qiw4QkFBOEIsdUJBQXVCLEdBQUcsbUJBQW1CLG9CQUFvQixvQ0FBb0MsNkJBQTZCLHlCQUF5Qiw4QkFBOEIsMEJBQTBCLG9CQUFvQixtQkFBbUIsbUJBQW1CLGlCQUFpQixHQUFHLHdCQUF3QixvQkFBb0IsOEJBQThCLDBCQUEwQiwwQkFBMEIscUJBQXFCLGlCQUFpQixHQUFHLHVCQUF1QixvQkFBb0IsaUNBQWlDLG1CQUFtQixHQUFHLGVBQWUsb0JBQW9CLGtDQUFrQyw4QkFBOEIsMEJBQTBCLEdBQUcsbUJBQW1CLG9CQUFvQiw4QkFBOEIsMEJBQTBCLEdBQUcsaUJBQWlCLG9CQUFvQiw4QkFBOEIsMEJBQTBCLHFCQUFxQixpQkFBaUIsR0FBRyxzQkFBc0Isb0JBQW9CLDhCQUE4QiwwQkFBMEIseUJBQXlCLDBCQUEwQiw0QkFBNEIseUJBQXlCLHdCQUF3QixvQkFBb0Isc0ZBQXNGLEdBQUcsMEJBQTBCLDhCQUE4Qiw4QkFBOEIsMEJBQTBCLEdBQUcsZ0NBQWdDLG9CQUFvQiw4QkFBOEIsMEJBQTBCLGlCQUFpQixHQUFHLG1CQUFtQjtBQUNoeU07QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOU52QyxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFtRztBQUNuRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHNGQUFPOzs7O0FBSTZDO0FBQ3JFLE9BQU8saUVBQWUsc0ZBQU8sSUFBSSxzRkFBTyxVQUFVLHNGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkJBQTZCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDakNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJjb25zdCBzaGlwID0gcmVxdWlyZSgnLi4vc3JjL3NoaXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBnYW1lYm9hcmR7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmJvYXJkID0gW107XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPDEwOyBpKyspe1xuICAgICAgICAgICAgdGhpcy5ib2FyZC5wdXNoKFswLDAsMCwwLDAsMCwwLDAsMCwwXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaGlwQXJyYXkgPSBbXTtcbiAgICB9XG5cbiAgICBzaG93Qm9hcmQgPSAoKSA9PiB7cmV0dXJuIHRoaXMuYm9hcmR9O1xuXG4gICAgc2V0U2VhT2ZNaXNzZXNUZXN0ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmJvYXJkID0gW107XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPDEwOyBpKyspe1xuICAgICAgICAgICAgdGhpcy5ib2FyZC5wdXNoKFstMSwtMSwtMSwtMSwtMSwtMSwtMSwtMSwtMSwtMV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYm9hcmRbMF1bMF0gPSAwO1xuICAgIH1cblxuICAgIGdldFNoaXBBcnJheSA9ICgpID0+IHtyZXR1cm4gdGhpcy5zaGlwQXJyYXl9O1xuICAgIFxuICAgIHBsYWNlU2hpcCA9IChzaGlwTGVuZ3RoLCBub3NlUm93LCBub3NlQ29sdW1uLCBub3NlRGlyZWN0aW9uKSA9PiB7XG4gICAgICAgIGxldCBuZXdTaGlwID0gbmV3IHNoaXAoc2hpcExlbmd0aCk7XG4gICAgICAgIHRoaXMuZ2V0U2hpcEFycmF5KCkucHVzaChuZXdTaGlwKTtcbiAgICAgICAgbGV0IG5ld1NoaXBJbmRleCA9IHRoaXMuZ2V0U2hpcEFycmF5KCkubGVuZ3RoIC0gMVxuICAgICAgICBpZihub3NlRGlyZWN0aW9uID09ICdsZWZ0Jyl7XG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxzaGlwTGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGlmKChub3NlQ29sdW1uICsgaSkgPiA5KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdDYW4gbm90IHBsYWNlIHNoaXAgb2ZmIG9mIHRoZSBib2FyZCEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHNoaXBMZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5ib2FyZFtub3NlUm93XVtub3NlQ29sdW1uICsgaV0gPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnQ2FuIG5vdCBwbGFjZSBzaGlwIG9uIHRvcCBvZiBhbm90aGVyIHNoaXAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHNoaXBMZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtub3NlUm93XVtub3NlQ29sdW1uICsgaV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5nZXRTaGlwQXJyYXkoKVtuZXdTaGlwSW5kZXhdLnNldFNoaXBDb29yZHMobm9zZVJvdyxub3NlQ29sdW1uLG5vc2VEaXJlY3Rpb24pXG4gICAgICAgIH1cbiAgICAgICAgaWYobm9zZURpcmVjdGlvbiA9PSAncmlnaHQnKXtcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHNoaXBMZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgaWYoKG5vc2VDb2x1bW4gLSBpKSA8IDApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ0NhbiBub3QgcGxhY2Ugc2hpcCBvZmYgb2YgdGhlIGJvYXJkISc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8c2hpcExlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJvYXJkW25vc2VSb3ddW25vc2VDb2x1bW4gLSBpXSA9PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdDYW4gbm90IHBsYWNlIHNoaXAgb24gdG9wIG9mIGFub3RoZXIgc2hpcCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8c2hpcExlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW25vc2VSb3ddW25vc2VDb2x1bW4gLSBpXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdldFNoaXBBcnJheSgpW25ld1NoaXBJbmRleF0uc2V0U2hpcENvb3Jkcyhub3NlUm93LG5vc2VDb2x1bW4sbm9zZURpcmVjdGlvbilcbiAgICAgICAgfVxuICAgICAgICBpZihub3NlRGlyZWN0aW9uID09ICd1cCcpe1xuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8c2hpcExlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBpZigobm9zZVJvdyArIGkpID4gOSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnQ2FuIG5vdCBwbGFjZSBzaGlwIG9mZiBvZiB0aGUgYm9hcmQhJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxzaGlwTGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuYm9hcmRbbm9zZVJvdyArIGldW25vc2VDb2x1bW5dID09IDEpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ0NhbiBub3QgcGxhY2Ugc2hpcCBvbiB0b3Agb2YgYW5vdGhlciBzaGlwJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxzaGlwTGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbbm9zZVJvdyArIGldW25vc2VDb2x1bW5dID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZ2V0U2hpcEFycmF5KClbbmV3U2hpcEluZGV4XS5zZXRTaGlwQ29vcmRzKG5vc2VSb3csbm9zZUNvbHVtbixub3NlRGlyZWN0aW9uKVxuICAgICAgICB9XG4gICAgICAgIGlmKG5vc2VEaXJlY3Rpb24gPT0gJ2Rvd24nKXtcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHNoaXBMZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgaWYoKG5vc2VSb3cgLSBpKSA8IDApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ0NhbiBub3QgcGxhY2Ugc2hpcCBvZmYgb2YgdGhlIGJvYXJkISc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8c2hpcExlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJvYXJkW25vc2VSb3cgLSBpXVtub3NlQ29sdW1uXSA9PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdDYW4gbm90IHBsYWNlIHNoaXAgb24gdG9wIG9mIGFub3RoZXIgc2hpcCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8c2hpcExlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW25vc2VSb3cgLSBpXVtub3NlQ29sdW1uXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdldFNoaXBBcnJheSgpW25ld1NoaXBJbmRleF0uc2V0U2hpcENvb3Jkcyhub3NlUm93LG5vc2VDb2x1bW4sbm9zZURpcmVjdGlvbilcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBjaGVja3MgdGhlIHNoaXAgb2JqZWN0cyBib2FyZCB0byBzZWUgaWYgdGhvc2UgY29vcmRzIG1hdGNoIHRoZSBzaG90IGFuZCBoaXRzIHRoZSBzaGlwXG4gICAgY2hlY2tTaGlwSGl0ID0gKGF0dGFja1JvdywgYXR0YWNrQ29sdW1uKSA9PiB7XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuc2hpcEFycmF5Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0U2hpcEFycmF5KClbaV0uZ2V0U2hpcENvb3JkcygpW2F0dGFja1Jvd11bYXR0YWNrQ29sdW1uXSA9PT0gMSl7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTaGlwQXJyYXkoKVtpXS5oaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlY2VpdmVBdHRhY2sgPSAoYXR0YWNrUm93LCBhdHRhY2tDb2x1bW4pID0+IHtcbiAgICAgICAgLy8gaGl0XG4gICAgICAgIGlmKHRoaXMuYm9hcmRbYXR0YWNrUm93XVthdHRhY2tDb2x1bW5dID09PSAxKXtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbYXR0YWNrUm93XVthdHRhY2tDb2x1bW5dID0gMjtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTaGlwSGl0KGF0dGFja1JvdyxhdHRhY2tDb2x1bW4pO1xuICAgICAgICB9XG4gICAgICAgIC8vIG1pc3NcbiAgICAgICAgaWYodGhpcy5ib2FyZFthdHRhY2tSb3ddW2F0dGFja0NvbHVtbl0gPT09IDApe1xuICAgICAgICAgICAgdGhpcy5ib2FyZFthdHRhY2tSb3ddW2F0dGFja0NvbHVtbl0gPSAtMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhbHJlYWR5IHRyaWVkIHRoaXNcbiAgICAgICAgaWYodGhpcy5ib2FyZFthdHRhY2tSb3ddW2F0dGFja0NvbHVtbl0gPT09IDIgfHwgdGhpcy5ib2FyZFthdHRhY2tSb3ddW2F0dGFja0NvbHVtbl0gPT0gLTEpe1xuICAgICAgICAgICAgcmV0dXJuIFwiWW91J3ZlIGFscmVhZHkgdHJpZWQgdGhlc2UgY29vcmRzIVwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tHYW1lT3ZlciA9ICgpID0+IHtcbiAgICAgICAgbGV0IHNoaXBDb3VudCA9IDBcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8MTA7IGkrKyl7XG4gICAgICAgICAgICBmb3IobGV0IGo9MDsgajwxMDsgaisrKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNob3dCb2FyZCgpW2ldW2pdID09PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgc2hpcENvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKHNoaXBDb3VudCA9PT0gMCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtyZXR1cm4gZmFsc2V9XG5cbiAgICB9XG59OyIsImNvbnN0IHBsYXllciA9IHJlcXVpcmUoJy4vcGxheWVyLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgZ2FtZWxvb3Age1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMucGxheWVyQXJyYXkgPSBbbmV3IHBsYXllcignaHVtYW4nKSwgbmV3IHBsYXllcigncm9ib3QnKV07XG4gICAgICAgIHRoaXMuc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG4gICAgICAgIHRoaXMudW5zZXRTaGlwcyA9IHRoaXMuc2hpcExlbmd0aHMubGVuZ3RoIC0gMTtcbiAgICB9XG5cbiAgICBnZXRQbGF5ZXJBcnJheSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyQXJyYXk7XG4gICAgfVxuXG4gICAgZ2V0U2hpcExlbmd0aHMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoaXBMZW5ndGhzO1xuICAgIH1cblxuICAgIGdldFVuc2V0U2hpcHMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVuc2V0U2hpcHM7XG4gICAgfVxuXG4gICAgc2V0VW5zZXRTaGlwcyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy51bnNldFNoaXBzIC09IDE7XG4gICAgfVxuXG4gICAgdXBkYXRlU3RhcnRHYW1lRE9NID0gKCkgPT4ge1xuICAgICAgICBsZXQgc3RhcnREZWZlbnNlQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtc2NyZWVuLWRlZmVuc2UtYm9hcmQnKTtcbiAgICAgICAgbGV0IHN0YXJ0RGVmZW5zZUJvYXJkU3F1YXJlcyA9IHN0YXJ0RGVmZW5zZUJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYW1lYm9hcmQtc3F1YXJlJyk7XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPDEwMDsgaSsrKXtcbiAgICAgICAgICAgIGxldCByb3dOdW1iZXIgPSAoKGkgLSAoaSAlIDEwKSkgLyAxMCk7XG4gICAgICAgICAgICBsZXQgY29sdW1uTnVtYmVyID0gKGkgJSAxMCk7XG4gICAgICAgICAgICBpZih0aGlzLmdldFBsYXllckFycmF5KClbMF0uc2hvd1BsYXllckJvYXJkKCkuc2hvd0JvYXJkKClbcm93TnVtYmVyXVtjb2x1bW5OdW1iZXJdID09PSAxKXtcbiAgICAgICAgICAgICAgICBzdGFydERlZmVuc2VCb2FyZFNxdWFyZXNbaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyZWVuJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0UGxheWVyQXJyYXkoKVswXS5zaG93UGxheWVyQm9hcmQoKS5zaG93Qm9hcmQoKVtyb3dOdW1iZXJdW2NvbHVtbk51bWJlcl0gPT09IDAgfHwgdGhpcy5nZXRQbGF5ZXJBcnJheSgpWzFdLnNob3dQbGF5ZXJCb2FyZCgpLnNob3dCb2FyZCgpW3Jvd051bWJlcl1bY29sdW1uTnVtYmVyXSA9PT0gMSl7XG4gICAgICAgICAgICAgICAgc3RhcnREZWZlbnNlQm9hcmRTcXVhcmVzW2ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdhcXVhJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc3RhcnRHYW1lU2NyZWVuID0gKGlucHV0U2hpcExlbmd0aCkgPT4ge1xuXG4gICAgICAgIGxldCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICBsZXQgZ3JleW91dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBncmV5b3V0LmlkID0gJ2dyZXlvdXQtc3RhcnQnO1xuICAgICAgICBib2R5LmFwcGVuZENoaWxkKGdyZXlvdXQpO1xuICAgICAgICBsZXQgc3RhcnRTY3JlZW5UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzdGFydFNjcmVlblRpdGxlLmlkID0gJ3N0YXJ0LXNjcmVlbi10aXRsZSc7XG4gICAgICAgIHN0YXJ0U2NyZWVuVGl0bGUudGV4dENvbnRlbnQgPSBcIkRpcmVjdCBZb3VyIEZsZWV0IHRvIERlZmVuc2UgUG9zaXRpb25zIVwiO1xuICAgICAgICBib2R5LmFwcGVuZENoaWxkKHN0YXJ0U2NyZWVuVGl0bGUpO1xuICAgICAgICBsZXQgc3RhcnRTY3JlZW5Cb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN0YXJ0U2NyZWVuQm9keS5pZCA9ICdzdGFydC1zY3JlZW4tYm9keSc7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoc3RhcnRTY3JlZW5Cb2R5KTtcbiAgICAgICAgbGV0IGRlZmVuc2VCb2FyZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkZWZlbnNlQm9hcmREaXYuaWQgPSAnc3RhcnQtc2NyZWVuLWRlZmVuc2UtYm9hcmQnO1xuICAgICAgICBzdGFydFNjcmVlbkJvZHkuYXBwZW5kQ2hpbGQoZGVmZW5zZUJvYXJkRGl2KTtcbiAgICAgICAgbGV0IHR1cm5TaGlwRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHR1cm5TaGlwRGl2LmlkID0gJ3R1cm4tc2hpcC1kaXYnO1xuICAgICAgICBkZWZlbnNlQm9hcmREaXYuYXBwZW5kQ2hpbGQodHVyblNoaXBEaXYpO1xuICAgICAgICBsZXQgdHVybkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0dXJuQnV0dG9uLmlkID0gJ3R1cm4tYnV0dG9uJztcbiAgICAgICAgbGV0IHR1cm5CdXR0b25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHR1cm5CdXR0b25UZXh0LmlkID0gJ3R1cm4tYnV0dG9uLXRleHQnO1xuICAgICAgICB0dXJuQnV0dG9uVGV4dC50ZXh0Q29udGVudCA9ICdUdXJuIFNoaXAnO1xuICAgICAgICB0dXJuQnV0dG9uLmFwcGVuZENoaWxkKHR1cm5CdXR0b25UZXh0KTtcbiAgICAgICAgdHVyblNoaXBEaXYuYXBwZW5kQ2hpbGQodHVybkJ1dHRvbik7XG4gICAgICAgIC8vIG1ha2UgYSB2YXIgdG8gc3RvcmUgdHVybiBzdGF0ZVxuICAgICAgICBsZXQgdHVyblN0YXRlID0gJ3VwJztcbiAgICAgICAgY29uc3QgZ2V0VHVyblN0YXRlID0gKCkgPT4ge3JldHVybiB0dXJuU3RhdGV9O1xuICAgICAgICBjb25zdCBzZXRUdXJuU3RhdGUgPSAobmV3RGlyZWN0aW9uKSA9PiB7dHVyblN0YXRlID0gbmV3RGlyZWN0aW9uO31cbiAgICAgICAgdHVybkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlmKGdldFR1cm5TdGF0ZSgpID09PSAndXAnKXtcbiAgICAgICAgICAgICAgICBzZXRUdXJuU3RhdGUoJ3JpZ2h0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGdldFR1cm5TdGF0ZSgpID09PSAncmlnaHQnKXtcbiAgICAgICAgICAgICAgICBzZXRUdXJuU3RhdGUoJ2Rvd24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZ2V0VHVyblN0YXRlKCkgPT09ICdkb3duJyl7XG4gICAgICAgICAgICAgICAgc2V0VHVyblN0YXRlKCdsZWZ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGdldFR1cm5TdGF0ZSgpID09PSAnbGVmdCcpe1xuICAgICAgICAgICAgICAgIHNldFR1cm5TdGF0ZSgndXAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgbGV0IGJvYXJkRGl2MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBib2FyZERpdjIuaWQgPSAnc3RhcnQtZGVmZW5zZS1ib2FyZCc7XG4gICAgICAgIGJvYXJkRGl2Mi5jbGFzc0xpc3QuYWRkKCdnYW1lYm9hcmQnKTtcbiAgICAgICAgZGVmZW5zZUJvYXJkRGl2LmFwcGVuZENoaWxkKGJvYXJkRGl2Mik7XG4gICAgICAgIGxldCBib2FyZFJvd0FycmF5MiA9IFtdO1xuICAgICAgICAvLyBmaXJzdCBlbnRyeSB3aWxsIGJlIHJvdyBkaXYgZm9sbG93ZWQgYnkgdGhlIHRlbiBjaGlsZCBkaXZzIGZvciB0aGF0IHJvd1xuICAgICAgICBmb3IobGV0IGk9MDsgaTwxMTsgaSsrKXtcbiAgICAgICAgICAgIGJvYXJkUm93QXJyYXkyLnB1c2goW10pXG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpPTA7IGk8MTA7IGkrKyl7XG4gICAgICAgICAgICBib2FyZFJvd0FycmF5MltpXVswXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYm9hcmRSb3dBcnJheTJbaV1bMF0uaWQgPSBgc3RhcnQtZGVmZW5zZS1yb3ctJHtpKzF9YDtcbiAgICAgICAgICAgIGJvYXJkUm93QXJyYXkyW2ldWzBdLmNsYXNzTGlzdC5hZGQoJ3JvdycpO1xuICAgICAgICAgICAgYm9hcmREaXYyLmFwcGVuZENoaWxkKGJvYXJkUm93QXJyYXkyW2ldWzBdKTtcbiAgICAgICAgICAgIGZvcihsZXQgaj0xOyBqPDExOyBqKyspe1xuICAgICAgICAgICAgICAgIGJvYXJkUm93QXJyYXkyW2ldW2pdID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYm9hcmRSb3dBcnJheTJbaV1bal0uaWQgPSBgc3RhcnQtZGVmZW5zZS1yb3ctJHtpKzF9LWNvbHVtbi0ke2p9YDtcbiAgICAgICAgICAgICAgICBib2FyZFJvd0FycmF5MltpXVtqXS5jbGFzc0xpc3QuYWRkKCdnYW1lYm9hcmQtc3F1YXJlJyk7XG4gICAgICAgICAgICAgICAgYm9hcmRSb3dBcnJheTJbaV1bMF0uYXBwZW5kQ2hpbGQoYm9hcmRSb3dBcnJheTJbaV1bal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHRvIG1hdGNoIHBsYXllciBib2FyZFxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXJ0R2FtZURPTSgpXG5cbiAgICAgICAgLy8gdGhpcyBhZGRzIHRoZSBldmVudCBoYW5kbGVyIHRoYXQgYWxsb3dzIHRoZSBjbGljayBvbiB0aGUgZ2FtZWJvYXJkIGFuZCBnZXRzIGFkZGVkXG4gICAgICAgIC8vIHdoZW4gdGhlIG1vdXNlIGhvdmVycyBvdmVyIHRoZSBzcXVhcmUgaWYgdGhlIHNxdWFyZSBhbGxvd3MgYSBwbGFjZW1udCBmb3IgdGhhdCBkaXJlY3Rpb25cbiAgICAgICAgY29uc3QgZ2FtZVNxdWFyZUV2ZW50SGFuZGxlckNsaWNrID0gKGlucHV0U2hpcExlbmd0aCwgcm93LCBjb2wsIGRpcmVjdGlvbikgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRQbGF5ZXJBcnJheSgpWzBdLnNob3dQbGF5ZXJCb2FyZCgpLnBsYWNlU2hpcChpbnB1dFNoaXBMZW5ndGgsIHJvdywgY29sLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5zZXRVbnNldFNoaXBzKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXJ0R2FtZURPTSgpO1xuICAgICAgICAgICAgLy8gY2xlYW4gdXAgYm9keVxuICAgICAgICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICAgICAgbGV0IGNoaWxkID0gYm9keS5sYXN0RWxlbWVudENoaWxkOyAgXG4gICAgICAgICAgICB3aGlsZSAoY2hpbGQpIHsgXG4gICAgICAgICAgICAgICAgYm9keS5yZW1vdmVDaGlsZChjaGlsZCk7IFxuICAgICAgICAgICAgICAgIGNoaWxkID0gYm9keS5sYXN0RWxlbWVudENoaWxkOyBcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2V0VW5zZXRTaGlwcygpID49IDApe1xuICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lU2NyZWVuKHRoaXMuZ2V0U2hpcExlbmd0aHMoKVt0aGlzLmdldFVuc2V0U2hpcHMoKV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiBhbGwgb2YgdGhlIHNoaXBzIGhhdmUgYmVlbiBzZXQsIHN0YXJ0IHRoZSBnYW1lXG4gICAgICAgICAgICAgICAgaWYodGhpcy5nZXRVbnNldFNoaXBzKCkgPCAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplRE9NKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVJvYm90U2hpcFBsYWNlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURPTSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja0RPTSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzIGlzIHRoZSBldmVudCBsaXN0ZW5lciB0aGF0IGhhbmRsZXMgd2hlbiB0aGUgbW91c2UgaG92ZXJzIG92ZXIgdGhlIHNxdWFyZVxuICAgICAgICAvLyBpdCBjaGVja3MgaWYgdGhlIHNoaXAgd291bGQgZml0IGdpdmVuIHRoZSBzcXVhcmUgZGlyZWN0aW9uIGFuZCBsZW5ndGggb2YgXG4gICAgICAgIC8vIHNoaXAsIGlmIGl0IHBhc3NlcyBpdCBhbGxvd3MgdGhlIGNsaWNrIGZ1bmN0aW9uIHRvIGJlIGFwcGxpZWQgKGZyb20gYWJvdmUpXG4gICAgICAgIGNvbnN0IG1vdXNlSG92ZXJFdmVudEhhbmRsZXIgPSAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGFydEdhbWVET00oKTtcbiAgICAgICAgICAgIGxldCByb3dBbmRDb2wgPSBlLnRhcmdldC5pZC5zcGxpdCgnc3RhcnQtZGVmZW5zZS1yb3ctJylbMV0uc3BsaXQoJy1jb2x1bW4tJyk7XG4gICAgICAgICAgICBsZXQgcm93ID0gcm93QW5kQ29sWzBdIC0gMTtcbiAgICAgICAgICAgIGxldCBjb2wgPSByb3dBbmRDb2xbMV0gLSAxO1xuICAgICAgICAgICAgICAgIGlmKGdldFR1cm5TdGF0ZSgpID09PSAndXAnICYmIHJvdyArIGlucHV0U2hpcExlbmd0aCA8IDExKXtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8aW5wdXRTaGlwTGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdhbWVib2FyZFJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQnKS5jaGlsZHJlbltyb3cgKyBpXVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdhbWVib2FyZFNxdWFyZURPTSA9IGdhbWVib2FyZFJvdy5jaGlsZHJlbltjb2xdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZWJvYXJkU3F1YXJlRE9NLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmVlbic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoZ2V0VHVyblN0YXRlKCkgPT09ICdyaWdodCcgJiYgY29sIC0gaW5wdXRTaGlwTGVuZ3RoID4gLTIpe1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxpbnB1dFNoaXBMZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ2FtZWJvYXJkUm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZCcpLmNoaWxkcmVuW3Jvd107XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ2FtZWJvYXJkU3F1YXJlRE9NID0gZ2FtZWJvYXJkUm93LmNoaWxkcmVuW2NvbCAtIGldO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZWJvYXJkU3F1YXJlRE9NLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmVlbic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoZ2V0VHVyblN0YXRlKCkgPT09ICdkb3duJyAmJiByb3cgLSBpbnB1dFNoaXBMZW5ndGggPiAtMil7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGlucHV0U2hpcExlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBnYW1lYm9hcmRSb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkJykuY2hpbGRyZW5bcm93IC0gaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ2FtZWJvYXJkU3F1YXJlRE9NID0gZ2FtZWJvYXJkUm93LmNoaWxkcmVuW2NvbF07XG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lYm9hcmRTcXVhcmVET00uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyZWVuJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihnZXRUdXJuU3RhdGUoKSA9PT0gJ2xlZnQnICYmIGNvbCArIGlucHV0U2hpcExlbmd0aCA8IDExKXtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8aW5wdXRTaGlwTGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdhbWVib2FyZFJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQnKS5jaGlsZHJlbltyb3ddO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdhbWVib2FyZFNxdWFyZURPTSA9IGdhbWVib2FyZFJvdy5jaGlsZHJlbltjb2wgKyBpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVib2FyZFNxdWFyZURPTS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JlZW4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIHNoaXAgc3BvdHMgYXJlIGF2YWlsYWJsZVxuICAgICAgICBjb25zdCBzaGlwU3BvdHNDbGVhbiA9IChwbGF5ZXJOdW1iZXIsIGlucHV0U2hpcExlbmd0aCwgcm93LCBjb2wsIGRpcmVjdGlvbikgPT4ge1xuICAgICAgICAgICAgbGV0IG91dCA9IHRydWU7XG4gICAgICAgICAgICBpZihkaXJlY3Rpb24gPT0gJ3VwJyl7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8aW5wdXRTaGlwTGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2V0UGxheWVyQXJyYXkoKVtwbGF5ZXJOdW1iZXJdLnNob3dQbGF5ZXJCb2FyZCgpLnNob3dCb2FyZCgpW3JvdyArIGldW2NvbF0gPT09IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihkaXJlY3Rpb24gPT0gJ3JpZ2h0Jyl7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8aW5wdXRTaGlwTGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2V0UGxheWVyQXJyYXkoKVtwbGF5ZXJOdW1iZXJdLnNob3dQbGF5ZXJCb2FyZCgpLnNob3dCb2FyZCgpW3Jvd11bY29sIC0gaV0gPT09IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihkaXJlY3Rpb24gPT0gJ2Rvd24nKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxpbnB1dFNoaXBMZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5nZXRQbGF5ZXJBcnJheSgpW3BsYXllck51bWJlcl0uc2hvd1BsYXllckJvYXJkKCkuc2hvd0JvYXJkKClbcm93IC0gaV1bY29sXSA9PT0gMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGRpcmVjdGlvbiA9PSAnbGVmdCcpe1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGlucHV0U2hpcExlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdldFBsYXllckFycmF5KClbcGxheWVyTnVtYmVyXS5zaG93UGxheWVyQm9hcmQoKS5zaG93Qm9hcmQoKVtyb3ddW2NvbCArIGldID09PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuKG91dCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3NlcGFyYXRlIGNsaWNrIGZyb20gaG92ZXJcbiAgICAgICAgY29uc3QgbW91c2VDbGlja0V2ZW50SGFuZGxlciA9IChlKSA9PiB7XG4gICAgICAgICAgICBsZXQgcm93QW5kQ29sID0gZS50YXJnZXQuaWQuc3BsaXQoJ3N0YXJ0LWRlZmVuc2Utcm93LScpWzFdLnNwbGl0KCctY29sdW1uLScpO1xuICAgICAgICAgICAgbGV0IHJvdyA9IHJvd0FuZENvbFswXSAtIDE7XG4gICAgICAgICAgICBsZXQgY29sID0gcm93QW5kQ29sWzFdIC0gMTtcbiAgICAgICAgICAgIGlmKGdldFR1cm5TdGF0ZSgpID09PSAndXAnICYmIHJvdyArIGlucHV0U2hpcExlbmd0aCA8IDExICYmIHNoaXBTcG90c0NsZWFuKDAsIGlucHV0U2hpcExlbmd0aCwgcm93LCBjb2wsICd1cCcpID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICBnYW1lU3F1YXJlRXZlbnRIYW5kbGVyQ2xpY2soaW5wdXRTaGlwTGVuZ3RoLCByb3csIGNvbCwgJ3VwJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihnZXRUdXJuU3RhdGUoKSA9PT0gJ3JpZ2h0JyAmJiBjb2wgLSBpbnB1dFNoaXBMZW5ndGggPiAtMiAmJiBzaGlwU3BvdHNDbGVhbigwLCBpbnB1dFNoaXBMZW5ndGgsIHJvdywgY29sLCAncmlnaHQnKSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgZ2FtZVNxdWFyZUV2ZW50SGFuZGxlckNsaWNrKGlucHV0U2hpcExlbmd0aCwgcm93LCBjb2wsICdyaWdodCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZ2V0VHVyblN0YXRlKCkgPT09ICdkb3duJyAmJiByb3cgLSBpbnB1dFNoaXBMZW5ndGggPiAtMiAmJiBzaGlwU3BvdHNDbGVhbigwLCBpbnB1dFNoaXBMZW5ndGgsIHJvdywgY29sLCAnZG93bicpID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICBnYW1lU3F1YXJlRXZlbnRIYW5kbGVyQ2xpY2soaW5wdXRTaGlwTGVuZ3RoLCByb3csIGNvbCwgJ2Rvd24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGdldFR1cm5TdGF0ZSgpID09PSAnbGVmdCcgJiYgY29sICsgaW5wdXRTaGlwTGVuZ3RoIDwgMTEgJiYgc2hpcFNwb3RzQ2xlYW4oMCwgaW5wdXRTaGlwTGVuZ3RoLCByb3csIGNvbCwgJ2xlZnQnKSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgZ2FtZVNxdWFyZUV2ZW50SGFuZGxlckNsaWNrKGlucHV0U2hpcExlbmd0aCwgcm93LCBjb2wsICdsZWZ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhIGxpc3RlbmVyIHRvIHNob3cgd2hlcmUgc2hpcHMgd2lsbCBiZSBvbiBkZWZlbnNlIGJvYXJkXG4gICAgICAgIGxldCBnYW1lYm9hcmRTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbWVib2FyZC1zcXVhcmUnKTtcbiAgICAgICAgZ2FtZWJvYXJkU3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBtb3VzZUhvdmVyRXZlbnRIYW5kbGVyKVxuICAgICAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbW91c2VDbGlja0V2ZW50SGFuZGxlcilcbiAgICAgICAgfSlcblxuXG5cbiAgICB9XG5cbiAgICBpbml0aWFsaXplRE9NID0gKCkgPT4ge1xuICAgICAgICBsZXQgYXR0YWNrQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXR0YWNrQm9hcmQuaWQgPSAnYXR0YWNrLWRpdic7XG4gICAgICAgIGF0dGFja0JvYXJkLmNsYXNzTGlzdC5hZGQoJ3BsYXllci1kaXYnKTtcbiAgICAgICAgbGV0IGJvYXJkRGl2MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBib2FyZERpdjEuaWQgPSAnYXR0YWNrLWJvYXJkJztcbiAgICAgICAgYm9hcmREaXYxLmNsYXNzTGlzdC5hZGQoJ2dhbWVib2FyZCcpO1xuICAgICAgICBhdHRhY2tCb2FyZC5hcHBlbmRDaGlsZChib2FyZERpdjEpO1xuICAgICAgICBsZXQgYm9hcmRSb3dBcnJheTEgPSBbXTtcbiAgICAgICAgLy8gZmlyc3QgZW50cnkgd2lsbCBiZSByb3cgZGl2IGZvbGxvd2VkIGJ5IHRoZSB0ZW4gY2hpbGQgZGl2cyBmb3IgdGhhdCByb3dcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8MTE7IGkrKyl7XG4gICAgICAgICAgICBib2FyZFJvd0FycmF5MS5wdXNoKFtdKVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPDEwOyBpKyspe1xuICAgICAgICAgICAgYm9hcmRSb3dBcnJheTFbaV1bMF0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGJvYXJkUm93QXJyYXkxW2ldWzBdLmlkID0gYGF0dGFjay1yb3ctJHtpKzF9YDtcbiAgICAgICAgICAgIGJvYXJkUm93QXJyYXkxW2ldWzBdLmNsYXNzTGlzdC5hZGQoJ3JvdycpO1xuICAgICAgICAgICAgYm9hcmREaXYxLmFwcGVuZENoaWxkKGJvYXJkUm93QXJyYXkxW2ldWzBdKTtcbiAgICAgICAgICAgIGZvcihsZXQgaj0xOyBqPDExOyBqKyspe1xuICAgICAgICAgICAgICAgIGJvYXJkUm93QXJyYXkxW2ldW2pdID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYm9hcmRSb3dBcnJheTFbaV1bal0uaWQgPSBgYXR0YWNrLXJvdy0ke2krMX0tY29sdW1uLSR7an1gO1xuICAgICAgICAgICAgICAgIGJvYXJkUm93QXJyYXkxW2ldW2pdLmNsYXNzTGlzdC5hZGQoJ2dhbWVib2FyZC1zcXVhcmUnKTtcbiAgICAgICAgICAgICAgICBib2FyZFJvd0FycmF5MVtpXVswXS5hcHBlbmRDaGlsZChib2FyZFJvd0FycmF5MVtpXVtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGVmZW5zZUJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRlZmVuc2VCb2FyZC5pZCA9ICdkZWZlbnNlLWRpdic7XG4gICAgICAgIGRlZmVuc2VCb2FyZC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItZGl2Jyk7XG4gICAgICAgIGxldCBib2FyZERpdjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYm9hcmREaXYyLmlkID0gJ2RlZmVuc2UtYm9hcmQnO1xuICAgICAgICBib2FyZERpdjIuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkJyk7XG4gICAgICAgIGRlZmVuc2VCb2FyZC5hcHBlbmRDaGlsZChib2FyZERpdjIpO1xuICAgICAgICBsZXQgYm9hcmRSb3dBcnJheTIgPSBbXTtcbiAgICAgICAgLy8gZmlyc3QgZW50cnkgd2lsbCBiZSByb3cgZGl2IGZvbGxvd2VkIGJ5IHRoZSB0ZW4gY2hpbGQgZGl2cyBmb3IgdGhhdCByb3dcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8MTE7IGkrKyl7XG4gICAgICAgICAgICBib2FyZFJvd0FycmF5Mi5wdXNoKFtdKVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPDEwOyBpKyspe1xuICAgICAgICAgICAgYm9hcmRSb3dBcnJheTJbaV1bMF0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGJvYXJkUm93QXJyYXkyW2ldWzBdLmlkID0gYGRlZmVuc2Utcm93LSR7aSsxfWA7XG4gICAgICAgICAgICBib2FyZFJvd0FycmF5MltpXVswXS5jbGFzc0xpc3QuYWRkKCdyb3cnKTtcbiAgICAgICAgICAgIGJvYXJkRGl2Mi5hcHBlbmRDaGlsZChib2FyZFJvd0FycmF5MltpXVswXSk7XG4gICAgICAgICAgICBmb3IobGV0IGo9MTsgajwxMTsgaisrKXtcbiAgICAgICAgICAgICAgICBib2FyZFJvd0FycmF5MltpXVtqXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGJvYXJkUm93QXJyYXkyW2ldW2pdLmlkID0gYGRlZmVuc2Utcm93LSR7aSsxfS1jb2x1bW4tJHtqfWA7XG4gICAgICAgICAgICAgICAgYm9hcmRSb3dBcnJheTJbaV1bal0uY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkLXNxdWFyZScpO1xuICAgICAgICAgICAgICAgIGJvYXJkUm93QXJyYXkyW2ldW2pdLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9hcmRSb3dBcnJheTJbaV1bMF0uYXBwZW5kQ2hpbGQoYm9hcmRSb3dBcnJheTJbaV1bal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaGVhZGVyLmlkID0gJ2hlYWRlcic7XG4gICAgICAgIGxldCB0aXRsZUxlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGl0bGVMZWZ0LmlkID0gJ3RpdGxlLWxlZnQnO1xuICAgICAgICB0aXRsZUxlZnQuY2xhc3NMaXN0LmFkZCgndGl0bGUnKTtcbiAgICAgICAgbGV0IHRpdGxlTWlkZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRpdGxlTWlkZGxlLmlkID0gJ3RpdGxlLW1pZGRsZSc7XG4gICAgICAgIHRpdGxlTWlkZGxlLmNsYXNzTGlzdC5hZGQoJ3RpdGxlJyk7XG4gICAgICAgIGxldCB0aXRsZVJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRpdGxlUmlnaHQuaWQgPSAndGl0bGUtcmlnaHQnO1xuICAgICAgICB0aXRsZVJpZ2h0LmNsYXNzTGlzdC5hZGQoJ3RpdGxlJyk7XG4gICAgICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZUxlZnQpO1xuICAgICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGVNaWRkbGUpO1xuICAgICAgICB0aXRsZU1pZGRsZS50ZXh0Q29udGVudCA9ICdCQVRUTEVTSElQJztcbiAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlUmlnaHQpO1xuICAgICAgICBib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoYXR0YWNrQm9hcmQpO1xuICAgICAgICBib2R5LmFwcGVuZENoaWxkKGRlZmVuc2VCb2FyZCk7XG4gICAgICAgIGxldCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBmb290ZXIuaWQgPSAnZm9vdGVyJztcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChmb290ZXIpO1xuICAgIH1cblxuICAgIHVwZGF0ZURPTSA9ICgpID0+IHtcbiAgICAgICAgbGV0IGF0dGFja0JvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2F0dGFjay1ib2FyZCcpO1xuICAgICAgICBsZXQgYXR0YWNrU3F1YXJlcyA9IGF0dGFja0JvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYW1lYm9hcmQtc3F1YXJlJyk7XG4gICAgICAgIGxldCBkZWZlbnNlQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVmZW5zZS1ib2FyZCcpO1xuICAgICAgICBsZXQgZGVmZW5zZVNxdWFyZXMgPSBkZWZlbnNlQm9hcmQucXVlcnlTZWxlY3RvckFsbCgnLmdhbWVib2FyZC1zcXVhcmUnKTtcbiAgICAgICAgLy8gZGVmZW5zZSBib2FyZFxuICAgICAgICBmb3IobGV0IGk9MDsgaTwxMDA7IGkrKyl7XG4gICAgICAgICAgICBsZXQgcm93TnVtYmVyID0gKChpIC0gKGkgJSAxMCkpIC8gMTApO1xuICAgICAgICAgICAgbGV0IGNvbHVtbk51bWJlciA9IChpICUgMTApO1xuICAgICAgICAgICAgaWYodGhpcy5nZXRQbGF5ZXJBcnJheSgpWzBdLnNob3dQbGF5ZXJCb2FyZCgpLnNob3dCb2FyZCgpW3Jvd051bWJlcl1bY29sdW1uTnVtYmVyXSA9PT0gMSl7XG4gICAgICAgICAgICAgICAgZGVmZW5zZVNxdWFyZXNbaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsYWNrJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0UGxheWVyQXJyYXkoKVswXS5zaG93UGxheWVyQm9hcmQoKS5zaG93Qm9hcmQoKVtyb3dOdW1iZXJdW2NvbHVtbk51bWJlcl0gPT09IDApe1xuICAgICAgICAgICAgICAgIGRlZmVuc2VTcXVhcmVzW2ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdhcXVhJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0UGxheWVyQXJyYXkoKVswXS5zaG93UGxheWVyQm9hcmQoKS5zaG93Qm9hcmQoKVtyb3dOdW1iZXJdW2NvbHVtbk51bWJlcl0gPT09IDIpe1xuICAgICAgICAgICAgICAgIGRlZmVuc2VTcXVhcmVzW2ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5nZXRQbGF5ZXJBcnJheSgpWzBdLnNob3dQbGF5ZXJCb2FyZCgpLnNob3dCb2FyZCgpW3Jvd051bWJlcl1bY29sdW1uTnVtYmVyXSA9PT0gLTEpe1xuICAgICAgICAgICAgICAgIGRlZmVuc2VTcXVhcmVzW2ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gYXR0YWNrIGJvYXJkXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPDEwMDsgaSsrKXtcbiAgICAgICAgICAgIGxldCByb3dOdW1iZXIgPSAoKGkgLSAoaSAlIDEwKSkgLyAxMCk7XG4gICAgICAgICAgICBsZXQgY29sdW1uTnVtYmVyID0gKGkgJSAxMCk7XG4gICAgICAgICAgICBpZih0aGlzLmdldFBsYXllckFycmF5KClbMV0uc2hvd1BsYXllckJvYXJkKCkuc2hvd0JvYXJkKClbcm93TnVtYmVyXVtjb2x1bW5OdW1iZXJdID09PSAyKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tTcXVhcmVzW2ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmVlbic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLmdldFBsYXllckFycmF5KClbMV0uc2hvd1BsYXllckJvYXJkKCkuc2hvd0JvYXJkKClbcm93TnVtYmVyXVtjb2x1bW5OdW1iZXJdID09PSAwIHx8IHRoaXMuZ2V0UGxheWVyQXJyYXkoKVsxXS5zaG93UGxheWVyQm9hcmQoKS5zaG93Qm9hcmQoKVtyb3dOdW1iZXJdW2NvbHVtbk51bWJlcl0gPT09IDEpe1xuICAgICAgICAgICAgICAgIGF0dGFja1NxdWFyZXNbaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2FxdWEnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5nZXRQbGF5ZXJBcnJheSgpWzFdLnNob3dQbGF5ZXJCb2FyZCgpLnNob3dCb2FyZCgpW3Jvd051bWJlcl1bY29sdW1uTnVtYmVyXSA9PT0gLTEpe1xuICAgICAgICAgICAgICAgIGF0dGFja1NxdWFyZXNbaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRpYWxpemVSb2JvdFNoaXBQbGFjZW1lbnQgPSAoKSA9PiB7XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuZ2V0U2hpcExlbmd0aHMoKS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBsZXQgc2hpcExlbmd0aCA9IHRoaXMuZ2V0U2hpcExlbmd0aHMoKVtpXVxuICAgICAgICAgICAgbGV0IHNoaXBQbGFjZW1lbnRPa2F5ID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgcm93ID0gbnVsbDtcbiAgICAgICAgICAgIGxldCBjb2wgPSBudWxsO1xuICAgICAgICAgICAgbGV0IGRpcmVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICBkb3tcbiAgICAgICAgICAgICAgICByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpO1xuICAgICAgICAgICAgICAgIGlmKGRpcmVjdGlvbiA9PT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9J3VwJztcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3RzVGFrZW4gPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDsgajxzaGlwTGVuZ3RoOyBqKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocm93ICsgc2hpcExlbmd0aCA+PSAxMSB8fCB0aGlzLmdldFBsYXllckFycmF5KClbMV0uc2hvd1BsYXllckJvYXJkKCkuc2hvd0JvYXJkKClbcm93ICsgal1bY29sXSA9PT0gMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdHNUYWtlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc3BvdHNUYWtlbiA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcFBsYWNlbWVudE9rYXkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoZGlyZWN0aW9uID09PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0ncmlnaHQnO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdHNUYWtlbiA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqPHNoaXBMZW5ndGg7IGorKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjb2wgLSBzaGlwTGVuZ3RoIDw9IC0yIHx8IHRoaXMuZ2V0UGxheWVyQXJyYXkoKVsxXS5zaG93UGxheWVyQm9hcmQoKS5zaG93Qm9hcmQoKVtyb3ddW2NvbCAtIGpdID09PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90c1Rha2VuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihzcG90c1Rha2VuID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwUGxhY2VtZW50T2theSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoZGlyZWN0aW9uID09PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0nZG93bic7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzcG90c1Rha2VuID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7IGo8c2hpcExlbmd0aDsgaisrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJvdyAtIHNoaXBMZW5ndGggPD0gLTIgfHwgdGhpcy5nZXRQbGF5ZXJBcnJheSgpWzFdLnNob3dQbGF5ZXJCb2FyZCgpLnNob3dCb2FyZCgpW3JvdyAtIGpdW2NvbF0gPT09IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3RzVGFrZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNwb3RzVGFrZW4gPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBQbGFjZW1lbnRPa2F5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihkaXJlY3Rpb24gPT09IDMpe1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSdsZWZ0JztcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3RzVGFrZW4gPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDsgajxzaGlwTGVuZ3RoOyBqKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY29sICsgc2hpcExlbmd0aCA+PSAxMSB8fCB0aGlzLmdldFBsYXllckFycmF5KClbMV0uc2hvd1BsYXllckJvYXJkKCkuc2hvd0JvYXJkKClbcm93XVtjb2wgKyBqXSA9PT0gMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdHNUYWtlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc3BvdHNUYWtlbiA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcFBsYWNlbWVudE9rYXkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfXdoaWxlKHNoaXBQbGFjZW1lbnRPa2F5ID09PSBmYWxzZSlcbiAgICAgICAgICAgIHRoaXMuZ2V0UGxheWVyQXJyYXkoKVsxXS5zaG93UGxheWVyQm9hcmQoKS5wbGFjZVNoaXAodGhpcy5nZXRTaGlwTGVuZ3RocygpW2ldLCByb3csIGNvbCwgZGlyZWN0aW9uKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZ2VuZXJhdGVFbmRnYW1lRE9NID0gKHdpbkxvc2VCb29sKSA9PiB7XG4gICAgICAgIGxldCBkb2NCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICBsZXQgZ3JleW91dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBncmV5b3V0LmlkID0gJ2dyZXlvdXQnO1xuICAgICAgICBkb2NCb2R5LmFwcGVuZENoaWxkKGdyZXlvdXQpO1xuICAgICAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbW9kYWwuaWQgPSAnZW5kZ2FtZS1tb2RhbCc7XG4gICAgICAgIGRvY0JvZHkuYXBwZW5kQ2hpbGQobW9kYWwpO1xuICAgICAgICBsZXQgbW9kYWxUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG1vZGFsVGV4dC5pZCA9ICdtb2RhbC10ZXh0JztcbiAgICAgICAgbW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxUZXh0KTtcbiAgICAgICAgbGV0IG1vZGFsQnV0dG9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG1vZGFsQnV0dG9uRGl2LmlkID0gJ21vZGFsLWJ1dHRvbi1kaXYnO1xuICAgICAgICBtb2RhbC5hcHBlbmRDaGlsZChtb2RhbEJ1dHRvbkRpdik7XG4gICAgICAgIGxldCBtb2RhbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBtb2RhbEJ1dHRvbi5pZCA9ICdtb2RhbC1idXR0b24nO1xuICAgICAgICBtb2RhbEJ1dHRvbi50ZXh0Q29udGVudCA9ICdQbGF5IEFnYWluJztcbiAgICAgICAgbW9kYWxCdXR0b25EaXYuYXBwZW5kQ2hpbGQobW9kYWxCdXR0b24pO1xuICAgICAgICBpZih3aW5Mb3NlQm9vbCA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgbW9kYWxUZXh0LnRleHRDb250ZW50ID0gJ1lvdSBMb3NlISc7XG4gICAgICAgIH1cbiAgICAgICAgaWYod2luTG9zZUJvb2wgPT09IHRydWUpe1xuICAgICAgICAgICAgbW9kYWxUZXh0LnRleHRDb250ZW50ID0gJ1lvdSBXaW4hJztcbiAgICAgICAgfVxuICAgICAgICBtb2RhbEJ1dHRvbkRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGF0dGFja0RPTSA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBhdHRhY2tCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhdHRhY2stYm9hcmQnKTtcbiAgICAgICAgbGV0IGdhbWVib2FyZFNxdWFyZXMgPSBhdHRhY2tCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FtZWJvYXJkLXNxdWFyZScpO1xuXG4gICAgICAgIFxuICAgICAgICBjb25zdCBwcm9jY2Vzc0NsaWNrID0gYXN5bmMgKGUpID0+IHtcbiAgICAgICAgICAgIGxldCByb3dBbmRDb2wgPSBlLnRhcmdldC5pZC5zcGxpdCgncm93LScpWzFdLnNwbGl0KCctY29sdW1uLScpO1xuICAgICAgICAgICAgbGV0IHJvdyA9IHJvd0FuZENvbFswXSAtIDE7XG4gICAgICAgICAgICBsZXQgY29sID0gcm93QW5kQ29sWzFdIC0gMTtcbiAgICAgICAgICAgIHRoaXMuZ2V0UGxheWVyQXJyYXkoKVswXS5hdHRhY2sodGhpcy5nZXRQbGF5ZXJBcnJheSgpWzFdLCByb3csIGNvbCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURPTSgpO1xuICAgICAgICAgICAgaWYodGhpcy5nZXRQbGF5ZXJBcnJheSgpWzFdLnNob3dUdXJuKCkgPT09IHRydWUgJiYgdGhpcy5nZXRQbGF5ZXJBcnJheSgpWzBdLnNob3dQbGF5ZXJCb2FyZCgpLmNoZWNrR2FtZU92ZXIoKSA9PT0gZmFsc2UgJiYgdGhpcy5nZXRQbGF5ZXJBcnJheSgpWzFdLnNob3dQbGF5ZXJCb2FyZCgpLmNoZWNrR2FtZU92ZXIoKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCA1MDApKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFBsYXllckFycmF5KClbMV0uYXR0YWNrKHRoaXMuZ2V0UGxheWVyQXJyYXkoKVswXSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVET00oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0UGxheWVyQXJyYXkoKVswXS5zaG93UGxheWVyQm9hcmQoKS5jaGVja0dhbWVPdmVyKCkgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFbmRnYW1lRE9NKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0UGxheWVyQXJyYXkoKVsxXS5zaG93UGxheWVyQm9hcmQoKS5jaGVja0dhbWVPdmVyKCkgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFbmRnYW1lRE9NKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBnYW1lYm9hcmRTcXVhcmVzLmZvckVhY2goZnVuY3Rpb24oc3F1YXJlKXtcbiAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2NjZXNzQ2xpY2spO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHBsYXkgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhcnRHYW1lU2NyZWVuKHRoaXMuZ2V0U2hpcExlbmd0aHMoKVt0aGlzLmdldFVuc2V0U2hpcHMoKV0pO1xuICAgIH07XG59OyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuY29uc3QgZ2FtZWxvb3AgPSByZXF1aXJlKCcuL2dhbWVsb29wLmpzJyk7XG5cbmxldCBoZWFkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpO1xubGV0IGZvbnRBd2Vzb21lU3R1ZmYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbmZvbnRBd2Vzb21lU3R1ZmYuc3JjID0gJ2h0dHBzOi8va2l0LmZvbnRhd2Vzb21lLmNvbS9iMGRlMDkwMjdhLmpzJztcbmZvbnRBd2Vzb21lU3R1ZmYuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcbmhlYWQuYXBwZW5kQ2hpbGQoZm9udEF3ZXNvbWVTdHVmZik7XG5cbmxldCBnYW1lID0gbmV3IGdhbWVsb29wO1xuZ2FtZS5wbGF5KCk7XG5cbiIsImNvbnN0IGdhbWVib2FyZCA9IHJlcXVpcmUoJy4vZ2FtZWJvYXJkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgcGxheWVyIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXJUeXBlKXtcbiAgICAgICAgdGhpcy5wbGF5ZXJCb2FyZCA9IG5ldyBnYW1lYm9hcmQ7XG4gICAgICAgIHRoaXMucGxheWVyVHlwZSA9IHBsYXllclR5cGU7XG4gICAgICAgIHRoaXMudHVybiA9IHRydWU7XG4gICAgfVxuXG4gICAgc2hvd1BsYXllckJvYXJkID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXJCb2FyZDtcbiAgICB9XG5cbiAgICBzaG93VHVybiA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHVybjtcbiAgICB9XG5cbiAgICBzZXRUdXJuID0gKGJvb2xJbnB1dCkgPT4ge1xuICAgICAgICB0aGlzLnR1cm4gPSBib29sSW5wdXQ7XG4gICAgfVxuXG4gICAgZ2V0UGxheWVyVHlwZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyVHlwZTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZVJvYm90QXR0YWNrID0gKG9wcG9zaW5nUGxheWVyKSA9PiB7XG4gICAgICAgIGxldCBvdXRBcnJheSA9IFtudWxsLCBudWxsXTtcbiAgICAgICAgZG97XG4gICAgICAgICAgICBvdXRBcnJheVswXSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIG91dEFycmF5WzFdID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICB9d2hpbGUob3Bwb3NpbmdQbGF5ZXIuc2hvd1BsYXllckJvYXJkKCkuc2hvd0JvYXJkKClbb3V0QXJyYXlbMF1dW291dEFycmF5WzFdXSAhPT0gMSAmJiBvcHBvc2luZ1BsYXllci5zaG93UGxheWVyQm9hcmQoKS5zaG93Qm9hcmQoKVtvdXRBcnJheVswXV1bb3V0QXJyYXlbMV1dICE9PSAwKVxuICAgICAgICByZXR1cm4gb3V0QXJyYXk7XG4gICAgfVxuXG4gICAgYXR0YWNrID0gKG9wcG9zaW5nUGxheWVyLCBzaG90Um93LCBzaG90Q29sdW1uKSA9PiB7XG4gICAgICAgIGlmKHRoaXMuc2hvd1R1cm4oKSA9PSB0cnVlKXtcbiAgICAgICAgICAgIGlmKHNob3RSb3cgPT09IHVuZGVmaW5lZCAmJiBzaG90Q29sdW1uID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIGxldCByb2JvdEF0dGFjayA9IHRoaXMuZ2VuZXJhdGVSb2JvdEF0dGFjayhvcHBvc2luZ1BsYXllcik7XG4gICAgICAgICAgICAgICAgc2hvdFJvdyA9IHJvYm90QXR0YWNrWzBdO1xuICAgICAgICAgICAgICAgIHNob3RDb2x1bW4gPSByb2JvdEF0dGFja1sxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKG9wcG9zaW5nUGxheWVyLnNob3dQbGF5ZXJCb2FyZCgpLnNob3dCb2FyZCgpW3Nob3RSb3ddW3Nob3RDb2x1bW5dID09PSAyIHx8IG9wcG9zaW5nUGxheWVyLnNob3dQbGF5ZXJCb2FyZCgpLnNob3dCb2FyZCgpW3Nob3RSb3ddW3Nob3RDb2x1bW5dID09PSAtMSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3Bwb3NpbmdQbGF5ZXIuc2hvd1BsYXllckJvYXJkKCkucmVjZWl2ZUF0dGFjayhzaG90Um93LCBzaG90Q29sdW1uKTtcbiAgICAgICAgICAgIHRoaXMuc2V0VHVybihmYWxzZSk7XG4gICAgICAgICAgICBpZihvcHBvc2luZ1BsYXllci5zaG93VHVybigpID09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICBvcHBvc2luZ1BsYXllci5zZXRUdXJuKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIHNoaXAge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGlucHV0TGVuZ3RoKXtcbiAgICAgICAgdGhpcy5zaGlwTGVuZ3RoID0gaW5wdXRMZW5ndGg7XG4gICAgICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNoaXBDb29yZHMgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8MTA7IGkrKyl7XG4gICAgICAgICAgICB0aGlzLnNoaXBDb29yZHMucHVzaChbMCwwLDAsMCwwLDAsMCwwLDAsMF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SGl0cyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGl0cztcbiAgICB9O1xuXG4gICAgaGl0ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmhpdHMgKz0gMTtcbiAgICAgICAgaWYodGhpcy5oaXRzID49IHRoaXMuc2hpcExlbmd0aCl7XG4gICAgICAgICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGdldFN1bmsgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1bms7XG4gICAgfTtcblxuICAgIGdldFNoaXBDb29yZHMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoaXBDb29yZHM7XG4gICAgfTtcblxuICAgIHNldFNoaXBDb29yZHMgPSAobm9zZVJvdyxub3NlQ29sdW1uLG5vc2VEaXJlY3Rpb24pID0+IHtcbiAgICAgICAgaWYobm9zZURpcmVjdGlvbiA9PSAnbGVmdCcpe1xuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5zaGlwTGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcENvb3Jkc1tub3NlUm93XVtub3NlQ29sdW1uICsgaV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKG5vc2VEaXJlY3Rpb24gPT0gJ3JpZ2h0Jyl7XG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLnNoaXBMZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwQ29vcmRzW25vc2VSb3ddW25vc2VDb2x1bW4gLSBpXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYobm9zZURpcmVjdGlvbiA9PSAndXAnKXtcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuc2hpcExlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBDb29yZHNbbm9zZVJvdyArIGldW25vc2VDb2x1bW5dID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihub3NlRGlyZWN0aW9uID09ICdkb3duJyl7XG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLnNoaXBMZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwQ29vcmRzW25vc2VSb3cgLSBpXVtub3NlQ29sdW1uXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG59O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCo6bm90KGlmcmFtZSl7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgZm9udC1mYW1pbHk6IEltcGFjdCwgSGFldHRlbnNjaHdlaWxlciwgJ0FyaWFsIE5hcnJvdyBCb2xkJywgc2Fucy1zZXJpZjtcbn1cblxuYm9keXtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMTAlIDFmciAxZnIgMTAlO1xufVxuXG4jaGVhZGVye1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4udGl0bGV7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XG4gICAgZm9udC13ZWlnaHQ6IDkwMDtcbn1cblxuLnBsYXllci1kaXZ7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uZ2FtZWJvYXJke1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgd2lkdGg6IDI1dnc7XG4gICAgaGVpZ2h0OiAyNXZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XG4gICAgZ3JpZC1hdXRvLXJvd3M6IDEwJTtcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICAgIGJvcmRlcjogNXB4IHNvbGlkICNlNmU2ZTY7XG59XG5cbi5yb3d7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDEwJSAxMCUgMTAlIDEwJSAxMCUgMTAlIDEwJSAxMCUgMTAlIDEwJTtcbn1cblxuLmdhbWVib2FyZC1zcXVhcmV7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBib3JkZXItY29sb3I6IGJsYWNrO1xuICAgIGJvcmRlci13aWR0aDogMXB4O1xuICAgIGJvcmRlcjogM3B4IHNvbGlkICNlNmU2ZTY7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xufVxuLmdhbWVib2FyZC1zcXVhcmU6aG92ZXJ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc0LCAyMDksIDE2NCk7XG4gICAgdHJhbnNpdGlvbjogMC40cyBlYXNlLWluLW91dCBiYWNrZ3JvdW5kLWNvbG9yO1xufVxuXG4jZGVmZW5zZS1ib2FyZHtcbiAgICB0cmFuc2Zvcm06XG4gICAgICAgIHBlcnNwZWN0aXZlKDc1MHB4KVxuICAgICAgICB0cmFuc2xhdGUzZCgwcHgsIDBweCwgLTI1MHB4KVxuICAgICAgICByb3RhdGVYKDI3ZGVnKVxuICAgICAgICBzY2FsZSgwLjksIDAuOSk7XG4gICAgYm94LXNoYWRvdzogMCA3MHB4IDQwcHggLTIwcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xuICAgIHRyYW5zaXRpb246IDAuNHMgZWFzZS1pbi1vdXQgdHJhbnNmb3JtO1xuXG4gICY6aG92ZXIge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIC0yNTBweCk7XG4gIH1cbn1cblxuI2F0dGFjay1ib2FyZHtcbiAgICB0cmFuc2Zvcm06XG4gICAgICAgIHBlcnNwZWN0aXZlKDc1MHB4KVxuICAgICAgICB0cmFuc2xhdGUzZCgwcHgsIDBweCwgLTI1MHB4KVxuICAgICAgICByb3RhdGVYKC0yN2RlZylcbiAgICAgICAgc2NhbGUoMC45LCAwLjkpO1xuICAgIGJveC1zaGFkb3c6IDAgNzBweCA0MHB4IC0yMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICB0cmFuc2l0aW9uOiAwLjRzIGVhc2UtaW4tb3V0IHRyYW5zZm9ybTtcblxuICAmOmhvdmVyIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAtMjUwcHgpO1xuICB9XG59XG5cbiNncmV5b3V0e1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBvcGFjaXR5OiA4MCU7XG4gICAgei1pbmRleDogMjtcbn1cblxuI2VuZGdhbWUtbW9kYWx7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDRmciAxZnI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDQ4LCA0NCwgNDQpO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGhlaWdodDogMzB2aDtcbiAgICB3aWR0aDogNTB2dztcbiAgICB6LWluZGV4OiAzO1xuICAgIHRvcDogMzUlO1xuICAgIGxlZnQ6IDI1JTtcbiAgICBib3JkZXItcmFkaXVzOiA1JTtcbiAgICBjb2xvcjogI2U2ZTZlNjtcbn1cblxuI21vZGFsLXRleHR7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiB4eC1sYXJnZTtcbn1cblxuI21vZGFsLWJ1dHRvbi1kaXZ7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBsZWZ0OiAzMCU7XG4gICAgaGVpZ2h0OiA4MCU7XG4gICAgd2lkdGg6IDQwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICB0cmFuc2l0aW9uOiBmb250LXNpemUgMC4zcyBlYXNlLWluLCBzY2FsZVkgMC4zcyBlYXNlLWluLCBzY2FsZVggMC4zcyBlYXNlLWluO1xufVxuI21vZGFsLWJ1dHRvbi1kaXY6aG92ZXJ7XG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMS4wNSk7XG4gICAgdHJhbnNmb3JtOiBzY2FsZVgoMS4wNSk7XG4gICAgZm9udC1zaXplOiBsYXJnZTtcbn1cblxuI2dyZXlvdXQtc3RhcnR7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDEwdmggOTB2aDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIG9wYWNpdHk6IDgwJTtcbiAgICB6LWluZGV4OiAyO1xufVxuXG4jc3RhcnQtc2NyZWVuLXRpdGxle1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmb250LXNpemU6IHh4LWxhcmdlO1xuICAgIGNvbG9yOiAjZTZlNmU2O1xuICAgIHotaW5kZXg6IDM7XG59XG5cbiNzdGFydC1zY3JlZW4tYm9keXtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICAgIGhlaWdodDogOTB2aDtcbn1cblxuI3NoaXAteWFyZHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDJmcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4jdHVybi1zaGlwLWRpdntcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbiN0dXJuLWJ1dHRvbntcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgY29sb3I6ICNlNmU2ZTY7XG4gICAgei1pbmRleDogMztcbn1cblxuI3R1cm4tYnV0dG9uLXRleHR7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogeC1sYXJnZTtcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci1jb2xvcjogI2U2ZTZlNjtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgcGFkZGluZzogMjRweDtcbiAgICB0cmFuc2l0aW9uOiBmb250LXNpemUgMC4zcyBlYXNlLW91dCwgc2NhbGVZIDAuM3MgZWFzZS1vdXQsIHNjYWxlWCAwLjNzIGVhc2Utb3V0O1xufVxuI3R1cm4tYnV0dG9uLXRleHQ6aG92ZXJ7XG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMS4wNSk7XG4gICAgdHJhbnNmb3JtOiBzY2FsZVgoMS4wNSk7XG4gICAgZm9udC1zaXplOiB4eC1sYXJnZTtcbn1cblxuI3N0YXJ0LXNjcmVlbi1kZWZlbnNlLWJvYXJke1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB6LWluZGV4OiAzO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFNBQVM7SUFDVCxVQUFVO0lBQ1Ysc0VBQXNFO0FBQzFFOztBQUVBO0lBQ0ksYUFBYTtJQUNiLFlBQVk7SUFDWixhQUFhO0lBQ2IsbUNBQW1DO0FBQ3ZDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGtDQUFrQztJQUNsQyx1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixXQUFXO0lBQ1gsWUFBWTtJQUNaLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw4REFBOEQ7QUFDbEU7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQix5QkFBeUI7SUFDekIsa0JBQWtCO0FBQ3RCO0FBQ0E7SUFDSSxtQ0FBbUM7SUFDbkMsNkNBQTZDO0FBQ2pEOztBQUVBO0lBQ0k7Ozs7dUJBSW1CO0lBQ25CLGdEQUFnRDtJQUNoRCxzQ0FBc0M7O0VBRXhDO0lBQ0Usd0NBQXdDO0VBQzFDO0FBQ0Y7O0FBRUE7SUFDSTs7Ozt1QkFJbUI7SUFDbkIsZ0RBQWdEO0lBQ2hELHNDQUFzQzs7RUFFeEM7SUFDRSx3Q0FBd0M7RUFDMUM7QUFDRjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsa0JBQWtCO0lBQ2xCLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLFlBQVk7SUFDWixZQUFZO0lBQ1osVUFBVTtBQUNkOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDBCQUEwQjtJQUMxQiwyQkFBMkI7SUFDM0IsaUNBQWlDO0lBQ2pDLGtCQUFrQjtJQUNsQix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixXQUFXO0lBQ1gsVUFBVTtJQUNWLFFBQVE7SUFDUixTQUFTO0lBQ1QsaUJBQWlCO0lBQ2pCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLHFCQUFxQjtJQUNyQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsU0FBUztJQUNULFdBQVc7SUFDWCxVQUFVO0lBQ1Ysc0JBQXNCO0lBQ3RCLGtCQUFrQjtJQUNsQiw0RUFBNEU7QUFDaEY7QUFDQTtJQUNJLHVCQUF1QjtJQUN2Qix1QkFBdUI7SUFDdkIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDZCQUE2QjtJQUM3QixzQkFBc0I7SUFDdEIsa0JBQWtCO0lBQ2xCLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLFlBQVk7SUFDWixZQUFZO0lBQ1osVUFBVTtBQUNkOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLGNBQWM7SUFDZCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsMEJBQTBCO0lBQzFCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsMkJBQTJCO0lBQzNCLHVCQUF1QjtJQUN2QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLGNBQWM7SUFDZCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLHFCQUFxQjtJQUNyQixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYiwrRUFBK0U7QUFDbkY7QUFDQTtJQUNJLHVCQUF1QjtJQUN2Qix1QkFBdUI7SUFDdkIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsVUFBVTtBQUNkXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIio6bm90KGlmcmFtZSl7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgZm9udC1mYW1pbHk6IEltcGFjdCwgSGFldHRlbnNjaHdlaWxlciwgJ0FyaWFsIE5hcnJvdyBCb2xkJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuYm9keXtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDEwJSAxZnIgMWZyIDEwJTtcXG59XFxuXFxuI2hlYWRlcntcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4udGl0bGV7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBmb250LXNpemU6IHh4LWxhcmdlO1xcbiAgICBmb250LXdlaWdodDogOTAwO1xcbn1cXG5cXG4ucGxheWVyLWRpdntcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5nYW1lYm9hcmR7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHdpZHRoOiAyNXZ3O1xcbiAgICBoZWlnaHQ6IDI1dnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XFxuICAgIGdyaWQtYXV0by1yb3dzOiAxMCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxuICAgIGJvcmRlcjogNXB4IHNvbGlkICNlNmU2ZTY7XFxufVxcblxcbi5yb3d7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMTAlIDEwJSAxMCUgMTAlIDEwJSAxMCUgMTAlIDEwJSAxMCUgMTAlO1xcbn1cXG5cXG4uZ2FtZWJvYXJkLXNxdWFyZXtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgYm9yZGVyLWNvbG9yOiBibGFjaztcXG4gICAgYm9yZGVyLXdpZHRoOiAxcHg7XFxuICAgIGJvcmRlcjogM3B4IHNvbGlkICNlNmU2ZTY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcXG59XFxuLmdhbWVib2FyZC1zcXVhcmU6aG92ZXJ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NCwgMjA5LCAxNjQpO1xcbiAgICB0cmFuc2l0aW9uOiAwLjRzIGVhc2UtaW4tb3V0IGJhY2tncm91bmQtY29sb3I7XFxufVxcblxcbiNkZWZlbnNlLWJvYXJke1xcbiAgICB0cmFuc2Zvcm06XFxuICAgICAgICBwZXJzcGVjdGl2ZSg3NTBweClcXG4gICAgICAgIHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAtMjUwcHgpXFxuICAgICAgICByb3RhdGVYKDI3ZGVnKVxcbiAgICAgICAgc2NhbGUoMC45LCAwLjkpO1xcbiAgICBib3gtc2hhZG93OiAwIDcwcHggNDBweCAtMjBweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICAgIHRyYW5zaXRpb246IDAuNHMgZWFzZS1pbi1vdXQgdHJhbnNmb3JtO1xcblxcbiAgJjpob3ZlciB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIC0yNTBweCk7XFxuICB9XFxufVxcblxcbiNhdHRhY2stYm9hcmR7XFxuICAgIHRyYW5zZm9ybTpcXG4gICAgICAgIHBlcnNwZWN0aXZlKDc1MHB4KVxcbiAgICAgICAgdHJhbnNsYXRlM2QoMHB4LCAwcHgsIC0yNTBweClcXG4gICAgICAgIHJvdGF0ZVgoLTI3ZGVnKVxcbiAgICAgICAgc2NhbGUoMC45LCAwLjkpO1xcbiAgICBib3gtc2hhZG93OiAwIDcwcHggNDBweCAtMjBweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICAgIHRyYW5zaXRpb246IDAuNHMgZWFzZS1pbi1vdXQgdHJhbnNmb3JtO1xcblxcbiAgJjpob3ZlciB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIC0yNTBweCk7XFxuICB9XFxufVxcblxcbiNncmV5b3V0e1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIG9wYWNpdHk6IDgwJTtcXG4gICAgei1pbmRleDogMjtcXG59XFxuXFxuI2VuZGdhbWUtbW9kYWx7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDRmciAxZnI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig0OCwgNDQsIDQ0KTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgaGVpZ2h0OiAzMHZoO1xcbiAgICB3aWR0aDogNTB2dztcXG4gICAgei1pbmRleDogMztcXG4gICAgdG9wOiAzNSU7XFxuICAgIGxlZnQ6IDI1JTtcXG4gICAgYm9yZGVyLXJhZGl1czogNSU7XFxuICAgIGNvbG9yOiAjZTZlNmU2O1xcbn1cXG5cXG4jbW9kYWwtdGV4dHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiB4eC1sYXJnZTtcXG59XFxuXFxuI21vZGFsLWJ1dHRvbi1kaXZ7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGxlZnQ6IDMwJTtcXG4gICAgaGVpZ2h0OiA4MCU7XFxuICAgIHdpZHRoOiA0MCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgdHJhbnNpdGlvbjogZm9udC1zaXplIDAuM3MgZWFzZS1pbiwgc2NhbGVZIDAuM3MgZWFzZS1pbiwgc2NhbGVYIDAuM3MgZWFzZS1pbjtcXG59XFxuI21vZGFsLWJ1dHRvbi1kaXY6aG92ZXJ7XFxuICAgIHRyYW5zZm9ybTogc2NhbGVZKDEuMDUpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlWCgxLjA1KTtcXG4gICAgZm9udC1zaXplOiBsYXJnZTtcXG59XFxuXFxuI2dyZXlvdXQtc3RhcnR7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMTB2aCA5MHZoO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIG9wYWNpdHk6IDgwJTtcXG4gICAgei1pbmRleDogMjtcXG59XFxuXFxuI3N0YXJ0LXNjcmVlbi10aXRsZXtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XFxuICAgIGNvbG9yOiAjZTZlNmU2O1xcbiAgICB6LWluZGV4OiAzO1xcbn1cXG5cXG4jc3RhcnQtc2NyZWVuLWJvZHl7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcbiAgICBoZWlnaHQ6IDkwdmg7XFxufVxcblxcbiNzaGlwLXlhcmR7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDJmcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiN0dXJuLXNoaXAtZGl2e1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI3R1cm4tYnV0dG9ue1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgY29sb3I6ICNlNmU2ZTY7XFxuICAgIHotaW5kZXg6IDM7XFxufVxcblxcbiN0dXJuLWJ1dHRvbi10ZXh0e1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiB4LWxhcmdlO1xcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgICBib3JkZXItY29sb3I6ICNlNmU2ZTY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgYm9yZGVyLXdpZHRoOiAxcHg7XFxuICAgIHBhZGRpbmc6IDI0cHg7XFxuICAgIHRyYW5zaXRpb246IGZvbnQtc2l6ZSAwLjNzIGVhc2Utb3V0LCBzY2FsZVkgMC4zcyBlYXNlLW91dCwgc2NhbGVYIDAuM3MgZWFzZS1vdXQ7XFxufVxcbiN0dXJuLWJ1dHRvbi10ZXh0OmhvdmVye1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgxLjA1KTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZVgoMS4wNSk7XFxuICAgIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XFxufVxcblxcbiNzdGFydC1zY3JlZW4tZGVmZW5zZS1ib2FyZHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHotaW5kZXg6IDM7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiY3NzV2l0aE1hcHBpbmdUb1N0cmluZyIsImxpc3QiLCJ0b1N0cmluZyIsIm1hcCIsIml0ZW0iLCJjb250ZW50IiwibmVlZExheWVyIiwiY29uY2F0IiwibGVuZ3RoIiwiam9pbiIsImkiLCJtb2R1bGVzIiwibWVkaWEiLCJkZWR1cGUiLCJzdXBwb3J0cyIsImxheWVyIiwidW5kZWZpbmVkIiwiYWxyZWFkeUltcG9ydGVkTW9kdWxlcyIsImsiLCJpZCIsIl9rIiwicHVzaCIsImNzc01hcHBpbmciLCJidG9hIiwiYmFzZTY0IiwidW5lc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJKU09OIiwic3RyaW5naWZ5IiwiZGF0YSIsInNvdXJjZU1hcHBpbmciLCJzaGlwIiwicmVxdWlyZSIsImdhbWVib2FyZCIsImNvbnN0cnVjdG9yIiwiYm9hcmQiLCJzaGlwQXJyYXkiLCJzaG93Qm9hcmQiLCJzZXRTZWFPZk1pc3Nlc1Rlc3QiLCJnZXRTaGlwQXJyYXkiLCJwbGFjZVNoaXAiLCJzaGlwTGVuZ3RoIiwibm9zZVJvdyIsIm5vc2VDb2x1bW4iLCJub3NlRGlyZWN0aW9uIiwibmV3U2hpcCIsIm5ld1NoaXBJbmRleCIsInNldFNoaXBDb29yZHMiLCJjaGVja1NoaXBIaXQiLCJhdHRhY2tSb3ciLCJhdHRhY2tDb2x1bW4iLCJnZXRTaGlwQ29vcmRzIiwiaGl0IiwicmVjZWl2ZUF0dGFjayIsImNoZWNrR2FtZU92ZXIiLCJzaGlwQ291bnQiLCJqIiwicGxheWVyIiwiZ2FtZWxvb3AiLCJwbGF5ZXJBcnJheSIsInNoaXBMZW5ndGhzIiwidW5zZXRTaGlwcyIsImdldFBsYXllckFycmF5IiwiZ2V0U2hpcExlbmd0aHMiLCJnZXRVbnNldFNoaXBzIiwic2V0VW5zZXRTaGlwcyIsInVwZGF0ZVN0YXJ0R2FtZURPTSIsInN0YXJ0RGVmZW5zZUJvYXJkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic3RhcnREZWZlbnNlQm9hcmRTcXVhcmVzIiwicXVlcnlTZWxlY3RvckFsbCIsInJvd051bWJlciIsImNvbHVtbk51bWJlciIsInNob3dQbGF5ZXJCb2FyZCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwic3RhcnRHYW1lU2NyZWVuIiwiaW5wdXRTaGlwTGVuZ3RoIiwiYm9keSIsImdyZXlvdXQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJzdGFydFNjcmVlblRpdGxlIiwidGV4dENvbnRlbnQiLCJzdGFydFNjcmVlbkJvZHkiLCJkZWZlbnNlQm9hcmREaXYiLCJ0dXJuU2hpcERpdiIsInR1cm5CdXR0b24iLCJ0dXJuQnV0dG9uVGV4dCIsInR1cm5TdGF0ZSIsImdldFR1cm5TdGF0ZSIsInNldFR1cm5TdGF0ZSIsIm5ld0RpcmVjdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJib2FyZERpdjIiLCJjbGFzc0xpc3QiLCJhZGQiLCJib2FyZFJvd0FycmF5MiIsImdhbWVTcXVhcmVFdmVudEhhbmRsZXJDbGljayIsInJvdyIsImNvbCIsImRpcmVjdGlvbiIsImNoaWxkIiwibGFzdEVsZW1lbnRDaGlsZCIsInJlbW92ZUNoaWxkIiwiaW5pdGlhbGl6ZURPTSIsImluaXRpYWxpemVSb2JvdFNoaXBQbGFjZW1lbnQiLCJ1cGRhdGVET00iLCJhdHRhY2tET00iLCJtb3VzZUhvdmVyRXZlbnRIYW5kbGVyIiwiZSIsInJvd0FuZENvbCIsInRhcmdldCIsInNwbGl0IiwiZ2FtZWJvYXJkUm93IiwiY2hpbGRyZW4iLCJnYW1lYm9hcmRTcXVhcmVET00iLCJzaGlwU3BvdHNDbGVhbiIsInBsYXllck51bWJlciIsIm91dCIsIm1vdXNlQ2xpY2tFdmVudEhhbmRsZXIiLCJnYW1lYm9hcmRTcXVhcmVzIiwiZm9yRWFjaCIsInNxdWFyZSIsImF0dGFja0JvYXJkIiwiYm9hcmREaXYxIiwiYm9hcmRSb3dBcnJheTEiLCJkZWZlbnNlQm9hcmQiLCJkcmFnZ2FibGUiLCJoZWFkZXIiLCJ0aXRsZUxlZnQiLCJ0aXRsZU1pZGRsZSIsInRpdGxlUmlnaHQiLCJmb290ZXIiLCJhdHRhY2tTcXVhcmVzIiwiZGVmZW5zZVNxdWFyZXMiLCJzaGlwUGxhY2VtZW50T2theSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInNwb3RzVGFrZW4iLCJnZW5lcmF0ZUVuZGdhbWVET00iLCJ3aW5Mb3NlQm9vbCIsImRvY0JvZHkiLCJtb2RhbCIsIm1vZGFsVGV4dCIsIm1vZGFsQnV0dG9uRGl2IiwibW9kYWxCdXR0b24iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsInByb2NjZXNzQ2xpY2siLCJhdHRhY2siLCJzaG93VHVybiIsIlByb21pc2UiLCJyIiwic2V0VGltZW91dCIsInBsYXkiLCJoZWFkIiwiZm9udEF3ZXNvbWVTdHVmZiIsInNyYyIsImNyb3NzT3JpZ2luIiwiZ2FtZSIsInBsYXllclR5cGUiLCJwbGF5ZXJCb2FyZCIsInR1cm4iLCJzZXRUdXJuIiwiYm9vbElucHV0IiwiZ2V0UGxheWVyVHlwZSIsImdlbmVyYXRlUm9ib3RBdHRhY2siLCJvcHBvc2luZ1BsYXllciIsIm91dEFycmF5Iiwic2hvdFJvdyIsInNob3RDb2x1bW4iLCJyb2JvdEF0dGFjayIsImlucHV0TGVuZ3RoIiwiaGl0cyIsInN1bmsiLCJzaGlwQ29vcmRzIiwiZ2V0SGl0cyIsImdldFN1bmsiXSwic291cmNlUm9vdCI6IiJ9