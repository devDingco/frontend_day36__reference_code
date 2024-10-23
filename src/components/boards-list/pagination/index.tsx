import { Pagination as PaginationAntd } from "antd";
import styles from "./styles.module.css";
import type { PaginationProps } from "antd";

import { IPaginationProps } from "./types";
import usePagination from "./hook";
import _ from "lodash";
export function Pagination(props: IPaginationProps) {
  const { data, refetch } = usePagination(props.keyword);

  const pageOnChange: PaginationProps["onChange"] = (page) => {
    props.setPage(page);
  };

  return (
    <div className={styles.boardPaginationFrame}>
      {props?.data?.fetchBoards?.length > 0 ? (
        <PaginationAntd
          defaultPageSize={10}
          onChange={pageOnChange}
          align="center"
          current={props.page}
          total={data?.fetchBoardsCount}
          showSizeChanger={false}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}
