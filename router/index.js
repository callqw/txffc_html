/**
 * Created by Administrator on 2018/10/19.
 */
// const controllers = require('../controllers')
// const router = require('koa-router')({
//     prefix: '/api'
// })
// router.get('/crawling/:page', controllers.crawling.crawling)
const ueUpload = require('../controllers/ueditor/ueUpload.js');
const multer = require('koa-multer');//加载koa-multer模块
const upload = multer({storage: ueUpload.storage});
const controllers = require('../controllers')
const router = require('koa-router')({
    prefix: ''
})
router.get('/index.html/:page', controllers.crawling.crawling)
router.get('/index.html', controllers.crawlingSelect.select)
router.get('/news.html/:news_Number', controllers.newsSelect.newsSelectWithNewsNumber)
router.get('/news.html', controllers.newsSelect.select)

router.get('/postEdit.html',controllers.validationMiddleware.validation, controllers.postEdit.postEdit)
router.post('/ue', upload.array('upfile'), controllers.ueditor.post_ue);
router.get('/ue', controllers.ueditor.up_list);
router.post('/postEdit', controllers.postEdit_insert.insert);

router.get('/login.html', controllers.login.login);
router.post('/login', controllers.login.login);
router.get('/signUp.html', controllers.signUp.signUp);
router.post('/signUp', controllers.signUp.signUp);

router.get('/sitemap.xml', controllers.sitemap.sitemap);
router.get('/sitemap.html', controllers.sitemap.sitemapHtml);
module.exports = router;