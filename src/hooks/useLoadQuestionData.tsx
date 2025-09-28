// 这里自定义hook组件，**达到复用的目的**
// import React, { FC, useEffect, useState } from "react";
// 获取动态路由参数
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";
// 使用ahook中的useRequest处理loading等公共状态更方便

function useGetQuestionData() {
  // ''添加默认为空字符串
  const { id = "" } = useParams();
  // 问卷详情
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
  // return { id, questionData, loading };
  // 使用ahook的**useRequest**替换上述逻辑，直接获取loading信息和函数值
  async function fn() {
    const data = await getQuestionService(id);
    return data;
  }
  const { loading, data, error } = useRequest(fn);
  return { loading, data, error };
}

export default useGetQuestionData;
