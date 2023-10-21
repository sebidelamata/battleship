const player = require('./player.js');

module.exports = class gameloop {
    constructor(){
        this.playerArray = [new player('human'), new player('robot')];
        this.shipLengths = [5, 4, 3, 3, 2];
        this.unsetShips = this.shipLengths.length - 1;
    }

    getPlayerArray = () => {
        return this.playerArray;
    }

    getShipLengths = () => {
        return this.shipLengths;
    }

    getUnsetShips = () => {
        return this.unsetShips;
    }

    setUnsetShips = () => {
        this.unsetShips -= 1;
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

        // update to match player board
        this.updateStartGameDOM()

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
                if(this.getUnsetShips() >= 0){
                   this.startGameScreen(this.getShipLengths()[this.getUnsetShips()]);
                }
                // if all of the ships have been set, start the game
                if(this.getUnsetShips() < 0){
                    this.initializeDOM();
                    this.initializeRobotShipPlacement();
                    this.updateDOM();
                    this.attackDOM();
                    }
        }

        // this is the event listener that handles when the mouse hovers over the square
        // it checks if the ship would fit given the square direction and length of 
        // ship, if it passes it allows the click function to be applied (from above)
        const mouseHoverEventHandler = (e) => {
            this.updateStartGameDOM();
            let rowAndCol = e.target.id.split('start-defense-row-')[1].split('-column-');
            let row = rowAndCol[0] - 1;
            let col = rowAndCol[1] - 1;
                if(getTurnState() === 'up' && row + inputShipLength < 11){
                    for(let i=0; i<inputShipLength; i++){
                        let gameboardRow = document.querySelector('.gameboard').children[row + i]
                        let gameboardSquareDOM = gameboardRow.children[col];
                        gameboardSquareDOM.style.backgroundColor = 'green';
                    }
                }
                if(getTurnState() === 'right' && col - inputShipLength > -2){
                    for(let i=0; i<inputShipLength; i++){
                        let gameboardRow = document.querySelector('.gameboard').children[row];
                        let gameboardSquareDOM = gameboardRow.children[col - i];
                        gameboardSquareDOM.style.backgroundColor = 'green';
                    }
                }
                if(getTurnState() === 'down' && row - inputShipLength > -2){
                    for(let i=0; i<inputShipLength; i++){
                        let gameboardRow = document.querySelector('.gameboard').children[row - i];
                        let gameboardSquareDOM = gameboardRow.children[col];
                        gameboardSquareDOM.style.backgroundColor = 'green';
                    }
                }
                if(getTurnState() === 'left' && col + inputShipLength < 11){
                    for(let i=0; i<inputShipLength; i++){
                        let gameboardRow = document.querySelector('.gameboard').children[row];
                        let gameboardSquareDOM = gameboardRow.children[col + i];
                        gameboardSquareDOM.style.backgroundColor = 'green';
                    }
                }
        }

        // determine if ship spots are available
        const shipSpotsClean = (playerNumber, inputShipLength, row, col, direction) => {
            let out = true;
            if(direction == 'up'){
                for(let i=0; i<inputShipLength;i++){
                    if(this.getPlayerArray()[playerNumber].showPlayerBoard().showBoard()[row + i][col] === 1){
                        out = false;
                    }
                }
            }
            if(direction == 'right'){
                for(let i=0; i<inputShipLength;i++){
                    if(this.getPlayerArray()[playerNumber].showPlayerBoard().showBoard()[row][col - i] === 1){
                        out = false;
                    }
                }
            }
            if(direction == 'down'){
                for(let i=0; i<inputShipLength;i++){
                    if(this.getPlayerArray()[playerNumber].showPlayerBoard().showBoard()[row - i][col] === 1){
                        out = false;
                    }
                }
            }
            if(direction == 'left'){
                for(let i=0; i<inputShipLength;i++){
                    if(this.getPlayerArray()[playerNumber].showPlayerBoard().showBoard()[row][col + i] === 1){
                        out = false;
                    }
                }
            }
            return(out);
        }

        //separate click from hover
        const mouseClickEventHandler = (e) => {
            let rowAndCol = e.target.id.split('start-defense-row-')[1].split('-column-');
            let row = rowAndCol[0] - 1;
            let col = rowAndCol[1] - 1;
            if(getTurnState() === 'up' && row + inputShipLength < 11 && shipSpotsClean(0, inputShipLength, row, col, 'up') === true){
                gameSquareEventHandlerClick(inputShipLength, row, col, 'up');
            }
            if(getTurnState() === 'right' && col - inputShipLength > -2 && shipSpotsClean(0, inputShipLength, row, col, 'right') === true){
                gameSquareEventHandlerClick(inputShipLength, row, col, 'right');
            }
            if(getTurnState() === 'down' && row - inputShipLength > -2 && shipSpotsClean(0, inputShipLength, row, col, 'down') === true){
                gameSquareEventHandlerClick(inputShipLength, row, col, 'down');
            }
            if(getTurnState() === 'left' && col + inputShipLength < 11 && shipSpotsClean(0, inputShipLength, row, col, 'left') === true){
                gameSquareEventHandlerClick(inputShipLength, row, col, 'left');
            }
        }

        // a listener to show where ships will be on defense board
        let gameboardSquares = document.querySelectorAll('.gameboard-square');
        gameboardSquares.forEach((square) => {
            square.addEventListener('mouseover', mouseHoverEventHandler)
            square.addEventListener('click', mouseClickEventHandler)
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

    initializeRobotShipPlacement = () => {
        for(let i=0; i<this.getShipLengths().length; i++){
            let shipLength = this.getShipLengths()[i]
            let shipPlacementOkay = false;
            let row = null;
            let col = null;
            let direction = null;
            do{
                row = Math.floor(Math.random() * 10);
                col = Math.floor(Math.random() * 10);
                direction = Math.floor(Math.random() * 4);
                if(direction === 0){
                    direction ='up';
                    let spotsTaken = false
                    for(let j=0; j<shipLength; j++){
                        if(row + shipLength >= 11 || this.getPlayerArray()[1].showPlayerBoard().showBoard()[row + j][col] === 1){
                            spotsTaken = true;
                        }
                    }
                    if(spotsTaken === false){
                        shipPlacementOkay = true;
                    }

                }
                if(direction === 1){
                    direction ='right';
                    let spotsTaken = false
                    for(let j=0; j<shipLength; j++){
                        if(col - shipLength <= -2 || this.getPlayerArray()[1].showPlayerBoard().showBoard()[row][col - j] === 1){
                            spotsTaken = true;
                        }
                    }
                    if(spotsTaken === false){
                        shipPlacementOkay = true;
                    }
                }
                if(direction === 2){
                    direction ='down';
                    let spotsTaken = false
                    for(let j=0; j<shipLength; j++){
                        if(row - shipLength <= -2 || this.getPlayerArray()[1].showPlayerBoard().showBoard()[row - j][col] === 1){
                            spotsTaken = true;
                        }
                    }
                    if(spotsTaken === false){
                        shipPlacementOkay = true;
                    }
                }
                if(direction === 3){
                    direction ='left';
                    let spotsTaken = false
                    for(let j=0; j<shipLength; j++){
                        if(col + shipLength >= 11 || this.getPlayerArray()[1].showPlayerBoard().showBoard()[row][col + j] === 1){
                            spotsTaken = true;
                        }
                    }
                    if(spotsTaken === false){
                        shipPlacementOkay = true;
                    }
                }
            }while(shipPlacementOkay === false)
            this.getPlayerArray()[1].showPlayerBoard().placeShip(this.getShipLengths()[i], row, col, direction);
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
                await new Promise(r => setTimeout(r, 500));
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
        this.startGameScreen(this.getShipLengths()[this.getUnsetShips()]);
    };
};