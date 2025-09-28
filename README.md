# Getting Started with Create React App

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### 依赖组件

```
eslint: create-react-app自带，因此初始化后即可使用，
prettier
 使用vscode组件并设置setting.json文件中保存自动补全格式的配置项，另外版本要注意和对应react版本一致，否则报错

sass css依赖项，使用css-module 另外可选css-in-js（优缺点）

ahooks 来定义更改项目浏览器标题
https://ahooks.js.org/zh-CN/hooks/use-request/index#index-manual

react-router-dom react路由组件

ui组件
antd // npm install antd
图标库
npm install @ant-design/icons@5.x --save
渐变颜色网站：主页背景色
https://color.oulu.me/
mock服务
npm install mockjs 并且安装类型转换依赖（引入时会提示）对应文件夹 _mock
ajax请求组件
npm install axios
```

webpack / craco(扩展webpack的功能，目前主要使用代理工具devServer处理跨域)
项目地址：https://github.com/dilanx/craco
npm i -D @craco/craco
按照项目文档操作，新增文件和修改配置
// 总结
在线mock平台，网上一些mock平台可用，但是有限制，而且有安全问题，不建议使用，而且不建议使用客户端mock，上线没删会出大问题
