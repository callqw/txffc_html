
const db = require('../db').config
const moment = require('moment')
var CircularJSON = require('circular-json');
const unicode = require('../unicode')
const encrypt = require('../../controllers/middleware/encrypt')
const address = require('address')
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
                   var res = await insert(obj)
                    if(res.state ==200){
                        resolve(res);
                    }else {
                        resolve(res);
                    }
                }else {
                    resolve({
                        state: 404
                    });
                }
            }
        });
    })
}

const insert = function (obj) {
    return new Promise(async (resolve,reject)=> {
        var lastVisiteTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        var network = address.ip();
        var skey = await encrypt.aesEncryptiv(network+','+lastVisiteTime,obj.user,'match')
        var from = (Number(obj.page) -1)* 5,to = 5;
        db.query('UPDATE `login` SET `user_LastVisiteTime` = "'+lastVisiteTime+'",`user_Ip` = "'+network+'",`user_Skey` = "'+skey+'" WHERE `user_Name` = "'+obj.user+'"', function (err, result) {
            if (err) throw err;
            if(result.changedRows ==1){
                resolve({
                    state: 200,
                    skey: skey,
                    msg:'登录成功'
                });
            }else {
                resolve({
                    state: 404,
                    skey: 'error',
                    msg:'登录失败'
                });
            }
        });
    })
}
const signUp = function (obj) {
    return new Promise(async (resolve,reject)=> {
        var haveUser = await signUpSelect(obj);
        var lastVisiteTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        var network = address.ip();
        var skey = await encrypt.aesEncryptiv(network+','+lastVisiteTime,obj.user,'match')
            if(haveUser.state === 200){
                db.query('INSERT INTO `login` (`user_Name`, `user_Pass`, `user_CreateTime`, `user_LastVisiteTime`, `user_Ip`, `user_Skey`) VALUES ("'+obj.user+'","'+obj.pass+'","'+lastVisiteTime+'","'+lastVisiteTime+'","'+network+'","'+skey+'" )', function (err, result) {
                    if (err) throw err;
                    if(result.protocol41){
                        resolve({
                            state: 200,
                            msg: '注册成功,请登录'
                        });
                    }else {
                        resolve({
                            state: 404,
                            msg: '注册失败'
                        });
                    }
                });
            }else {
                resolve({
                    state: 404,
                    msg: haveUser.msg
                });
            }

    })
}
const signUpSelect = function (obj) {
    return new Promise(async (resolve,reject)=> {
        var lastVisiteTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        var network = address.ip();
        var skey = await encrypt.aesEncryptiv(network+','+lastVisiteTime,obj.user,'match')
        db.query('SELECT * FROM `login` WHERE user_Name LIKE "'+obj.user+'"', function (err, result) {
            if (err) throw err;
            if(result.length ==0){
                resolve({
                    state: 200,
                    msg:'success'
                });
            }else {
                resolve({
                    state: 404,
                    msg: '帐号已存在'
                });
            }
        });
    })
}
module.exports = {
    login: login,
    signUp: signUp,
}