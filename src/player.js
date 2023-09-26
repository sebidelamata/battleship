const gameboard = require('./gameboard');

module.exports = class player {
    
    constructor(){
        this.playerBoard = new gameboard;
    }

    showPlayerBoard = () => {
        return this.playerBoard;
    }

    attack = (opposingPlayer, shotRow, shotColumn) => {
        opposingPlayer.showPlayerBoard().receiveAttack(shotRow, shotColumn);
    }


};
