A.继承与原型链篇
概念：原型链：js中的唯一一种结构（：对象）。每个对象都有一个指向他的原型prototype对象的内部链接。这个原型对象又有自己的原型，直到指向的这个对象的原型为null为止（不再有原型指向），而组成这个链条的最后一环。这一级一级的结构链就称之为 原型链（prototype chain）。
概念：原型链的继承：当试图访问一个对象的属性时，不仅会在该对象上搜索，还会搜索该对象的原型，如此一节一节往上查找，直到匹配到一个相同的属性名 或 到达原型链的末尾。

方法：检测对象的属性是否在自身上 还是原型链上 ：obj.hasOwnProperty('pro'):只涉及自身属性而不会遍历原型链。


B.严格模式篇 'use strict';
严格模式会讲js陷阱变成明显的错误；修正了一些引擎难以优化的错误，比非严格模式下更快；禁用了一些可能在未来版本中定义的语法。
不同点1.禁止删除声明式变量；2.禁止使用关键字；


C.闭包1：一个闭包就是一个函数和被创建的函数中的作用域对象的组合。（函数＋作用域对象）如exemple1

C.闭包2：是指那些能够访问独立变量的函数(就是说：父函数内定义一个子函数，子函数能够访问父函数内的变量；且子函数仅在父函数体内可用)  如exemple2
exemple1:
function sayHello(name){
	var text = 'hello' + name;
	var say = function(text){    
		console.log(text);   //它是一个使用在父函数中声明的变量的闭包
	}
	say();
}
sayHello('Joe');

exemple2:
function sayHello2(name){
	var text = 'hello' + name;
	var say = function(){console.log(text)};
	return say;
}
var say2 = sayHello2('Bob');
say2();       //say2变成了闭包，由say函数和text字符串组成。

C3.闭包的使用：共享相同的函数定义，但是保存了不同的环境。
function makeAdd(x){
	return function(y){
		return x + y;
	}
}
var add5 = makeAdd(5);
var add10 = makeAdd(10);

add5(2);  //7
add10(2);  //12



D.内存泄漏：闭包易导致内容泄漏
	垃圾回收机制：对象在被创建的时候分配内存，当指向这个对象的引用计数为0的时候，浏览器会回收内存。
	如循环引用会发生内存泄漏。
解决闭包引起的内存泄漏：添加另外一个闭包：
function addHandle(){
	var clickHandle = function(){
		this.style.backgroundColor = 'red';
	};
	(function(){
		var el = document.getElementById('el');
		el.onclick = clickHandle;
	})();
}

E.相等性判断
严格相等 === 不会进行类型转换，如果类型不同直接返回false    +0 === -0 //true   
													NaN === NaN  //false
相等 == 会在比较时进行类型转换；
Object.is(+0,-0)  在三等的基础上加处理了 NaN、-0和+0、但 Object.is(NaN,NaN)  //true
													Object.is(+0,-0)   //fasle
Object.assign({},obj1,obj2,obj3)  合并对象，是对象;只拷贝源对象的自身属性（no 继承属性、不可枚举属性）；且拷贝的是个值（若是函数，则拷贝函数返回值，若是数组，则将数组转为对象）
Object.keys(obj) 返回一个数组，遍历的是obj的自身可遍历的属性（不含继承的）键名。
Object.values(obj) 同上，返回数组
Object.entries(obj)  同上，返回数组 //[['foo','bar'],['baz','42'],[]]


F.命名空间：namespace，为避免命名冲突，命名覆盖等问题。
//1创建简单 对象字面量 来打包所有相关函数和变量，实现命名空间作用。
var MYNAMESPACE = {
	person:function(name){
		this.name = name;
		this.getName = function(){
			return this.name
		}
	}
}
var p = new MYNAMESPACE.person('ifcode');
p.getName();   //ifcode

//2.若命名空间中已有同名对象，则不覆盖该对象，否则创建一个新的命名空间
var MYNAMESPACE = MYNAMESPACE || {};
MYNAMESPACE.person = function(name){
	this.name = name;
}
MYNAMESPACE.person.prototype.getName = function(){
	return this.name;
}
var p = new MYNAMESPACE.person('ifcode');
p.getName();  //ifcode



G.变量提升：顾名思义变量提升就是，是把下面的东西提到上面，变量在声明之前使用，值为undefined。在函数域里定义一个和外部变量一样名称的变量时，变量的声明会提升至第一句，赋值则不会变。
var v = 'jblits';
function a (){
	console.log(v); 
	var v='abcd';
}
=>  function a (){var v;console.log(v);v='abcd'}   //undefined

