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
    test('can place multiple ships on the board', () => {
        testBoard.placeShip(2,1,1,"down");
        testBoard.placeShip(3,2,2,"down");
        expect(testBoard.showBoard()).toEqual([
            [0,1,1,0,0,0,0,0,0,0],
            [0,1,1,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
        ]);
    });
    test('determine if an attack hit a ship', () => {
        testBoard.placeShip(2,1,1,"down");
        testBoard.receiveAttack(1,1);
        expect(testBoard.showBoard()).toEqual([
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
    test('sends the hit function to the correct ship', () => {
        testBoard.placeShip(2,1,1,"down");
        testBoard.placeShip(3,2,2,"down");
        testBoard.receiveAttack(2,2);
        expect(testBoard.getShipArray()[1].getHits()).toEqual(1);
    });
    test('records the coordinates of the missed shot', () => {
        testBoard.placeShip(2,1,1,"down");
        testBoard.placeShip(3,2,2,"down");
        testBoard.receiveAttack(9,9);
        expect(testBoard.showBoard()).toEqual([
            [0,1,1,0,0,0,0,0,0,0],
            [0,1,1,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,-1]
        ]);
    });
    test('Gameboard reports if all ships have been sunk', () => {
        testBoard.placeShip(2,1,1,"down");
        testBoard.placeShip(3,2,2,"down");
        testBoard.receiveAttack(1,1);
        testBoard.receiveAttack(0,1);
        testBoard.receiveAttack(2,2);
        testBoard.receiveAttack(1,2);
        testBoard.receiveAttack(0,2);
        expect(testBoard.checkGameOver()).toBe(true);
    });
});