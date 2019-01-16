/**
 * Created by Administrator on 2018/10/19.
 */
const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const debug = require('debug')('koa-weapp-demo')
const config = require('./config')
const router = require('./router')
const Router = require('koa-router')()
const render = require('koa-ejs');
const path = require('path');
const app = new Koa();
const session = require('koa-session');
const logger    = require('koa-logger');
app.use(logger());
const __static  = require('koa-static');


// parse request body:
app.use(bodyParser());

app.use((ctx, next )=> {
    const start = Date.now();
    return next().then(() => {
        const ms = Date.now() - start;
        if (ctx.response.status != 200){
                ctx.redirect('/index.html');
        }
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
})
app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));
render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'default',
    viewExt: 'html',
    cache: false,
    debug: false
});
app.use(__static(__dirname + '/assets'));
app.use(router.routes())
    .use(router.allowedMethods())
    .listen(config.port, ()=>{
        debug(`listening on port ${config.port}`),console.log(`listening on port ${config.port}`)
})