const db = require('../db').config
var moment = require('moment');
var randomNum = require('../randomNum');
var createTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

var insert = function (ob) {
    return new Promise((resolve,reject)=> {
        db.query('INSERT INTO `imgList` ( `img_Title`, `img_Type`, `img_Guid`, `img_Size`, `img_CreateTime`) VALUES ("'+ob.title+'", "'+ob.type+'", "'+ob.guid+'", "'+ob.size+'", "'+ob.createTime+'")', function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    })
}
var searchData = function (file_path) {
    return new Promise(function (resolve, reject) {
        db.query('SELECT * FROM `page` WHERE `guid` LIKE "'+file_path+'"', function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    })
}
module.exports = {insert: insert, searchData: searchData}