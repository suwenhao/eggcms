//扩展里引入第三方模块
var sd= require('silly-datetime');

module.exports = {
    formatTime(param) {
        // this 是 helper 对象，在其中可以调用其他 helper 方法
        // this.ctx => context 对象
        // this.app => application 对象
        console.log(param);
        return sd.format(new Date(param),'YYYY-MM-DD HH:mm')
    },
    getHelperDate(){
        return new Date();
    },
    stringify(param){
        return JSON.stringify(param)
    }
}