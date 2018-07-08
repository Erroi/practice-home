1 类型注解：为函数或变量添加约束
    return "Hello, " + person;
}

let user = [0, 1, 2];

document.body.innerHTML = greeter(user);

2 接口：描述一个拥有firstName和lastName字段的对象
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);

3 类：支持基于类的面向对象编程
创建一个Student类，它带有一个构造函数和一些公共字段
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


react 使用
export interface HelloProps { compiler: string; framework: string; }
export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;
or
export interface HelloProps { compiler: string; framework: string; }
export class Hello extends React.Component<HelloProps, {}> {   //第一个是props，第二个是state,没有设置写{}
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}

import { Hello } from "./components/Hello";    //引入.ts时使用相对路径，否则只会在node_modules里查找
ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);


//基础类型
let isDone: boolean = false;
let decLiteral: number = 6;
let name: string = "bo"
let list: Array<number> = [1, 2, 3];
let lust: number[] = [1,2,3];
//元组 ： 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
let x: [string, number];
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
x[6] = true; // Error, 布尔不是(string | number)类型

//枚举；enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];
alert(colorName);  // 显示'Green'因为上面代码里它的值是2

//Any 不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

let list: any[] = [1, true, "free"];//只知道一部分数据的类型时,它包含了不同的类型的数据
list[1] = 100;

//Void void类型像是与any类型相反，它表示没有任何类型。  
function warnUser(): void {   // 当一个函数没有返回值时，你通常会见到其返回值类型是 void
    alert("This is my warning message");
}
let unusable: void = undefined;  //声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null

//Null Undefined null和undefined是所有类型的子类型
//Never: never类型表示的是那些永不存在的值的类型。  never类型是任何类型的子类型，也可以赋值给任何类型；返回never的函数必须存在无法达到的终点

//类型断言：  “尖括号”语法：
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
            //as语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

// 接口
    // 只读属性
    interface Point {
        readonly x: number;
        readonly y: number;
    }
    let p1: Point = { x: 10, y: 20 };
    p1.x = 5; // error!

// 接口继承类 继承类extends 继承接口implements
class Control {
    private state: any;
}
interface SelectableControl extends Control {
    select(): void;
}
class Button extends Control implements SelectableControl {
    select() {}
}
class TextBox extends Control {
    select() {}
}
class Image implements SelectableControl { // 类“Image”错误实现接口“SelectableControl”。类型“Image”中缺少属性“state”。
    select() {}
}
                // SelectableControl包含了Control的所有成员，包括私有成员state，因为state是私有成员，所以只能是Control的子类才能实现SelectableControl接口。
                // 因为只有Control的子类才能够拥有一个声明于Control的四哟成员state
