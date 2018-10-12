'use strict';

const Service = require('egg').Service;

class GoodsTypeService extends Service {
  async getList() {
    let res = await this.ctx.model.GoodsType.aggregate([
        {$match:{}}
    ])
    return res;
  }
  async add(newType){
    let res = await this.ctx.model.GoodsType.create(newType);
    if(res){
        return {code:0,msg:'增加成功'}
    }else{
        return {code:1,msg:'增加失败'}
    }
  }
  async edit(newType) {
    let res = await this.ctx.model.GoodsType.updateOne({'_id':newType.id},newType);
    if(res){
        return {code:0,msg:'修改成功'}
    }else{
        return {code:1,msg:'修改失败'}
    }
  }
  async getType(id){
    try {
        let res = await this.ctx.model.GoodsType.findOne({_id:id})
        return res;
    } catch (error) {
        return null
    }
  }
}

module.exports = GoodsTypeService;
