/**
 * Created by Administrator on 2018/10/19.
 */

const spliderAdd = require('./splider/add')
const spliderSelect = require('./splider/select')
const newsInsert = require('./news/insert')
const newsSelect = require('./news/select')

module.exports = {
    spliderSelect: spliderSelect, spliderAdd: spliderAdd,
    newsInsert: newsInsert, newsSelect: newsSelect
}