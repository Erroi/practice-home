const Koa = require('koa');

//返回的router是函数,引入的同时调用。
const router = require('koa-router')();        

const app = new Koa();

app.use(async (ctx,next)=>{
    console.log(`Process ${ctx.request.method} - ${ctx.request.url}...`);
    await next();
});

//通过router.get('/path',async fn)  注册一个get请求
router.get('/hello/:name',async (ctx,next)=>{
    var name = ctx.params.name;                   //ctx.params.name访问变量name
    ctx.response.body = `<h1>hello,${name}!</h1>`
});

router.get('/',async (ctx,next)=>{
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
});

//POST请求：router.post('/path',async fn)  发送一个表单或JSON作为request的body发送，需要引入middleware--koa-bodyparser解析request.body
const bodyparser = require('koa-bodyparser');

router.post('/signin',async (ctx,next)=>{
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`singin with name:${name},password:${password}`);
    if(name == 'koa' && password === '12345'){
        ctx.response.body = `<h1>welcome,${name}!</h1>`;
    }else{
        ctx.response.body = `<h1>Login failed!</h1>
            <p><a href="/">Try again</a></p>`;
    }
})

app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000.....');