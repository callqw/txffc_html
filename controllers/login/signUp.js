const modules = require('../../modules');
const random = require('../../modules/randomNum');
const encrypt = require('../middleware/encrypt')
const signUp = async function (ctx, next) {
    var rdm = await random.randomNumMore()
    if(ctx.request.body.user ==undefined){
        var obj = {
            title:'腾讯分分彩带单_技巧_资讯热点',
            description: '腾讯分分彩带单_技巧_资讯热点',
            author: '腾讯分分彩带单_技巧_资讯热点',
            keywords: '腾讯分分彩带单_腾讯分分彩技巧_腾讯分分彩资讯热点',

        }
        await ctx.render('login/signUp',obj)
    }else {
        if(ctx.request.body.avide == 402555290){
            ctx.request.body.pass = encrypt.passEncrypt(ctx.request.body.pass)
            var res = await modules.login_index.signUp((ctx.request.body))
            ctx.body = res
        }else {
            ctx.body = {
                state:404,
                msg:'请输入正确邀请码'
            }
        }

    }

}
module.exports= {
    signUp: signUp
}