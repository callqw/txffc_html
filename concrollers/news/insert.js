/**
 * Created by xj on 2019/1/12.
 */
const modules = require('../../modules');
const select = async function (ctx, next) {
    let indexPage= {};
    indexPage.page = 1;
    // var indexRes = await modules.newsInsert();
    // var obj = {
    //     news_Title:'腾讯开奖号码_QQ在线统计,腾讯在线统计_分分统计',
    //     news_Description: '提供腾讯在线人数的计算结果————即腾讯分分彩实时开奖结果，每分钟第5秒刷新数据。7*24小时不间断。',
    //     news_Author: '腾讯在线统计',
    //     news_Keywords: '腾讯在线统计,腾讯在线人数统计,qq在线统计,QQ在线统计,qq在线人数统计,QQ在线人数统计,分分统计',
    //     news_Content: indexRes.data[0].txOnlineNumber,
    //     news_CreatTime: indexRes.data[0].lotteryNumber,
    //     news_AvatarUrl: indexRes,
    //     news_ImgUrl: null,
    //     news_Label:null,
    //     news_Pv:null,
    //     news_Class:null,
    //     news_UserId:null
    // }
    // await ctx.render('news',obj);
}
module.exports= {
    select: select
}