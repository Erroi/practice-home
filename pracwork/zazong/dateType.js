//奇葩  看他们的解释
//两个对象的值是否相同，取决于它们是否指向相同的底层
var a = {name: "andrew"},
b = {name: "andrew"};

a === b; // false

//对于引用类型，设置b=a，并没有创建新对象，而是创建了一个对其他对象的引用；只是将变量b指向a，当改变b的name属性时，同样改变了a的name属性
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
typeof null; //object;
typeof undefined;  //'undefined'
typeof new String(s);  //'object'

//js值分为两种类型：基本类型和对象类型
//基本类型：String Number Boolen,Symbol,undefined,null
//对象类型：Function Object Array
