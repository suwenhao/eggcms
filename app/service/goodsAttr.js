'use strict';

const Service = require('egg').Service;

class GoodsAttrService extends Service {
  async add(newAttr) {
    let res = await this.ctx.model.GoodsAttr.create(newAttr);
    return res;
  }
  async getGoodsAttribute(goods_id) {
    let res = await this.ctx.model.GoodsAttr.find({goods_id:goods_id});
    return res;
  }
}

module.exports = GoodsAttrService;
