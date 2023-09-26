const player = require('../src/player.js');

describe("Player", () => {
    let player1;
    let player2;
    test('Players can take turns playing the game by attacking the enemy Gameboard 1', () => {
        player1 = new player('human');
        player2 = new player('human');
        player1.showPlayerBoard().placeShip(2, 1, 1, "down");
        player2.showPlayerBoard().placeShip(2, 1, 1, "down");
        player1.attack(player2, 1, 1);
        player2.attack(player1, 2, 1);
        expect(player1.showPlayerBoard().showBoard()).toEqual([
            [0,1,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,0,0],
            [0,-1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
        ]);
    });
    test('Players can take turns playing the game by attacking the enemy Gameboard 2', () => {
        player1 = new player('human');
        player2 = new player('human');
        player1.showPlayerBoard().placeShip(2, 1, 1, "down");
        player2.showPlayerBoard().placeShip(2, 1, 1, "down");
        player1.attack(player2, 1, 1);
        player2.attack(player1, 2, 1);
        expect(player2.showPlayerBoard().showBoard()).toEqual([
            [0,1,0,0,0,0,0,0,0,0],
            [0,2,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
        ]);
    });
    test('make the "computer" capable of making random plays', () => {
        player1 = new player('human');
        player2 = new player('robot');
        player1.showPlayerBoard().placeShip(2, 1, 1, "down");
        player2.showPlayerBoard().placeShip(2, 1, 1, "down");
        player1.attack(player2, 1, 1);
        player2.attack(player1);
        let player2ShotCounter = 0;
        for(let i=0; i<10; i++){
            for(let j=0; j<10; j++){
                if(player1.showPlayerBoard().showBoard()[i][j] !== 0 && player1.showPlayerBoard().showBoard()[i][j] !== 1){
                    player2ShotCounter++;
                }
            }
        }
        expect(player2ShotCounter).toEqual(1);
    });
    test('the "computer" shouldn’t shoot the same coordinate twice', () => {
        player1 = new player('human');
        player2 = new player('robot');
        player1.showPlayerBoard().setSeaOfMissesTest();
        player2.attack(player1);
        let player2ShotCounter = 0;
        for(let i=0; i<10; i++){
            for(let j=0; j<10; j++){
                if(player1.showPlayerBoard().showBoard()[i][j] === -1){
                    player2ShotCounter++;
                }
            }
        }
        expect(player2ShotCounter).toEqual(100);
    });
});