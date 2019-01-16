
const db = require('../db').config
const moment = require('moment')
var CircularJSON = require('circular-json');
const unicode = require('../unicode')
//根据用户查询
const login = function (obj) {
    return new Promise((resolve,reject)=> {
        var from = (Number(obj.page) -1)* 5,to = 5;
        db.query('SELECT * FROM `login` WHERE `user_Name` LIKE "'+obj.user+'"',async function (err, result) {
            if (err) throw err;
            if(result.length ==0){
                resolve({
                    state: 404
                });
            }else {
                if(result[0].user_Pass === obj.pass){
                    resolve({
                        state: 200
                    });
                }else {
                    resolve({
                        state: 404
                    });
                }
            }



        });
    })
}
module.exports = {
    login:login
}