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
    function addAsync(x, y) {
        console.log(`   [@service] processing ${x} and ${y}`)
        setTimeout(() => {
            const result = x + y
            console.log(`   [@service] returning result`)
            return result
        }, 5000)
    }

    function addAsyncClient(x, y) {
        console.log(`[@client] invoking the service`)
        const result = addAsync(x, y)
        console.log(`[@client] result = ${result}`)
    }

    window['addAsyncClient'] = addAsyncClient
})()