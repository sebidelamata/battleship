const ship = require('../src/ship');

describe("Ship", () => {
    let testShip;
    beforeEach(() => {
        testShip = new ship(2);
      });
    test('ship registers hit', () => {
        testShip.hit();
        expect(testShip.getHits()).toBe(1);
    });
    test('ship sinks', () => {
        testShip.hit();
        testShip.hit();
        expect(testShip.getSunk()).toBe(true);
    });
});
