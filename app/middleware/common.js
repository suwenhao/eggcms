let url = require('url');
module.exports = (options, app) => {
    return async (ctx, next)=>{
        ctx.state.csrf = ctx.csrf;
        let pathname = url.parse(ctx.url).pathname.substring(1)
        ctx.state.adminName = app.adminName();
        ctx.state.G={
            url:pathname.split('/')
        }
        await next();
    }
}