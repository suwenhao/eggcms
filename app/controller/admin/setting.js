'use strict';

const Controller = require('egg').Controller;

class SettingController extends Controller {
    async index() {
        let data = await this.service.setting.getSetting();
        await this.ctx.render('admin/setting/index',{
            data
        });
    }
    async doEdit(){
        let newData = this.ctx.request.body;
        let res = await this.service.setting.edit(newData)
        this.ctx.body = res;
    }
}

module.exports = SettingController;
