'use strict';

const Service = require('egg').Service;

class ImageService extends Service {
  async list(query) {
    let page=(query.page-1)*query.limit;
    let limit = query.limit*1;
    let count = await this.ctx.model.Image.countDocuments();
    console.log('--count--')
    console.log(count)
    let list = await this.ctx.model.Image.aggregate([
      {$skip:page},
      {$limit:limit}
    ]);
    // console.log(list)
    return {list,count};
  }
}

module.exports = ImageService;
