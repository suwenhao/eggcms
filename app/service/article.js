'use strict';

const Service = require('egg').Service;
const util = require('../core/util.js')

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
  async getlist(query) {
    let page=(query.page-1)*query.limit;
    let limit = query.limit*1;

    var match = {}

    if(query.title){
      match.title = {$regex:query.title};
    }

    let count = await this.ctx.model.Article.countDocuments(match);
    // console.log('--count--')
    // console.log(count)
    let list = await this.ctx.model.Article.aggregate([
      {
        $lookup:{
          from:'article_cate',
          localField:'cate_id',
          foreignField:'_id',
          as:'cate'
        }
      },
      {$skip:page},
      {$limit:limit},
      {$match:match}
    ]);
    // console.log(list)
    list=list.sort(util.compare);
    return {list,count};
  }
  async getArticle(id){
    try {
      let list = await this.ctx.model.Article.findOne({_id:id});
      return list;
    } catch (error) {
      return null
    }
  }
}

module.exports = ArticleService;
