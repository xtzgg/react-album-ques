import React from "react";
import { RouterProvider } from "react-router-dom";
import routerConfig from "./router";


function App() {
  // 组件引入路由
  return <RouterProvider router={routerConfig}></RouterProvider>;
}

export default App;

// 页面：跳转，切换等
//
