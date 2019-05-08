class篇
function Point(x,y){
	this.x = x;
	this.y = y;
}

Point.prototype.toString = function(){
	return '(' + this.x + ',' + this.y + ')';
}

var p = new Point(2,4);

//类似  class类相当于构建了一个构造函数
class Bar {
	doStuff(){
		console.log('stuff');
	}

	constructor(props) {
		super(props);     //super作为一个关键字，指向原型对象时  可直接调用 super.XXX  
		//....
	}
}

var b = new Bar();
b.doStuff()  //stuff    
b.constructor === Bar.prototype.constructor(直接指向类的本身Bar)  //这些类的方法都定义在prototype上面

//由于类的方法都定义在prototype上，可以通过Object.assign()向原型链上添加方法
Object.assign(Point.prototype,{
	toString(){},
	toLower(){}
})

// 类的内部所有定义的方法都是不可枚举的
Object.keys(Point.prototype) // []
Object.getOwnPropertyNames(Point.prototype) // ['constructor','toString']

//constructor(){}
constructor()方法是类的默认方法，1.new生成的实力对象的同时就自动调用constructor方法
							2.其默认返回的是实力对象本身（this），而不是原型对象的属性

class Self {

	constructor(x,y){
		this.x = x;    //this默认指向 类的实例，若单独提出来则指向当前运行环境，采取绑定或尖头函数
		this.y = y;
	}

	toString(){
		return '('+this.x + ',' + this.y + ')';
	}
}

var self1 = new Self(2,3);
self1.toString();  //(2,3)
self1.hasOwnProperty('x') //true  判断x是否为self1实力对象的自身属性
self1.hasOwnProperty('y')  //true
self1.hasOwnProperty('toString')  //false
self1.__proto__.hasOwnProperty('toString')  //true  toString方法属于其原型链上的方法
obj instanceof Self   //判断obj是否为self对象的实例


class 的继承 extends 
1.ES6中通过extends实现class类的继承，class ColorPoint extends Point{}
2.constructor()方法中的super()解析：在ES6的继承机制是，子类没有自己的this对象，而是继承父类的this，所以需要先跳用super()方法返回父类实例，才可以使用 this 关键字，用子类的构造函数修改this,但这个this指向的是子类B，相当于 A.prototype.constructor.call(this)。

	
父类的静态方法可以被子类继承，但不会被实例继承
//父类
class Foo{
	static classMethod(){
		return 'hello';
		this.propMethod();  //this指向的是类Foo，而不是实例
	}
	propMethod(){
		console.log('hello')
	}
}

Foo.classMethod() //'hello' ,静态方法可以直接在Foo类上调用；其他的方法是定义在原型上不能直接调用
Foo.propMethod() //typeError
//实例函数  不能继承静态方法
var foo = new Foo();
foo.classMethod()  //typeError 静态方法不能被实例继承
foo.propMethod();  //hello
//子类  可以调用父类的静态方法
class Bar extends Foo{
	static classMethod(){
		return super.classMethod() + ',too'
	}
}
Ber.classMethod() //hello,too



class ColorSelf extends Self {
	constructor(x,y,color) {
		this.color = color; //ReferenceError
		super(x,y);       //super()代表父类A的构造函数，但返回的是子类B的实例，this指向B
		this.color = color;  //正确
		
	}

	toString(){
		super.toString()    //调用父类的toString()方法  , 只能取到父类原型对象上的方法，而实例对象上的属性取不到。
	}  
} 


类的 prototype 属性和 __proto__ 属性:
1.子类的__proto__属性，表示构造函数的继承，指向父类；
2.子类的prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype
class A{}
class B extends A{}
B.__proto__ === A   //true
B.prototype.__proto__ === A.prototype  //true

判断一个类是否继承了另一个类
Object.getPrototypeOf(ColorSelf) === Self;   //true

箭头函数：()=>{}
特点1  不会创建this，不需要绑定this，它使用的是上一级执行上下文的this。
	2  this是词法上的绑定，严格模式中与this相关的规则都将被忽略。
	3 通过call() apply()调用一个函数时，只是传入参数而已，与this没有影响。
	4 不绑定Arguments对象，所以arguments[0]无用，可以使用rest表达式来代替arguments对象。
		var f = (...args)=> args[0];
	5 不能使用new操作符，不可以当做构造函数，
	6 没有prototype属性。

	function foo() {
		setTimeout(() => {
		  console.log('id:', this.id);
		}, 100);
	  }
	  
	  var id = 21;
	  
	  foo.call({ id: 42 });
	  // id: 42   如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以输出的是42


字符串方法
'hello'.includes('he')  //true
'hello'.startsWith('he') //true  
'hello'.startsWith('he',2)
'hello'.includes('he',2)  //从第2位开始到结束位置
'hello'.endsWith('he') //false   可传第二个参数，
'hello'.endsWith('he',2) //表示前两个字符，是否以he结尾


//浅拷贝一个对象到另一个对象，
1 Object.assign({},obj);   //浅拷贝 原对象的所有信息，除了 getter、setter
2 Object.getOwnPropertyDescriptors(car,'prop');  //返回给定对象的说有属性的详细信息。 可用于 浅拷贝原始对象包括getter、setter
	  var car = {
		  name:'BMA',
		  price:1000,
		  set discount(x){
			  this.d = x;
		  },
		  get discount(){
			  return this.d;
		  }
	  }
	  const ElectricCar2 = Object.defineProperties({},Object.getOwnPropertyDescriptors(Car));  //拷贝Car到electricCar2
	  console.log(Object.getOwnPropertyDescriptors(ElectricCar2,'discount'));



/**
 * 一、Decorator 修饰器
 *  */ 
