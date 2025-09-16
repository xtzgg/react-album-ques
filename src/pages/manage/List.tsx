import React, { FC, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
// 公共的css
import styles from "./common.module.scss";
// ahooks 修改网页标题的
import { useTitle } from "ahooks";
import { Typography } from "antd";

// 从路由的地址中获取参数
// import { useSearchParams } from "react-router-dom";
const { Title } = Typography;
const qList = [
  {
    id: 1,
    title: "问卷1",
    isPulished: false,
    isStar: false,
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
    isStar: false,
    answerCount: 7,
    createTime: "2025-03-03 12:12",
  },
];

const List: FC = () => {
  // const [searchParams] = useSearchParams();
  // console.log('keyword:' + searchParams.get("keyword"));

  useTitle("问卷调查-我的问卷");

  const [questionList, setQuestionList] = useState(qList);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length > 0 &&
          questionList.map((q) => {
            const { id } = q;
            return <QuestionCard key={id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>ffff</div>
    </>
  );
};

export default List;
