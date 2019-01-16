const modules = require('../../modules');
const validation = async function (ctx, next) {
    if(ctx.session.username =='1'){
        return next()
    }else {

    }
}
module.exports= {
    validation: validation
}