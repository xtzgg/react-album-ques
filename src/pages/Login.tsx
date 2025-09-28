import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Checkbox, Form, Input, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { REGISTER_PATH_NAME } from "../router/index";
import { UserAddOutlined } from "@ant-design/icons";

const { Title } = Typography;

const USER_NAME = "username";
const PASSWORD = "password";

const Login: FC = () => {
  // const nav = useNavigate();

  function rememberUser(username: string, password: string) {
    localStorage.setItem(USER_NAME, username);
    localStorage.setItem(PASSWORD, password);
  }

  function deleteUser() {
    localStorage.removeItem(USER_NAME);
    localStorage.removeItem(PASSWORD);
  }

  function getUser() {
    return {
      username: localStorage.getItem(USER_NAME),
      password: localStorage.getItem(PASSWORD),
    };
  }

  function onFinish(value: any) {
    console.log(value);
    const { username, password, remember } = value || {};
    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUser();
    }
  }

  // 获取第三方hook，绑定form的值，在组件加载的时候处理
  const [form] = Form.useForm();

  useEffect(() => {
    const { username, password } = getUser();
    form.setFieldsValue({
      username,
      password,
    });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div>
          <Space>
            <Title level={2}>
              <UserAddOutlined />
            </Title>
            <Title level={2}>用户登录</Title>
          </Space>
        </div>
        <div>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            initialValues={{ remember: true }}
            form={form}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 6, span: 16 }}
              valuePropName="checked"
              name="remember"
            >
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
                <Link to={REGISTER_PATH_NAME}>注册新用户</Link>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
