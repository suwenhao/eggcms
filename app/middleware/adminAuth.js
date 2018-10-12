const url = require('url')
module.exports = (options, app) =>{
    return async (ctx, next)=>{
        var pathname=url.parse(ctx.url).pathname;
        if(ctx.session&&ctx.session.userinfo){
            ctx.state.userinfo = ctx.session.userinfo;
            let hasAuth =await ctx.service.tools.checkAuth();
            if(hasAuth.auth){
                let authList = await ctx.service.tools.getAuthList(ctx.session.userinfo.role_id)
                ctx.state.asideList = JSON.stringify(authList)
                // console.log(JSON.stringify(authList))
                await next();
            }else{
                if(hasAuth.type==3){
                    ctx.body = {
                        code:1,
                        msg:'您没有权限进行该操作'
                    }
                }else{
                    ctx.redirect(app.adminName()+'/noauth')
                }
            }
        }else{
            if(pathname===app.adminName()+'/login'||pathname===app.adminName()+'/code'||pathname===app.adminName()+'/dologin'){
                await next();
            }else{
                ctx.redirect(app.adminName()+'/login')
            }
        }
    }
}