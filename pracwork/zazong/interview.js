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
    let args = [...arguments].slice(1)
    context.fn(args);
    delete context.fn;
}

let foo = {
    value: 1,
}

let bar = function(){
    console.log(this.value)
}

bar.callImitator(foo)   // 1

/**
 * apply 的生js实现
 */
Function.prototype.applyImitator = function(context = window, rest){
    context.fn = this;
    context.fn(...rest);
    delete context.fn;
}

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


/**
 * instanceof 是通过原型链判断的，A instanceof B,在A原型链中层层查找，是否有原型等于B.__proto__,直到顶端（null,即Object.prototype.__proto__ ,）那么返回false；
 * instanceof 可以准确判断复杂数据类型，但不能正确判断基本数据类型
 * 实现代码 L instanceof R
 * L.constructor == R
 * L.__proto__ == R.prototpe
 */
function instance_of(L, R){
    let O = R.prototype
    L = L.__proto__;
    while(true){
        if(L === null){
            return false;
        }else if(L === O){
            return true;
        }
        L = L.__proto__; //继续上一层原型查找
    }
}



/**
 * 判断一个变量是不是数组
 */
// 1. Array.isArray()判断
// 2. arr instanceof Array
// 3. Object.prototype.toString.call(arr) === '[object Array]'
// 4. arr.constructor === Array,但可以定义arr.constructor的值



/**
 * === & ==
 * 
 * == 类型转换的步骤
 * 1.判断类型相同，值相等，则true；
 * 2.类型不同，进行转换
 * a.判断两者是否是null或undefined，是，则true；
 * b.string和number，string转为number，进行比较；
 * c.boolean,将bool转为number，进行比较；
 * d.object,string或number或symbol，将Object转为原始类型再进行比较。
 * 
 * 思考: [] == ![]

我们来分析一下: []==![] 是true还是false？

1.首先，我们需要知道 ! 优先级是高于 == (更多运算符优先级可查看: 运算符优先级)

2. ![] 引用类型转换成布尔值都是true,因此 ![]的是false

3.根据上面的比较步骤中的第五条，其中一方是 boolean，将 boolean 转为 number 再进行判断，false转换成 number，对应的值是 0.

4.根据上面比较步骤中的第六条，有一方是 number，那么将object也转换成Number,空数组转换成数字，对应的值是0.(空数组转换成数字，对应的值是0，如果数组中只有一个数字，那么转成number就是这个数字，其它情况，均为NaN)

5.0 == 0; 为true
 */


/**
 * ES6的class 与es5的区别
 * 1.es6 class内部定义的方法都是不可枚举的；
 * 2.es6 class必须使用 new调用；
 * 2.es6 class不存在变量提升；
 * 4.ES6 默认是严格模式；
 * 5.ES6 class 子类必须在父类的构造函数中调用super(),才有this对象；es5相反
 */

/**
 * let\const和var区别：
 * 1.let const不存在变量提升；在声明前使用会出现暂时性死区
 * 2.let const 块级作用域；
 * 3.let const不允许重复声明；
 * 4.const声明了就不允许改变
 */


/**
 * 13.谈谈你对JS执行上下文栈和作用域链的理解。

执行上下文就是当前 JavaScript 代码被解析和执行时所在环境, JS执行上下文栈可以认为是一个存储函数调用的栈结构，遵循先进后出的原则。

1.JavaScript执行在单线程上，所有的代码都是排队执行。

2.一开始浏览器执行全局的代码时，首先创建全局的执行上下文，压入执行栈的顶部。

3.每当进入一个函数的执行就会创建函数的执行上下文，并且把它压入执行栈的顶部。当前函数执行-完成后，当前函数的执行上下文出栈，并等待垃圾回收。

4.浏览器的JS执行引擎总是访问栈顶的执行上下文。

5.全局上下文只有唯一的一个，它在浏览器关闭时出栈。

作用域链: 无论是 LHS 还是 RHS 查询，都会在当前的作用域开始查找，如果没有找到，就会向上级作用域继续查找目标标识符，每次上升一个作用域，一直到全局作用域为止。
 */

 /**
  * 闭包:
  * 闭包是指 有权访问另一个函数作用域中的变量的函数
  * 创建闭包最常用的方法使，在函数内创建另一个函数
  * 作用：封装私有变量；模仿块级作用域；实现js模块；
  */


/**
 * 19.prototype 和 __proto__ 区别是什么？

prototype是构造函数的属性。

__proto__ 是每个实例都有的属性，可以访问 [[prototype]] 属性。

实例的 __proto__ 与其构造函数的prototype指向的是同一个对象。
 */


