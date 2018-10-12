'use strict';

const Service = require('egg').Service;

class GoodsTypeAttributeService extends Service {
    async getList(id) {
        let cate_id = this.app.mongoose.Types.ObjectId(id);
        let res = await this.ctx.model.GoodsTypeAttribute.aggregate([
            {
                $lookup:{
                  from:'goods_type',
                  localField:'cate_id',
                  foreignField:'_id',
                  as:'goods_type'
                }
            },
            {$match:{cate_id:cate_id}}
        ])
        return res;
    }
    async add(newType){
    let res = await this.ctx.model.GoodsTypeAttribute.create(newType);
        if(res){
            return {code:0,msg:'增加成功'}
        }else{
            return {code:1,msg:'增加失败'}
        }
    }
    async edit(newType) {
        let res = await this.ctx.model.GoodsTypeAttribute.updateOne({'_id':newType.id},newType);
        if(res){
            return {code:0,msg:'修改成功'}
        }else{
            return {code:1,msg:'修改失败'}
        }
    }
    async getType(id){
        try {
            let res = await this.ctx.model.GoodsTypeAttribute.findOne({_id:id})
            return res;
        } catch (error) {
            return null
        }
    }
}

module.exports = GoodsTypeAttributeService;
