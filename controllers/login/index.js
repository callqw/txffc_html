const modules = require('../../modules');
const login = async function (ctx, next) {
    if(ctx.request.body.user ==undefined){
        var obj = {
            title:'腾讯分分彩带单_技巧_资讯热点',
            description: '腾讯分分彩带单_技巧_资讯热点',
            author: '腾讯分分彩带单_技巧_资讯热点',
            keywords: '腾讯分分彩带单_腾讯分分彩技巧_腾讯分分彩资讯热点',

        }
        await ctx.render('login/index',obj)
    }else {
        var res = await modules.login.login((ctx.request.body))
        if(res.state ==200){
            ctx.session.username = '1';
            ctx.body = res
        }else {
            ctx.session.username = '2';
            ctx.body = res
        }

    }

}
module.exports= {
    login: login
}