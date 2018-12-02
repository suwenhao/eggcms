'use strict';

const Service = require('egg').Service;
const util = require('../core/util.js')

class GoodsService extends Service {
  async list(query) {
    let page=(query.page-1)*query.limit;
    let limit = query.limit*1;
    
    // console.log('--count--')
    // console.log(count)
    var match = {
      is_delete:0
    }
    if(query.title){
      match.title = {$regex:query.title};
    }
    if(query.is_shelf=="0"||query.is_shelf=="1"){
      match.is_shelf = parseInt(query.is_shelf);
    }
    if(query.price){
      match.shop_price = {"$gte" : parseInt(query.price[0]), "$lte" : parseInt(query.price[1])};
    }
    //长度
    let count = await this.ctx.model.Goods.countDocuments(match);
    console.log(match)
    //列表
    let list = await this.ctx.model.Goods.aggregate([
      {$skip:page},
      {$limit:limit},
      {$match:match}
    ]);
    // console.log(list)
    list=list.sort(util.compare);
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
