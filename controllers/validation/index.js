const modules = require('../../modules');
const encrypt = require('./../middleware/encrypt')
const config = require('../../config');
const moment = require('moment')
const debug = require('debug')('koa-weapp-demo')
const {ERRORS, LOGIN_STATE} = require('./../constants')
const validation = async function (ctx, next) {
    var str = ctx.request.header.cookie
    if(str != undefined){
        var regex = str.match(/infi=\b.*?(?:;)/gi)
        if(regex !=null){
            regex = regex[0].match(/\b((?!infi=)\w)+\b/)
            if(regex !=null){
                var res = await modules.login_select.Skey(regex[0])
                if(res.state == 200){
                    var skey = await encrypt.aesDecryptiv(res.data.user_Skey,res.data.user_Name,'match')
                    skey = skey.split(',')
                    var ip = skey[0]
                    var lastVisitTime = skey[1]
                    const expires = config.wxLoginExpires && !isNaN(parseInt(config.wxLoginExpires)) ? parseInt(config.wxLoginExpires) * 1000 : 7200 * 1000
                    if (moment(lastVisitTime, 'YYYY-MM-DD HH:mm:ss').valueOf() + expires < Date.now()) {
                        debug('Valid: skey expired, middleware failed.')
                        return
                    } else {
                        debug('Valid: middleware success.');
                        return next()
                    }
                }
            }
        }
    }
}
module.exports= {
    validation: validation
}