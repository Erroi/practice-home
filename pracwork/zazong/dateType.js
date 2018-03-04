//奇葩  看他们的解释
//两个对象的值是否相同，取决于它们是否指向相同的底层
var a = {name: "andrew"},
b = {name: "andrew"};

a === b; // false

//对于引用类型，(对象  数组  set  map)设置b=a，并没有创建新对象，而是创建了一个对其他对象的引用；只是将变量b指向a，当改变b的name属性时，同样改变了a的name属性
var a = {name: "andrew"},
b = a;

b.name = "robbins";

a === b; // true

//对于对基本类型，是不可变的。
var a = "Andrew",
b = a;

b = "Robbins";

a === b; // false

//基本类型的属性是只读和临时的
var hello = 'hello';
hello.slice(1);   // 'ello'
hello;    //'hello'

typeof 's';  //'string'
typeof NaN;  //number
typeof null; //object;
typeof undefined;  //'undefined'
typeof new String(s);  //'object'

//js值分为两种类型：基本类型和对象类型
//基本类型：String Number Boolen,Symbol,undefined,null
//对象类型：Function Object Array

function Cat(name,color){
    this.name = name;
    this.color = color;
}

Cat.prototype.type = '猫科动物';
Cat.prototype.eat = function(){alert('吃鱼')};
var cat1 = new Cat('大毛','黄色');
var cat2 = new Cat('二毛','黑色');

console.log(cat1.hasOwnProperty('name'));    //判断 name属性是实例对象cat1的自身属性  true
console.log(cat1.hasOwnProperty('eat'));    //判断 eat方法是实例对象cat1的自身属性 false，是继承自prototype原型上的
console.log(cat1 instanceof Cat);           //判断 cat1是否是Cat的实例  true
console.log('name' in cat1);                //判断 cat1是否具有name属性，不管是自身的还是继承自prototype的  true
console.log('eat' in cat1);                 //true


//科学计数法E
2.3E7;
let num = new Number(2.3E7);  //23000000

(1.55).toFixed(1);   //1.6  四舍五入
(2.55).toFixed(1);   //2.5  失效
(2.55 + 1e-14).toFixed(1); //2.6  矫正方法

~~'2.58'  表示Math.floor()   //向下取整 

null === null; //true
undefined === undefined; //true
NaN != NaN    
Object.is(NaN,NaN) //true
new Object != new Object;
null == undefined;  //true

创建对象的方式
1 对象字面量  var obj = {z:1,u:2};
2 new Foo()  new 实例化对象
3 var obj = Object.create({x:1});


//取整
Math.trunc(4.1) //4
Math.trunc(4.9) //4
//判断正负
Math.sign(-5)  //-1
Math.sign(5)  //1
Math.sign(0) //0
//计算一个数的立方根
Math.cbrt(2) //1.25..
//返回x的y次幂   x ** y
Math.pow(x,y)  //Math.pow(2,3)  8
//取绝对值
Math.abs(-2) //2
//返回一个数的向上取整
Math.ceil(3.02) //3
//返回一个数的向下取整
Math.floor(3.98) //3
//返回0到1之间的伪随机数
Math.random()  //0到1  包括0不包括1
//返回1到100的随机数
Math.floor((Math.random() * (max - min)) + min);
//四舍五入后的取整
Math.round(3.43)  //3
//指数运算符
2 ** 3  //8 

+ obj  // +'78'  78  转数字类型

数组：
var arr = new Array();    new Array(100);// undefined * 100    
                            new Array(1,true,4,'uy',null) //[1,true,4,'uy',null]
稀疏数组：并不含有从0开始的连续索引：
    例：var arr1 = [undefined];
        var arr2 = new Array(1);
        0 in arr1; //true;
        0 in arr2;  //false;
        arr1.length = 100;
        arr1[99] = 123;
        99 in arr1;  //true
        98 in arr2;  //false
        var arr = [,,];
        0 in arr;  //false;

Array.reduce((pre,cur,curIndex,arr)=>{return pre + cur},0);  //第二个参数0 为初始值。
    [].reduceRight() //从右向左累加
转为真正的数组的方法：
A 、扩展运算符(...) 
Math.min(...[2,5,3])  Math.min(2,5,3) //2
//合并数组
arr1.concat(arr2,arr3);
[...arr1,...arr2,...arr3];
arr2.reverse()
对于有Iterator接口的对象：如Map结构和Set结构可使用(...),否则会报错

B 、 Array.from() 用于将 类似数组的对象  和 可遍历的对象 转为真正的数组 如Map结构和Set结构；
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
  console.log(p);
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}

C、Array.of(2,3,4)  将一组值转化为数组  //[2,3,4]

[1,3,4,5].find(function(value,index,arr){
    return value >3;
})

new Array(3).full(7) //[7,7,7]
arr1.keys()
arr.values()
arr.entries()
arr.includes('4')


//判断是否为数组
arr instanceof Array
arr.constructor === Array
Object.prototype.toString.call(arr) === '[object Array]'


call、applay、bind

call,applay 都属于 Function.prototype 的一个方法， 所以每个function对象实例，也就是每个方法都有call、applay属性。
 obj.call(thisObj,arg1,arg2,arg3);
 obj.applay(thisObj,[arg1,arg2,arg3]);
将obj的属性和方法绑定到thisObj上，运行上下文this指向thisObj，或者说 thisObj继承了obj的方法和属性；

使用场景：
    将类数组可以使用数组的增删改查
    let eleNodes = document.getElementsByTagName('p');
    Array.prototype.slice.call(eleNodes);
    //通过调用数组原型上的slice方法将类数组转换成数组，就具有了数组的所有方法

    合并几个数组
    var arr1 = [12,'ee','foo'];
    var arr2 = ['Hoe',44];
    Array.prototype.push.apply(arr1,arr2);     //立即执行

    找出数组中的最小值
    var nums = [2,4,5,1,34,62,4];
    Math.max.apply(Math,nums)

    验证是否是数组
    Object.prototype.toString.call(obj) == '[object Array]'

    唯一区别是apply接受的是数组参数，call接受的是连续参数。


bind 和 call、applay的作用类似，都是改变this的指向，但
bind()方法返回对象函数的引用，便于后面调用，他的this值传递给第一个参数，参数的bind的其他参数和原本参数。

setTimeout 运行时 作用域通常是全局的，this指向window；

    例：
    this.x = 9;
    var module = {
        x:8,
        getX:function(){
            return this.x;
        }
    }
    module.getX();   //8

    var retrieveX = module.getX;
    retrieveX();  //9; this 指向全局作用域；

    var boundX = retrieveX.bind(module);
    boundX();    //8

三者区别
    var obj = {
        x:81
    }
    var foo = {
        getX:function(){
            return this.x;
        }
    }
    console.log(foo.getX.bind(obj)())    // 81   bind绑定的时候非立即执行，只是函数的引用，回调的时候会执行
    console.log(foo.getX.call(obj))   //81  立即执行
    console.log(foo.getX.applay(obj))  //81  立即执行


函数节流 throttle
    对会频繁触发的事件做一些限制，让其每隔一段时间，或满足什么条件才触发。如resize ontouchmove事件

    function throttle(func){
        var timer;
        return function(){
            var context = this;
            var args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function(){
                func.applay(context,args);    //setTimeout 运行环境是全局作用域，所以要绑定
            },1000);
        }
    }