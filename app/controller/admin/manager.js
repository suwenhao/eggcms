'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
    async index() {
        let list = await this.service.admin.getAdminList()
        list = list.map(v=>{
            return {
                ...v,
                roleTitle:v.role[0].title,
                roleDescription:v.role[0].roleDescription,
                roleStatus:v.role[0].status,
                roleAddTime:v.role[0].add_time,
            }
        })
        // console.log(JSON.stringify(list))
        await this.ctx.render('admin/manager/index',{
            list:JSON.stringify(list)
        });
    }
    async add() {
        let roles = await this.service.role.getRoleList();
        await this.ctx.render('admin/manager/add',{
            roles
        });
    }
    async doAdd() {
        let addResult = this.ctx.request.body;
        addResult.password = await this.service.tools.md5(addResult.password)
        let res = await this.service.admin.add(addResult)
        this.ctx.body = res;
    }
    async edit() {
        let id = this.ctx.request.query.id;
        let admin = await this.ctx.service.admin.getManager(id);
        let roles = await this.service.role.getRoleList();
        console.log('---验证参数---')
        // console.log(admin)
        if(admin===null){
            this.ctx.body={
                code:1,
                msg:'参数出错'
            }
            return;
        }else{
            await this.ctx.render('admin/manager/edit',{
                roles,
                list:admin
            });
        }
    }
    async doEdit(){
        let editResult = this.ctx.request.body;
        if(editResult.password){
            editResult.password = await this.service.tools.md5(editResult.password)
        }
        let res = await this.service.admin.edit(editResult)
        this.ctx.body = res;
    }
    async delete(){
        let {id,model} = this.ctx.request.query;
        await this.service.tools.delete(model,id)
    }
    async change(){
        let {id,model,attr,value} = this.ctx.request.query;
        await this.service.tools.change(model,id,attr,value);
    }
}

module.exports = ManagerController;
