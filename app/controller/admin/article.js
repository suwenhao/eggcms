'use strict';

const Controller = require('egg').Controller;
const sd= require('silly-datetime');

class ArticleController extends Controller {
    async index() {
        await this.ctx.render('admin/article/index')
    }
    async list() {
        let query = this.ctx.request.body;
        try {
          let res = await this.service.article.getlist(query);
          // console.log(res.list)
          res.list.forEach(item=>{
            item.time=sd.format(new Date(item.add_time),'YYYY-MM-DD HH:mm')
            // console.log(item.time)
          })
          this.ctx.body={
            code:0,
            msg:'获取成功',
            count:res.count,
            data:res.list,
          }
        } catch (error) {
          // console.log(error)
          this.ctx.body={
            code:1,
            msg:'获取失败',
            data:[],
          }
        }
    }
    async add() {
        let atricleCates = await this.service.articleCate.getArticleTree();
        await this.ctx.render('admin/article/add',{
            atricleCates:JSON.stringify(atricleCates)
        })
    }
    async edit() {
        let id = this.ctx.request.query.id;
        let atricleCates = await this.service.articleCate.getArticleTree();
        //文章数据
        let list = await this.service.article.getArticle(id);
        if(list){
            await this.ctx.render('admin/article/edit',{
              list,
              id,
              atricleCates:JSON.stringify(atricleCates)
            })
        }else{
            this.ctx.body={
                code:1,
                msg:'参数出错'
            }
            return;
        }
    }
    async doAdd() {
        let addResult = this.ctx.request.body;
        let res = await this.service.article.add(addResult);
        this.ctx.body = res;
    }
    async doEdit() {
        let editResult = this.ctx.request.body;
        if(editResult.cate_id!='0'){
            editResult.cate_id = this.app.mongoose.Types.ObjectId(editResult.cate_id)
        }else{
            editResult.cate_id = "0"
        }
        let res = await this.service.article.edit(editResult);
        this.ctx.body = res;
    }
    async delete() {
        let {id,model} = this.ctx.request.query;
        await this.service.tools.delete(model,id)
    }
    async change() {
        let {id,model,attr,value} = this.ctx.request.query;
        await this.service.tools.change(model,id,attr,value);
    }
}

module.exports = ArticleController;
