import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Input } from "antd";

import { LIST_SEARCH_KEY_WORD } from "../constant";

const { Search } = Input;

// 搜索框组件
const ListSearch: FC = () => {
  const [value, setValue] = useState("");
  const nav = useNavigate();
  const { pathname } = useLocation();

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const relVal: string = searchParams.get(LIST_SEARCH_KEY_WORD) || "";
    console.log(relVal);
    setValue(relVal);
  }, [searchParams]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSearch(value: string) {
    nav({
      pathname,
      search: `?${LIST_SEARCH_KEY_WORD}=` + value,
    });
  }
  return (
    <Search
      size="large"
      placeholder="请输入关键字"
      allowClear
      value={value}
      onSearch={handleSearch}
      onChange={handleChange}
      style={{ width: "200px" }}
    />
  );
};

export default ListSearch;
