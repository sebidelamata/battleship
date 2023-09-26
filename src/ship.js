module.exports = class ship {
    
    constructor(inputLength){
        this.shipLength = inputLength;
        this.hits = 0;
        this.sunk = false;
        this.shipCoords = [];
        for(let i=0; i<10; i++){
            this.shipCoords.push([0,0,0,0,0,0,0,0,0,0]);
        }
    }

    getHits = () => {
        return this.hits;
    };

    hit = () => {
        this.hits += 1;
        if(this.hits >= this.shipLength){
            this.sunk = true;
        }
    };

    getSunk = () => {
        return this.sunk;
    };

    getShipCoords = () => {
        return this.shipCoords;
    };

    setShipCoords = (noseRow,noseColumn,noseDirection) => {
        if(noseDirection == 'left'){
            for(let i=0; i<this.shipLength; i++){
                this.shipCoords[noseRow][noseColumn + i] = 1;
            }
        }
        if(noseDirection == 'right'){
            for(let i=0; i<this.shipLength; i++){
                this.shipCoords[noseRow][noseColumn - i] = 1;
            }
        }
        if(noseDirection == 'up'){
            for(let i=0; i<this.shipLength; i++){
                this.shipCoords[noseRow + i][noseColumn] = 1;
            }
        }
        if(noseDirection == 'down'){
            for(let i=0; i<this.shipLength; i++){
                this.shipCoords[noseRow - i][noseColumn] = 1;
            }
        }
    };

};
