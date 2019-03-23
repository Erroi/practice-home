let gen = function* (n){
    for(var i = 0;i<3;i++){
        --n;

        yield n;
    }
};

var genObj =gen(5);
console.log(genObj.next());  //next();生成对象{value   done}    {value: 4, done: false }
console.log(genObj.next());   //{value: 4, done: false }
console.log(genObj.next());     //{ value: 3, done: false }
console.log(genObj.next());     // {value: 2, done: false }
console.log(genObj.next());     //  {value: undefined, done: true }


let gen2 = async function(n){
    for(var i = 0;i<3;i++){
        --n;

        await n;
    }
};

gen2(5);


Promise

//实现逻辑
function Promise(fn){
    var value = null;
    var callbacks = [];
    let state = 'pending';                  //5 加入状态

    this.then = function(onFulfilled){     //1 注册回调函数
        if(state = 'pending'){
            callbacks.push(onFulfilled);
            return this;            //3 链式调用
        }
        onFulfilled(value);
        return this;
    };

    function resolve(value){                //2 ，执行resolve的时候，才会真正把值传给下一个回调执行
        state = 'fulfilled';
        setTimeout(function(){                 //4 保证在resolve前已经注册完 所有的函数
            callbacks.forEach(function(callback){
                callback(value);
            })
        },0)
    };

    fn(resolve);
}
//1 promise 里面的then函数仅仅是注册了后续需要执行的代码，真正执行的是在 resolve方法里面执行
//2 实现过程，是设计模式中的 观察者模式：
    //通过 Promise.prototype.then 和 Promise.prototype.catch() 方法将方法 注册到被观察者的Promise对象上，同时返回一个新的Promise对象，以便可以链式调用
    //被观察者 管理内部pending、fulfilled、rejected的状态转变，同时通过构造函数中传递的resolve和reject方法以主动触发状态转变和通知观察者。