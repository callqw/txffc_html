/**
 * Created by Administrator on 2018/10/23.
 */
const modules = require('../../modules');

const select = async function (ctx, next) {
    let indexPage= {};
    indexPage.page = 1;
    indexPage.news_UserId = 1;
    var indexRes = await modules.newsSelect.newsSelect(indexPage);
    console.log(indexRes,'indexRes')
    // ctx.body = indexRes
    var obj = {
        title:'腾讯开奖号码_QQ在线统计,腾讯在线统计_分分统计',
        description: '提供腾讯在线人数的计算结果————即腾讯分分彩实时开奖结果，每分钟第5秒刷新数据。7*24小时不间断。',
        author: '腾讯在线统计',
        keywords: '腾讯在线统计,腾讯在线人数统计,qq在线统计,QQ在线统计,qq在线人数统计,QQ在线人数统计,分分统计',
        content: indexRes,
        news_Content: indexRes.data[0].txOnlineNumber,
        news_CreateTime: indexRes.data[0].lotteryNumber,
        news_AvatarUrl: indexRes,
        news_ImgUrl: null,
        news_Label:null,
        news_Pv:null,
        news_Class:null,
        news_UserId:null
    }
    await ctx.render('news',obj);
}
const newsSelectWithNewsNumber = async function (ctx, next) {

    let indexPage= {};
    indexPage.page = 1;
    indexPage.news_UserId = 1;
    indexPage.news_Number = ctx.params.news_Number;
    var indexRes = await modules.newsSelect.newsSelectWithNewsNumber(indexPage);
    console.log(indexRes,'indexRes')

    if(indexRes.state === 200){
        var obj = {
            title:'腾讯开奖号码_QQ在线统计,腾讯在线统计_分分统计',
            description: '提供腾讯在线人数的计算结果————即腾讯分分彩实时开奖结果，每分钟第5秒刷新数据。7*24小时不间断。',
            author: '腾讯在线统计',
            keywords: '腾讯在线统计,腾讯在线人数统计,qq在线统计,QQ在线统计,qq在线人数统计,QQ在线人数统计,分分统计',
            content: indexRes,
            news_Content: indexRes.data[0].txOnlineNumber,
            news_CreateTime: indexRes.data[0].lotteryNumber,
            news_AvatarUrl: indexRes,
            news_ImgUrl: null,
            news_Label:null,
            news_Pv:null,
            news_Class:null,
            news_UserId:null
        }
        await ctx.render('news/newsShow',obj);
    }else {
        var obj = {
            title:'未找到',
            description: '未找到',
            author: '未找到',
            keywords: '未找到',
        }
        await ctx.render('error',obj);
    }

}

module.exports= {
        select: select, newsSelectWithNewsNumber:newsSelectWithNewsNumber
}