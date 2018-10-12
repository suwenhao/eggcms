module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    var d = new Date();
    const RoleSchema = new Schema({
        title  : { type: String },
        description:String,
        add_time:{type:Number,default:d.getTime()},
        status:{
            type:Number,
            default:1
        }
    });

    return mongoose.model('Role', RoleSchema, 'role');
}