/**
 * Created by xj on 2017/7/17.
 */
"use strict";
var path = require("path");
var fs = require('fs');
const config = require('./config')
var multer = require('koa-multer');
var img_type = '.jpg .png .gif .ico .bmp .jpeg';
var video_type = '.flv .swf .mkv .avi .rm .rmvb .mpeg .mpg .ogg .ogv .mov .wmv .mp4 .webm .mp3 .wav .mid';
var img_path = '/public/ueditor/upload/img';
var files_path = '/public/ueditor/upload/file';
var video_path = '/public/ueditor/upload/video';
var scrawl_path = '/public/ueditor/upload/scrawl';
var moment = require('moment');
var createTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
const modules = require('../../modules')

var up_list = async function (ctx,next) {            //return options list
    if (ctx.query.action === 'config') {
        ctx.type= 'application/json';
        ctx.body = config
    }else if(ctx.query.action === 'listimage'){
        ctx.body = await ue_pic_list(img_path, ctx.query.start, ctx.query.size);
    }else if(ctx.query.action === 'listfile'){
        ctx.body = await ue_pic_list(files_path, ctx.query.start, ctx.query.size);
    }
}
var post_ue = async function (ctx) {                //return img or video or files  multer.API

    if(ctx.query.action === 'uploadimage' || ctx.query.action === 'uploadfile' || ctx.query.action === 'uploadvideo'){
        var file = ctx.req.files[0];
        var file_path;
        if(ctx.query.action === 'uploadimage' ){
            file_path = path.join(img_path, file.filename);
            console.log('上传图片成功，并返回')
        } else if (ctx.query.action === 'uploadvideo'){
            file_path = path.join(video_path, file.filename);
            console.log('上传视频成功，并返回')
        } else if (ctx.query.action === 'uploadfile'){
            file_path = path.join(files_path, file.filename);
            console.log('上传文件成功，并返回')
        }
        var regeXP = /\\/g;
        var regefile = file_path.replace(regeXP, '/');

        var filename = file.originalname.split('.')[0];
        var ob = {
            'title': filename,
            'type': file.mimetype,
            'guid': regefile,
            'size': file.size,
            'createTime': createTime
        }
        var files = await modules.ueditor.insert(ob);
        if(files.affectedRows >0 ){
            ctx.body = {
                'url': regefile,
                'title': file.filename,
                'original': file.originalname,
                'state': 'SUCCESS'
            }
        }else {
            ctx.body = {
                'state': 'FAIL'
            };
        }
    }else{
        ctx.body = {
            'state': 'FAIL'
        };
    }
}
var storage = multer.diskStorage({          //multer options
    destination: function (req, file, cb) {
        var tmpList = file.originalname.split('.');
        var _filetype = tmpList[tmpList.length - 1];
        if(img_type.indexOf(_filetype.toLowerCase())>= 0){
            cb(null, path.join(__dirname, '../../assets'+ img_path))
        }else if (video_type.indexOf(_filetype.toLowerCase())>= 0){
            cb(null, path.join(__dirname, '../../assets'+ video_path))
        }
        else{
            cb(null, path.join(__dirname, '../../assets'+ files_path))
        }
    },
    filename: function (req, file, cb) {
        var temp = file.originalname.split('.');
        var _temp = temp[temp.length-1];
        var filename = temp[temp.length-2];
        cb(null, Date.now() +'.'+ _temp)
    }
});
function ue_pic_list(list_dir,start,size){                  //resolve listimage and listfiles
    return new Promise((resolve,reject)=> {

        if(reject){
            console.log(reject);
        }
        var str = '';
        var i = 0;
        var list = [];
        fs.readdir(path.resolve(__dirname,'../../assets')+list_dir,function (err, files) {
            if(err) throw err;
            var total = files.length;
            files.forEach(function (file) {
                var fileType = 'jpg,png,gif,ico,bmp';
                var tmpList = file.split('.');
                var _filetype = tmpList[tmpList.length - 1];
                if(fileType.indexOf(_filetype.toLowerCase())>=0) {
                    var temp = {};
                    if (list_dir === '/') {
                        temp.url = list_dir + file;
                    } else {
                        temp.url = list_dir + "/" + file;
                    }
                    list[i] = (temp);
                }else {
                    var temp = {};
                    if (list_dir === '/') {
                        temp.url = list_dir + file;
                    } else {
                        temp.url = list_dir + "/" + file;
                    }
                    list[i] = (temp);
                }
                i++;
                // send file name string when all files was processed
                if (i === total) {
                    resolve({
                        "state": "SUCCESS",
                        "list": list,
                        "start": start,
                        "total": total
                    });
                }
            })
        })
    })
}
module.exports = {up_list: up_list, post_ue: post_ue, storage: storage,};
