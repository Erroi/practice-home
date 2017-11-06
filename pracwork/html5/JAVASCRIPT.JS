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
严格相等 === 不会进行类型转换，如果类型不同直接返回false
相等 == 会在比较时进行类型转换；
Object.is(+0,-0)  在三等的基础上加处理了 NaN、-0和+0、但 Object.is(NaN,NaN)会返回true


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
  pet.speak.call(dog,'Speak')   //将pet的speak方法赋给dog，同时给这个方法传入参数‘Speak’

  I2.applay  传入的参数是数组类型的
  I3.call applay 实现继承
  function dog(words){
  	pet.call(this,words)  //当前的this（指向dog）继承了pet的属性和方法 
  	pet.applay(this,arguments)
  }


H.观察者模式：这是一种创建松散耦合代码的技术。它定义对象间 一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。由主体和观察者组成，主体负责发布事件，同时观察者通过订阅这些事件来观察该主体。主体并不知道观察者的任何事情，观察者知道主体并能注册事件的回调函数


J.SPA单页面应用程序：其呈现的最初内容会加载必须的HTML和JS、css，而它的后继操作全部由js控制，是使用REST化的web服务执行的，这种服务对AJAX请求进行响应，并通过JSON提供数据。所有操作都在这一张页面上进行。