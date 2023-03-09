// https://es6-features.org

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
    11. template strings
    12. iterator (for of)
    13. class
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

// 11. template strings
let x = 100, y = 200
let s2 = `sum of ${x} and ${y} is ${x + y}`

let s3 = `sum of 
${x} and ${y} 
is ${x + y}`

// 12. for-of
let nos = [3, 1, 4, 2, 5]
for (let no of nos)
    console.log(no)

// classes
class Employee {
    id = 0
    name = ''
    salary = 0

    constructor(id, name, salary) {
        this.id = id
        this.name = name
        this.salary = salary
    }

    display() {
        console.log(`id = ${this.id}, name = ${this.name}, salary = ${this.salary}`)
    }
}

// private fields, setters & getters
class Employee {
    #id = 0
    #name = ''
    #salary = 0

    get name() {
        console.log('getter:name triggered')
        return this.#name
    }

    set name(val) {
        console.log('setter:name triggered')
        if (val === '')
            throw new Error('invalid name')
        this.#name = val
    }

    get id() {
        return this.#id
    }

    constructor(id, name, salary) {
        this.#id = id
        this.#name = name
        this.#salary = salary
    }

    display() {
        console.log(`id = ${this.#id}, name = ${this.#name}, salary = ${this.#salary}`)
    }
}

class Employee {
    #id = 0
    #name = ''
    #salary = 0

    get name() {
        console.log('getter:name triggered')
        return this.#name
    }

    set name(val) {
        console.log('setter:name triggered')
        if (val === '')
            throw new Error('invalid name')
        this.#name = val
    }

    get id() {
        return this.#id
    }

    get salary() {
        return this.#salary
    }

    constructor(id, name, salary) {
        this.#id = id
        this.#name = name
        this.#salary = salary
    }

    display() {
        console.log(`id = ${this.#id}, name = ${this.#name}, salary = ${this.#salary}`)
    }
}

class FulltimeEmployee extends Employee {
    benefits = ''
    constructor(id, name, salary, benefits) {
        super(id, name, salary)
        this.benefits = benefits
    }
    display() {
        console.log(`id = ${this.id}, name = ${this.name}, salary = ${this.salary}, benefits = ${this.benefits}`)
    }
}


class Person {
    #firstName = ''
    #lastName = ''

    set Name(fullname) {
        const [firstName, lastName] = fullname.split(',')
        this.#firstName = firstName
        this.#lastName = lastName
    }

    get firstName() {
        return this.#firstName
    }

    get lastName() {
        return this.#lastName
    }
}

const p = new Person()
p.Name = 'Magesh,Kuppan'
p.firstName
// 'Magesh'
p.lastName
// 'Kuppan'