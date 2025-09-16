import React, { FC } from "react";
import { Outlet } from "react-router-dom";
// ui组件
import { Layout } from "antd";
import styles from "./MainLayout.module.scss";

// 自定义组件
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";

const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        {/** 相当于vue的slot */}
        <Outlet />
      </Content>
      <Footer className={styles.footer}>MainLayout footer</Footer>
    </Layout>
  );
};

export default MainLayout;
