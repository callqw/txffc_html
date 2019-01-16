
const db = require('../db').config
var moment = require('moment');
var randomNum = require('../randomNum');
var createTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
const unicode = require('../unicode')

var postEdit_insert =async function (reqBody) {
    return new Promise(async (resolve, reject)=> {
        var news_ImgUrl = []
        var str = reqBody.content
         var rexImgList = str.match(/<img\b.*?(?:\>|\/>)/gi)
        if(rexImgList ==null){
            for(var i=0;i<3;i++){
                news_ImgUrl.push('public/img/bike.jpg')
            }

        }else {
            for(var i=0;i<rexImgList.length;i++){
                news_ImgUrl.push(rexImgList[i].match(/<img.*?src="(.*?)".*?\/?>/i)[1])
            }
        }

        var obj = {
            news_Title: reqBody.title,
            news_Description: reqBody.description.substring(0,80),
            news_Author: '腾讯在线统计',  //作者
            news_Keywords: reqBody.description.substring(0,80),
            news_Content: unicode.toUnicode.ToUnicode(reqBody.content),       //内容
            news_CreateTime: createTime,      //创建时间
            news_AvatarUrl: 'http://mmpic.56hx.com/2019-files//20190110/6368271007381043661376179.jpg',     //头像图片地址
            news_ImgUrl: news_ImgUrl,       //图片地址
            news_Label: reqBody.label,       //标签
            news_Pv: 0,           //点击率
            news_Class: '添加分类', //添加分类
            news_UserId:1,       //绑定用户id
            news_Number: 1       //绑定用户id
        }
        obj.news_Number = await randomNum.randomNum()
        db.query('INSERT INTO `news` (`news_Title`, `news_Description`, `news_Author`, `news_Keywords`,' +
            ' `news_Content`, `news_CreateTime`, `news_AvatarUrl`, `news_ImgUrl`, `news_Label`, `news_Pv`' +
            ', `news_Class`, `news_UserId`, `news_Number`) VALUES ("'+obj.news_Title+'", "'+obj.news_Description+'", "'+obj.news_Author+'",' +
            ' "'+obj.news_Keywords+'", "'+obj.news_Content+'", "'+obj.news_CreateTime+'", "'+obj.news_AvatarUrl+'", "'+obj.news_ImgUrl+'", "'+obj.news_Label+'", "'+obj.news_Pv+'"' +
            ', "'+obj.news_Class+'", "'+obj.news_UserId+'", "'+obj.news_Number+'")',
            function (err, result) {
                if (err) throw err;
                resolve({
                    loginState: 'LOGIN_STATE.SUCCESS',
                    msg: '新增成功'
                });
            });
    })

}


module.exports = {
    postEdit_insert: postEdit_insert
}