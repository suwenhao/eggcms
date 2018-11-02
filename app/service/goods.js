'use strict';

const Service = require('egg').Service;

class GoodsService extends Service {
  async list(query) {
    let page=(query.page-1)*query.limit;
    let limit = query.limit*1;
    let count = await this.ctx.model.Goods.countDocuments();
    // console.log('--count--')
    // console.log(count)
    let list = await this.ctx.model.Goods.aggregate([
      {$skip:page},
      {$limit:limit}
    ]);
    // console.log(list)
    return {list,count};
  }
  async getGoodsColor(){
    let list = await this.ctx.model.GoodsColor.find({});
    return list;
  }
  async add(newGoods){
    let res = await this.ctx.model.Goods.create(newGoods);
    return res;
  }
  async edit(newGoods){
    try {
      let res = await this.ctx.model.Goods.updateOne({'_id':newGoods.id},newGoods);
    return res;
    } catch (error) {
      return null
    }
  }
  async getGoods(id){
    try {
      let list = await this.ctx.model.Goods.findOne({_id:id});
      return list;
    } catch (error) {
      return null
    }
  }
}

module.exports = GoodsService;
