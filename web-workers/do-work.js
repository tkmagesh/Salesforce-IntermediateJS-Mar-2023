
function doWork() {
    //simulate cpu intensive operation
    for (var i = 0; i < 10000; i++){
        for (var j = 0; j < 2000; j++)
            for (var k = 0; k < 1000; k++) {

            }
        if (i % 100 === 0){
            const percentCompleted = (i / 10000) * 100
            self.postMessage({
                type : 'progress', 
                percentCompleted : percentCompleted
            })
        }
    }
}

self.addEventListener('message', function(evt){
    if (evt.data.type === 'start'){
        doWork()
        self.postMessage({ type : 'done'})
    }
})