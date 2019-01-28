/**
 * Created by Administrator on 2018/10/19.
 */

const spliderAdd = require('./splider/add')
const spliderSelect = require('./splider/select')
const newsSelect = require('./news/select')
const ueditor = require('./ueditor/insert')
const postEdit_insert = require('./postEdit/insert')
const login_index = require('./login/index')
const login_select = require('./login/select')

module.exports = {
    spliderSelect: spliderSelect, spliderAdd: spliderAdd,
    newsSelect: newsSelect,
    postEdit_insert: postEdit_insert,
    ueditor: ueditor,
    login_index: login_index, login_select: login_select
}