
var spinner = (function(){
    var count = 0
    function up(){
        return ++count
    }
    function down(){
        return --count
    }
    return {
        up : up,
        down : down
    }
})()

var counter = (function(){
    var count = 0;
    return function(){
        return ++count
    }
})()