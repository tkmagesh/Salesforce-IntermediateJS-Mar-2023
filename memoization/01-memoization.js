/* 
function isPrime(no) {
    isPrime['cache'] = isPrime['cache'] || {}
    if (typeof isPrime.cache[no] !== 'undefined')
        return isPrime.cache[no];
    console.log('processing ', no)
    isPrime.cache[no] = true
    for (var i = 2; i <= (no / 2); i++)
        if (no % i === 0) {
            isPrime.cache[no] = false
            break;
        }
    return isPrime.cache[no]
} 
*/

function memoize(fn){
    var cache = {}
    return function(){
        var key = JSON.stringify(arguments)
        if (cache.hasOwnProperty(key)) return cache[key]
        console.log('processing :', arguments)
        cache[key] = fn.apply(this, arguments)
        return cache[key]
    }
}

var isPrime = memoize(function(no){
    for (var i = 2; i <= (no/2); i++)
        if (no % i === 0)
            return false
    return true
})

var add = memoize(function(x,y){
    return x + y
})