const player = require('./player.js');

module.exports = class gameloop {
    constructor(){
        this.playerArray = [new player('human'), new player('robot')];
        this.shipLengths = [5, 4, 3, 3, 2];
    }

    getPlayerArray = () => {
        return this.playerArray;
    }

    getShipLengths = () => {
        return this.shipLengths;
    }

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
        for(let i=0; i<11; i++){
            boardRowArray1.push([])
        }
        for(let i=0; i<10; i++){
            boardRowArray1[i][0] = document.createElement('div');
            boardRowArray1[i][0].id = `attack-row-${i+1}`;
            boardRowArray1[i][0].classList.add('row');
            boardDiv1.appendChild(boardRowArray1[i][0]);
            for(let j=1; j<11; j++){
                boardRowArray1[i][j] = document.createElement('div');
                boardRowArray1[i][j].id = `attack-row-${i+1}-column-${j}`;
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
        for(let i=0; i<11; i++){
            boardRowArray2.push([])
        }
        for(let i=0; i<10; i++){
            boardRowArray2[i][0] = document.createElement('div');
            boardRowArray2[i][0].id = `defense-row-${i+1}`;
            boardRowArray2[i][0].classList.add('row');
            boardDiv2.appendChild(boardRowArray2[i][0]);
            for(let j=1; j<11; j++){
                boardRowArray2[i][j] = document.createElement('div');
                boardRowArray2[i][j].id = `defense-row-${i+1}-column-${j}`;
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
        let footer = document.createElement('div')
        footer.id = 'footer';
        body.appendChild(footer);
    }

    updateDOM = () => {
        let attackBoard = document.querySelector('#attack-board');
        let attackSquares = attackBoard.querySelectorAll('.gameboard-square');
        let defenseBoard = document.querySelector('#defense-board');
        let defenseSquares = defenseBoard.querySelectorAll('.gameboard-square');
        // defense board
        for(let i=0; i<100; i++){
            let rowNumber = ((i - (i % 10)) / 10);
            let columnNumber = (i % 10);
            if(this.getPlayerArray()[0].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 1){
                defenseSquares[i].style.backgroundColor = 'black';
            }
            if(this.getPlayerArray()[0].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 0){
                defenseSquares[i].style.backgroundColor = 'aqua';
            }
            if(this.getPlayerArray()[0].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 2){
                defenseSquares[i].style.backgroundColor = 'red';
            }
            if(this.getPlayerArray()[0].showPlayerBoard().showBoard()[rowNumber][columnNumber] === -1){
                defenseSquares[i].style.backgroundColor = 'white';
            }
        }
        // attack board
        for(let i=0; i<100; i++){
            let rowNumber = ((i - (i % 10)) / 10);
            let columnNumber = (i % 10);
            if(this.getPlayerArray()[1].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 2){
                attackSquares[i].style.backgroundColor = 'green';
            }
            if(this.getPlayerArray()[1].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 0 || this.getPlayerArray()[1].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 1){
                attackSquares[i].style.backgroundColor = 'aqua';
            }
            if(this.getPlayerArray()[1].showPlayerBoard().showBoard()[rowNumber][columnNumber] === -1){
                attackSquares[i].style.backgroundColor = 'white';
            }
        }
    }

    initializeDummyShipPlacement = () => {
        for(let i=0; i<2; i++){
            for(let j=0; j<this.getShipLengths().length; j++){
                this.getPlayerArray()[i].showPlayerBoard().placeShip(this.getShipLengths()[j], 0, j, 'up');
            };
        };
    };

    play = () => {
        this.getPlayerArray[0].showPlayerBoard().placeShip(5,);
    }
};