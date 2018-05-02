//设计模式
//1 单体模式singleton
    //用来划分命名空间，避免全局变量的冲突，用作命名空间把自己的代码组织在一个全局变量下
    var functionGroup = {
        name:'Darra',
        init:function(){},
        methord:function(){}
    }

    var functionMygroup = function(){
        this.name = '';
        this.init = function(){},
        this.methord = function(){}
    }

//2 单例模式，保证每个类里都只有一个实例对象。（判断实例是否存在，如果不存在则创建新的实例返回，如果存在则直接返回该实例。
    class CreateUser{
        constructor(name){
            this.name = name;
            this.getName();
        }
        getName(){
            return this.name;
        }
    }
        //代理实现单例模式
        var ProxyMode = (function(){  //闭包里的单例模式
            var instance = null;
            return function(name){
                if(!instance){
                    instance = new CreateUser(name);
                }
                return instance;
            }
        })();
        //测试单体模式的实例
        var a = new ProxyMode('aaa');
        var b = new ProxyMode('bbb');
        console.log(a,b) //CreateUser { name: 'aaa' } CreateUser { name: 'aaa' }

//3 策略模式 对象和行为相分离，一部分是所有可能的策略对象，另一个是具体的执行环境
        //策略类
    var levelOBJ = {
            "A":function(money){
                return money * 4;
            },
            "B":function(money){
                return money * 3;
            },
            "C":function(money){
                return money * 2;
            }
    };
        //环境类
    var calculateBouns = function(level,money){
        return levelOBJ[level](money)
    }


//4 代理模式 为其他对象提供一种代理以控制对这个对象的访问。某个对象不适合被直接访问到，则可以通过代理对象作为客户端和目标对象之间的中介。
    //如 图片懒加载。在真正的图片还没下载时，先通过一张loading图来显示，然后等到具体的图片下载完成之后再修改img的src
    // //生成图片
    // var imgFunc = (function(){
    //     var imgNode = document.createElement('img');
    //     document.body.appendChild(imgNode);
    //     return {
    //         setSrc:function(src){
    //             imgNode.src = src;
    //         }
    //     }
    // })();
    //代理图片
    var proxyImage = (function(){
        var img = new Image();
        img.onload = function(){
            imgFunc.setSrc(this.src);
        }
        return {
            setSrc:function(src){
                imgFunc.setSrc('./loading.gif');
                img.src = src;
            }
        }
    });

//装饰者模式  动态的将职责附加到对象上，而且不会改变对象本身的行为。在被装饰着之前或者之后加上自己的行为以达到特定的目的
    Function.prototype.before = function(beforefn){
        var self = this;
        return function(){
            beforefn.apply(this,arguments);
            return self.apply(this,arguments);
        }
    };
    Function.prototype.after = function(afterfn){
        var self = this;
        return function(){
            var ret = self.apply(this,arguments);
            afterfn.apply(this,arguments);
            return ret;
        }
    };

    var func = function(){
        console.log('2');
    };
    //func1 func2 为挂载函数
    var func1 = function(){
        console.log('1');
    };
    var func3 = function(){
        console.log('3');
    };
    //调用装饰器
    func = func.before(func1).after(func3);
    func();  //1 2 3


var test = (function(){
    var value = 0;
    return function(){
        return value++;
    }
}());
for(var i=0;i<4;i++){
    console.log('---',test());
}
console.log(test());   // --- 0 ---1 --- 2  ---3 4

function testnew(){
    var data = [],i;
    for(i = 0;i<4;i++){
        data[i] = function(){
            console.log(i);
        }
    }
    return data[0];
}
testnew()();  //4

