'use strict';

const BaseController = require('../../core/base.js');
const fs = require('fs');
const pump = require('mz-modules/pump');
const Jimp = require('jimp');
const path = require('path');

class IndexController extends BaseController {
    async login() {
        await this.ctx.render('admin/login');
    }
    async loginOut() {
        this.ctx.session.userinfo = null;
        this.ctx.state.userinfo = null;
        console.log('loginOut')
        await this.ctx.redirect(this.app.adminName()+'/login');
    }
    async dologin() {
        let {username, password, verity} = this.ctx.request.body;
        if(verity.toLowerCase()==this.ctx.session.code){
            password = await this.service.tools.md5(password);
            let res = await this.service.admin.getAdmin(username,password)
            if(res.length<1){
                this.ctx.body = {
                    code:1,
                    msg:'用户名或密码出错',
                    data:{code:verity.toLowerCase()}
                }
            }else{
                this.ctx.session.userinfo = res[0];
                this.ctx.body = {
                    code:0,
                    msg:'登录成功',
                    data:{code:verity.toLowerCase()}
                };
            }
        }else{
            this.ctx.body = {
                code:1,
                msg:'验证码出错',
                data:{username,code:verity.toLowerCase()}
            }
        }
    }
    async console() {
        await this.ctx.render('admin/console');
    }
    async noauth() {
        await this.ctx.render('admin/auth');
    }
    /**
     * urlParams  jimp 任何值不等于空就代表压缩图片并修改分辨率
     * urlParams  size 压缩的尺寸单位px
     * urlParams  old  压缩时是否保存原图
     */
    async upload(){
        let parts = this.ctx.multipart({autoFields:true});
        //是否缩略图参数
        let flag = this.ctx.request.query.jimp;
        var size = this.ctx.request.query.size;
        var oldImage = this.ctx.request.query.old;
        let stream;
        let files=[];
        while((stream = await parts()) != null){
            if(!stream.filename){
                break;
            }
            let fieldname = stream.fieldname;
            let dir = await this.service.tools.getUploadFile(stream.filename);
            let target = dir.uploadDir;
            let writeStream = fs.createWriteStream(target);
            try {
                await pump(stream,writeStream)
            } catch (error) {
                this.ctx.body = {
                    code:1,
                    msg:'上传失败',
                    data:[]
                }
                return;
            }
            
            if(flag){
                let imageSize = size?parseInt(size):200;
                let SizeText = `_${size}x${size}`;
                let pathsrc = dir.saveDir + SizeText + path.extname(dir.saveDir);
                Jimp.read(target, (err, lenna) => {
                    if (err) throw err;
                    lenna
                    .resize(imageSize, imageSize) // resize
                    .quality(80) // set JPEG quality
                    .write(target + SizeText + path.extname(target)); // save
                })
                if(oldImage){
                    //原图
                    await this.ctx.model.Image.create({
                        src:dir.saveDir
                    })
                }
                
                //缩略图
                let res = await this.ctx.model.Image.create({
                    src:pathsrc
                })
                files.push({
                    [fieldname]:pathsrc,
                    _id:res._id
                })
            }else{
                let res = await this.ctx.model.Image.create({
                    src:dir.saveDir
                })
                files.push({
                    [fieldname]:dir.saveDir,
                    _id:res._id
                })
            }
        }
        this.ctx.body = {
            code:0,
            msg:'上传成功',
            data:files
        }
    }
    async index(){
        await this.ctx.render('admin/index')
    }
}

module.exports = IndexController;
