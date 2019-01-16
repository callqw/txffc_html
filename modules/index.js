/**
 * Created by Administrator on 2018/10/19.
 */

const spliderAdd = require('./splider/add')
const spliderSelect = require('./splider/select')
const newsSelect = require('./news/select')
const ueditor = require('./ueditor/insert')
const postEdit_insert = require('./postEdit/insert')
const login = require('./login/index')

module.exports = {
    spliderSelect: spliderSelect, spliderAdd: spliderAdd,
    newsSelect: newsSelect,
    postEdit_insert: postEdit_insert,
    ueditor: ueditor,
    login: login,
}