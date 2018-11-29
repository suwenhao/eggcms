'use strict';

const Service = require('egg').Service;

class NavService extends Service {
  async getList() {
    let res = await this.ctx.model.Nav.aggregate([
        {$match:{}}
    ])
    return res;
  }
  async add(newData){
    let res = await this.ctx.model.Nav.create(newData);
    if(res){
        return {code:0,msg:'增加成功'}
    }else{
        return {code:1,msg:'增加失败'}
    }
  }
  async edit(newData) {
    let res = await this.ctx.model.Nav.updateOne({'_id':newData.id},newData);
    if(res){
        return {code:0,msg:'修改成功'}
    }else{
        return {code:1,msg:'修改失败'}
    }
  }
  async getNav(id){
    try {
        let res = await this.ctx.model.Nav.findOne({_id:id})
        return res;
    } catch (error) {
        return null
    }
  }
}

module.exports = NavService;
