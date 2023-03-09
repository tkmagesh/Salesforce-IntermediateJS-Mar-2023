function Spinner() {
    this.$$count$$ = 0
}
Spinner.prototype.up = function () {
    return ++this.$$count$$
}
Spinner.prototype.down = function () {
    return --this.$$count$$
}