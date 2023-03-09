(() => {
    // sync
    function addSync(x,y){
        console.log(`   [@service] processing ${x} and ${y}`)
        const result = x + y
        console.log(`   [@service] returning result`)
        return result
    }

    function addSyncClient(x,y){
        console.log(`[@client] invoking the service`)
        const result = addSync(x,y)
        console.log(`[@client] result = ${result}`)
    }

    window['addSyncClient'] = addSyncClient

    // async
    function addAsync(x, y, callback) {
        console.log(`   [@service] processing ${x} and ${y}`)
        setTimeout(() => {
            const result = x + y
            console.log(`   [@service] returning result`)
            callback(result)
        }, 5000)
    }

    function addAsyncClient(x, y) {
        console.log(`[@client] invoking the service`)
        addAsync(x, y, function(result){
            console.log(`[@client] result = ${result}`)
        })
        
    }

    window['addAsyncClient'] = addAsyncClient

    //Using promise
    function addAsyncPromise(x, y) {
        console.log(`   [@add service] processing ${x} and ${y}`)
        const p = new Promise(function(resolveFn, rejectFn){
            setTimeout(() => {
                const result = x + y
                console.log(`   [@add service] returning result`)
                resolveFn(result)
            }, 5000)
        })
        return p
    }

    window['addAsyncPromise'] = addAsyncPromise

    function divideAsyncPromise(x, y) {
        console.log(`   [@divide service] processing ${x} and ${y}`)
        const p = new Promise(function (resolveFn, rejectFn) {
            setTimeout(() => {
                if (y === 0){
                    rejectFn(new Error('divisor cannot be 0'))
                }
                const result = x / y
                console.log(`   [@divide service] returning result`)
                resolveFn(result)
            }, 3000)
        })
        return p
    }

    window['divideAsyncPromise'] = divideAsyncPromise

    /* 
    function addAsyncPromiseClient(x,y){
        console.log(`[@client] invoking the service`)
        var p = addAsyncPromise(x, y)
        return p.then(function (result) {
            console.log(`[@client] result = ${result}`)
        })
    } 
    */

    async function addAsyncPromiseClient(x, y) {
        console.log(`[@client] invoking the service`)
        var result = await addAsyncPromise(x, y)
        console.log(`[@client] result = ${result}`)
    }

    window['addAsyncPromiseClient'] = addAsyncPromiseClient 

    /* 
    async function processNos(x,y){
        const addResult = await addAsyncPromise(x,y)
        const divideResult = await divideAsyncPromise(x,y)
        console.log('addResult :', addResult)
        console.log('divideResult :', divideResult)
    } 
    */

    function processNos(x,y){
        var p1 = addAsyncPromise(x, y)
        var p2 = divideAsyncPromise(x, y)
        Promise.all([p1, p2])
            .then(([addResult, divideResult]) => {
                console.log(`add result : ${addResult}`)
                console.log(`divide result : ${divideResult}`)
            }) 
    }
    window['processNos'] = processNos
   
})()

// Using Promise.all()
/* 
let x = 100, y = 20
var p1 = addAsyncPromise(x, y)
var p2 = divideAsyncPromise(x, y)
Promise.all([p1, p2])
    .then(([addResult, divideResult]) => {
        console.log(`add result : ${addResult}`)
        console.log(`divide result : ${divideResult}`)
    }) 
*/

// Using Promise.any()
/* 
let x = 100, y = 20
var p1 = addAsyncPromise(x,y)
var p2 = divideAsyncPromise(x,y)
Promise.any([p1, p2])
    .then((result) => {
        console.log(` result : ${result}`)
    })
*/