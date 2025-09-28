import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Typography } from "antd";

import { MANAGE_PATH_NAME } from "../router/index";
import styles from "./Home.module.scss";
import axios from "axios";

// import "../_mock/index"; 上线前一定要删掉，而且mock包也无需被打包
// import axios from "axios";

const { Title, Paragraph } = Typography;

const Home: FC = () => {
  const nav = useNavigate();

  // useEffect(() => {
  //   // fetch('api/test').then(res => res.json()).then(data => console.log('fetch data',data))
  //   // mock只能劫持XmlHttpRequest请求，无法劫持fetch请求，axios可以
  //   // axios内部使用的是XmlHttpRequest而不是fetch
  //   axios.get("/api/test").then((res) => console.log("axios data", res));
  // }, []);

  // 创建mock之后，将访问"3001的服务端"端口获取数据，存在跨域问题，create-react-app使用webpack devServer来进行代理
  // 项目地址：https://github.com/dilanx/craco
  useEffect(() => {
    // fetch('api/test').then(res => res.json()).then(data => console.log('fetch data',data))
    // mock只能劫持XmlHttpRequest请求，无法劫持fetch请求，axios可以
    // axios内部使用的是XmlHttpRequest而不是fetch
    axios.get("/api/test").then((res) => console.log("axios data", res));
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份，发布问卷 90 份，收到答卷 80 份
        </Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_PATH_NAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
