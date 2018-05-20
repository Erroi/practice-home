// 1 类型注解：为函数或变量添加约束
// function greeter(person: string) {
//     return "Hello, " + person;
// }
// let user = [0, 1, 2];
// document.body.innerHTML = greeter(user);
// 2 接口：描述一个拥有firstName和lastName字段的对象
// interface Person {
//     firstName: string;
//     lastName: string;
// }
// function greeter(person: Person) {
//     return "Hello, " + person.firstName + " " + person.lastName;
// }
// let user = { firstName: "Jane", lastName: "User" };
// document.body.innerHTML = greeter(user);
// 3 类：支持基于类的面向对象编程
// 创建一个Student类，它带有一个构造函数和一些公共字段
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
document.body.innerHTML = greeter(user);
