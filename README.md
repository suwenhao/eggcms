# eggcms

商城管理

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.
启动项目前先导入数据库
- 导入数据库
    - 安装mongodb 
    - 开启mongodb
    - 数据文件夹在doc文件夹内
    - mongodb导入：mongorestore -h dbhost -d dbname path 
    - dbhost是mongodb的IP，dbname是数据库的名字，path是doc里的数据库文件夹
    - 如下：
    - mongorestore -h 127.0.0.1 -d eggcms ./eggcms
- 修改mongodb链接
    - 在config文件夹里的config.default.js文件，修改对应你的mongodb地址
    - 有用户名的话使用用户名，没的话就直链

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/ad/login
```
测试账号 admin 密码 123456

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org