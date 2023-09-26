const gameboard = require('./gameboard');

module.exports = class player {
    
    constructor(playerType){
        this.playerBoard = new gameboard;
        this.playerType = playerType;
        this.turn = true;
    }

    showPlayerBoard = () => {
        return this.playerBoard;
    }

    showTurn = () => {
        return this.turn;
    }

    setTurn = (boolInput) => {
        this.turn = boolInput;
    }

    getPlayerType = () => {
        return this.playerType;
    }

    generateRobotAttack = (opposingPlayer) => {
        let outArray = [null, null];
        do{
            outArray[0] = Math.floor(Math.random() * 10);
            outArray[1] = Math.floor(Math.random() * 10);
        }while(opposingPlayer.showPlayerBoard().showBoard()[outArray[0]][outArray[1]] !== 1 && opposingPlayer.showPlayerBoard().showBoard()[outArray[0]][outArray[1]] !== 0)
        return outArray;
    }

    attack = (opposingPlayer, shotRow, shotColumn) => {
        if(this.showTurn() == true){
            if(shotRow === undefined && shotColumn === undefined){
                let robotAttack = this.generateRobotAttack(opposingPlayer);
                shotRow = robotAttack[0];
                shotColumn = robotAttack[1];
            }
            opposingPlayer.showPlayerBoard().receiveAttack(shotRow, shotColumn);
            this.setTurn(false);
            if(opposingPlayer.showTurn() == false){
                opposingPlayer.setTurn(true);
            }
        }
    }


};
