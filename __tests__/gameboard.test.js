const gameboard = require('../src/gameboard');

describe("Gameboard", () => {
    let testBoard;
    beforeEach(() => {
        testBoard = new gameboard();
      });
    test('places ship', () => {
        testBoard.placeShip(2,1,1,"left");
        expect(testBoard.showBoard()).toEqual([
            [0,0,0,0,0,0,0,0,0,0],
            [0,1,1,0,0,0,0,0,0,0],
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