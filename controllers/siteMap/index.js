const modules = require('../../modules');
const sm = require('sitemap');
const config = require('../../config')
const createSitemap = require('./createSitemap')
const sitemap = async function (ctx, next) {
    var  news = await modules.newsSelect.newsSelectSitemap()
    console.log(news,'news')
    var urlsList = []
    for(var i= 0; i<news.data.length; i++){
        urlsList.push({ url: '/news.html/'+news.data[i].news_Number+'',  changefreq: 'weekly', priority: 0.3 })
    }
    var res = await createSitemap.createSitemap({
        hostname: ''+config.url+config.sitemapPort+'',
        cacheTime: 600000,        // 600 sec - cache purge period
        urls: urlsList
    })
        ctx.set('Content-Type', 'application/xml');
        ctx.body= res ;

}
const sitemapHtml =async function (ctx, next) {
    var  news = await modules.newsSelect.newsSelectSitemap()
    console.log(news,'news')
    var urlsList = []
    for(var i= 0; i<news.data.length; i++){
        urlsList.push({ url: '/news.html/'+news.data[i].news_Number+'',  changefreq: 'weekly', priority: 0.3,title: news.data[i].news_Title})
    }
    var res = await createSitemap.createSitemapHtml({
        hostname: ''+config.url+config.sitemapPort+'',
        cacheTime: 600000,        // 600 sec - cache purge period
        urls: urlsList
    })
    var obj = {
        title:'网站地图',
        description: '网站地图',
        author: '网站地图',
        keywords: '网站地图',
        content: res
    }
    await ctx.render('/sitemap/index', obj)
}
module.exports= {
    sitemap: sitemap, sitemapHtml: sitemapHtml
}