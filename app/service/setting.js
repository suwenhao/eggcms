'use strict';

const Service = require('egg').Service;

class SettingService extends Service {
  async getSetting() {
    let res = await this.ctx.model.Setting.findOne({});
    return res;
  }
  async edit(newData){
    let res = await this.ctx.model.Setting.updateOne({'_id':newData.id},newData);
    if(res){
        return {code:0,msg:'修改成功'}
    }else{
        return {code:1,msg:'修改失败'}
    }
  }
}

module.exports = SettingService;
