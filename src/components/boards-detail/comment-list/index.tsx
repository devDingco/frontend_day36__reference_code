import { useCommentList } from "./hook";
import styles from "./styles.module.css";

import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";
import CommentItem from "../comment-list-item";

export default function CommentList() {
  const { data, fetchMore, isHasMore, setIsHasMore } = useCommentList();
  console.log("isHasMore:::", isHasMore);
  console.log("commentList 에서 data:::", data);

  const onNext = () => {
    if (data === undefined) return;

    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoardComments.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log(
          "fetchMoreResult.fetchBoardComments",
          fetchMoreResult.fetchBoardComments
        );
        if (fetchMoreResult.fetchBoardComments.length === 0) {
          setIsHasMore(false);
          // return {
          //   fetchBoardComments: [...prev.fetchBoardComments],
          // };
        }
        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };
  return (
    <div className={styles.commentListBody}>
      <div className={styles.commentListContainer}>
        <InfiniteScroll
          dataLength={data?.fetchBoardComments.length ?? 0}
          next={onNext}
          hasMore={isHasMore}
          loader={<Skeleton />}
        >
          {data?.fetchBoardComments.map((comment, index) => (
            <CommentItem
              key={index}
              comment={comment}
              index={index}
              length={data?.fetchBoardComments.length ?? 0}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
