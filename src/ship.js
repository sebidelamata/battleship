module.exports = class ship {
    
    constructor(inputLength){
        this.shipLength = inputLength;
        this.hits = 0;
        this.sunk = false;
    }

    getHits = () => {
        return this.hits;
    };

    hit = () => {
        this.hits += 1;
        if(this.hits >= this.shipLength){
            this.sunk = true;
        }
    }

    getSunk = () => {
        return this.sunk;
    }
};
