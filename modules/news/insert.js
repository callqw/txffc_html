
const db = require('../db').config
var moment = require('moment');
var randomNum = require('../randomNum');
var createTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
const unicode = require('../unicode')
var news_insert =async function (obj) {
    obj.news_Number = await randomNum.randomNum()
    db.query('INSERT INTO `news` (`news_Title`, `news_Description`, `news_Author`, `news_Keywords`,' +
        ' `news_Content`, `news_CreateTime`, `news_AvatarUrl`, `news_ImgUrl`, `news_Label`, `news_Pv`' +
        ', `news_Class`, `news_UserId`, `news_Number`) VALUES ("'+obj.news_Title+'", "'+obj.news_Description+'", "'+obj.news_Author+'",' +
        ' "'+obj.news_Keywords+'", "'+obj.news_Content+'", "'+obj.news_CreateTime+'", "'+obj.news_AvatarUrl+'", "'+obj.news_ImgUrl+'", "'+obj.news_Label+'", "'+obj.news_Pv+'"' +
        ', "'+obj.news_Class+'", "'+obj.news_UserId+'", "'+obj.news_Number+'")',
        function (err, result) {
            if (err) throw err;
            console.log(result,'result')
            // resolve({
            //     loginState: 'LOGIN_STATE.SUCCESS',
            //     msg: '新增成功'
            // });
        });
}
var obj = {
    news_Title:'腾讯开奖号码_QQ在线统计,腾讯在线统计_分分统计',
    news_Description: '提供腾讯在线人数的计算结果————即腾讯分分彩实时开奖结果，每分钟第5秒刷新数据。7*24小时不间断。',
    news_Author: '腾讯在线统计',
    news_Keywords: '腾讯在线统计,腾讯在线人数统计,qq在线统计,QQ在线统计,qq在线人数统计,QQ在线人数统计,分分统计',
    news_Content: '腾讯分分彩中有一技巧为三星直组选，使用腾讯分分彩三星直组选可以很好地提高中奖概率。下面小编将经验老哥的经验分享出来，希望助各位彩友赚翻。',       //内容
    news_CreateTime: createTime,      //创建时间
    news_AvatarUrl: 'http://mmpic.56hx.com/2019-files//20190110/6368271007381043661376179.jpg',     //头像图片地址
    news_ImgUrl: [{url:'http://mmpic.56hx.com/2019-files//20190110/6368271007381043661376179.jpg'}],       //图片地址
    news_Label: '标签',       //标签
    news_Pv: 1234,           //点击率
    news_Class: '添加分类', //添加分类
    news_UserId:1,       //绑定用户id
    news_Number: 1       //绑定用户id
}

news_insert(obj)