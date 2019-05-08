/**
 * Created by qiany on 17/12/24.
 */
console.log('lllll');
function weektime() {
    this.dataSource = [];
    this.addnum = 50;
}
weektime();
console.log(this.addnum);  //undefined

// if([]==false){console.log(1)};
// if({}==false){console.log(2)};
// if([]){console.log(3)}
// if([1]==[1]){console.log(4)}


//1  3


// for (var i = 0; i < 5; i++) {
//     setTimeout(function() {
//         console.log(i);
//     }, 1000 * i);
// }  // 55555
//
// // 使得其输出为0，1，2，3，4
// for (let i = 0; i < 5; i++) {
//     setTimeout(function() {
//         console.log(i);
//     }, 1000 * i);
// } // 使得其输出为0，1，2，3，4
//
//
// for (var i = 0; i < 5; i++) {
//     (function (i) {
//         setTimeout(function() {
//             console.log(i);
//         }, 1000 * i);
//     })(i)
// // } // 使得其输出为0，1，2，3，4
//
// let arr = [1, 2, 3, 4, 5, 6, 7, 8];
//
// function getSet(array, count, currentIndex) {
//     let resultArr = [];
//     for (let i = currentIndex; i < array.length - count + 1; i++) {
//         if (count > 1) {
//             let sub = getSet(array, count - 1, i + 1);
//             // console.warn(sub)
//             sub.forEach(item => {
//                 item.unshift(array[i])
//                 resultArr.push(item);
//             })
//         }else {
//             // console.warn(array[i])
//             resultArr.push([array[i]])
//         }
//         // console.log('result',resultArr)
//     }
//     return resultArr
// }
//
// console.warn(getSet(arr, 3, 0));
//
//
//实现bind的功能
Function.prototype.bind = function() {
    var self = this,
        context = [].shift.call(arguments),
        args = [].slice.call(arguments);     //转为数组    // rest参数的写法，numbers就是数组  const sortNumbers = (...numbers) => numbers.sort();
    return function() {
        return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
    };
};


/**
 * call 的生js实现：改变this，并执行
 */
Function.prototype.callImitator = function(context = window){  //context = window 如果.call(null) this指向window
    context.fn = this;  // 获取调用call的函数，就是this
    context.fn();
    delete context.fn;
}

let foo = {
    value: 1,
}

let bar = function(){
    console.log(this.value)
}

bar.callImitator(foo)   // 1

// // 测试
// var obj = {
//     name: "ligang"
// };
// var func = function(a, b, c) {
//     console.log(this.name);
//     console.log([a, b, c])
// }.bind(obj, 1, 2);
//
// func(3);   //ligang   [1,2,3]

//
// var x = 1;
// function foo(x, y = function() { x = 2; }) {
//     console.log(x)  //undefined
// x = 3;
// console.log(x)   //3
// y();
// console.log(x);     //2
// }

// foo() // 2
// console.log(x) // 1
//
// var x = 1;
// function foo(x, y = function() { x = 2; }) {
//     console.log(x)  //undefined
// var x = 3;
// console.log(x);      //3
// y();
// console.log(x);        //3
// }
//
// foo()
// console.log(x) // 1



/**
 * new 的实现机制
 */

function Person(name, age){
    this.name = name;
    this.age = age;
}
Person.prototype.toPrint = function(){
    return this.name + '-' + this.age;
}

let student = new Person('小名', 28);

student.toPrint() // 小名-28
student.name    // 小名
student.age     // 28

// new，使student继承了Person的属性和方法，并且返回一个新对象。
function newImitator(){
    let obj = Object.create();
    let Person = Array.prototype.shift.call(arguments);
    obj.__proto__ = Person.prototype;   // 让obj的原型指向构造函数，这样obj就可以访问到Person的属性
    Person.apply(obj, arguments)        // 让this指向指给obj
    return obj;
}

let teacher = newImitator(Person, 'Ms.z', 30)
teacher.toPrint() // Ms.z-30
teacher.name    // Ms.z

