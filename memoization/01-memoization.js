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