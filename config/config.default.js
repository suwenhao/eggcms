'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1538831581362_5358';

  // add your config here
  config.middleware = ['jsonp', 'compress', 'common', 'adminAuth'];
  //后台路由中间件
  config['adminAuth']={
    match:'/ad'
  }
  //gzip压缩
  config.compress={
    enable:true,
    threshold: 100,
  };
  //框架中间件的默认配置
  config.bodyParser={
    jsonLimit:'10mb'
  };
  //设置session
  config.session={
    key:'SESSION_ID',
    maxAge:1000*3600*24,
    renew:true,
    encrypt:true,
  }
  //模板引擎
  config.view = {
    mapping:{
      '.html':'ejs'
    }
  }
  //mongoose
  config.mongoose = {
    client: {
      url: 'mongodb://eggadmin:123456@localhost:27017/eggcms',
      options: {useNewUrlParser:true,useCreateIndex:true,},
    },
  };
  config.api = 'http://www.phonegap100.com/'
  config.uploadDir = 'app/public/admin/upload';
  return config;
};
