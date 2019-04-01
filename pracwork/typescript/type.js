// 参考 https://jkchao.github.io/typescript-book-chinese/typings/interfaces.html

// 1 类型注解：为函数或变量添加约束
function greeter(person: string) {
    return "Hello, " + person;
}
let user = [0, 1, 2];
document.body.innerHTML = greeter(user);
// 2 接口：描述一个拥有firstName和lastName字段的对象
interface Person {
    firstName: string;
    lastName: string;
}
function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
let user = { firstName: "Jane", lastName: "User" };
document.body.innerHTML = greeter(user);
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

// 类型
// 类型别名声明
type sn = number | string;
// 接口声明
interface I {x: number[];}
// 类声明
class C {}
// 枚举声明
enum E { A , B , C }
// 指向某个类型的import声明

// 值 以下方式能够创建值
let, const, var声明
包含值的namespace或module声明
enum声明
class声明
指向值得import声明
function声明



/**
 * namespace 命名空间
 */
(function(Utility) {
    Utility.foo = 123;
})(Utility || (Utility = {}));
// ts 提供 namespace 关键字来描述这种分组
namespace Utility {
    export function log(msg){
        console.log(msg)
    }
    export const foo = 123
}

