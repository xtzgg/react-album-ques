import React, { FC, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
// 公共的css
import styles from "./common.module.scss";
// ahooks 修改网页标题的
import { useTitle } from "ahooks";
import { Typography, Empty, Spin } from "antd";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";

// 从路由的地址中获取参数
// import { useSearchParams } from "react-router-dom";
const { Title } = Typography;

const Star: FC = () => {
  useTitle("问卷调查-星标问卷");
  // 3 提取成公共组件
  const {
    loading,
    error,
    data = {},
  } = useLoadQuestionListData({ isStar: true });
  const { total = 0, list = [] } = data;
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { id } = q;
            return <QuestionCard key={id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Star;
