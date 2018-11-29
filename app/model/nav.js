module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    var d = new Date();
    const NavSchema = new Schema({
        title: { type: String },
        link: { type: String },
        position: { 
            type: Number, 
            default: 2  //1-顶部，2-中间，3-底部
        },
        is_opennew: { 
            type: Number, 
            default: 1  //1-本窗口，2新窗口
        },
        relation: { type: String, default: '' },
        sort: { type: Number },
        add_time: {
            type:Number,
            default: d.getTime()
        },
        status: {
            type:Number,
            default:1
        }
    });

    return mongoose.model('Nav', NavSchema, 'nav');
}