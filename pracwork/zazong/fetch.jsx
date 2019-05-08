import fetch from 'isomorphic-fetch';

//fetch()方法，接收一个URL参数，返回一个Promise对象；
fetch(URL).then(function(res){
    if(res.ok){
        res.json().then(function(data){})
    }
},function(e){
    throw Error('fetch failed',e)
});

//POST请求
fetch(url,{
    method:'POST',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'      //会自动设置Content-type
    },
    body:'firstName=Nikhil&favColor=blue&password=easytoguess'  //JSON.stringify({})   new FormData(document.getElementById('input[type='file']'))
}).then(function(res){
    if(res.ok){
        res.blob().then((myBlob)=>{
            src = URL.createObjectURL(myBlob)
            //blob()
            //arrayBuffer()
            //json()
            //text()
            //formData()
        })
    }else if(res.status == 401){

    }
},function(e){
    alert('Error submitting form!');
});

// XHR2是支持跨域请求的，只不过要满足浏览器端支持CORS，服务器通过Access-Control-Allow-Origin来允许指定的源进行跨域
//请求需要跨域的资源  mode:'same-origin、no-cors、cors'

fetch(url,{
    // 设置可跨域
    mode:'same-origin',       //same-origin 同源，不允许跨域
    mode:'no-cors',          //该模式允许来自cdn的脚本，其他域的图片和其他一些跨域资源。  from资源
    mode:'cors',            //跨域请求，从第三方提供的api获取数据                     请求
    // fetch 默认不携带cookie，需要设置credentials，与XHR2的withCredentials类似；omit忽略cookie的发送；same-origin只有同域发送，跨域不携带；include同域跨域都可发送cookie
    credentials:'omit(默认)、same-origin、include',  //credentials属性决定是否可以跨域访问cookie。
}).then();

//!特记
//1 当fetch()返回的promise，当status为400，500时不会标记为reject，而仍然标为resolve，但resolve的OK属性标为false、200是true；只有当网络请求阻止或故障才被标为reject
//2 fetch()默认不会从服务器接受和发送cookie，否则必须设置credentials


// 原理
// Fetch 是基于 XMLHTTPRequest对象实现数据请求的，同时也是基于Promise链式调用的。
function ajax(url, suc, fail) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 ) {
            if(xhr.status === 200) {
                suc(xhr.response)
            }else{
                fail(xhr.response)
            }
        }
    }
    xhr.send(null)
}

function fetch(url){
    return new Promise(function(resolve,reject){
        ajax(url, function(res){
            resolve(res)
        },function(res){
            reject(res)
        })
    })
}



function Promise(fn){
    var value = null;
    var callbacks = [];

    var state = 'pending';      // 4.加入状态是解决：如果promise异步操作已经成功，那在之前注册的回调会执行，但之后调用then注册的回调再不会执行。

    this.then = function(onFulfilled){
        if (state == 'pending'){    //4.

            callbacks.push(onFulfilled)  // 1. 将异步操作成功时执行的回调放入callbacks队列里，注册函数；
            return this;
        }
        onFulfilled(value)      // 4.resolve执行时，会将状态设为fulfilled，在此之后调用then添加的新回调，都会立即执行。
        return this;    // 3.想让then能够链式调用，then().then()
    }

    function resolve(newValue){        // 2. resolve是将 callbacks队列中的回调一一执行；
        value = newValue;
        state = 'fulfilled';        // 4.   

        setTimeout(function(){     // 3.setTimeout 将resolve中执行回调的逻辑放到js队列末尾，以保证在执行resolve时，then()内的回调注册完。
            callbacks.forEach(function(callback){
                callback(value);
            })
        },0)
    }

    fn(resolve);
}
/**
 * promise里面的then函数仅仅是注册了后续需要执行的代码，真正执行的是在resolve里面，
 * promise的整个实现过程使用了设计模式中的观察者模式：
 * 1、通过Promise.prototype.then和Promise.prototype.catch方法将观察者方法注册到被观察者Promise对象中，
 * 同时返回新的promise，以便链式调用。
 * 2、被观察者通过管理内部pending、fulfilld和reject的状态改变，同时通过构造函数中传递的resolve和reject方法以主动触发状态转变通知观察者。
 * 
Promise的构造函数是同步执行的。then 是异步执行的。
 */

//  .all() 返回的是一个promise，且resolve的参数是一个数组
Promise.all = function(promises){
    return new Promise((resolve, reject) => {
        let index = 0;
        let result = [];
        if (promises.length == 0){
            resolve(result);
        }else {
            setTimeout(function(){
                for(let i = 0; i < promises.length; i++){
                    Promise.resolve(promises[i]).then((data) => {
                        result[i] == data;
                        if(++index === promises.length) {
                            resolve(result)
                        }
                    }, (err) => {
                        reject(err);
                        return;
                    })
                }
            })
        }

    })
}

// finally 不管成功还是失败，都会继续执行，并且可以执行then
Promise.finally = function(callback){
    return 
}