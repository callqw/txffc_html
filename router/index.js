/**
 * Created by Administrator on 2018/10/19.
 */
// const concrollers = require('../concrollers')
// const router = require('koa-router')({
//     prefix: '/api'
// })
// router.get('/crawling/:page', concrollers.crawling.crawling)
const concrollers = require('../concrollers')
const router = require('koa-router')({
    prefix: ''
})
router.get('/index.html/:page', concrollers.crawling.crawling)
router.get('/index.html', concrollers.crawlingSelect.select)
router.get('/news.html/:news_Number', concrollers.newsSelect.newsSelectWithNewsNumber)
router.get('/news.html', concrollers.newsSelect.select)


module.exports = router;