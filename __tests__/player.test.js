const player = require('../src/player.js');

describe("Player", () => {
    let player1;
    let player2;
    beforeEach(() => {
        player1 = new player();
        player2 = new player();
        player1.showPlayerBoard().placeShip(2, 1, 1, "down");
        player2.showPlayerBoard().placeShip(2, 1, 1, "down");
        player1.attack(player2, 1, 1);
        player2.attack(player1, 2, 1);
      });
    test('Players can take turns playing the game by attacking the enemy Gameboard 1', () => {
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
});