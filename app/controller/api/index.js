'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
    async index() {
        this.ctx.body = 'api'
    }
}

module.exports = IndexController;
