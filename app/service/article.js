'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  async add(newArticle) {
    let res = await this.ctx.model.Article.create(newArticle);
    if(res){
        return {code:0,msg:'增加成功'}
    }else{
        return {code:1,msg:'增加失败'}
    }
  }
  async edit(newArticle) {
    let res = await this.ctx.model.Article.updateOne({'_id':newArticle.id},newArticle);
    if(res){
        return {code:0,msg:'修改成功'}
    }else{
        return {code:1,msg:'修改失败'}
    }
  }
  async list(){
    let res = await this.ctx.model.Article.aggregate([
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
  async getArticle(id){
    try {
        let res = await this.ctx.model.Article.aggregate([
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

module.exports = ArticleService;
