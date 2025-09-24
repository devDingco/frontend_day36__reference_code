"use client";

import { useEffect } from "react";
import { Avatar, List, FloatButton, Typography } from "antd";
import styles from "./styles.module.css";
import useMyAppList from "./hook";
import { useRouter } from "next/navigation";

const { Title } = Typography;

export default function MyApiList() {
  const router = useRouter();
  const { data, onClickFetch, onClickDelete, onClickEdit, onClickDetail } =
    useMyAppList();
  useEffect(() => {
    onClickFetch();
  }, []);

  return (
    <div className={styles.listBody}>
      {/* 헤더 영역 - 제목 */}
      <div className={styles.header}>
        <Title level={2} className={styles.headerTitle}>
          내가 만든 게시글 목록
        </Title>
      </div>
      {/* 게시글 목록 */}
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            className={styles.listHover}
            onClick={(e) => onClickDetail(item.id, e)}
            actions={[
              <a
                key="list-loadmore-edit"
                onClick={(e) => onClickEdit(item.id, e)}
              >
                edit
              </a>,
              <a
                key="list-loadmore-more"
                onClick={(e) => onClickDelete(item.id, e)}
              >
                delete
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={<div className={styles.title}>{item.title}</div>}
              description={<div className={styles.writer}>{item.writer}</div>}
            />
            <div className={styles.contents}>{item.contents}</div>
          </List.Item>
        )}
      />
      
      {/* 플로팅 버튼 (상단 버튼과 중복되므로 주석 처리) */}
      <FloatButton onClick={() => router.push("/myapis/new")} />
    </div>
  );
}
