
const db = require('../db').config
const moment = require('moment')
var CircularJSON = require('circular-json');
const unicode = require('../unicode')
//根据用户查询
const select = function (obj) {
    return new Promise((resolve,reject)=> {
        var lastVisiteTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        db.query('UPDATE `login` SET `user_LastVisiteTime` = "'+lastVisiteTime+'" WHERE `user_Name` = "'+obj.user+'"', function (err, result) {
            if (err) throw err;
            if(result.changedRows ==1){
                resolve({
                    state: 200
                });
            }else {
                resolve({
                    state: 404
                });
            }
        });
    })
}
const Skey = function (obj) {
    return new Promise((resolve,reject)=> {
        var lastVisiteTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        db.query('SELECT * FROM `login` WHERE `user_Skey` LIKE "'+obj+'"', function (err, result) {
            if (err) throw err;
            if(result.length != 0){
                resolve({
                    state: 200,
                    data:result[0]
                });
            }else {
                resolve({
                    state: 404,
                    data:'error'
                });
            }
        });
    })
}
module.exports = {
    select: select,
    Skey: Skey,
}