/**
 * 防抖和节流
 * 防抖：
 */

/**
 * 函数柯里化
 */
function sum(a){
    return function(b){
        return function(c){
            return a + b + c;
        }
    }
}
sum(1)(2)(3);
//实现一个curry函数，将普通函数进行柯里化；
function curry(fn, args = []){
    return function(){
        let rest = [...args, ...arguments];
        if(rest.length < fn.length){
            return curry.call(this, fn, test)
        }else {
            return fn.apply(this, rest)
        }
    }
}


/**
 * 浏览器渲染过程：
 * 1.HTML/XML/XHTML，HTML字符串描述了一个页面的结构，浏览器会把HTML结构字符串解析转换成DOM树形结构。
 * 2.css，解析css产生CSS规则树。
 * 3.js脚本，js加载完并解析时，通过DOM api和CSSOM API来操作DOM tree和CSS Rule Tree。
 * 4.解析完成后，浏览器引擎会通过DOM tree和CSS tree来构造Render tree：渲染需要显示的节点和这些节点的样式信息，计算每个element的位置，reflow和repaint
 * 浏览器有GUI渲染线程和js渲染线程，构建DOM时，HTML解析器若遇到了JavaScript，那么它会暂停构建DOM，将控制权移交给JavaScript引擎，等JavaScript引擎运行完毕，浏览器再从中断的地方恢复DOM构建
 */


/**
 * 缓存位置 https://mp.weixin.qq.com/s?__biz=MzA5NzkwNDk3MQ==&mid=2650589430&idx=1&sn=f8d78a5cff1ac08900942974f07a75ea&chksm=8891d8d2bfe651c425ed78b26de5a865bbb408c1a565f05fe353d26b2270cb4b706e62ab4c23&mpshare=1&scene=1&srcid=&key=e6e0bf5c3f2e82db6702f2bcc6e9b8dc885d805694d430b64a6fd370999b54eb6e166f30b0660ce9ff8574e45c29f6c41a4ed52ff5187c083f41e9894091f0e30c6b86f109ccec699875b4003441926b&ascene=0&uin=MjQ1MjE3NDEzOA%3D%3D&devicetype=iMac+MacBookAir7%2C2+OSX+OSX+10.11.6+build(15G1421)&version=12020110&nettype=WIFI&lang=zh_CN&fontScale=100&pass_ticket=NRwOq2%2Fd7wP0tr1eaeBjlvaabRIqxJurrwAemY1cTQlyEzZpHae1aF59yCpdavGn
 * 1.service work: Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。使用 Service Worker的话，传输协议必须为 HTTPS。因为 Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全。Service Worker 的缓存与浏览器其他内建的缓存机制不同，它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的。
 * Service Worker 实现缓存功能一般分为三个步骤：首先需要先注册 Service Worker，然后监听到 install 事件以后就可以缓存需要的文件，那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据
 * 2.Memory cache(内存缓存)：主要包含的是当前中页面中已经抓取到的资源,例如页面上已经下载的样式、脚本、图片等。读取内存中的数据肯定比磁盘快,内存缓存虽然读取高效，可是缓存持续性很短，会随着进程的释放而释放。 一旦我们关闭 Tab 页面，内存中的缓存也就被释放了
 * 3.disk cache(磁盘缓存): 在所有浏览器缓存中，Disk Cache 覆盖面基本是最大的。它会根据 HTTP Herder 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求。并且即使在跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再次去请求数据。绝大部分的缓存都来自 Disk Cache，关于 HTTP 的协议头中的缓存字段，我们会在下文进行详细介绍。
 * 强缓存与协商缓存：
 * 强制缓存优先于协商缓存进行，若强制缓存(Expires和Cache-Control)生效则直接使用缓存，若不生效则进行协商缓存(Last-Modified / If-Modified-Since和Etag / If-None-Match)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，返回200，重新返回资源和缓存标识，再存入浏览器缓存中；生效则返回304，继续使用缓存。
 */

 /**
  * 优化动画：
  * JS动画要保证预留出6ms的时间给浏览器处理像素管道，而自身执行时间应该小于10ms来保证整体运行速度小于16ms。但触发动画的时机也很重要，定时器无法稳定的触发动画，所以我们需要使用requestAnimationFrame触发JS动画。同时我们应该避免一切FSL，它对性能的影响非常大。
  * CSS动画我们可以通过降低绘制区域并且使transform（图层）属性来完成动画，同时我们需要管理好图层，因为绘制和图层管理都需要成本，通常我们需要根据具体情况进行权衡并做出最好的选择。将原本不断发生变化的元素提升到单独的图层中，就不再需要绘制了
  */
 