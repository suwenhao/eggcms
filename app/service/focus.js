'use strict';

const Service = require('egg').Service;

class FocusService extends Service {
  async add(newFocus) {
    let res = await this.ctx.model.Focus.create(newFocus);
    if(res){
        return {code:0,msg:'增加成功'}
    }else{
        return {code:1,msg:'增加失败'}
    }
  }
  async edit(newFocus) {
    let res = await this.ctx.model.Focus.updateOne({'_id':newFocus.id},newFocus);
    if(res){
        return {code:0,msg:'修改成功'}
    }else{
        return {code:1,msg:'修改失败'}
    }
  }
  async getFocusList(){
    let res = await this.ctx.model.Focus.aggregate([
      {
        $lookup:{
          from:'image',
          localField:'img_id',
          foreignField:'_id',
          as:'img'
        }
      }
    ]);
    return res;
  }
  async getFocus(id){
    try {
        let res = await this.ctx.model.Focus.aggregate([
          {
            $lookup:{
              from:'image',
              localField:'img_id',
              foreignField:'_id',
              as:'img'
            }
          },
          {
            $match:{_id:id}
          }
        ])
        return res;
    } catch (error) {
        return null
    }
  }
}

module.exports = FocusService;
