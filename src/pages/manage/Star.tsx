import React, { FC, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
// 公共的css
import styles from "./common.module.scss";
// ahooks 修改网页标题的
import { useTitle } from "ahooks";
import { Typography, Empty } from "antd";

// 从路由的地址中获取参数
// import { useSearchParams } from "react-router-dom";
const { Title } = Typography;
const qList = [
  {
    id: 1,
    title: "问卷1",
    isPulished: false,
    isStar: true,
    answerCount: 5,
    createTime: "2025-03-01 12:12",
  },
  {
    id: 2,
    title: "问卷2",
    isPulished: true,
    isStar: true,
    answerCount: 5,
    createTime: "2025-03-02 12:12",
  },
  {
    id: 3,
    title: "问卷3",
    isPulished: false,
    isStar: true,
    answerCount: 7,
    createTime: "2025-03-03 12:12",
  },
];

const Star: FC = () => {
  useTitle("问卷调查-星标问卷");

  const [questionList, setQuestionList] = useState(qList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map((q) => {
            const { id } = q;
            return <QuestionCard key={id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Star;
