import styles from "./styles.module.css";
import Image from "next/image";
import { IBoardList } from "./types";
import { useBoardList } from "./hook";
import { Modal } from "antd";

const IMAGE_SRC = {
  deleteImage: {
    src: require("@assets/delete.png"),
    alt: "삭제버튼",
  },
};

export default function BoardList(props: IBoardList) {
  const {
    setHoveredId,
    hoveredId,
    onClickDelete,
    onClickDetail,
    isModalOpen,
    modalContent,
    handleOk,
    handleCancel,
  } = useBoardList(props);
  console.log("props?.data?.fetchBoards:::", props?.data?.fetchBoards);
  // return <> </>;
  return (
    <div className={styles.boardBody}>
      <div className={styles.boardFrame}>
        <div className={styles.boardInnerBody}>
          {props?.data?.fetchBoards?.length > 0 ? (
            <>
              <div className={styles.boardHeader}>
                <div className={styles.headerNumber}>번호</div>
                <div className={styles.headerTitle}>제목</div>
                <div className={styles.headerWriter}>작성자</div>
                <div className={styles.headerDate}>날짜</div>
                <button className={styles.hidden}>
                  <Image
                    src={IMAGE_SRC.deleteImage.src}
                    alt={IMAGE_SRC.deleteImage.alt}
                  />
                </button>
              </div>
              <div className={styles.contentBody}>
                {props?.data?.fetchBoards.map((el, index) => (
                  <button
                    onClick={(event) => onClickDetail(event, el?._id)}
                    key={el._id}
                    className={styles.contentContainer}
                    onMouseEnter={() => setHoveredId(el._id)}
                    onMouseLeave={() => setHoveredId("")}
                  >
                    <div className={styles.contentNumber}>
                      {index + 1 + (props.page - 1) * 10}
                    </div>
                    {props.keyword ? (
                      <div className={styles.contentTitle}>
                        {el.title
                          .replaceAll(props.keyword, `@#$${props.keyword}@#$`)
                          .split("@#$")
                          .map((el, index) => (
                            <span
                              key={`${el}_${index}`}
                              style={{
                                color: el === props.keyword ? "red" : "black",
                              }}
                            >
                              {el}
                            </span>
                          ))}
                      </div>
                    ) : (
                      <div className={styles.contentTitle}>{el.title}</div>
                    )}
                    <div className={styles.contentWriter}>{el.writer}</div>

                    <div className={styles.contentDate}>
                      {el.createdAt.split("T")[0].replace(/-/g, ".")}
                    </div>
                    <div>
                      <span
                        onClick={onClickDelete}
                        className={
                          hoveredId === el._id
                            ? styles.showButton
                            : styles.hidden
                        }
                      >
                        <Image
                          src={IMAGE_SRC.deleteImage.src}
                          alt={IMAGE_SRC.deleteImage.alt}
                        />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div>텅</div>
          )}
        </div>
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{modalContent}</p>
      </Modal>
    </div>
  );
}
