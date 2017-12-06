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
obj.instanceof(Self)   //判断obj是否为self对象的实例


class 的继承 extends 
1.ES6中通过extends实现class类的继承，class ColorPoint extends Point{}
2.constructor()方法中的super()解析：在ES6的继承机制是先创建父类的实力对象this，所以需要先跳用super()方法返回父类实例，才可以使用 this 关键字。
class ColorSelf extends Self {
	constructor(x,y,color) {
		this.color = color; //ReferenceError
		super(x,y);       //super()代表父类A的构造函数，但返回的是子类B的实例，this指向B
		this.color = color;  //正确
		
	}
} 


类的 prototype 属性和 __proto__ 属性:
1.子类的__proto__属性，表示构造函数的继承，指向父类；
2.子类的prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype
class A{}
class B extends A{}
B.__proto__ === A   //true
B.prototype.__proto__ === A.prototype  //true

箭头函数：()=>{}
特点1  不会创建this，不需要绑定this，它使用的是上一级执行上下文的this。
	2  this是词法上的绑定，严格模式中与this相关的规则都将被忽略。
	3 通过call() apply()调用一个函数时，只是传入参数而已，与this没有影响。
	4 不绑定Arguments对象，所以arguments[0]无用，可以使用rest表达式来代替arguments对象。
		var f = (...args)=> args[0];
	5 不能使用new操作符
	6 没有prototype属性。



字符串方法
'hello'.includes('he')  //true
'hello'.startsWith('he') //true  
'hello'.startsWith('he',2)
'hello'.includes('he',2)  //从第2位开始到结束位置
'hello'.endsWith('he') //false   可传第二个参数，
'hello'.endsWith('he',2) //表示前两个字符，是否以he结尾