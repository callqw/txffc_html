const modules = require('../../modules');
const random = require('../../modules/randomNum');
const encrypt = require('../middleware/encrypt')
const login = async function (ctx, next) {
    var rdm = await random.randomNumMore()
    if(ctx.request.body.user ==undefined){
        var obj = {
            title:'腾讯分分彩带单_技巧_资讯热点',
            description: '腾讯分分彩带单_技巧_资讯热点',
            author: '腾讯分分彩带单_技巧_资讯热点',
            keywords: '腾讯分分彩带单_腾讯分分彩技巧_腾讯分分彩资讯热点',

        }
        await ctx.render('login/index',obj)
    }else {
        ctx.request.body.pass = encrypt.passEncrypt(ctx.request.body.pass)
        var res = await modules.login_index.login((ctx.request.body))
        if(res.state == 200){
            ctx.cookies.set('infi',res.skey,{
                domain:'localhost', // 写cookie所在的域名
                path:'/',// 写cookie所在的路径
                maxAge: 4*60*60*1000, // cookie有效时长
                expires:new Date('2219-01-22'),// cookie失效时间
                httpOnly:false, // 是否只用于http请求中获取
                overwrite:false // 是否允许重写
            })
            ctx.body = res
        }else {
            ctx.body = res
        }
    }

}
module.exports= {
    login: login
}