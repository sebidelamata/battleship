const ship = require('../src/ship');

module.exports = class gameboard{

    constructor(){
        this.board = [];
        for(let i=0; i<10; i++){
            this.board.push([0,0,0,0,0,0,0,0,0,0]);
        }
        this.shipArray = [];
    }

    showBoard = () => {return this.board};
    getShipArray = () => {return this.shipArray};
    
    placeShip = (shipLength, noseRow, noseColumn, noseDirection) => {
        let newShip = new ship(shipLength);
        this.getShipArray().push(newShip);
        let newShipIndex = this.getShipArray().length - 1
        if(noseDirection == 'left'){
            for(let i=0; i<shipLength; i++){
                if((noseColumn + i) > 9){
                    return 'Can not place ship off of the board!';
                }
            }
            for(let i=0; i<shipLength; i++){
                if(this.board[noseRow][noseColumn + i] == 1){
                    return 'Can not place ship on top of another ship';
                }
            }
            for(let i=0; i<shipLength; i++){
                this.board[noseRow][noseColumn + i] = 1;
            }
            this.getShipArray()[newShipIndex].setShipCoords(noseRow,noseColumn,noseDirection)
        }
        if(noseDirection == 'right'){
            for(let i=0; i<shipLength; i++){
                if((noseColumn - i) < 0){
                    return 'Can not place ship off of the board!';
                }
            }
            for(let i=0; i<shipLength; i++){
                if(this.board[noseRow][noseColumn - i] == 1){
                    return 'Can not place ship on top of another ship';
                }
            }
            for(let i=0; i<shipLength; i++){
                this.board[noseRow][noseColumn - i] = 1;
            }
            this.getShipArray()[newShipIndex].setShipCoords(noseRow,noseColumn,noseDirection)
        }
        if(noseDirection == 'up'){
            for(let i=0; i<shipLength; i++){
                if((noseRow + i) > 9){
                    return 'Can not place ship off of the board!';
                }
            }
            for(let i=0; i<shipLength; i++){
                if(this.board[noseRow + i][noseColumn] == 1){
                    return 'Can not place ship on top of another ship';
                }
            }
            for(let i=0; i<shipLength; i++){
                this.board[noseRow + i][noseColumn] = 1;
            }
            this.getShipArray()[newShipIndex].setShipCoords(noseRow,noseColumn,noseDirection)
        }
        if(noseDirection == 'down'){
            for(let i=0; i<shipLength; i++){
                if((noseRow - i) < 0){
                    return 'Can not place ship off of the board!';
                }
            }
            for(let i=0; i<shipLength; i++){
                if(this.board[noseRow - i][noseColumn] == 1){
                    return 'Can not place ship on top of another ship';
                }
            }
            for(let i=0; i<shipLength; i++){
                this.board[noseRow - i][noseColumn] = 1;
            }
            this.getShipArray()[newShipIndex].setShipCoords(noseRow,noseColumn,noseDirection)
        }
    };

    // checks the ship objects board to see if those coords match the shot and hits the ship
    checkShipHit = (attackRow, attackColumn) => {
        for(let i=0; i<this.shipArray.length; i++){
            if(this.getShipArray()[i].getShipCoords()[attackRow][attackColumn] === 1){
                this.getShipArray()[i].hit();
            }
        }
    }

    receiveAttack = (attackRow, attackColumn) => {
        // hit
        if(this.board[attackRow][attackColumn] === 1){
            this.board[attackRow][attackColumn] = 2;
            this.checkShipHit(attackRow,attackColumn);
        }
        // miss
        if(this.board[attackRow][attackColumn] === 0){
            this.board[attackRow][attackColumn] = -1;
        }
        // already tried this
        if(this.board[attackRow][attackColumn] === 2 || this.board[attackRow][attackColumn] == -1){
            return "You've already tried these coords!";
        }
    }

    checkGameOver = () => {
        let shipCount = 0
        for(let i=0; i<10; i++){
            for(let j=0; j<10; j++){
                if(this.showBoard()[i][j] === 1){
                    shipCount += 1;
                }
            }
        }
        if(shipCount === 0){
            return true;
        } else {return false}

    }
};