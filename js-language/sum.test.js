var sum = require('./sum');

test('adding 2 numbers', function(){
    //arrange
    var x = 100,
        y = 200,
        expectedResult = 300

    //act
    var actualResult = sum(x,y);

    //assert
    expect(actualResult).toBe(expectedResult)
})