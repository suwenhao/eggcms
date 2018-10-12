'use strict';

const Controller = require('egg').Controller;
const util = require('../../core/util.js')
class RoleController extends Controller {
    async index() {
        let list = await this.service.role.getRoleList();
        await this.ctx.render('admin/role/index',{
            list:JSON.stringify(list)
        });
    }
    async add() {
        await this.ctx.render('admin/role/add');
    }
    async doAdd(){
        let {title,description} = this.ctx.request.body;
        let res = await this.service.role.add(title,description);
        if(res){
            this.ctx.body = {
                code:0,
                msg:'增加成功'
            }
        }else{
            this.ctx.body = {
                code:1,
                msg:'增加失败'
            }
        }
    }
    async edit() {
        let id = this.ctx.request.query.id;
        let role = await this.ctx.service.role.getRole(id);
        console.log('---验证参数---')
        // console.log(role)
        if(role===null){
            this.ctx.body={
                code:1,
                msg:'参数出错'
            }
            return;
        }else{
            await this.ctx.render('admin/role/edit',{
                list:role
            });
        }
    }
    async doEdit(){
        let {_id,title,description,status} = this.ctx.request.body;
        let res = await this.service.role.edit(_id,title,description,status);
        if(res){
            this.ctx.body = {
                code:0,
                msg:'修改成功'
            }
        }else{
            this.ctx.body = {
                code:1,
                msg:'修改失败'
            }
        }
    }
    //删除
    async delete(){
        let {id,model} = this.ctx.request.query;
        let adminRes = await this.ctx.model.Admin.find({'role_id':id});
        if(adminRes.length>0){
            this.ctx.body = {
                code:1,
                msg:'已有用户引用该角色，请先修改用户角色'
            }
        }else{
            await this.service.tools.delete(model,id)
        }
    }
    async change(){
        let {id,model,attr,value} = this.ctx.request.query;
        await this.service.tools.change(model,id,attr,value);
    }
    async auth() {
        let id = this.ctx.request.query.id;
        let name = this.ctx.request.query.name||'';
        let list = await this.service.access.getAccessList();
        let roleAccess=await this.service.role.getRoleAccessList(id);
        console.log('---验证参数---')
        // console.log(roleAccess)
        if(roleAccess===null){
            this.ctx.body={
                code:1,
                msg:'参数出错'
            }
            return;
        }else{
            roleAccess=roleAccess.map(v=>{
                return v.access_id.toString()
            })
            list.forEach(item=>{
                let name = item.type==1?'模块':item.type==2?'菜单':'操作';
                item.name= name + '--' + item.module_name;
                delete item.icon;
                delete item.url;
                if(roleAccess.indexOf(item._id.toString())!=-1){
                    item.checked=true;
                }else{
                    item.checked=false;
                }
                item.children.forEach(jtem=>{
                    let name = jtem.type==1?'模块':jtem.type==2?'菜单':'操作'
                    jtem.name=name + '--' + jtem.module_name;
                    delete jtem.icon;
                    delete jtem.url;
                    if(roleAccess.indexOf(jtem._id.toString())!=-1){
                        jtem.checked=true;
                    }else{
                        jtem.checked=false;
                    }
                    jtem.children.forEach(ktem=>{
                        let name = ktem.type==1?'模块':ktem.type==2?'菜单':'操作'
                        ktem.name=name + '--' + ktem.module_name;
                        delete ktem.icon;
                        delete ktem.url;
                        if(roleAccess.indexOf(ktem._id.toString())!=-1){
                            ktem.checked=true;
                        }else{
                            ktem.checked=false;
                        }
                    })
                })
            })
            // console.log(list)
            await this.ctx.render('admin/role/auth',{
                list:JSON.stringify(list),
                id,
                name:name
            });
        }
    }
    async doAuth() {
        let role_id = this.ctx.request.body.role_id;
        let access_node = this.ctx.request.body.access_node;
        console.log(this.ctx.request.body)
        //先清除改角色所有权限
        await this.ctx.model.RoleAccess.deleteMany({"role_id":role_id});
        for(let i=0;i<access_node.length;i++){
            let roleAccessData = new this.ctx.model.RoleAccess({
                role_id:role_id,
                access_id:access_node[i]
            })
            roleAccessData.save();
        }
        this.ctx.body={
            code:0,
            msg:'授权成功'
        };
    }
}

module.exports = RoleController;
