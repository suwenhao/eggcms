'use strict';

const Controller = require('egg').Controller;
const sd= require('silly-datetime');

class GoodsTypeAttributeController extends Controller {
  async index() {
    var cate_id = this.ctx.request.query.id;
    let list = await this.service.goodsTypeAttribute.getList(cate_id);
    list = list.map(v=>{
        return {
            ...v,
            time:sd.format(new Date(v.add_time),'YYYY-MM-DD HH:mm')
        }
    })
    await this.ctx.render('admin/goodsTypeAttribute/index',{
        list:JSON.stringify(list),
        id:cate_id
    })
  }
  async add() {
    var cate_id = this.ctx.request.query.id;
    let list = await this.service.goodsType.getList();
    await this.ctx.render('admin/goodsTypeAttribute/add',{
      list,
      id:cate_id
    })
  }
  async edit() {
    let id = this.ctx.request.query.id;
    var cate_id = this.ctx.request.query.cate_id;
    let list = await this.service.goodsType.getList();
    let gta = await this.service.goodsTypeAttribute.getType(id);
    console.log(JSON.stringify(list))
    await this.ctx.render('admin/goodsTypeAttribute/edit',{
        list,
        gta,
        id,
        cate_id
    })
  }
  async doAdd() {
    let newType = this.ctx.request.body;
    let res = await this.service.goodsTypeAttribute.add(newType)
    this.ctx.body = res;
  }
  async doEdit() {
    let newType = this.ctx.request.body;
    let res = await this.service.goodsTypeAttribute.edit(newType)
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

module.exports = GoodsTypeAttributeController;
