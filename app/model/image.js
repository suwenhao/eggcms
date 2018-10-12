module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    var d = new Date();
    const ImageSchema = new Schema({
        src  : { type: String },
        add_time:{type:Number,default:d.getTime()},
        status:{
            type:Number,
            default:1
        }
    });

    return mongoose.model('Image', ImageSchema, 'image');
}