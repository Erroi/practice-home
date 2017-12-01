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
        'Content-Type':'application/x-www-form-urlencoded'
    },
    body:'firstName=Nikhil&favColor=blue&password=easytoguess'
}).then(function(res){
    if(res.ok){
        
    }else if(res.status == 401){

    }
},function(e){
    alert('Error submitting form!');
});

//请求需要跨域的资源  mode:'same-origin、no-cors、cors'

fetch(url,{
    mode:'same-origin',       //same-origin 同源，不允许跨域
    mode:'no-cors',          //该模式允许来自cdn的脚本，其他域的图片和其他一些跨域资源。  from资源
    mode:'cors',            //跨域请求，从第三方提供的api获取数据                     请求
    credentials:'omit(默认)、same-origin、include',  //credentials属性决定是否可以跨域访问cookie。
}).then()