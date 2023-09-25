const ship = require('../src/ship');

module.exports = class gameboard{

    constructor(){
        this.board = []
        for(let i=0; i<10; i++){
            this.board.push([0,0,0,0,0,0,0,0,0,0])
        }
    }

    showBoard = () => {return this.board};
    
    placeShip = (shipLength, noseRow, noseColumn, noseDirection) => {
        let newShip = new ship(shipLength);
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
        }
    };
};