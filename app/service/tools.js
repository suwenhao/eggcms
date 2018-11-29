'use strict';
const svgCaptcha = require('svg-captcha');
const Service = require('egg').Service;
const md5 = require('md5');
const sd = require('silly-datetime');
const path = require('path');
const mkdirp = require('mz-modules/mkdirp');
const url = require('url');
const util = require('../core/util.js')

class ToolsService extends Service {
    //获取验证码
    async captcha() {
        let captcha = svgCaptcha.create({
            size:4,
            fontSize: 50,
            width: 130,
            height:42,
        });
        return captcha;
    }
    //加密
    async md5(str){
        return md5(md5(str)+str);
    }
    //公共删除
    async delete(model,id){
        let res = await this.ctx.model[model].deleteOne({'_id':id});
        if(res){
            this.ctx.body = {
                code:0,
                msg:'删除成功',
                data:res,
            }
        }else{
            this.ctx.body = {
                code:1,
                msg:'删除失败',
            }
        }
    }
    //公共修改
    async change(model,id,attr,value){
        let res = await this.ctx.model[model].updateOne({'_id':id},{[attr]:value});
        if(res){
            this.ctx.body = {
                code:0,
                msg:'修改成功',
                data:res,
            }
        }else{
        this.ctx.body = {
            code:1,
            msg:'修改失败',
        }
        }
    }
    //公共上传
    async getUploadFile(filename){
        let day = sd.format(new Date(),'YYYYMMDD');
        let dir = path.join(this.config.uploadDir,day);
        await mkdirp(dir)

        let d = new Date().getTime();
        let uploadDir = path.join(dir,d+path.extname(filename));
        return {
            uploadDir:uploadDir,
            saveDir:uploadDir.slice(3).replace(/\\/g,'/'),
        };
    }
    //判断已有权限
    async checkAuth(){
        let userinfo = this.ctx.session.userinfo;
        let role_id = userinfo.role_id;
        //地址
        let pathname=url.parse(this.ctx.url).pathname;

        //忽略权限判断的地址，is_super表示管理员
        let ignoreUrl = [
            this.app.adminName(),
            this.app.adminName()+'/loginout',
            this.app.adminName()+'/noauth',
            this.app.adminName()+'/login',
            this.app.adminName()+'/dologin',
            this.app.adminName()+'/code',
            this.app.adminName()+'/console',
            this.app.adminName()+'/role/change',
            this.app.adminName()+'/manager/change',
            this.app.adminName()+'/access/change',
            this.app.adminName()+'/focus/change',
            this.app.adminName()+'/image/list',
            this.app.adminName()+'/goodsType/change',
            this.app.adminName()+'/goodsCate/change',
            this.app.adminName()+'/goodsTypeAttribute/change',
            this.app.adminName()+'/goods/goodsTypeAttribute',
            this.app.adminName()+'/goods/uploadImage',
            this.app.adminName()+'/nav/change',
        ]
    
        if(ignoreUrl.indexOf(pathname)!=-1 || userinfo.is_super==1){
            return {
                auth:true,
                type:2
            };
        }

        let accessResult =await this.service.role.getRoleAccessList(role_id);
        let accessArr = [];
        //当前角色可访问的列表
        accessResult.forEach(v=>{
            accessArr.push(v.access_id.toString());
        })
        // console.log(accessArr)
        var accessUrlId = await this.ctx.model.Access.findOne({'url':pathname})
        // console.log(accessUrlId)
        if(accessUrlId){
        if(accessArr.indexOf(accessUrlId._id.toString())!=-1){
            return {
                auth:true,
                type:accessUrlId.type,
            };
        }else{
            return {
                auth:false,
                type:accessUrlId.type,
            };
        }
        }else{
            return {
                auth:false,
                type:2,
            };
        }
    }
    //获取显示菜单
    async getAuthList(role_id){
        let list = await this.service.access.getAccessList();
        let accessResult =await this.service.role.getRoleAccessList(role_id);
        // console.log(accessResult)
        let accessArr = [];
        //当前角色可访问的列表
        accessResult.forEach(v=>{
            accessArr.push(v.access_id.toString());
        })
        let is_super = this.ctx.session.userinfo.is_super;
        if(is_super==1){
            list.forEach(item=>{
                item.checked=true;
                item.title = item.module_name;
                item.href = item.url;
                item.children.forEach(jtem=>{
                    jtem.urlArr = jtem.url.substring(1).split('/');
                    jtem.checked=true;
                    jtem.title = jtem.module_name;
                    jtem.href = jtem.url;
                })
                // item.children=item.items;
            })
        }else{
            list.forEach(item=>{
                if(accessArr.indexOf(item._id.toString())!=-1){
                item.checked=true;
                }else{
                item.checked=false;
                }
                item.title = item.module_name;
                item.href = item.url;
                item.children.forEach(jtem=>{
                    jtem.urlArr = jtem.url.substring(1).split('/');
                    if(accessArr.indexOf(jtem._id.toString())!=-1&&jtem.type!=3){
                        jtem.checked=true;
                    }else{
                        jtem.checked=false;
                    }
                    jtem.title = jtem.module_name;
                    jtem.href = jtem.url;
                })
            })
        }
        list.unshift({
            title:'控制台',
            href:this.app.adminName()+'/console',
            icon:'layui-icon-console',
            status:1,
            checked:true,
        })
        return list;
    }
}

module.exports = ToolsService;
