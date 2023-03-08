var products = [
    { id: 6, name: 'Pen', cost: 50, units: 20, category: 'stationary' },
    { id: 9, name: 'Ten', cost: 70, units: 70, category: 'stationary' },
    { id: 3, name: 'Len', cost: 60, units: 60, category: 'grocery' },
    { id: 5, name: 'Zen', cost: 30, units: 30, category: 'grocery' },
    { id: 1, name: 'Ken', cost: 20, units: 80, category: 'utencil' },
    { id: 7, name: 'Mouse', cost: 100, units: 20, category: 'electronics' }
];

function usecase(title, fn){
    console.group(title)
    fn()
    console.groupEnd()
}

/* 
sort (bubble sort)
filter
group
max
min
*/
usecase("Initial List", function(){
    console.table(products)
})

usecase('Sort', function(){
    usecase('Default Sort (products by id)', function(){
        function sortProducts(){
            for (var i = 0; i < products.length-1; i++){
                for (var j = i + 1; j < products.length; j++){
                    if (products[i].id > products[j].id){
                        var temp = products[i]
                        products[i] = products[j]
                        products[j] = temp
                    }
                }
            }
        }
        sortProducts()
        console.table(products)
    })

    usecase('Any list by any attribute', function(){
        function sortByAttrName(list, attrName) {
            for (var i = 0; i < list.length - 1; i++) {
                for (var j = i + 1; j < list.length; j++) {
                    if (list[i][attrName] > list[j][attrName]) {
                        var temp = list[i]
                        list[i] = list[j]
                        list[j] = temp
                    }
                }
            }
        }
        usecase('Products by name', function(){
            sortByAttrName(products, 'name')
            console.table(products)
        }) 
        usecase('Products by cost', function () {
            sortByAttrName(products, 'cost')
            console.table(products)
        }) 
    })

    usecase('Any list by any comparer', function () {
        function sortByComparer(list, comparerFn) {
            for (var i = 0; i < list.length - 1; i++) {
                for (var j = i + 1; j < list.length; j++) {
                    if (comparerFn(list[i], list[j]) > 0 ) {
                        var temp = list[i]
                        list[i] = list[j]
                        list[j] = temp
                    }
                }
            }
        }
        usecase('Products by value (cost * units)', function(){
            var productComparerByValue = function(p1, p2){
                var p1Value = p1.cost * p1.units,
                    p2Value = p2.cost * p2.units;
                if (p1Value < p2Value) return -1
                if (p1Value > p2Value) return 1
                return 0
            }
            usecase('By Ascending', function(){
                sortByComparer(products, productComparerByValue)
                console.table(products)
            })
            usecase('By Descending', function(){
                var productComparerByValueDesc = function(p1, p2){
                    return productComparerByValue(p1, p2) * -1
                }
                sortByComparer(products, productComparerByValueDesc)
                console.table(products)
            })
        })

    })
   
})

/* 
usecase('Filter', function(){
    usecase('Costly Products', function(){
        // filter
        console.table(products)
    })
    usecase('Stationary Products', function(){
        // filter
        console.table(products)
    })
})
 */