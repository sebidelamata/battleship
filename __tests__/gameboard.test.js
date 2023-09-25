const gameboard = require('../src/gameboard');

describe("Gameboard", () => {
    let testBoard;
    beforeEach(() => {
        testBoard = new gameboard();
      });
    test('places ship left facing', () => {
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
    test('places ship right facing', () => {
        testBoard.placeShip(2,1,1,"right");
        expect(testBoard.showBoard()).toEqual([
            [0,0,0,0,0,0,0,0,0,0],
            [1,1,0,0,0,0,0,0,0,0],
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
    test('places ship up facing', () => {
        testBoard.placeShip(2,1,1,"up");
        expect(testBoard.showBoard()).toEqual([
            [0,0,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
        ]);
    });
    test('places ship down facing', () => {
        testBoard.placeShip(2,1,1,"down");
        expect(testBoard.showBoard()).toEqual([
            [0,1,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,0,0],
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
    test('does not allow ship placed off board direction down', () => {
        expect(testBoard.placeShip(5,1,1,"down")).toEqual('Can not place ship off of the board!');
    });
    test('does not allow ship placed off board direction up', () => {
        expect(testBoard.placeShip(5,9,1,"up")).toEqual('Can not place ship off of the board!');
    });
    test('does not allow ship placed off board direction left', () => {
        expect(testBoard.placeShip(5,1,9,"left")).toEqual('Can not place ship off of the board!');
    });
    test('does not allow ship placed off board direction right', () => {
        expect(testBoard.placeShip(5,1,1,"right")).toEqual('Can not place ship off of the board!');
    });
    test('can not place ship on top of another ship', () => {
        testBoard.placeShip(2,1,1,"down");
        expect(testBoard.placeShip(2,2,1,"down")).toEqual('Can not place ship on top of another ship');
    });
});