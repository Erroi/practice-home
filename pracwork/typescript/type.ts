//执行 tsc type.ts 将其转成js
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
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {  //在构造函数的参数上使用public等同于创建了同名的成员变量
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
