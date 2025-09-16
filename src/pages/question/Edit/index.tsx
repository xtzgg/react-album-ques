import React, { FC } from "react";
// 获取动态路由参数
import { useParams } from "react-router-dom";
const Index: FC = () => {
  // ''添加默认为空字符串
  const { id = '' } = useParams();
  return (
    <>
      <p>Index { id }</p>
    </>
  );
};

export default Index;
