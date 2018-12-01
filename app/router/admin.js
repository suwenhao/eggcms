module.exports = app => {
  app.router.get(app.adminName()+'/login',app.controller.admin.common.login);
  app.router.get(app.adminName()+'/code',app.controller.admin.common.code);
  app.router.post(app.adminName()+'/dologin',app.controller.admin.common.dologin)
  app.router.get(app.adminName()+'/loginout',app.controller.admin.common.loginOut)
  app.router.get(app.adminName()+'/console',app.controller.admin.common.console);
  app.router.get(app.adminName()+'/noauth',app.controller.admin.common.noauth);
  app.router.post(app.adminName()+'/upload',app.controller.admin.common.upload);
  app.router.post(app.adminName()+'/delete',app.controller.admin.common.delete);
  app.router.get(app.adminName(),app.controller.admin.common.index);
  /*管理员管理*/
  app.router.get(app.adminName()+'/manager',app.controller.admin.manager.index);
  app.router.get(app.adminName()+'/manager/add',app.controller.admin.manager.add);
  app.router.post(app.adminName()+'/manager/doadd',app.controller.admin.manager.doAdd);
  app.router.get(app.adminName()+'/manager/edit',app.controller.admin.manager.edit);
  app.router.post(app.adminName()+'/manager/doedit',app.controller.admin.manager.doEdit);
  app.router.get(app.adminName()+'/manager/delete',app.controller.admin.manager.delete);
  app.router.get(app.adminName()+'/manager/change',app.controller.admin.manager.change);
  /*角色管理*/
  app.router.get(app.adminName()+'/role',app.controller.admin.role.index);
  app.router.get(app.adminName()+'/role/add',app.controller.admin.role.add);
  app.router.post(app.adminName()+'/role/doadd',app.controller.admin.role.doAdd);
  app.router.get(app.adminName()+'/role/edit',app.controller.admin.role.edit);
  app.router.post(app.adminName()+'/role/doedit',app.controller.admin.role.doEdit);
  app.router.get(app.adminName()+'/role/auth',app.controller.admin.role.auth);
  app.router.post(app.adminName()+'/role/doauth',app.controller.admin.role.doAuth);
  app.router.get(app.adminName()+'/role/delete',app.controller.admin.role.delete);
  app.router.get(app.adminName()+'/role/change',app.controller.admin.role.change);
  /*权限管理*/
  app.router.get(app.adminName()+'/access',app.controller.admin.access.index);
  app.router.get(app.adminName()+'/access/add',app.controller.admin.access.add);
  app.router.post(app.adminName()+'/access/doadd',app.controller.admin.access.doAdd);
  app.router.get(app.adminName()+'/access/edit',app.controller.admin.access.edit);
  app.router.post(app.adminName()+'/access/doedit',app.controller.admin.access.doEdit);
  app.router.get(app.adminName()+'/access/delete',app.controller.admin.access.delete);
  app.router.get(app.adminName()+'/access/change',app.controller.admin.access.change);
  //轮播图管理
  app.router.get(app.adminName()+'/focus',app.controller.admin.focus.index);
  app.router.get(app.adminName()+'/focus/add',app.controller.admin.focus.add);
  app.router.post(app.adminName()+'/focus/doadd',app.controller.admin.focus.doAdd);
  app.router.get(app.adminName()+'/focus/edit',app.controller.admin.focus.edit);
  app.router.post(app.adminName()+'/focus/doedit',app.controller.admin.focus.doEdit);
  app.router.get(app.adminName()+'/focus/delete',app.controller.admin.focus.delete);
  app.router.get(app.adminName()+'/focus/change',app.controller.admin.focus.change);
  //图片管理
  app.router.get(app.adminName()+'/image',app.controller.admin.image.index);
  app.router.post(app.adminName()+'/image',app.controller.admin.image.list);
  app.router.get(app.adminName()+'/image/delete',app.controller.admin.image.delete);
   //商品类型
   app.router.get(app.adminName()+'/goodsType',app.controller.admin.goodsType.index);
   app.router.get(app.adminName()+'/goodsType/add',app.controller.admin.goodsType.add);
   app.router.get(app.adminName()+'/goodsType/edit',app.controller.admin.goodsType.edit);
   app.router.post(app.adminName()+'/goodsType/doadd',app.controller.admin.goodsType.doAdd);
   app.router.post(app.adminName()+'/goodsType/doedit',app.controller.admin.goodsType.doEdit);
   app.router.get(app.adminName()+'/goodsType/delete',app.controller.admin.goodsType.delete);
   app.router.get(app.adminName()+'/goodsType/change',app.controller.admin.goodsType.change);
   //商品类型属性
   app.router.get(app.adminName()+'/goodsTypeAttribute',app.controller.admin.goodsTypeAttribute.index);
   app.router.get(app.adminName()+'/goodsTypeAttribute/add',app.controller.admin.goodsTypeAttribute.add);
   app.router.get(app.adminName()+'/goodsTypeAttribute/edit',app.controller.admin.goodsTypeAttribute.edit);
   app.router.post(app.adminName()+'/goodsTypeAttribute/doadd',app.controller.admin.goodsTypeAttribute.doAdd);
   app.router.post(app.adminName()+'/goodsTypeAttribute/doedit',app.controller.admin.goodsTypeAttribute.doEdit);
   app.router.get(app.adminName()+'/goodsTypeAttribute/delete',app.controller.admin.goodsTypeAttribute.delete);
   app.router.get(app.adminName()+'/goodsTypeAttribute/change',app.controller.admin.goodsTypeAttribute.change);
   //商品分类
   app.router.get(app.adminName()+'/goodsCate',app.controller.admin.goodsCate.index);
   app.router.get(app.adminName()+'/goodsCate/add',app.controller.admin.goodsCate.add);
   app.router.get(app.adminName()+'/goodsCate/edit',app.controller.admin.goodsCate.edit);
   app.router.post(app.adminName()+'/goodsCate/doadd',app.controller.admin.goodsCate.doAdd);
   app.router.post(app.adminName()+'/goodsCate/doedit',app.controller.admin.goodsCate.doEdit);
   app.router.get(app.adminName()+'/goodsCate/delete',app.controller.admin.goodsCate.delete);
   app.router.get(app.adminName()+'/goodsCate/change',app.controller.admin.goodsCate.change);
  //商品
  app.router.get(app.adminName()+'/goods',app.controller.admin.goods.index);
  app.router.post(app.adminName()+'/goods',app.controller.admin.goods.list);
  app.router.get(app.adminName()+'/goods/goodsTypeAttribute',app.controller.admin.goods.goodsTypeAttribute);
  app.router.post(app.adminName()+'/goods/uploadImage',app.controller.admin.goods.uploadImage);
  app.router.get(app.adminName()+'/goods/add',app.controller.admin.goods.add);
  app.router.get(app.adminName()+'/goods/edit',app.controller.admin.goods.edit);
  app.router.post(app.adminName()+'/goods/doadd',app.controller.admin.goods.doAdd);
  app.router.post(app.adminName()+'/goods/doedit',app.controller.admin.goods.doEdit);
  app.router.get(app.adminName()+'/goods/delete',app.controller.admin.goods.delete);
  app.router.get(app.adminName()+'/goods/change',app.controller.admin.goods.change);
   //导航
   app.router.get(app.adminName()+'/nav',app.controller.admin.nav.index);
   app.router.get(app.adminName()+'/nav/add',app.controller.admin.nav.add);
   app.router.get(app.adminName()+'/nav/edit',app.controller.admin.nav.edit);
   app.router.post(app.adminName()+'/nav/doadd',app.controller.admin.nav.doAdd);
   app.router.post(app.adminName()+'/nav/doedit',app.controller.admin.nav.doEdit);
   app.router.get(app.adminName()+'/nav/delete',app.controller.admin.nav.delete);
   app.router.get(app.adminName()+'/nav/change',app.controller.admin.nav.change);
  //文章分类
  app.router.get(app.adminName()+'/articleCate',app.controller.admin.articleCate.index);
  app.router.get(app.adminName()+'/articleCate/add',app.controller.admin.articleCate.add);
  app.router.get(app.adminName()+'/articleCate/edit',app.controller.admin.articleCate.edit);
  app.router.post(app.adminName()+'/articleCate/doadd',app.controller.admin.articleCate.doAdd);
  app.router.post(app.adminName()+'/articleCate/doedit',app.controller.admin.articleCate.doEdit);
  app.router.get(app.adminName()+'/articleCate/delete',app.controller.admin.articleCate.delete);
  app.router.get(app.adminName()+'/articleCate/change',app.controller.admin.articleCate.change);
  //文章管理
  app.router.get(app.adminName()+'/article',app.controller.admin.article.index);
  app.router.post(app.adminName()+'/article',app.controller.admin.article.list);
  app.router.get(app.adminName()+'/article/add',app.controller.admin.article.add);
  app.router.post(app.adminName()+'/article/doadd',app.controller.admin.article.doAdd);
  app.router.get(app.adminName()+'/article/edit',app.controller.admin.article.edit);
  app.router.post(app.adminName()+'/article/doedit',app.controller.admin.article.doEdit);
  app.router.get(app.adminName()+'/article/delete',app.controller.admin.article.delete);
  app.router.get(app.adminName()+'/article/change',app.controller.admin.article.change);
}