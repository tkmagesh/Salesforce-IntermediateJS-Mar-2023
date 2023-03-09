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
        console.log(`   [@service] processing ${x} and ${y}`)
        const p = new Promise(function(resolveFn, rejectFn){
            setTimeout(() => {
                const result = x + y
                console.log(`   [@service] returning result`)
                resolveFn(result)
            }, 5000)
        })
        return p
    }

    function addAsyncPromiseClient(x,y){
        console.log(`[@client] invoking the service`)
        var p = addAsyncPromise(x, y)
        p.then(function (result) {
            console.log(`[@client] result = ${result}`)
        })
    }

    window['addAsyncPromiseClient'] = addAsyncPromiseClient
})()