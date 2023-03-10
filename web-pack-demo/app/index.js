/* 
import Calculator from './utils/calculator'

console.log('Application loaded')
const calc = new Calculator()
console.log(calc.add(100,200))
console.log(calc.subtract(100, 200)) 
*/
import { add, multiply } from './utils/calculator'
console.log('app invoked')
console.log(add(100,200))
console.log(multiply(100,200))