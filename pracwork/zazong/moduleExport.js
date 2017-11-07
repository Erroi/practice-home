/**
 * Created by a1501 on 2017/9/12.
 */
//Node 用 js 函数式编程的特性，实现模块的隔离。
var module = {
    id:'hello',
    exports:{}
};
var load = function (module) {
    function greet(name) {
        console.log('hello' + name + '!');
    }
    module.exports = greet;

    return module.exports;
};

var exported = load(module);
save(module,exported);


//Node 的加载机制：
/*
* Node 会把整个待加载的hello.js文件放入一个包装函数load中执行，在这之前准备好了module变量
* load()函数最终返回的是 module.exports;
* */

//module.exports  和 exports 区别
/*
* 1.默认情况下，Node准备的exports变量和module.exports变量实际是同一个变量，并初始化为空对象{}
* 2.当要输出一个函数、数组时，只能用module.exports
* */
 exports.foo = XXXX
 module.exports.foo = XXXX
 module.exports = {        //但不能直接对exports赋值 exports = XXX ;
    hello:hello,
     greet:greet
    };

 /*
 * 结论：使用 module.exports = XXX 的方式输出模块变量
 * */