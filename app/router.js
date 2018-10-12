'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  //后台
  require('./router/admin')(app);
  //api
  require('./router/api')(app);
  //前台
  require('./router/index')(app);
};
