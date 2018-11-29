module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    var d=new Date();
   
    const FocusSchema = new Schema({
      title: { type: String},
      type: { type: Number},
      img_id: { type:Schema.Types.ObjectId, },
      link: { type: String  },
      sort: { type: Number  },
      status: { type: Number,default:1  },
      add_time: {
        type:Number,
        default: d.getTime()    
       }
    });
   
    return mongoose.model('Focus', FocusSchema,'focus');
}