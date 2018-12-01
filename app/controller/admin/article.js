'use strict';

const Controller = require('egg').Controller;
const sd= require('silly-datetime');

class ArticleController extends Controller {
    async index() {
        let list = await this.service.article.list();
        list = list.map(v=>{
            return {
                ...v,
                img:v.img.length>0?v.img[0]:{src:''},
                add_time:sd.format(new Date(v.add_time),'YYYY-MM-DD HH:mm')
            }
        })
        // console.log(JSON.stringify(list))
        await this.ctx.render('admin/article/index',{
            list:JSON.stringify(list)
        })
    }
    async add() {
        let atricleCates = await this.service.articleCate.getArticleTree();
        await this.ctx.render('admin/article/add',{
            atricleCates:JSON.stringify(atricleCates)
        })
    }
    async edit() {
        let id = this.ctx.request.query.id;
        var res = null;
        try {
            id = this.app.mongoose.Types.ObjectId(id)
            res = await this.ctx.service.article.getArticle(id);
        } catch (error) {
            this.ctx.body={
                code:1,
                msg:'参数出错'
            }
            return;
        }
        console.log('---验证参数---')
        console.log(res);
        if(res===null||res.length<1){
            this.ctx.body={
                code:1,
                msg:'参数出错'
            }
            return;
        }else{
            let list=res.map(v=>{
                return {
                    ...v,
                    img:v.img.length>0?v.img[0]:[{src:''}]
                }
            })
            // console.log(list)
            await this.ctx.render('admin/article/edit',{
                list:list[0],
                id
            })
        }
        
    }
    async doAdd() {
        let addResult = this.ctx.request.body;
        let res = await this.service.article.add(addResult);
        this.ctx.body = res;
    }
    async doEdit() {
        let editResult = this.ctx.request.body;
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
