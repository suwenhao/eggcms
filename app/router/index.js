module.exports = app => {
    /*首页*/
    app.router.get('/',app.controller.index.index.index);
    app.router.get('/getnav',app.controller.index.index.getNav);
    app.router.get('/getGoodsCate',app.controller.index.index.getGoodsCate)
    //
}