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

function printGroup(groupObj){
    for (var attributeName in groupObj){
        usecase('Key - [' + attributeName + ']', function(){
            console.table(groupObj[attributeName])
        })
    }
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

    function sort(list, comparer) {
        var comparerFn;
        if (typeof comparer === 'function') {
            comparerFn = comparer;
        }
        if (typeof comparer === 'string'){
            comparerFn = function(p1, p2){
                if (p1[comparer] < p2[comparer]) return -1
                if (p1[comparer] > p2[comparer]) return 1
                return 0
            }
        }
        for (var i = 0; i < list.length - 1; i++) {
            for (var j = i + 1; j < list.length; j++) {
                if (comparerFn(list[i], list[j]) > 0) {
                    var temp = list[i]
                    list[i] = list[j]
                    list[j] = temp
                }
            }
        }
    }

    usecase('Any list by any attribute', function(){
        /* 
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
        */
        usecase('Products by name', function(){
            sort(products, 'name')
            console.table(products)
        }) 
        usecase('Products by cost', function () {
            sort(products, 'cost')
            console.table(products)
        }) 
    })

    usecase('Any list by any comparer', function () {
        /* 
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
        */
        usecase('Products by value (cost * units)', function(){
            var productComparerByValue = function(p1, p2){
                var p1Value = p1.cost * p1.units,
                    p2Value = p2.cost * p2.units;
                if (p1Value < p2Value) return -1
                if (p1Value > p2Value) return 1
                return 0
            }
            usecase('By Ascending', function(){
                sort(products, productComparerByValue)
                console.table(products)
            })
            usecase('By Descending', function(){
                var productComparerByValueDesc = function(p1, p2){
                    return productComparerByValue(p1, p2) * -1
                }
                sort(products, productComparerByValueDesc)
                console.table(products)
            })
        })

    })
   
})


usecase('Filter', function(){
    usecase('Costly Products (cost > 50)', function(){
        function filterCostlyProducts(){
            var result = []
            for (var i = 0; i < products.length; i++){
                if (products[i].cost > 50){
                    result.push(products[i])
                }
            }
            return result
        }
        var costlyProducts = filterCostlyProducts()
        console.table(costlyProducts)
    })
    usecase('Any list by any criteria', function(){
        function filter(list, predicate){
            var result = []
            for (var i = 0; i < list.length; i++) {
                if (predicate(list[i])) {
                    result.push(list[i])
                }
            }
            return result
        }
        usecase('Stationary Products', function(){
            var stationaryProductPredicate = function(product){
                return product.category === 'stationary'
            }
            var stationaryProducts = filter(products, stationaryProductPredicate)
            console.table(stationaryProducts)
        })
        usecase('Under stocked Products (units < 50)', function () {
            var understockedProductPredicate = function(product){
                return product.units < 50
            }
            var understockedProducts = filter(products, understockedProductPredicate)
            console.table(understockedProducts)
        })
    })
})

usecase("GroupBy", function(){
    usecase("grouping products by category", function(){
        function groupProductsByCategory(){
            var result = {}
            for (var i = 0; i < products.length; i++){
                var item = products[i]
                var key = item.category
                result[key] = result[key] || []
                result[key].push(item)
            }
            return result
        }
        var productsByCategory = groupProductsByCategory()
        printGroup(productsByCategory)
    })
    usecase("any list by any key", function(){
        function groupBy(list, key) {
            var result = {}
            var keySelectorFn;
            if (typeof key === 'string'){
                keySelectorFn = function(item){
                    return item[key]
                }
            }
            if (typeof key === 'function'){
                keySelectorFn = key
            }
            for (var i = 0; i < list.length; i++) {
                var item = list[i]
                var keyValue = keySelectorFn(item)
                result[keyValue] = result[keyValue] || []
                result[keyValue].push(item)
            }
            return result
        }
        usecase("products by cost", function(){
            var costKeySelector = function(product){
                return product.cost > 50 ? 'costly' : 'affordable'
            }
            var productsByCost = groupBy(products, costKeySelector)
            printGroup(productsByCost)
        })
        usecase("products by category [string]", function () {
            var productsByCost = groupBy(products, "category")
            printGroup(productsByCost)
        })
    })
})