H.函数提升：在写JS代码的时候，有两种写法，一种是函数表达式，另外一种是函数声明方式。我们需要重点注意的是，只有函数声明形式才能被提升。
console.log(typeof foo);   //foo
console.log(typeof bar);   //undefined
console.log(typeof add);   //undefined
//函数的声明
function foo(){
 alert('foo');
}
//命名函数表达式
var bar = function(){
 alert('bar');
};
// 函数表达式-匿名函数
var add = function(a,b){
return a+b;
};

I.上下文：在js中this通常指向其拥有者，this只能在函数内部使用：
  1、对象内的函数里this指向此对象 
  var pet = {
  	words:'...',
  	speak:function(){console.log(this)}
  }
  2、直接函数的调用 this指向的是全局对象windows或global  
   function pet(words){
   	console.log(this === global) //true
   }
   pet('lslsl')
  3、构建函数中的this指向的是新构建好的对象
   function Pet(words){
   	words:words,
   	speak:function(){console.log(this)}
   }
   var cat = new Pet('miao')   //this === cat对象

  I1.call  改变this的指针对象
  var dog = {
  	words:'...'
  }
  pet.speak.call(dog,'Speak')   //将pet的speak方法赋给dog，同时给这个方法传入参数‘Speak’  方法1
  pet.speak.apply(dog,['Speak']);  //方法2
  pet.speak.bind(dog,'Speak')();    //方法3

  I2.applay  传入的参数是数组类型的
  I3.call applay 实现继承
  function dog(words){
  	pet.call(this,words)  //当前的this（指向dog）继承了pet的属性和方法 
  	pet.applay(this,arguments)
  }


H.观察者模式：这是一种创建松散耦合代码的技术。它定义对象间 一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。由主体和观察者组成，主体负责发布事件，同时观察者通过订阅这些事件来观察该主体。主体并不知道观察者的任何事情，观察者知道主体并能注册事件的回调函数


J.SPA单页面应用程序：其呈现的最初内容会加载必须的HTML和JS、css，而它的后继操作全部由js控制，是使用REST化的web服务执行的，这种服务对AJAX请求进行响应，并通过JSON提供数据。所有操作都在这一张页面上进行。

补充--抽象概念：执行上下文execution Context 栈级，其中的1变量、函数声明、函数参数。
函数声明为什么会被前置：1.变量初始化阶段，函数VO按照如下顺序填充：
										  1.函数参数（若为传入，初始化该参数为undefined）；
										  2.函数声明（若发生与1命名冲突，会覆盖）
										  3.变量声明（初始化变量值为undefined，若与1 2 发生命名冲突，会忽略）
										  例：function foo(x,y,z){
											  function x(){};
											  alert(x);
										  };  foo(200)  //function(){}
										  例：function foo(x,y,z) {
											  function func(){}; //函数声明
											  var func;  //变量声明 会忽略
											  console.log(func);
										  }; foo(100); // function(){}
										  例：function foo(x,y,z) {
											function func(){}; //函数声明
											var func = 1;  //变量声明 会忽略
											console.log(func);
										}; foo(100); // 1   第二回合 赋值
										所以，函数表达式(var e = function _e(){})不会影响VO，
					2.代码执行阶段：函数声明 function x(){} 会被提前处理


K. OOP 面向对象编程：对象指类的实例，它将对象作为程序的基本单元，将程序和数据封装其中，以提高重用性、灵活性、拓展性。有继承、封装、多态、抽象的特点。
	1 当我们用函数声明创建一个函数时，都会有一个预设的prototype属性，且这个属性是个对象{}，这个对象默认有constructor属性。   .prototype 是abc的属性，不是原型_proto_
			function abc(){};   abc.prototype //abc {}   
								typeof abc.prototype  //object
	2 基于原型的继承
			function Foo(){              //Foo.prototype = {
				this.y = 2;					//constructor:Foo,
											//_proto_:Object.prototype,  所有的函数的原型最终都指向Object的prototype，Object自身拥有toString()...方法，而oject的原型指向null(Object.prototype.__proto__ = null)
			};								//x:1}
			typeof Foo.prototype //Object {}
			Foo.prototype.x = 1;                    
			var obj3 = new Foo();
			obj3.y;  //2  this指向obj3
			obj3.x;  //1	x是Foo的原型proto上的
	3 一个实例继承自另一个实例
			function Person(name,age){
				this.name = name;
				this.age = age;
			}
			Person.prototype.MAx_NUM = 2;
			Person.prototype.MAX_age = 2;
			Person.prototype.walk = function(){
				return this.name + 'is walk';
			};

			function Students(name,age,className){
				Person.call(this,name,age);   //继承了实例属性
				this.className = className;
			};																	
			Students.prototype = Object.create(Person.prototype);   //继承原型属性和方法，同时 用Object.create创建一个新的对象，防止Students和Person指向同一个，以便Students可以设定自己私有的原型方法
			Students.prototype.constructor = Students;				//Students.prototype={constructor:  ,_proto_:Person.prototype,...}
			Students.prototype.walk = function(){					//这里会覆盖Person上的walk方法。
				console.log(this.name + 'is walk' + this.className)
			}
			Students.prototype.leanning = function(subject){
				console.log(this.name + 'is leaning' + subject + 'at this' + this.className)
			}

	4.判断一个属性或方法是否属于对象自身还是原型链上的
			'name' in Students; true  //会一直向上查找
			Students.hasOwnPrototype('walk') //false 自身没有这个属性
	5. object instanceof function;左边要求是一个，右边要求是函数或构造器(必须有prototype属性)；instanceof会判断右边构造器prototype属性是否会出现在左边对象的原型连上。
			[2,3] instanceof Array; true  //[2,3].prototype._proto_ = Object;  Object的原型链上有Array
			new Object() instanceof Array; false  //new Object().prototype._proto_ = null
			'2349d' instanceof Array; false   //String 基本类型 是没有prototype属性的。
	6. 创建对象和原型链方法：
			0.使用普通方法：
				a = ['uo','yhss'];  // a ---> Array.prototype --> Object.prototypr ---> null
			A.使用构造器方法（new)；
			B.Object.create(a);    //b ----> a ---->Object.prototype ---> null
			c.使用class 关键字；


