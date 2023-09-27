const player = require('./player.js');

module.exports = class gameloop {
    constructor(){
        this.playerArray = [new player('human'), new player('robot')];
    }

    getPlayerArray = () => {
        return this.playerArray;
    }
};