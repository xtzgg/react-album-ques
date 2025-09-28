import React, { FC, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./ManageLayout.module.scss";

// UI
import { Button, Flex, Divider, message } from "antd";
// 图标
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { createQuestionService } from "../services/question";
import { useRequest } from "ahooks";

const ManageLayout: FC = () => {
  // 获取路由相当于vue的router
  const nav = useNavigate();
  // 获取当前的url
  const { pathname } = useLocation();
  // 防止重复操作，1s延迟也是为了测试该情况
  // const [loading, setLoading] = useState(false);
  // async function handlerCreateQuestion() {
  //   setLoading(true);
  //   const data = await createQuestionService();
  //   console.log(data);
  //   const { id } = data || {};
  //   if (id) {
  //     nav(`/question/edit/${id}`);
  //     message.success("创建成功");
  //   }
  //   setLoading(false);
  // }
  // 使用useRequest重构上述请求,
  const {
    loading,
    run: handlerCreateQuestion, // **run: handlerCreateQuestion 表示将run重命名为handlerCreateQuestion**
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      // 回调函数
      const { id } = result || {};
      if (id) {
        nav(`/question/edit/${id}`);
        message.success("创建成功");
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {/* vertical 是垂直布局，gap代表间隙 */}
        <Flex align="flex-start" gap="small" vertical>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handlerCreateQuestion}
            disabled={loading}
          >
            新建问卷
          </Button>
          {/* transparent 隐藏分割线 */}
          <Divider style={{ borderTop: "transparent" }} />
          <Button
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav("/manage/list")}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav("/manage/star")}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/trash") ? "default" : "text"}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav("/manage/trash")}
          >
            回收站
          </Button>
        </Flex>
      </div>
      <div className={styles.right}>
        {/** 相当于vue的slot */}
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;
