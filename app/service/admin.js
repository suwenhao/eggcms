'use strict';

const Service = require('egg').Service;

class AdminService extends Service {
  //获取登录管理员
  async getAdmin(username,password) {
      let res = await this.ctx.model.Admin.find({username,password});
      return res;
  }
  //获取单个管理员信息
  async getManager(id) {
    try {
        let res = await this.ctx.model.Admin.findOne({'_id':id});
        return res;
    } catch (error) {
        return null
    }
  }
  //获取管理员列表
  async getAdminList(){
    let res = await this.ctx.model.Admin.aggregate([
      {
        $lookup:{
          from:'role',
          localField:'role_id',
          foreignField:'_id',
          as:'role'
        }
      },
      {
        $project:{password:0}
      }
    ]);
      return res;
  }
  //增加管理员
  async add(newAdmin){
    let doc = await this.ctx.model.Admin.find({username:newAdmin.username});
    if(doc.length>0){
      return {code:1,msg:'管理员已经存在'}
    }else{
      let res = await this.ctx.model.Admin.create(newAdmin);
      if(res){
        return {code:0,msg:'增加管理员成功'}
      }else{
        return {code:1,msg:'增加管理员失败'}
      }
    }
  }
  //修改管理员
  async edit(newAdmin){
    let res = await this.ctx.model.Admin.updateOne({'_id':newAdmin.id},newAdmin);
    if(res){
      return {code:0,msg:'修改管理员成功'}
    }else{
      return {code:1,msg:'修改管理员失败'}
    }
  }
}

module.exports = AdminService;
