'use strict';

const Controller = require('egg').Controller;

const map = (list)=>{
    let l=list.map(v=>{
        return {
            ...v,
            name:v.module_name,
            pid:'0',
            children:v.children.map(k=>{
                delete k.icon;
                delete k.url;
                return {
                    ...k,
                    name:k.module_name,
                    pid:v._id,
                }
            })
        }
    })
    return l;
}
class AccessController extends Controller {
    async index() {
        let list = await this.service.access.getAccessList();
        await this.ctx.render('admin/access/index',{
            list:list
        });
    }
    async add() {
        let list = await this.service.access.getAccessModules()
        list=map(list)
        await this.ctx.render('admin/access/add',{
            moduleList:JSON.stringify(list)
        });
    }
    async doAdd() {
        let addResult = this.ctx.request.body;
        if(addResult.module_id!='0'){
            addResult.module_id = this.app.mongoose.Types.ObjectId(addResult.module_id)
        }else{
            addResult.module_id = "0"
        }
        let res = await this.service.access.add(addResult)
        this.ctx.body = res;
    }
    async edit() {
        let id = this.ctx.request.query.id;
        let list = await this.service.access.getAccessModules();
        let doc = await this.service.access.getAccess(id);
        list=list=map(list)
        console.log('---验证参数---')
        // console.log(doc)
        if(doc===null){
            this.ctx.body={
                code:1,
                msg:'参数出错'
            }
            return;
        }else{
            await this.ctx.render('admin/access/edit',{
                moduleList:JSON.stringify(list),
                access:doc
            });
        }
    }
    async doEdit() {
        let editResult = this.ctx.request.body;
        if(editResult.module_id!='0'){
            editResult.module_id = this.app.mongoose.Types.ObjectId(editResult.module_id)
        }else{
            editResult.module_id = "0"
        }
        let res = await this.service.access.edit(editResult)
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

module.exports = AccessController;
