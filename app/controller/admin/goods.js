'use strict';

const Controller = require('egg').Controller;

class GoodsController extends Controller {
  async index() {
    let list = await this.service.goods.list();
    await this.ctx.render('admin/goods/index',{
        list:JSON.stringify(list)
    })
  }
  async add() {
    let list = await this.service.goodsCate.getList();
    // console.log(list);
    await this.ctx.render('admin/goods/add',{
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
    
  }
  async doEdit() {
    
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

module.exports = GoodsController;
