import React from "react";
// 路由
import { createBrowserRouter } from "react-router-dom";

// 引入各个页面
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";

import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import QuestionLayout from "../layouts/QuestionLayout";

import Star from "../pages/manage/Star";
import Trash from "../pages/manage/Trash";

import Edit from "../pages/question/Edit";
import Stat from "../pages/question/Stat";
import List from "../pages/manage/List";

// 创建路由
const router = createBrowserRouter([
  {
    path: "/",
    // layout作为home的模板在最外层，内层是home组件
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        // 在管理模板中的页面
        path: "manage",
        element: <ManageLayout />,
        children: [
          {
            path: "list",
            element: <List />,
          },
          {
            path: "star",
            element: <Star />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
      {
        // * 表示匹配所有，一般写在最后（兜底访问）
        // 404路由配置都写在最后（兜底）
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  // 在问卷模板中的页面
  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "stat/:id",
        element: <Stat />,
      },
    ],
  },
]);

export default router;

// 常用的url提取常量，后续方便维护
export const HOME_PATH_NAME = "/";
export const MANAGE_PATH_NAME = "/manage/list";
export const LOGIN_PATH_NAME = "/login";
export const REGISTER_PATH_NAME = "/register";
