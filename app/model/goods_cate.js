module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  var d = new Date();

  const GoodsCateSchema = new Schema({
    title: {type: String},
    cate_img: {type: String},
    filter_attr: {type:String},
    link: {type:String},
    template: {type:String},
    pid: {
      type:Schema.Types.Mixed //混合类型
    },
    sub_title: {type:String},
    keywords:{type:String},
    description: {type:String},
    sort: {type: Number,default:1},
    status: {type: Number, default:1},
    add_time: {           
      type: Number,
      default: d.getTime()
    }
  })
  return mongoose.model('GoodsCate', GoodsCateSchema, 'goods_cate');
}