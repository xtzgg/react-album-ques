import React, { FC, useEffect, useMemo, useRef, useState } from "react";
// ahooks 修改网页标题的
import { useDebounceFn, useRequest, useTitle } from "ahooks";
import { Empty, Spin, Typography } from "antd";
// 公共的css
import styles from "./common.module.scss";
// 自定义组件
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import { getQuestionServiceList } from "../../services/question";
// import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
// import ListPage from "../../components/ListPage";
import {
  LIST_DEFAUL_PAGE,
  LIST_DEFAUL_PAGE_SIZE,
  LIST_PAGE,
  LIST_PAGE_SIZE,
  LIST_SEARCH_KEY_WORD,
} from "../../constant";
import { useSearchParams } from "react-router-dom";

// 从路由的地址中获取参数
// import { useSearchParams } from "react-router-dom";
const { Title } = Typography;

const List: FC = () => {
  // const [searchParams] = useSearchParams();
  // console.log('keyword:' + searchParams.get("keyword"));

  useTitle("问卷调查-我的问卷");

  const [started, setStarted] = useState(false); // 是否已经开始加载（防抖，有延迟时间）
  const [page, setPage] = useState(LIST_DEFAUL_PAGE);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  // 是否还有更多数据标识
  const haveMoreData = total > list.length;

  const [searchParams] = useSearchParams(); //url参数获取keyword
  const keyword = searchParams.get(LIST_SEARCH_KEY_WORD) || "";

  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionServiceList({
        page,
        pageSize: LIST_DEFAUL_PAGE_SIZE,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result;
        setList(list.concat(l));
        setTotal(total);
        setPage(page + 1);
      },
    }
  );

  // 触发加载-useDebounceFn防抖
  // 绑定后可获取dom对象，可操作
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      // 获取操作dom对象
      const elem = containerRef.current;
      if (elem == null) return;
      // 返回一个包含元素的最小矩形的 DOMRect 对象，该具体解析可看其API
      // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
      const domReact = elem.getBoundingClientRect();
      const { bottom } = domReact;
      // 这里 document.body.clientHeight 使整个dom的高度，window.innerHeight是视口的高度，当矩形块显示在视口时高度会小于当前视口高度
      console.log(bottom, "=====", window.innerHeight);
      if (bottom <= window.innerHeight) {
        // console.log("执行加载");
        load();
        setStarted(true);
      }
    },
    {
      // 防抖，每次下滑一秒钟执行
      wait: 1000,
    }
  );

  // keyword 变化时，重置信息
  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  // 1. 页面初始化时，触发加载第一页
  useEffect(() => {
    // TODO => 如果每页分页的条数<当前视口是需要持续加载的
    tryLoadMore();
  }, [searchParams]);
  // 2. 当页面滚动时，绑定事件
  // 这里当searchParams，haveMoreData发生变化时，重新绑定滚动触发加载
  // haveMoreData 当total > 当前数组的值时触发滚动，但如果相等则无需继续绑定
  // searchParams 当搜索变化时，看是否需要绑定该滚动函数??
  useEffect(() => {
    // 如果没有更多的数据，则不再监听加载
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore); // 绑定滚动执行函数
    }
    return () => {
      window.removeEventListener("scroll", tryLoadMore); // 解绑事件
    };
  }, [haveMoreData]);

  // 底部加载更多显示不同的内容，可以缓存该函数
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData) return <span>没有更多了...</span>;
    return <span>开始加载下一页</span>;
  }, [started, total, loading, haveMoreData]);

  // 1不使用useRequest写法
  // const [total, setTotal] = useState(0);
  // const [list, setList] = useState([]);
  // useEffect(() => {
  //   async function fn() {
  //     const data = await getQuestionServiceList();
  //     const { total = 0, list = [] } = data;
  //     setTotal(total);
  //     setList(list);
  //   }
  //   fn();
  // }, []);
  // 2 使用useRequest
  // const { loading, error, data = {} } = useRequest(getQuestionServiceList);
  // const { total = 0, list = [] } = data;
  // 3 提取成公共组件
  // const { loading, error, data = {} } = useLoadQuestionListData();
  // const { total = 0, list = [] } = data;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* <div style={{ height: "2000px" }}></div> */}
        {/* {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )} */}
        {
          // !loading &&
          list.length > 0 &&
            list.map((q: any) => {
              const { id } = q;
              return <QuestionCard key={id} {...q} />;
            })
        }
      </div>
      <div className={styles.footer}>
        {/* <ListPage total={total}/> */}
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  );
};

export default List;
