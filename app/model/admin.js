module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    var d = new Date();
    const AdminSchema = new Schema({
        username  : { type: String, unique: true },
        password:String,
        mobile:String,
        email:String,
        sex:{type:String,default:'男'},
        description:String,
        role_id:{
            type:Schema.Types.ObjectId,
        },
        add_time:{type:Number,default:d.getTime()},
        is_super:{type:Number,default:0},
        status:{
            type:Number,
            default:1
        }
    });

    return mongoose.model('Admin', AdminSchema, 'admin');
}