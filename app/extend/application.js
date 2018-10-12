//外部可以调用this.app.foo这个方法
module.exports = {
    foo(param){
        console.log('foo方法')
    },
    adminName(){
        return '/ad'
    }
}