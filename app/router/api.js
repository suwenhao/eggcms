module.exports = app => {
    /*api*/
    app.router.get('/api/index',app.controller.api.index.index);
}