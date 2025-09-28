import React, { FC } from "react";
import useGetQuestionData from "../../../hooks/useLoadQuestionData";

const Index: FC = () => {
  const { data, loading } = useGetQuestionData();
  return (
    <>
      <>{loading ? <p>loading...</p> : <p>{JSON.stringify(data)}</p>}</>
    </>
  );
};

export default Index;
