/**
 * Created by Administrator on 2018/10/19.
 */

//爬虫
const crawling = require('./splider/crawling')
const crawlingSelect = require('./splider/select')
const newsSelect = require('./news/select')
const postEdit = require('./postEdit/postEdit')
const postEdit_insert = require('./postEdit/insert')
const ueditor = require('./ueditor/ueUpload')
const validationMiddleware = require('./validation/index')
const login = require('./login/index')

module.exports = {
    crawling: crawling, crawlingSelect: crawlingSelect,
    newsSelect: newsSelect,
    postEdit:postEdit, postEdit_insert: postEdit_insert,
    ueditor:ueditor,
    validationMiddleware:validationMiddleware,
    login:login
}