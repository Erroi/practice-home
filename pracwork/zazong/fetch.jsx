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

//请求需要跨域的资源  mode:'same-origin、no-cors、cors'

fetch(url,{
    mode:'same-origin',       //same-origin 同源，不允许跨域
    mode:'no-cors',          //该模式允许来自cdn的脚本，其他域的图片和其他一些跨域资源。  from资源
    mode:'cors',            //跨域请求，从第三方提供的api获取数据                     请求
    credentials:'omit(默认)、same-origin、include',  //credentials属性决定是否可以跨域访问cookie。
}).then();

//!特记
//1 当fetch()返回的promise，当status为400，500时不会标记为reject，而仍然标为resolve，但resolve的OK属性标为false、200是true；只有当网络请求阻止或故障才被标为reject
//2 fetch()默认不会从服务器接受和发送cookie，否则必须设置credentials