// 用来修改类的行为
// mixins.js
export function mixins(...list) {
	return function (target) {
		Object.assign(target.prototype, ...list)
	}
}
// main.js
import { mixins } from './mixins'

const Foo = {
foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // 'foo'

// 用Object.assign 模拟
const Foo = {
foo() { console.log('foo') }
};

class MyClass {}

Object.assign(MyClass.prototype, Foo);

let obj = new MyClass();
obj.foo() // 'foo'



/**
 * 最新提案
 */
// 1. do表达式： 返回内部最后执行的表达式的值
let x = do {
	let t = f();
	t * t + 1;
  };

return (
<nav>
	<Home />
	{
	do {
		if (loggedIn) {
		<LogoutButton />
		} else {
		<LoginButton />
		}
	}
	}
</nav>
)

// 2. throw 可用于表达式了,之前只能用于命令
console.log(throw new Error());
this._id = value || throw new Error("Invalid value");

// 3. 链判断运算符
const firstName = message?.body?.user?.firstName || 'default';
a?.b
// 等同于
a == null ? undefined : a.b

a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()

// 4. 函数的部分执行：?是单个参数的占位符，...是多个参数的占位符
let obj = {
f(x, y) { return x + y; },
};

const g = obj.f(?, 3);
g(1) // 4

// 5. 管道运算符
// 传统的写法
exclaim(capitalize(doubleSay('hello')))
// "Hello, hello!"

// 管道的写法
'hello'
  |> doubleSay
  |> capitalize
  |> exclaim
// "Hello, hello!"

// 6.BigInt数据类型：大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity；BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。
const a = 2172141653n;
const b = 15346349309n;

// BigInt 可以保持精度
a * b // 33334444555566667777n

// 普通整数无法保持精度
Number(a) * Number(b) // 33334444555566670000

// 6. BigInt对象
BigInt(123) // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n
// BigInt()构造函数必须有参数，而且参数必须可以正常转为数值，下面的用法都会报错。
BigInt('123n') // SyntaxError
BigInt('abc') // SyntaxError

/**
 * module加载规则
 */
// 默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到<script>标签就会停下来，等到执行完脚本，再继续向下渲染。
// 异步加载：给script加defer和async属性；渲染引擎遇到这步就会开始下载，同时页面继续渲染；defer是等到页面正常渲染完后执行。async一旦下载完脚本，浏览器就会中断渲染，立即执行此脚本
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
// ES6 将script的type属性设置为module，所以浏览器知道了这是es6模块；便执行异步加载，页面渲染完在执行，不会造成浏览器拥堵。
<script type="module" src="./foo.js" async></script>
// 对于ES6模块，有几点默认：
// 1. 代码在模块作用域之中运行，而不是在全局作用域运行，模块内的变量，外部不可见。
// 2. 脚本自动采用严格模式， 不管有没有声明use strict。
// 3. 模块中顶层的this返回undefined，而不是指向window
// ES6模块与commonJS模块的差异
// 1. commonJS模块输出的是一个值得拷贝，不会被后面修改，ES6模块输出的是值得引用，可被重新赋值。
// 2. commonJS模块是运行时加载，ES6模块是编译时输出接口。因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

/**
 * async
 */
// async的实现原理：就是将 Generator函数和自动执行器，包装在一个函数里
async function myFunction() {
	try {
	  await somethingThatReturnsAPromise();
	} catch (err) {
	  console.log(err);
	}
  }
// 优点：1 内置执行器。2 更好的语义。3.返回Promise。
// 注意点：1. await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
// 2.多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
let foo = await getFoo();
let bar = await getBar();
// 改写成
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;


/**
 *  iterator  for...of
 */
// 字符串是一个类数组的对象，也原生具有iterator接口。
var someString = "hi";
typeof someString[Symbol.iterator]
// "function"

var iterator = someString[Symbol.iterator]();

iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }
// 一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。
// 也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法
// 对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。但是，这样情况下，for...in循环依然可以用来遍历键名
let es6 = {
	edition: 6,
	committee: "TC39",
	standard: "ECMA-262"
  };
  
  for (let e in es6) {
	console.log(e);
  }
  // edition
  // committee
  // standard
  
  for (let e of es6) {
	console.log(e);
  }
  // TypeError: es6[Symbol.iterator] is not a function
//  for...in循环的缺点：1.数组的键名是数字；2.会遍历原型链上的属性；3.默认情况下，会以任意顺序遍历键名。（适合遍历数组）
// for...of 没有以上缺点，1.不同于forEach，可以与break、continue、return配合使用。（数组内置的forEach不能使用return、break等跳出循环）
// 只能遍历具有iterator接口的类数组和数组
for(var i of es6){
	if(i > 3){
		break;
		console.log(i)
	}
}


/**
 * proxy 在目标对象之前架一层‘拦截’，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
 */
let proto = new Proxy({}, {
	get(target, propertyKey, receiver) {
		console.log('GET' + propertyKey);
		return target[propertyKey]
	}
});
let obj = Object.create(proto);
obj.foo // 'GET foo'

// 另一种
Object.defineProperties(target,{
	name: {
		get(){
			return name;
		},
		set(){
			console.log('warning')
		}
	}
})


/**
 * 扩展运算符
 * 由apply实现
 */
// ES5 的写法
function f(x, y, z) {
	// ...
  }
  var args = [0, 1, 2];
  f.apply(null, args);
  
  // ES6的写法
  function f(x, y, z) {
	// ...
  }
  let args = [0, 1, 2];
  f(...args);


  /**
   * Array.from(类数组对象) 转化为真正的数组
   * 由[].slice.call(obj)实现
   */
  Array.from({ length: 3 });
// [ undefined, undefined, undefined ]
Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]

/**
 * Array.of() 将一组值转化为数组
 */
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]


/**
 * 解构赋值
 * foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。
 */

let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'