// 由于搜索和列表也是公用的，因此提取为一个自定义hook
import { useRequest } from "ahooks";
import { getQuestionServiceList } from "../services/question";
import { useSearchParams } from "react-router-dom";
import {
  LIST_DEFAUL_PAGE,
  LIST_DEFAUL_PAGE_SIZE,
  LIST_PAGE,
  LIST_PAGE_SIZE,
  LIST_SEARCH_KEY_WORD,
} from "../constant";

// 声明需要传递参数的类型
type SerachOption = {
  isStar: boolean;
  isDelete: boolean;
  page: number;
  pageSize: number;
};

function useLoadQuestionListData(sopt: Partial<SerachOption> = {}) {
  const [searchParams] = useSearchParams();
  const { isStar, isDelete } = sopt;
  const { loading, error, data } = useRequest(
    // 需要传异步函数
    async () => {
      // ''避免undefined，都是字符串
      const keyword = searchParams.get(LIST_SEARCH_KEY_WORD) || "";
      const page =
        parseInt(searchParams.get(LIST_PAGE) || "") || LIST_DEFAUL_PAGE;
      const pageSize =
        parseInt(searchParams.get(LIST_PAGE_SIZE) || "") ||
        LIST_DEFAUL_PAGE_SIZE;
      const data = await getQuestionServiceList({
        keyword,
        isStar,
        isDelete,
        page,
        pageSize,
      });
      return data;
    },
    // **刷新的依赖项**，如果不加该项，则相当于useEffect(()=>{},[])只有在组件初始加载的时候才会执行，后续值变化则不再执行
    {
      refreshDeps: [searchParams],
    }
  );

  return { loading, error, data };
}

export default useLoadQuestionListData;
