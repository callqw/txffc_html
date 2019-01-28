var moment = require('moment');
var createTime = moment(Date.now()).format('YYYY-MM-DD')
var createSitemap = function (obj) {
    return new Promise((resolve,reject)=> {
        var xml = '';
        var head = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">'
        for(var i= 0;i< obj.urls.length; i++){
            xml += '<url>'
            xml += '<loc>'+obj.hostname+obj.urls[i].url+'</loc>'
            xml += '<priority>'+obj.urls[i].priority+'</priority>'
            xml += '<lastmod>'+createTime+'</lastmod>'
            xml += '<changefreq>'+obj.urls[i].changefreq+'</changefreq>'
            xml+=  '</url>'
        }

        var footer = '</urlset>'
        resolve(head+xml+footer)
    })

}
var createSitemapHtml = function (obj) {
    return new Promise((resolve,reject)=> {
        var xml = '';
        var head = '<div class="container"><div class="row"><div class="col-xs-12 col-md-12"><table><tbody>'
        for(var i= 0;i< obj.urls.length; i++){
            xml += '<tr align="left"><td align="left" width="760">'
            xml += '<a href="'+obj.urls[i].url+'">'+obj.urls[i].title+'</a>'
            xml+=  '</tr></td>'
        }

        var footer = '</div></div></div></tbody></table>'
        resolve(head+xml+footer)
    })

}

module.exports = {
 createSitemap: createSitemap, createSitemapHtml: createSitemapHtml
}