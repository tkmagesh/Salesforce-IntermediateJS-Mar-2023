var products = [
    { id: 6, name: 'Pen', cost: 50, units: 20, category: 'stationary' },
    { id: 9, name: 'Ten', cost: 70, units: 70, category: 'stationary' },
    { id: 3, name: 'Len', cost: 60, units: 60, category: 'grocery' },
    { id: 5, name: 'Zen', cost: 30, units: 30, category: 'grocery' },
    { id: 1, name: 'Ken', cost: 20, units: 80, category: 'utencil' },
    { id: 7, name: 'Mouse', cost: 100, units: 20, category: 'electronics' }
];

const usecase = (title, fn) => {
    console.group(title)
    fn()
    console.groupEnd()
}

function printGroup(groupObj){
    for (let attributeName in groupObj){
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
            for (let i = 0; i < products.length-1; i++){
                for (let j = i + 1; j < products.length; j++){
                    if (products[i].id > products[j].id){
                        [products[i], products[j]] = [products[j], products[i]]
                    }
                }
            }
        }
        sortProducts()
        console.table(products)
    })

    function sort(list, comparer) {
        let comparerFn;
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
        for (let i = 0; i < list.length - 1; i++) {
            for (let j = i + 1; j < list.length; j++) {
                if (comparerFn(list[i], list[j]) > 0) {
                    [list[i], list[j]] = [list[j], list[i]]
                }
            }
        }
    }

    usecase('Any list by any attribute', function(){
        usecase('Products by name', () => {
            sort(products, 'name')
            console.table(products)
        }) 
        usecase('Products by cost',  () => {
            sort(products, 'cost')
            console.table(products)
        }) 
    })

    usecase('Any list by any comparer', function () {
        usecase('Products by value (cost * units)', function(){
            /* 
            let productComparerByValue = function(p1, p2){
                let p1Value = p1.cost * p1.units,
                    p2Value = p2.cost * p2.units;
                if (p1Value < p2Value) return -1
                if (p1Value > p2Value) return 1
                return 0
            } 
            */
            let productComparerByValue = (p1, p2) => p1.cost - p2.cost;

            usecase('By Ascending', function(){
                sort(products, productComparerByValue)
                console.table(products)
            })
            usecase('By Descending', function(){
                let productComparerByValueDesc = (p1, p2) => productComparerByValue(p1, p2) * -1
                sort(products, productComparerByValueDesc)
                console.table(products)
            })
        })

    })
   
})


usecase('Filter', function(){
    usecase('Costly Products (cost > 50)', function(){
        function filterCostlyProducts(){
            let result = []
            /* 
            for (let i = 0; i < products.length; i++){
                if (products[i].cost > 50){
                    result.push(products[i])
                }
            } 
            */
           for (let product of products){
                if (product.cost > 50){
                    result.push(product)
                }
           }
            return result
        }
        let costlyProducts = filterCostlyProducts()
        console.table(costlyProducts)
    })
    usecase('Any list by any criteria', function(){
        function filter(list, predicate){
            let result = []
            for (let i = 0; i < list.length; i++) {
                if (predicate(list[i])) {
                    result.push(list[i])
                }
            }
            return result
        }
        /* 
        function negate(predicateFn){
            return function(){
                return !predicateFn.apply(this, arguments)
            }
        } 
        */
       const negate = predicateFn => (...args) => !predicateFn(...args)
        
        usecase('Stationary Products', function(){
            let stationaryProductPredicate = product => product.category === 'stationary';
            
            let stationaryProducts = filter(products, stationaryProductPredicate)
            console.table(stationaryProducts)
        })
        usecase("Products by units", function(){
            let understockedProductPredicate =  product => product.units < 80;
            
            usecase('Under stocked Products (units < 80)', function () {
                let understockedProducts = filter(products, understockedProductPredicate)
                console.table(understockedProducts)
            })
            usecase("well stocked Products", function(){
                let wellstockedProductPredicate = negate(understockedProductPredicate)
                let wellstockedProducts = filter(products, wellstockedProductPredicate)
                console.table(wellstockedProducts)
            })
        })
        usecase("Products by cost", function () {
            // convert to arrow function
            let costlyProductPredicate = function (product) {
                return product.cost > 50
            }
            usecase('costly products (cost > 50)', function () {
                let costlyProducts = filter(products, costlyProductPredicate)
                console.table(costlyProducts)
            })
            usecase("affordable products (!costly products)", function () {
                let affordableProductPredicate = negate(costlyProductPredicate)
                let affordableProducts = filter(products, affordableProductPredicate)
                console.table(affordableProducts)
            })
        })
    })
})

usecase("GroupBy", function(){
    usecase("grouping products by category", function(){
        function groupProductsByCategory(){
            let result = {}
            for (let i = 0; i < products.length; i++){
                let item = products[i]
                let key = item.category
                result[key] = result[key] || []
                result[key].push(item)
            }
            return result
        }
        let productsByCategory = groupProductsByCategory()
        printGroup(productsByCategory)
    })
    usecase("any list by any key", function(){
        function groupBy(list, key) {
            let result = {}
            let keySelectorFn;
            if (typeof key === 'string'){
                keySelectorFn = function(item){
                    return item[key]
                }
            }
            if (typeof key === 'function'){
                keySelectorFn = key
            }
            for (let i = 0; i < list.length; i++) {
                let item = list[i]
                let keyValue = keySelectorFn(item)
                result[keyValue] = result[keyValue] || []
                result[keyValue].push(item)
            }
            return result
        }
        usecase("products by cost", function(){
            // convert to arrow function
            let costKeySelector = function(product){
                return product.cost > 50 ? 'costly' : 'affordable'
            }
            let productsByCost = groupBy(products, costKeySelector)
            printGroup(productsByCost)
        })
        usecase("products by category [string]", function () {
            let productsByCost = groupBy(products, "category")
            printGroup(productsByCost)
        })
    })
})

