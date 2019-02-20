'use strict';

const Controller = require('egg').Controller;
const sd= require('silly-datetime');

class IndexController extends Controller {
    async index() {
        this.ctx.body = '首页'
    }
    async getNav(){
        let num = this.ctx.query.num;
        // console.log(num)
        try {
            let res = await this.service.nav.getPosiNav(num);
            // console.log(res)
            this.ctx.body = {
                code:0,
                msg:'获取成功',
                data:res
            }
        } catch (error) {
            this.ctx.body = {
                code:1,
                msg:'获取失败'
            }
        }
    }
    async getGoodsCate(){
        try {
            let list = await this.service.goodsCate.getGoodsTree();
            this.ctx.body = {
                code:0,
                msg:'获取成功',
                data:list
            }
        } catch (error) {
            this.ctx.body = {
                code:1,
                msg:'获取失败'
            }
        }
    }
}

module.exports = IndexController;
