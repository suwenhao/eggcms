'use strict';

const Controller = require('egg').Controller;
const sd= require('silly-datetime');

class ImageController extends Controller {
  async index() {
    await this.ctx.render('admin/image/index');
  }
  async list() {
    let query = this.ctx.request.body;
    try {
      let res = await this.service.image.list(query);
      // console.log(res.list)
      res.list.forEach(item=>{
        item.time=sd.format(new Date(item.add_time),'YYYY-MM-DD HH:mm')
        // console.log(item.time)
      })
      this.ctx.body={
        code:0,
        msg:'获取成功',
        count:res.count,
        data:res.list,
      }
    } catch (error) {
      this.ctx.body={
        code:1,
        msg:'获取失败',
        data:[],
      }
    }
  }
  async delete() {
    let {id,model} = this.ctx.request.query;
    await this.service.tools.delete(model,id)
  }
}

module.exports = ImageController;
