'use strict';

const Service = require('egg').Service;

class GoodsColorService extends Service {
  async getColor(id) {
    let res = await this.ctx.model.GoodsColor.findOne({_id:id});
    return res;
  }
}

module.exports = GoodsColorService;
