const modules = require('../../modules');
const insert = async function (ctx, next) {
    let indexPage= {};
    indexPage.page = 1;
    var reqBody = ctx.request.body
    var res = await modules.postEdit_insert.postEdit_insert(reqBody)
    ctx.body=res

}
module.exports= {
    insert: insert
}