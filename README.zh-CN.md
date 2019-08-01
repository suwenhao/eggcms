# eggcms
在线预览地址 ：http://www.suwh.club:7001
egg开发RBAC商城权限管理，还在开发中。

<img src="./doc/images/0.png" width="900">
<img src="./doc/images/1.png" width="900">
<img src="./doc/images/2.png" width="900">
<img src="./doc/images/3.png" width="900">
<img src="./doc/images/4.png" width="900">
<img src="./doc/images/5.png" width="900">
<img src="./doc/images/6.png" width="900">
<img src="./doc/images/7.png" width="900">
<img src="./doc/images/8.png" width="900">
<img src="./doc/images/9.png" width="900">
<img src="./doc/images/10.png" width="900">
<img src="./doc/images/11.png" width="900">
<img src="./doc/images/12.png" width="900">
<img src="./doc/images/13.png" width="900">
<img src="./doc/images/14.png" width="900">
<img src="./doc/images/15.png" width="900">
<img src="./doc/images/16.png" width="900">
<img src="./doc/images/17.png" width="900">
<img src="./doc/images/18.png" width="900">
<img src="./doc/images/19.png" width="900">
<img src="./doc/images/20.png" width="900">
<img src="./doc/images/21.png" width="900">
<img src="./doc/images/22.png" width="900">
<img src="./doc/images/23.png" width="900">
<img src="./doc/images/24.png" width="900">
<img src="./doc/images/25.png" width="900">
<img src="./doc/images/26.png" width="900">
<img src="./doc/images/27.png" width="900">
<img src="./doc/images/28.png" width="900">
<img src="./doc/images/29.png" width="900">

## 开始

<!-- add docs here for user -->

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

### 测试环境

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/ad/login
```
测试账号 admin 密码 123456

### 生产环境

```bash
$ npm start
$ npm stop
```
