'use strict';


const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success() {
      this.ctx.body='登录成功';
  }
  async code() {
      let captcha = await this.service.tools.captcha()
      this.ctx.session.code = captcha.text.toLowerCase();
      this.ctx.response.type = 'image/svg+xml'
      console.log(this.ctx.session.code)
      this.ctx.body=captcha.data;
  }
  async delete() {
    let {id,model} = this.ctx.request.query;
    await this.service.tools.delete(model,id)
  }
}

module.exports = BaseController;
