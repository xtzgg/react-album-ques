import React, { FC } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./ManageLayout.module.scss";

// UI
import { Button, Flex, Divider } from "antd";
// 图标
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const ManageLayout: FC = () => {
  // 获取路由相当于vue的router
  const nav = useNavigate();
  // 获取当前的url
  const { pathname } = useLocation();
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {/* vertical 是垂直布局，gap代表间隙 */}
        <Flex align="flex-start" gap="small" vertical>
          <Button type="primary" size="large" icon={<PlusOutlined />}>
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
