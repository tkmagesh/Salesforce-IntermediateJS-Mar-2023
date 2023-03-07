function sum(x,y){
    function parseArg(n){
        if (Array.isArray(n)){
            var result = 0;
            for (var i = 0; i < n.length; i++){
                result += parseArg(n[i])
            }
            return result
        }
        return isNaN(n) ? 0 : parseInt(n)
    }
    var result = 0
    for (var i = 0; i < arguments.length; i++){
        result += parseArg(arguments[i])
    }
    return result;
}

module.exports = sum;