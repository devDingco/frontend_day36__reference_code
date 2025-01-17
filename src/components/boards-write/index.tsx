"use client";
import React, { useRef } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useBoardWrite } from "./hook";
import { IBoardWriteProps } from "./types";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";
import { CloseOutlined } from "@ant-design/icons";

export default function BoardWritePage(props: IBoardWriteProps) {
  const { isEdit } = props;
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    name,
    data,
    nameError,
    password,
    passwordError,
    title,
    titleError,
    content,
    contentError,
    isButtonDisabled,
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onClickSignup,
    afterSubmitModal,
    handleOk,
    handleCancel,
    modalContent,
    setModalContent,
    onSearchAddress,
    isAddressModalOpen,
    completeHandler,
    zonecode,
    address,
    setDetailAddress,
    onChangeDetailAddress,
    detailAddress,
    youtubeUrl,
    onChangeYoutubeUrl,
    onChangeFile,
    handleImageClick,
    imageUrl,
    images,
    handleMouseLeave,
    handleMouseEnter,
    hoveredIndex,
    onDeleteImage,
  } = useBoardWrite(isEdit, fileInputRefs);

  return (
    <div className={styles.layout}>
      <div className={styles.enroll_subject}>
        <div className={styles.enroll_subject_text}>
          {isEdit ? "게시물 수정" : "게시물 등록"}
        </div>
      </div>
      <div className={styles.enroll_row_container}>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_row_flex}>
            <div className={styles.flex_half}>
              <div className={styles.enroll_form_title}>
                <div>작성자 </div>
                <div className={styles.enroll_required_indicator}> *</div>
              </div>
              <input
                disabled={isEdit}
                value={name}
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                className={isEdit ? styles.disabled_input : styles.enroll_input}
                onChange={onChangeName}
              />
              <div className={styles.error_msg}>{nameError}</div>
            </div>
            <div className={styles.flex_half}>
              <div className={styles.enroll_form_title}>
                <div>비밀번호</div>
                <div className={styles.enroll_required_indicator}> *</div>
              </div>
              <input
                disabled={isEdit}
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                className={isEdit ? styles.disabled_input : styles.enroll_input}
                onChange={onChangePassword}
                defaultValue={isEdit ? "*********" : password}
              />
              <div className={styles.error_msg}>{passwordError}</div>
            </div>
          </div>
        </div>

        <div className={styles.enroll_border}></div>

        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>제목</div>
            <div className={styles.enroll_required_indicator}> *</div>
          </div>
          <input
            value={title}
            type="text"
            className={styles.enroll_input}
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
          />
          <div className={styles.error_msg}>{titleError}</div>
        </div>
        <div className={styles.enroll_border}></div>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>내용</div>
            <div className={styles.enroll_required_indicator}> *</div>
          </div>
          <textarea
            value={content}
            placeholder="내용을 입력해 주세요."
            className={`${styles.enroll_input} ${styles.enroll_textarea}`}
            onChange={onChangeContent}
          ></textarea>
          <div className={styles.error_msg}>{contentError}</div>
        </div>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>주소</div>
          </div>
          <div className={styles.enroll_address_firstrow}>
            <input
              value={zonecode}
              type="number"
              className={styles.zipcode_input}
              placeholder="12345"
              readOnly
            />
            <button
              className={styles.zipcode_search_button}
              onClick={onSearchAddress}
            >
              우편번호 검색
            </button>
          </div>

          <input
            value={address}
            placeholder="주소를 입력해주세요."
            className={styles.enroll_input}
            type="text"
            readOnly
          />
          <input
            value={detailAddress}
            placeholder="상세주소"
            className={styles.enroll_input}
            type="text"
            onChange={onChangeDetailAddress}
          />
        </div>
        <div className={styles.enroll_border}></div>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>유튜브 링크</div>
          </div>
          <input
            value={youtubeUrl}
            onChange={onChangeYoutubeUrl}
            className={styles.enroll_input}
            placeholder="링크를 입력해 주세요."
          />
        </div>

        <Modal
          title={
            <>
              <br />
            </>
          }
          onCancel={onSearchAddress}
          open={isAddressModalOpen}
          footer={<></>}
        >
          <DaumPostcodeEmbed onComplete={completeHandler} />
        </Modal>

        <div className={styles.enroll_border}></div>

        <div className={styles.enroll_row_section}>
          <div>사진 첨부</div>

          <div className={styles.picture_enroll_row}>
            {images.map((image, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  width: 160,
                  height: 160,
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f0f0f0",
                }}
                // TODO - 이부분때문에 파일선택 팝업 2번 뜸. .. . .. 왜???????

                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {image.src === "" ? (
                  <>
                    {console.log("images:::", images)}
                    <input
                      accept="image/jpeg,image/png"
                      type="file"
                      ref={(el) => (fileInputRefs.current[index] = el)}
                      onChange={(e) => onChangeFile(e, index)}
                      style={{ display: "none" }}
                    />
                    <Image
                      onClick={() => handleImageClick(index)}
                      src={require("@assets/add_image.png")}
                      alt="기본이미지"
                    />
                  </>
                ) : (
                  <div>
                    <input
                      accept="image/jpeg,image/png"
                      type="file"
                      onChange={(e) => onChangeFile(e, index)}
                      ref={(el) => (fileInputRefs.current[index] = el)}
                      style={{ display: "none" }}
                    />
                    <div
                      style={{
                        width: 160,
                        height: 160,
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      <img
                        src={`https://storage.googleapis.com/${images[index].src}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                      {hoveredIndex === index && ( // hover된 이미지의 인덱스와 비교
                        <button
                          onClick={(e) => onDeleteImage(index, e)} // 삭제 버튼 클릭 시 삭제 함수 호출
                          style={{
                            position: "absolute",
                            top: 5,
                            right: 5,
                            backgroundColor: "black",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          <CloseOutlined />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.enroll_button_container}>
        <button className={styles.enroll_cancel_button}>취소</button>
        <button
          className={
            !isEdit && isButtonDisabled
              ? `${styles.enroll_submit_button} ${styles.disabled}`
              : styles.enroll_submit_button
          }
          onClick={onClickSignup}
          disabled={!isEdit && isButtonDisabled}
        >
          {isEdit ? "수정" : "등록"}하기
        </button>
      </div>

      <Modal open={afterSubmitModal} onOk={handleOk} onCancel={handleCancel}>
        <p>{modalContent}</p>
      </Modal>
    </div>
  );
}
