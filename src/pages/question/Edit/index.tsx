import React, { FC, useEffect, useState } from "react";
// 获取动态路由参数
// import { useParams } from "react-router-dom";
// import { getQuestionService } from "../../../services/question";
import useGetQuestionData from "../../../hooks/useLoadQuestionData";

const Index: FC = () => {
  // // ''添加默认为空字符串
  // const { id = "" } = useParams();
  // //
  // const [questionData, setQuestionData] = useState({});
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   async function fn() {
  //     const data = await getQuestionService(id);
  //     setQuestionData(data);
  //     setLoading(false);
  //   }
  //   fn();
  // }, []);
  const { loading, data } = useGetQuestionData();

  return <>{loading ? <p>loading...</p> : <p>{JSON.stringify(data)}</p>}</>;
};

export default Index;
