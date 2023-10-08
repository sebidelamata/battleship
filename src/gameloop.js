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

    updateStartGameDOM = () => {
        let startDefenseBoard = document.querySelector('#start-screen-defense-board');
        let startDefenseBoardSquares = startDefenseBoard.querySelectorAll('.gameboard-square');
        
        for(let i=0; i<100; i++){
            let rowNumber = ((i - (i % 10)) / 10);
            let columnNumber = (i % 10);
            if(this.getPlayerArray()[0].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 1){
                startDefenseBoardSquares[i].style.backgroundColor = 'green';
            }
            if(this.getPlayerArray()[0].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 0 || this.getPlayerArray()[1].showPlayerBoard().showBoard()[rowNumber][columnNumber] === 1){
                startDefenseBoardSquares[i].style.backgroundColor = 'aqua';
            }
        }

    }

    startGameScreen = (inputShipLength) => {

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
        const getTurnState = () => {return turnState};
        const setTurnState = (newDirection) => {turnState = newDirection;}
        turnButton.addEventListener('click', () => {
            if(getTurnState() === 'up'){
                setTurnState('right');
            }
            else if(getTurnState() === 'right'){
                setTurnState('down');
            }
            else if(getTurnState() === 'down'){
                setTurnState('left');
            }
            else if(getTurnState() === 'left'){
                setTurnState('up');
            }
        })
        let boardDiv2 = document.createElement('div');
        boardDiv2.id = 'start-defense-board';
        boardDiv2.classList.add('gameboard');
        defenseBoardDiv.appendChild(boardDiv2);
        let boardRowArray2 = [];
        // first entry will be row div followed by the ten child divs for that row
        for(let i=0; i<11; i++){
            boardRowArray2.push([])
        }
        for(let i=0; i<10; i++){
            boardRowArray2[i][0] = document.createElement('div');
            boardRowArray2[i][0].id = `start-defense-row-${i+1}`;
            boardRowArray2[i][0].classList.add('row');
            boardDiv2.appendChild(boardRowArray2[i][0]);
            for(let j=1; j<11; j++){
                boardRowArray2[i][j] = document.createElement('div');
                boardRowArray2[i][j].id = `start-defense-row-${i+1}-column-${j}`;
                boardRowArray2[i][j].classList.add('gameboard-square');
                boardRowArray2[i][0].appendChild(boardRowArray2[i][j]);
            }
        }

        // a listener to show where ships will be on defense board
        let gameboardSquares = document.querySelectorAll('.gameboard-square');
        var that = this;
        gameboardSquares.forEach(function(square) {
            square.addEventListener('mouseover', (e) => {
                let rowAndCol = e.target.id.split('start-defense-row-')[1].split('-column-');
                let row = rowAndCol[0] - 1;
                let col = rowAndCol[1] - 1;
                if(getTurnState() === 'up' && row + inputShipLength < 11){
                    for(let i=0; i<inputShipLength; i++){
                        let gameboardRow = document.querySelector('.gameboard').children[row + i]
                        let gameboardSquareDOM = gameboardRow.children[col];
                        gameboardSquareDOM.style.backgroundColor = 'green';
                    }
                    e.target.addEventListener('click', () => {
                        that.getPlayerArray()[0].showPlayerBoard().placeShip(inputShipLength, row, col, 'up');
                    })
                }
                if(getTurnState() === 'right' && col - inputShipLength > -2){
                    for(let i=0; i<inputShipLength; i++){
                        let gameboardRow = document.querySelector('.gameboard').children[row];
                        let gameboardSquareDOM = gameboardRow.children[col - i];
                        gameboardSquareDOM.style.backgroundColor = 'green';
                    }
                    e.target.addEventListener('click', () => {
                        that.getPlayerArray()[0].showPlayerBoard().placeShip(inputShipLength, row, col, 'right');
                    })
                }
                if(getTurnState() === 'down' && row - inputShipLength > -2){
                    for(let i=0; i<inputShipLength; i++){
                        let gameboardRow = document.querySelector('.gameboard').children[row - i];
                        let gameboardSquareDOM = gameboardRow.children[col];
                        gameboardSquareDOM.style.backgroundColor = 'green';
                    }
                    e.target.addEventListener('click', () => {
                        that.getPlayerArray()[0].showPlayerBoard().placeShip(inputShipLength, row, col, 'down');
                    })
                }
                if(getTurnState() === 'left' && col + inputShipLength < 11){
                    for(let i=0; i<inputShipLength; i++){
                        let gameboardRow = document.querySelector('.gameboard').children[row];
                        let gameboardSquareDOM = gameboardRow.children[col + i];
                        gameboardSquareDOM.style.backgroundColor = 'green';
                    }
                    e.target.addEventListener('click', () => {
                        that.getPlayerArray()[0].showPlayerBoard().placeShip(inputShipLength, row, col, 'left');
                    })
                }
            })
            square.addEventListener('mouseleave', (e) => {
                let rowAndCol = e.target.id.split('start-defense-row-')[1].split('-column-');
                let row = rowAndCol[0] - 1;
                let col = rowAndCol[1] - 1;
                if(getTurnState() === 'up' && row + inputShipLength < 11){
                    for(let i=0; i<inputShipLength; i++){
                        let gameboardRow = document.querySelector('.gameboard').children[row + i]
                        let gameboardSquareDOM = gameboardRow.children[col];
                        gameboardSquareDOM.style.backgroundColor = 'aqua';
                    }
                    e.target.removeEventListener('click', () => {
                        that.getPlayerArray()[0].showPlayerBoard().placeShip(inputShipLength, row, col, 'up');
                    })
                }
                if(getTurnState() === 'right' && col - inputShipLength > -2){
                    for(let i=0; i<inputShipLength; i++){
                        let gameboardRow = document.querySelector('.gameboard').children[row]
                        let gameboardSquareDOM = gameboardRow.children[col - i];
                        gameboardSquareDOM.style.backgroundColor = 'aqua';
                    }
                    e.target.removeEventListener('click', () => {
                        that.getPlayerArray()[0].showPlayerBoard().placeShip(inputShipLength, row, col, 'right');
                    })
                }
                if(getTurnState() === 'down' && row - inputShipLength > -2){
                    for(let i=0; i<inputShipLength; i++){
                        let gameboardRow = document.querySelector('.gameboard').children[row - i];
                        let gameboardSquareDOM = gameboardRow.children[col];
                        gameboardSquareDOM.style.backgroundColor = 'aqua';
                    }
                    e.target.removeEventListener('click', () => {
                        that.getPlayerArray()[0].showPlayerBoard().placeShip(inputShipLength, row, col, 'down');
                    })
                }
                if(getTurnState() === 'left' && col + inputShipLength < 11){
                    for(let i=0; i<inputShipLength; i++){
                        let gameboardRow = document.querySelector('.gameboard').children[row];
                        let gameboardSquareDOM = gameboardRow.children[col + i];
                        gameboardSquareDOM.style.backgroundColor = 'aqua';
                    }
                    e.target.removeEventListener('click', () => {
                        that.getPlayerArray()[0].showPlayerBoard().placeShip(inputShipLength, row, col, 'left');
                    })
                }
            })
        })



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

    generateEndgameDOM = (winLoseBool) => {
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
        if(winLoseBool === false){
            modalText.textContent = 'You Lose!';
        }
        if(winLoseBool === true){
            modalText.textContent = 'You Win!';
        }
        modalButtonDiv.addEventListener('click', () => {
            window.location.reload()
        })
    }

    attackDOM = () => {
        
        let attackBoard = document.querySelector('#attack-board');
        let gameboardSquares = attackBoard.querySelectorAll('.gameboard-square');

        
        const proccessClick = async (e) => {
            let rowAndCol = e.target.id.split('row-')[1].split('-column-');
            let row = rowAndCol[0] - 1;
            let col = rowAndCol[1] - 1;
            this.getPlayerArray()[0].attack(this.getPlayerArray()[1], row, col);
            this.updateDOM();
            if(this.getPlayerArray()[1].showTurn() === true && this.getPlayerArray()[0].showPlayerBoard().checkGameOver() === false && this.getPlayerArray()[1].showPlayerBoard().checkGameOver() === false){
                await new Promise(r => setTimeout(r, 1000));
                this.getPlayerArray()[1].attack(this.getPlayerArray()[0]);
                this.updateDOM();
            }
            if(this.getPlayerArray()[0].showPlayerBoard().checkGameOver() === true){
                this.generateEndgameDOM(false);
            }
            if(this.getPlayerArray()[1].showPlayerBoard().checkGameOver() === true){
                this.generateEndgameDOM(true);
            }
        }
        
        gameboardSquares.forEach(function(square){
            square.addEventListener('click', proccessClick);
        });

    }

    play = () => {
        this.startGameScreen(5);
        this.updateStartGameDOM()
        //this.initializeDOM();
        //this.initializeDummyShipPlacement();
        //this.updateDOM();
        //this.attackDOM();
    };
};