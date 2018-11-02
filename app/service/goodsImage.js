'use strict';

const Service = require('egg').Service;

class GoodsImageService extends Service {
  async add(newGoodsImage) {
    let res = await this.ctx.model.GoodsImage.create(newGoodsImage);
    return res;
  }
  async getGoodsImage(goods_id) {
    let res = await this.ctx.model.GoodsImage.find({goods_id:goods_id});
    return res;
  }
}

module.exports = GoodsImageService;
