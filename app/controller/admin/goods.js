'use strict';

const Controller = require('egg').Controller;
const sd= require('silly-datetime');

class GoodsController extends Controller {
  async index() {
    await this.ctx.render('admin/goods/index')
  }
  async list() {
    let query = this.ctx.request.body;
    try {
      let res = await this.service.goods.list(query);
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
    let colorList = await this.service.goods.getGoodsColor();
    let goodsTypes = await this.service.goodsType.getList();
    let goodsCates = await this.service.goodsCate.getGoodsTree();
    // console.log(goodsTypes);
    await this.ctx.render('admin/goods/add',{
      colorList,
      goodsTypes,
      goodsCates:JSON.stringify(goodsCates)
    })
  }
  async edit() {
    let id = this.ctx.request.query.id;
    //颜色
    let colorList = await this.service.goods.getGoodsColor();
    //商品类型属性
    let goodsTypes = await this.service.goodsType.getList();
    //商品数据
    let list = await this.service.goods.getGoods(id);
    //商品分类数据
    let goodsCates = await this.service.goodsCate.getGoodsTree();
    //对应商品图库
    let goodsImages = await this.service.goodsImage.getGoodsImage(id);
    //对应商品类型属性
    let goodsTypeAttrs = await this.service.goodsAttr.getGoodsAttribute(id);
    //商品颜色
    let goodsColors = []
    if(list){
      var colors = list.goods_color.split(',');
      for(let i=0;i<colors.length;i++){
        let color = await this.service.goodsColor.getColor(colors[i]);
        goodsColors.push(color);
      }
    }
    // console.log(goodsColors)
    let newGoodsTypeAttrs = []
    for(let i=0;i<goodsTypeAttrs.length;i++){
      if(goodsTypeAttrs[i].attribute_type==3){
        let newV=Object.assign({},goodsTypeAttrs[i]._doc);
        let goodsTypeAttribute = await this.service.goodsTypeAttribute.getType(goodsTypeAttrs[i].attribute_id);
        newV.attrs = goodsTypeAttribute.attr_value.split(',');
        newGoodsTypeAttrs.push(newV)
      }else{
        newGoodsTypeAttrs.push(goodsTypeAttrs[i])
      }
    }
    // console.log(newGoodsTypeAttrs);
    if(list){
      await this.ctx.render('admin/goods/edit',{
        list,
        colorList,
        goodsTypes,
        id,
        goodsColors:JSON.stringify(goodsColors),
        goodsImages:JSON.stringify(goodsImages),
        goodsTypeAttrs:JSON.stringify(newGoodsTypeAttrs),
        goodsCates:JSON.stringify(goodsCates)
      })
    }else{
      this.ctx.body={
          code:1,
          msg:'参数出错'
      }
      return;
    }
    
  }
  async goodsTypeAttribute(){
    var cate_id = this.ctx.request.query.id;
    if(cate_id==0){
      this.ctx.body = {
        code:0,
        msg:'获取商品属性类型成功',
        data:[]
      }
    }else{
      let list = await this.service.goodsTypeAttribute.getList(cate_id);
      this.ctx.body = {
        code:0,
        msg:'获取商品属性类型成功',
        data:list
      }
    }
  }
  
  async doAdd() {
    let newGoods = this.ctx.request.body;
    console.log(newGoods)
    //商品属性id
    if(newGoods.goods_type_id!='0'){
      newGoods.goods_type_id = this.app.mongoose.Types.ObjectId(newGoods.goods_type_id)
    }else{
      newGoods.pid = "0"
    }
    //增加商品
    let goodsResult = await this.service.goods.add(newGoods);
    if(goodsResult._id){
      //增加商品图库
      let goods_image_list = newGoods.goods_image_list;
      //图片存在
      if(goods_image_list){
        for(let i=0;i<goods_image_list.length;i++){
          let newGoodsImage = {
            goods_id:goodsResult._id,
            img_url:goods_image_list[i]
          }
          await this.service.goodsImage.add(newGoodsImage)
        }
      }
      
      //增加商品类型属性
      let attr_id_list = newGoods.attr_id_list;
      let attr_value_list = newGoods.attr_value_list;
      //商品类型属性存在
      if(attr_id_list){
        for(let i=0;i<attr_id_list.length;i++){
          //获取对应商品类型属性
          let goodsTypeAttributeResult = await this.service.goodsTypeAttribute.getType(attr_id_list[i]);
          let newAttr = {
            goods_id:goodsResult._id,
            cate_id:newGoods.cate_id,
            attribute_id:attr_id_list[i],
            attribute_type:goodsTypeAttributeResult.attr_type,
            attribute_title:goodsTypeAttributeResult.title,
            attribute_value:attr_value_list[i]?attr_value_list[i]:'',
          }
          await this.service.goodsAttr.add(newAttr)
        }
      }
    }
    this.ctx.body = {
      code:0,
      msg:'增加商品成功'
    }
  }
  async doEdit() {
    let newGoods = this.ctx.request.body;
    // console.log(newGoods)
    //商品属性id
    if(newGoods.goods_type_id!='0'){
      newGoods.goods_type_id = this.app.mongoose.Types.ObjectId(newGoods.goods_type_id)
    }else{
      newGoods.goods_type_id = "0"
    }
    //修改商品
    let goodsResult = await this.service.goods.edit(newGoods);
    if(goodsResult){
      //增加商品图库
      let goods_image_list = newGoods.goods_image_list;
      let goods_color_id = newGoods.goods_color_id;
      await this.ctx.model.GoodsImage.deleteMany({'goods_id':newGoods.id});
      //图片存在
      if(goods_image_list){
        for(let i=0;i<goods_image_list.length;i++){
          let newGoodsImage = {
            goods_id: newGoods.id,
            img_url: goods_image_list[i],
            color_id: goods_color_id[i]
          }
          await this.service.goodsImage.add(newGoodsImage)
        }
      }
      
      //增加商品类型属性
      let attr_id_list = newGoods.attr_id_list;
      let attr_value_list = newGoods.attr_value_list;
      //删除以前的数据
      await this.ctx.model.GoodsAttr.deleteMany({'goods_id':newGoods.id});
      //商品类型属性存在
      if(attr_id_list){
        for(let i=0;i<attr_id_list.length;i++){
          //获取对应商品类型属性
          let goodsTypeAttributeResult = await this.service.goodsTypeAttribute.getType(attr_id_list[i]);
          let newAttr = {
            goods_id:newGoods.id,
            cate_id:newGoods.cate_id,
            attribute_id:attr_id_list[i],
            attribute_type:goodsTypeAttributeResult.attr_type,
            attribute_title:goodsTypeAttributeResult.title,
            attribute_value:attr_value_list[i]?attr_value_list[i]:'',
          }
          await this.service.goodsAttr.add(newAttr)
        }
      }
      this.ctx.body = {
        code:0,
        msg:'修改商品成功'
      }
    }else{
      this.ctx.body={
        code:1,
        msg:'参数出错'
      }
      return;
    }
  }
  async delete() {
    let {id,model,attr,value} = this.ctx.request.query;
    await this.service.tools.change(model,id,attr,value);
  }
  async trueDelete(){
    let {id,model} = this.ctx.request.query;
    await this.ctx.model.GoodsAttr.deleteMany({'goods_id':id});
    await this.ctx.model.GoodsImage.deleteMany({'goods_id':id});
    await this.service.tools.delete(model,id)
  }
  async change() {
    let {id,model,attr,value} = this.ctx.request.query;
    await this.service.tools.change(model,id,attr,value);
  }
}

module.exports = GoodsController;
