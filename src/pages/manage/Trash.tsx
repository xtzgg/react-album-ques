import React, { FC, useState } from "react";
import {
  Typography,
  Modal,
  Empty,
  Table,
  Tag,
  Space,
  Button,
  message,
} from "antd";
// 公共的css
import styles from "./common.module.scss";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;
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

// 表格
const tableColumns = [
  {
    title: "标题",
    dataIndex: "title",
    // key: "title", // key和dataText一样则可以省略
  },
  {
    title: "是否发布",
    dataIndex: "isPulished",
    // key: "isPulished",
    // 根据数据源返回自定义js片段
    render: (isPulished: boolean) => {
      return isPulished ? (
        <Tag color="processing">已发布</Tag>
      ) : (
        <Tag>未发布</Tag>
      );
    },
  },
  {
    title: "答卷数",
    dataIndex: "answerCount",
    // key: "answerCount",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    // key: "createTime",
  },
];

const Trash: FC = () => {
  // 数据源
  const [questionList, setQuestionList] = useState(qList);
  // 复选记录问卷id,泛型字符串数组
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 提取tsx片段：表格，此时多个tsx片段需提取出来
  // **可以把tsx片段定义为一个变量**
  const tableElement = (
    <>
      <Space style={{ marginBottom: "10px" }}>
        <Button type="primary" disabled={selectedIds.length === 0}>
          恢复
        </Button>
        <Button danger disabled={selectedIds.length === 0} onClick={del}>
          彻底删除
        </Button>
      </Space>
      <Table
        dataSource={questionList}
        columns={tableColumns}
        pagination={false} // 禁止分页
        rowKey={(p) => p.id} // rowKey是一个函数，表示用id作为key
        rowSelection={{
          type: "checkbox",
          onChange: (selectRowKeys) => {
            console.log(selectRowKeys);
            setSelectedIds(selectRowKeys as string[]);
          },
        }}
      />
    </>
  );

  function del() {
    confirm({
      title: "是否彻底删除该问卷？",
      content: "删除以后不可找回",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        console.log(selectedIds);
        message.success("删除成功");
      },
    });
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {/* 具体可参考antd */}
        {
          questionList.length > 0 && tableElement
          // (
          //   // 一个tsx只能有一个元素
          //   <Table
          //     dataSource={questionList}
          //     columns={tableColumns}
          //     pagination={false} // 禁止分页
          //     rowKey={(p) => p.id} // rowKey是一个函数，表示用id作为key
          //     rowSelection={{
          //       type: "checkbox",
          //       onChange: (selectRowKeys) => {
          //         console.log(selectRowKeys);
          //         setSelectedIds(selectRowKeys as string[]);
          //       },
          //     }}
          //   />
          // )
        }
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Trash;
