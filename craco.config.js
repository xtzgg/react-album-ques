// common.js语法
// craco覆盖webpack 自定义代理功能，该devServer就是原来webpack的功能，建议看下webpack的代理
module.exports = {
  devServer: {
    proxy: {
      "/api": "http://localhost:3001", // 命中为api开头的路由，都指向该地址
    },
  },
};
