/**
 * Created by Administrator on 2018/10/23.
 */
const modules = require('../../modules');
const select = async function (ctx, next) {
    let indexPage= {};
    indexPage.page = 1;
    var indexRes = await modules.spliderSelect.select(indexPage);
    var obj = {
        title:'腾讯开奖号码_QQ在线统计,腾讯在线统计_分分统计',
        description: '提供腾讯在线人数的计算结果————即腾讯分分彩实时开奖结果，每分钟第5秒刷新数据。7*24小时不间断。',
        author: '腾讯在线统计',
        keywords: '腾讯在线统计,腾讯在线人数统计,qq在线统计,QQ在线统计,qq在线人数统计,QQ在线人数统计,分分统计',
        txOnlineNumber: indexRes.data[0].txOnlineNumber,
        lotteryNumber: indexRes.data[0].lotteryNumber,
        contentData: indexRes,
        tableData: null,
    }
    await ctx.render('index',obj);
}
module.exports= {
        select: select
}