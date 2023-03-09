/* 
    1. let
        (var -> NOT block scoped)
    2. const
    3. Array destructuring
    4. Rest operator (Array)
    5. Spread operator (Array)
    6. Object destructuring
    7. Rest operator (Object)
    8. Spread operator (Object)
    9. default arguments
    10. Arrow functions
*/

// Array Destructuring
let nos = [3, 1, 4, 2, 5]
let [x, y] = nos

// 4. Rest operator(Array)
let nos = [3, 1, 4, 2, 5]
let [x, y, ...z] = nos


function fn(...z) {
    console.log('z = ', z);
}
fn(10, 20, 30, 40, 50)


// 6. Object destructuring
var emp = {
    id: 100,
    name: 'Magesh',
    salary: 10000
}
var { salary, name } = emp
var { salary: x, name: y } = emp

// using functions
var emp = {
    id: 100,
    name: 'Magesh',
    salary: 10000
}

function print(obj) {
    console.log(obj.id, obj.name, obj.salary)
}
print(emp)

function print(obj) {
    const { id, name, salary } = obj
    console.log(id, name, salary)
}
print(emp)

function print({ id, name, salary }) {
    console.log(id, name, salary)
}
print(emp)

// 7. Rest Operator (Object)
var emp = {
    id: 100,
    name: 'Magesh',
    salary: 10000
}
let { name, ...z } = emp

// 8. Spread Operator (Object)
var emp = {
    id: 100,
    name: 'Magesh',
    salary: 10000
}
var newEmp = { ...emp, city: 'Bangalore' }

// 9. Default arguments
function add(x = 10, y = 20) {
    return x + y
}
add()
// 30
add(100)
// 120
add(undefined, 200)
// 210
add(100, 200)
// 300

// 10. Arrow functions
/*
// function statement
function add(x,y){
    return x + y
}

// function expression
var add = function(x,y){
    return x + y
}

// arrow function
var add = (x,y) => {
    return x + y
}
*/
var add = (x, y) => x + y