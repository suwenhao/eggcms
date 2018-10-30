'use strict';

const Controller = require('egg').Controller;

class GoodsCateController extends Controller {
  async index() {
    let list = await this.service.goodsCate.list();
    await this.ctx.render('admin/goodsCate/index',{
        list:JSON.stringify(list)
    })
  }
  async add() {
    let list = await this.service.goodsCate.getList();
    // console.log(list);
    await this.ctx.render('admin/goodsCate/add',{
      list:list
    })
  }
  async edit() {
    let id = this.ctx.request.query.id;
    let list = await this.service.goodsCate.getList();
    let res = await this.service.goodsCate.getCate(id);
    // console.log(res)
    if(res==null){
      this.ctx.body={
        code:1,
        msg:'参数出错'
      }
      return;
    }
    await this.ctx.render('admin/goodsCate/edit',{
      list,
      res,
      id,
    })
  }
  async doAdd() {
    let newCate = this.ctx.request.body;
   
    if(newCate.pid!='0'){
      newCate.pid = this.app.mongoose.Types.ObjectId(newCate.pid)
    }else{
      newCate.pid = "0"
    }
    // console.log(newCate.pid)
    let res = await this.service.goodsCate.add(newCate)
    this.ctx.body = res;
  }
  async doEdit() {
    let editCate = this.ctx.request.body;
    if(editCate.pid!='0'){
      editCate.pid = this.app.mongoose.Types.ObjectId(editCate.pid)
    }else{
      editCate.pid = "0"
    }
    let res = await this.service.goodsCate.edit(editCate)
    this.ctx.body = res;
  }
  async delete() {
    let {id,model} = this.ctx.request.query;
    await this.service.tools.delete(model,id)
  }
  async change() {
    let {id,model,attr,value} = this.ctx.request.query;
    await this.service.tools.change(model,id,attr,value);
  }
}

module.exports = GoodsCateController;
