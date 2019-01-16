/**
 * Created by xj on 2019/1/12.
 */
const modules = require('../../modules');
const postEdit = async function (ctx, next) {
    // let indexPage= {};
    // indexPage.page = 1;
    // var indexRes = await modules.newsInsert();
    var obj = {
        title:'写文章',
        description: '写文章',
        author: '写文章',
        keywords: '写文章',
    }
    await ctx.render('postEdit/index', obj)
}
module.exports= {
    postEdit: postEdit
}