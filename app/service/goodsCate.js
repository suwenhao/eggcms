'use strict';

const Service = require('egg').Service;
const util = require('../core/util.js')

class GoodsCateService extends Service {
  async getList() {
    let res = await this.ctx.model.GoodsCate.find({"pid":"0"})
    return res;
  }
  async getGoodsCate(pid) {
    let res = await this.ctx.model.GoodsCate.find({"pid":pid})
    return res;
  }
  async getGoodsTree(){
    try {
        let res = await this.ctx.model.GoodsCate.aggregate([
            {$match:{'pid':'0'}},
            {
                $lookup:{
                    from:'goods_cate',
                    localField:'_id',
                    foreignField:'pid',
                    as:'children'
                }
            }
        ]);
        res.sort(util.compare);
        res=res.map(v=>{
            return {
                ...v,
                name:v.title,
                children:v.children.map(j=>{
                  return {
                    ...j,
                    name:j.title
                  }
                }).sort(util.compare)
            }
        })
        return res
    } catch (error) {
        return null
    }
  }
  async list(){
    let list = await this.ctx.model.GoodsCate.aggregate([
        {$match:{}}
    ]);
    return list.sort(util.compare);
  }
  async getCate(id) {
    try {
      let res = await this.ctx.model.GoodsCate.findOne({"_id":id})
      return res;
    } catch (error) {
      return null
    }
  }
  async add(newCate) {
    let res = await this.ctx.model.GoodsCate.create(newCate);
    if(res){
        return {code:0,msg:'增加成功'}
    }else{
        return {code:1,msg:'增加失败'}
    }
  }
  async edit(newCate) {
    let res = await this.ctx.model.GoodsCate.updateOne({'_id':newCate.id},newCate);
    if(res){
        return {code:0,msg:'修改成功'}
    }else{
        return {code:1,msg:'修改失败'}
    }
  }
}

module.exports = GoodsCateService;
