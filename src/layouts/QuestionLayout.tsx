import React, { FC } from "react";
import { Outlet } from "react-router-dom";

const QuestionLayout: FC = () => {
  return (
    <>
      <div>QuestionLayout left</div>
      <div>
        {/** 相当于vue的slot */}
        <Outlet />
      </div>
    </>
  );
};

export default QuestionLayout;