O.RegExp 正则
			1.分组
			（X）分组，并记录匹配到的字符串  /(abc)/
			 \n 表示使用分组符(x)匹配到的字符串  /(abc)\1/.test('abcabc')    //  这里的\1指的是 记录的前面匹配到的abc
			忽略分组 (?:)
			 (?:X)   /(?:abc)(def)\1/.test('abcdefdef');			//这里的\1 指的是 记录了的分组 def
							 /(abc)(def)\1\2/.test('abcdefabcdef');			// 这里的\1 匹配的是记录了的分组abc  \2 匹配的是记录了的分组def
			反向引用
				例：'2016-04-28'.replace(/(\d{4})-(\d{2})-(\d{2})/g,'$1')	// '2016'
				例：'2016-04-28'.replace(/(\d{4})-(\d{2})-(\d{2})/g,'$2/$3/$1')	// '04/28/2016'

			外延：
				'a2*3'.replace(/\w(?=\d)/g, 'X') // X2*3
				'a3*34v8'.replace(/\w(?=\d)/g,'X') // X3*X4X8
				'a3*34vv'.replace(/\w(?=\d)/g,'X') // X3*X4vv
				'a3*34vv'.replace(/\w(!=\d)/g,'X') // aX*3XXX
			2.贪婪算法 * +
			X*  0次或多次
			X+	1次或多次
			X?  0次或1次
			3.非贪婪算法
			X*?  0次  取最少的
			X+?  1次	 取最少的
			4.flag
			global    g
			ignoreCase  i
			multiline   m 换行匹配


			test.replace(/\d/g,'[$&]');  // "abc[3][4][5]efgabcab"
			// 若是有分组则按照$1, $2, $3的形式进行引用，而 $& 则表示的是整个正则表达式匹配的内容。

p.对象Object属性：Object.getOwnPropertyDescriptor(Object,'prototype');  返回Object的prototype属性。
创建属性的一种方式：Object.defineProperty(cat,'price',{enumerable:false,value:1000}) cat的不可枚举属性price，值为1000
对象属性的set 、 get方法：
var man={
	name:'bonn',
	weibo:'beibo',
	get age(){
		return new Date().getFullYear() - 1988;
	},
	set age(val){
		console.log(this.name + val)     //可以取到自身属性的实时值
	}
}
console.log(man.age)   //28   自动访问get age函数
man.age = 100;  对age赋值的时候，自动调用set age方法；

对象创建属性 defineProperty:
	var person = {};
	Object.defineProperty(person,'name',{
		configurable:true,   //属性标签是否可以被修改、是否可以被delete，true可以
		writable:false,     //此属性禁止修改
		enumerable:true,    //此属性可以被遍历  true可以；如果是false Object.keys(person);  //是没有name属性的
		value:'Bobe'
	});
	person.name;    //Bobe
	person.name = 1;
	person.name;  //Bobe
	delete person.name  // false

	查看name属性性质
	Object.getOwnPropertyDescriptor(person,'name');   //object{value:'Bobe',configurable:true,writeble:true,enumerable:false }
	冻结属性：
	Object.freeze(person);    将writeable变为false，不能重写属性；  Object.isFrozen(person)  //true 
	Object.getOwnPropertyDescriptor(person,'name');   //object{value:'Bobe',writeble:false,configurable:true,enumerale:false }
	
			