/**
 * Created by Administrator on 2018/10/21 0021.
 */
var CircularJSON = require('circular-json');
var modules = require('../../modules/index')

var res = null;
const crawling = async function (ctx, next) {
    var page = ctx.params
    var pageList= ['1','2','3','4','5']
    let indexPage= {};
    indexPage.page = 1;
    if(pageList.indexOf(page.page) == -1){
        page.page = '1'
    }
    var res = await modules.spliderSelect.select(page);
    var indexRes = await modules.spliderSelect.select(indexPage);
    var obj = {
        title:'腾讯官方在线人数统计'+res.data[0].createTime,
        description: '腾讯在线人数统计，QQ在线人数',
        author: '统计',
        keywords: '腾讯在线人数统计，QQ在线人数',
        txOnlineNumber: indexRes.data[0].txOnlineNumber,
        lotteryNumber: indexRes.data[0].lotteryNumber,
        contentData: res,
        tableData: 'tableData'
    }
    await ctx.render('index',obj);
}
module.exports = {crawling: crawling}