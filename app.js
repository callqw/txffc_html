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
const logger    = require('koa-logger');
app.use(logger());
const __static  = require('koa-static');
const session = require('koa-session');
app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 100000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));
// parse request body:
app.use(bodyParser());

app.use((ctx, next )=> {
    const start = Date.now();
    return next().then(() => {
        const ms = Date.now() - start;
        if (ctx.response.status == 200 ||ctx.response.status == 302){
              return;
        }else {
            ctx.redirect('/index.html');
        }
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
})

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