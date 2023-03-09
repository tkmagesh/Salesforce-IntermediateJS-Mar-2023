/* ES5 */
/* 
function sum(){
    function parseArg(n){
        if (Array.isArray(n)) return sum.apply(this, n)
        if (typeof n === 'function') return parseArg(n())
        return isNaN(n) ? 0 : parseInt(n)
    }
    return arguments.length <= 1 ? parseArg(arguments[0]) : parseArg(arguments[0]) + sum([].slice.call(arguments, 1))
} 
*/

/* ES6 */
function sum(...args /* rest operator */) {
    function parseArg(n) {
        if (Array.isArray(n)) return sum(...n) /* spread operator */
        if (typeof n === 'function') return parseArg(n())
        return isNaN(n) ? 0 : parseInt(n)
    }
    return args.length <= 1 ? parseArg(args[0]) : parseArg(args[0]) + sum(args.slice(1))
}
module.exports = sum;