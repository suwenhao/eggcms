'use strict';

const Controller = require('egg').Controller;
const util = require('../../core/util.js')
class NavController extends Controller {
    async index() {
        let list = await this.service.nav.getList();
        await this.ctx.render('admin/nav/index',{
            list:JSON.stringify(list)
        });
    }
    async add() {
        await this.ctx.render('admin/nav/add');
    }
    async doAdd(){
        let newData = this.ctx.request.body;
        let res = await this.service.nav.add(newData)
        this.ctx.body = res;
    }
    async edit() {
        let id = this.ctx.request.query.id;
        let nav = await this.ctx.service.nav.getNav(id);
        console.log('---验证参数---')
        // console.log(role)
        if(nav===null){
            this.ctx.body={
                code:1,
                msg:'参数出错'
            }
            return;
        }else{
            await this.ctx.render('admin/nav/edit',{
                list:nav
            });
        }
    }
    async doEdit(){
        let newData = this.ctx.request.body;
        let res = await this.service.nav.edit(newData)
        this.ctx.body = res;
    }
    //删除
    async delete(){
        let {id,model} = this.ctx.request.query;
        await this.service.tools.delete(model,id)
    }
    async change(){
        let {id,model,attr,value} = this.ctx.request.query;
        await this.service.tools.change(model,id,attr,value);
    }
    async change() {
        let {id,model,attr,value} = this.ctx.request.query;
        await this.service.tools.change(model,id,attr,value);
    }
}

module.exports = NavController;
