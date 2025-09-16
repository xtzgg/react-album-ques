import React, { FC } from "react";

// UI
import { Flex, Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
// 路由组件link
import { Link } from "react-router-dom";

import styles from "./Logo.module.scss";

import { HOME_PATH_NAME } from "../router/index";

const { Title } = Typography;

const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Link to={HOME_PATH_NAME}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>问卷调查</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
