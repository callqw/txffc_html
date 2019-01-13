
const db = require('../db').config
const moment = require('moment')
var CircularJSON = require('circular-json');
const unicode = require('../unicode')
//根据用户查询
const newsSelect = function (obj) {

    return new Promise((resolve,reject)=> {
        var from = (Number(obj.page) -1)* 5,to = 5;
        db.query('SELECT * FROM `news` WHERE `news_UserId` LIKE "'+obj.news_UserId+'" ORDER BY news_Id DESC LIMIT '+from+','+to+'',async function (err, result) {
            if (err) throw err;
            for(var i=0; i<result.length; i++) {
                result[i].news_CreateTime = moment(result[i].news_CreateTime).format('YYYY-MM-DD')
            }
            resolve({
                loginState: 'LOGIN_STATE.SUCCESS',
                data: result
            });
        });
    })
}
//单页内容查询
const newsSelectWithNewsNumber = function (obj) {

    return new Promise((resolve,reject)=> {
        var from = (Number(obj.page) -1)* 5,to = 5;
        db.query('SELECT * FROM `news` WHERE `news_UserId` LIKE "'+obj.news_UserId+'" AND `news_Number` LIKE '+obj.news_Number+' ORDER BY news_Id DESC LIMIT '+from+','+to+'',async function (err, result) {
            if (err) throw err;
            for(var i=0; i<result.length; i++) {
                result[i].news_CreateTime = moment(result[i].news_CreateTime).format('YYYY-MM-DD')
            }
            console.log(result.length,'3515355035153550351535503515355035153550')
            if(result.length ==0){
                console.log('404')
                resolve({
                    state: 404
                });
            }else {
                resolve({
                    state: 200,
                    data: result
                });
            }

        });
    })
}
module.exports = {
    newsSelect: newsSelect, newsSelectWithNewsNumber:newsSelectWithNewsNumber
}