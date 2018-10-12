'use strict';

const Controller = require('egg').Controller;
const sd= require('silly-datetime');

class GoodsTypeController extends Controller {
  async index() {
    let list = await this.service.goodsType.getList();
    list = list.map(v=>{
        return {
            ...v,
            time:sd.format(new Date(v.add_time),'YYYY-MM-DD HH:mm')
        }
    })
    await this.ctx.render('admin/goodsType/index',{
        list:JSON.stringify(list)
    })
  }
  async add() {
    await this.ctx.render('admin/goodsType/add')
  }
  async edit() {
    let id = this.ctx.request.query.id;
    let list = await this.service.goodsType.getType(id);
    console.log(JSON.stringify(list))
    await this.ctx.render('admin/goodsType/edit',{
        list,
        id
    })
  }
  async doAdd() {
    let newType = this.ctx.request.body;
    let res = await this.service.goodsType.add(newType)
    this.ctx.body = res;
  }
  async doEdit() {
    let newType = this.ctx.request.body;
    let res = await this.service.goodsType.edit(newType)
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

module.exports = GoodsTypeController;
