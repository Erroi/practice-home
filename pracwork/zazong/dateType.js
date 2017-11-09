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

//对于对基本类型，
var a = "Andrew",
b = a;

b = "Robbins";

a === b; // false