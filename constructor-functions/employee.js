function Employee(id, name , salary){
    // this -> new object
    this.id = id
    this.name = name
    this.salary = salary
    // this -> returned by default

    this.print = function(){
        console.log(this.id, this.name, this.salary)
    }
}