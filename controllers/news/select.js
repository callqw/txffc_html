/**
 * Created by Administrator on 2018/10/23.
 */
const modules = require('../../modules');

const select = async function (ctx, next) {
    let indexPage= {};
    indexPage.page = 1;
    indexPage.news_UserId = 1;
    var indexRes = await modules.newsSelect.newsSelect(indexPage);
    var obj = {
        title:'腾讯分分彩带单_技巧_资讯热点',
        description: '腾讯分分彩带单_技巧_资讯热点',
        author: '腾讯分分彩带单_技巧_资讯热点',
        keywords: '腾讯分分彩带单_腾讯分分彩技巧_腾讯分分彩资讯热点',
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
    if(indexRes.state === 200){
        var obj = {
            title: indexRes.data[0].news_Title,
            description: indexRes.data[0].news_Description,
            author: '腾讯分分彩带单_技巧_资讯热点',
            keywords: indexRes.data[0].news_Label,
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
       // ctx.body = indexRes.data[0].news_Content
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