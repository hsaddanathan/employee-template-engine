// TODO: Write code to define and export the Employee class
//Define Class
class Employee{
    //Create Constructor
    constructor(name,id,email){
        this.name =name;
        this.id = id;
        this.email = email;
    }
    //Requested methods
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getRole(){
        return "Employee";
    }
}

// const Alice = new Employee("Alice", 101,"alice@gmail.com");
// console.log(Alice)
module.exports = Employee;