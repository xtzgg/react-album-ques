import React, { FC } from "react";
import styles from "../components/QuestionCard.module.scss";

import { Button, Divider, Space, Tag, Popconfirm, Modal, message } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

type PropTypes = {
  id: number;
  title: string;
  isPulished: boolean;
  isStar: boolean;
  answerCount: number;
  createTime: string;
};

// 引入confirm
const { confirm } = Modal;

const QuestionCard: FC<PropTypes> = (prop: PropTypes) => {
  const nav = useNavigate();
  const { id, title, isPulished, answerCount, createTime, isStar } = prop;

  function duplicate() {
    // alert("复制完成");
    message.success("复制完成");
  }
  function del() {
    confirm({
      title: "是否删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        // alert("删除成功")
        message.success("删除成功");
      },
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPulished ? `/question/stat/${id}` : `/question/edit/${id}`}
          >
            <Space>
              {/* 单纯if处理无需else时可用&& */}
              {isStar && <StarOutlined style={{ color: "red" }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPulished ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷：{answerCount}</span>
            <span>{createTime}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div className={styles["button-container"]}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              // 这个符号可以保留转义的变量
              onClick={() => nav(`/question/edit/${id}`)}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              icon={<LineChartOutlined />}
              size="small"
              onClick={() => nav(`/question/stat/${id}`)}
              disabled={!isPulished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button type="text" icon={<StarOutlined />} size="small">
              {isStar ? "取消标星" : "标星"}
            </Button>
            <Popconfirm
              title="确定复制该问卷吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button type="text" icon={<CopyOutlined />} size="small">
                复制
              </Button>
            </Popconfirm>

            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              onClick={del}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
