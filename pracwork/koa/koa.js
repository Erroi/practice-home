const Koa = require('koa');
const app = new Koa();

app.use(async (ctx,next)=>{
    console.log(`${ctx.request.method} - ${ctx.request.url}`);
    await next();
});

app.use(async (ctx,next)=>{
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`Time:${ms}ms`);
});

app.use(async (ctx,next)=>{
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello,koa2!</h1>';
});


app.listen(3000);
console.log('app start at port 3000...')

//参数ctx是由koa传入的封装了request 和 response的变量，next是koa传入的将要处理的下一个异步函数