import { Pagination } from "antd";
import React, { FC, useEffect, useState } from "react";
import {
  LIST_DEFAUL_PAGE,
  LIST_DEFAUL_PAGE_SIZE,
  LIST_PAGE,
  LIST_PAGE_SIZE,
} from "../constant";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type PropType = {
  total: number;
};

const ListPage: FC<PropType> = (prop: PropType) => {
  const { total } = prop;
  const [current, setCurrent] = useState(LIST_DEFAUL_PAGE);
  const [pageSize, setPageSize] = useState(LIST_DEFAUL_PAGE);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page =
      parseInt(searchParams.get(LIST_PAGE) || "") || LIST_DEFAUL_PAGE;
    setCurrent(page);
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE) || "") || LIST_DEFAUL_PAGE_SIZE;
    setPageSize(pageSize);
  }, [searchParams]);

  const nav = useNavigate();
  const { pathname } = useLocation();
  function handlerPageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE, page.toString());
    searchParams.set(LIST_PAGE_SIZE, pageSize.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  }

  return (
    <Pagination
      total={total}
      defaultCurrent={1}
      current={current}
      pageSize={pageSize}
      onChange={handlerPageChange}
    />
  );
};

export default ListPage;
