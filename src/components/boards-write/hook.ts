"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
} from "commons/graphql/graphql";
import { IAddress } from "./types";
import { UPLOAD_FILE } from "./queries";
import { checkValidationFile } from "commons/libraries/validations";

export const useBoardWrite = (
  isEdit: boolean,
  fileInputRefs: (HTMLInputElement | null)[]
) => {
  const router = useRouter();
  const params = useParams();

  //그래프큐엘 셋팅
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const [targetId, setTargetId] = useState(
    isEdit ? params.boardId.toString() : ""
  );

  // 수정하는 경우, 수정을 위한 초기값 보여주기
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: targetId.toString() },
    skip: !isEdit,
  });

  // 작성자 변경 불가
  const [name, setName] = useState<string>(
    isEdit ? data?.fetchBoard?.writer || "" : ""
  );
  // 비밀번호 수정 불가
  const [password, setPassword] = useState<string>("");
  const [title, setTitle] = useState<string>(
    isEdit && data?.fetchBoard?.title ? data?.fetchBoard.title : ""
  );
  const [content, setContent] = useState<string>(
    isEdit && data?.fetchBoard.contents ? data?.fetchBoard.contents : ""
  );
  const [nameError, setNameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [contentError, setContentError] = useState<string>("");
  const [zonecode, setZonecode] = useState<string>(
    isEdit ? data?.fetchBoard?.boardAddress?.zipcode || "" : ""
  );
  const [address, setAddress] = useState<string>(
    isEdit ? data?.fetchBoard?.boardAddress?.address || "" : ""
  );
  const [detailAddress, setDetailAddress] = useState<string>(
    isEdit && data?.fetchBoard?.boardAddress?.addressDetail
      ? data.fetchBoard.boardAddress.addressDetail
      : ""
  );
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [youtubeUrl, setYoutubeUrl] = useState<string>(
    isEdit && data?.fetchBoard?.youtubeUrl ? data.fetchBoard.youtubeUrl : ""
  );
  //모달 보여주는 여부 값
  const [afterSubmitModal, setAfterSubmitModal] = useState<boolean>(false);

  //모달의 content 내용
  const [modalContent, setModalContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState(isEdit && data?.fetchBoard?.images);

  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // 어떤 이미지에 hover했는지 추적

  // 값이 없는 경우, 버튼 비활성화
  const isButtonDisabled = !name || !password || !title || !content;

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index); // hover된 이미지의 인덱스 저장
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null); // hover가 끝나면 인덱스 초기화
  };
  const newImages = isEdit
    ? (data?.fetchBoard?.images || []).map((img, index) => ({
        src: img,
        alt: `이미지 ${index + 1}`, // alt 텍스트에 인덱스 + 1 추가
      }))
    : [
        { src: "", alt: "이미지 1" },
        { src: "", alt: "이미지 2" },
        { src: "", alt: "이미지 3" },
      ];

  const [images, setImages] = useState(newImages);

  // 새로고침해도 초기값 유지하기 -> 다음주에 배워요.
  useEffect(() => {
    if (isEdit && data?.fetchBoard) {
      console.log("data?.fetchboard;::", data?.fetchBoard);
      const newImages = (data?.fetchBoard?.images || []).map((img, index) => ({
        src: img,
        alt: `이미지 ${index + 1}`,
      }));
      setName(data.fetchBoard.writer || "");
      setTitle(data.fetchBoard.title || "");
      setContent(data.fetchBoard.contents || "");
      setZonecode(data.fetchBoard.boardAddress?.zipcode || "");
      setAddress(data.fetchBoard.boardAddress?.address || "");
      setDetailAddress(data.fetchBoard.boardAddress?.addressDetail || "");
      setYoutubeUrl(data.fetchBoard.youtubeUrl || "");
      setImages([...newImages]);
    }
  }, [data, isEdit]);
  // 변경값 상태관리
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onChangeDetailAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(event.target.value);
  };

  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const handleOk = () => {
    // 수정이 완료 되어도 , 새로운 게시글이 등록 되어도 detail 화면으로 이동
    console.log("editId:::", targetId);
    router.push(`/boards/${targetId}`);
  };

  const handleCancel = () => {
    setAfterSubmitModal(false);
  };

  const onClickSignup = async () => {
    //새글 등록하기일 경우
    if (isEdit === false) {
      let hasError = false;

      if (name.trim() === "") {
        setNameError("필수입력 사항입니다.");
        hasError = true;
      } else {
        setNameError("");
      }

      if (password.length === 0) {
        setPasswordError("필수입력 사항입니다.");
        hasError = true;
      } else {
        setPasswordError("");
      }

      if (!title?.trim()) {
        setTitleError("필수입력 사항입니다.");
        hasError = true;
        return;
      } else {
        setTitleError("");
      }

      if (!content?.trim()) {
        setContentError("필수입력 사항입니다.");
        hasError = true;
        return;
      } else {
        setContentError("");
      }

      if (!hasError) {
        const newImageArray = images.map((image) => image.src);
        const { data } = await createBoard({
          variables: {
            createBoardInput: {
              writer: name,
              password: password,
              title: title,
              contents: content,
              youtubeUrl: youtubeUrl,
              boardAddress: {
                zipcode: zonecode,
                address: address,
                addressDetail: detailAddress,
              },
              images: newImageArray,
            },
          },
        });
        if (data?.createBoard) {
          setTargetId(data.createBoard._id);
          console.log("data", data);
          setModalContent("게시글이 등록되었습니다!");
          setAfterSubmitModal(true);
        }
      }
    }

    // 기존의 글을 수정하는 경우
    else if (isEdit === true) {
      // 입력값이 비어있는 경우 수정 진행 불가
      if (content?.trim() === "" && title?.trim() === "") {
        setContentError("필수입력 사항입니다.");
        setTitleError("필수입력 사항입니다.");
        return;
      }
      if (content?.trim() === "") {
        setContentError("필수입력 사항입니다.");
        return;
      }
      if (title?.trim() === "") {
        setTitleError("필수입력 사항입니다.");
        return;
      }

      // 비밀번호 확인하기
      const 입력받은비밀번호 = prompt(
        "글을 작성할때 입력하셨던 비밀번호를 입력해주세요"
      );
      const updateInput: any = {
        boardAddress: {
          zipcode: "",
          address: "",
          addressDetail: "",
        },
      };
      if (title?.trim() && title !== data?.fetchBoard?.title) {
        updateInput.title = title;
      }

      if (content?.trim() && content !== data?.fetchBoard?.contents) {
        updateInput.contents = content;
      }
      // youtube 주소 변경 확인
      if (youtubeUrl?.trim() && youtubeUrl !== data?.fetchBoard?.youtubeUrl) {
        updateInput.youtubeUrl = youtubeUrl;
      }
      //주소처리
      if (
        zonecode?.trim() &&
        zonecode !== data?.fetchBoard?.boardAddress?.zipcode
      ) {
        updateInput.boardAddress.zipcode = zonecode;
      }
      if (
        address?.trim() &&
        address !== data?.fetchBoard?.boardAddress?.address
      ) {
        updateInput.boardAddress.address = address;
      }
      if (
        detailAddress?.trim() &&
        detailAddress !== data?.fetchBoard?.boardAddress?.addressDetail
      ) {
        updateInput.boardAddress.addressDetail = detailAddress;
      }
      // images 변경된거 있는지 확인하기
      const previousImages = data?.fetchBoard?.images;
      const submitImages = [];
      for (let i = 0; i < 3; i++) {
        if (previousImages && images[i].src !== previousImages[i]?.src) {
          submitImages.push(images[i].src);
        }
      }
      if (submitImages.length > 0) updateInput.images = submitImages;

      // 수정된 값이 있는 항목만 API 요청
      if (Object.keys(updateInput).length > 0) {
        console.log("수정된 항목만 날아가고있나? ::: updateInput", updateInput);
        try {
          const result = await updateBoard({
            variables: {
              updateBoardInput: updateInput,
              password: 입력받은비밀번호,
              boardId: targetId,
            },
          });

          if (result.data) {
            console.log("기존의 글을 수정하는 경우:::", result);
            setModalContent("수정이 완료 되었습니다");
            setAfterSubmitModal(true);
          } else {
            console.log("수정에 실패하는경우");
            setModalContent("수정에 실패하였습니다");
            setAfterSubmitModal(true);
          }
        } catch (error: any) {
          // 에러 발생 시 처리
          const errMsg = (error as ApolloError).graphQLErrors[0] as any;
          if (errMsg) {
            setModalContent(errMsg.message);
            setAfterSubmitModal(true);
          } else {
            console.error("네트워크에러 발생");
            setModalContent("네트워크에러 발생하였습니다. 재시도 해주세요.");
            setAfterSubmitModal(true);
          }
        }
      } else {
        setModalContent("수정된 내용이 없습니다.");
        setAfterSubmitModal(true);
      }
    }
  };

  const onSearchAddress = () => {
    setIsAddressModalOpen((prevOpenState: boolean) => !prevOpenState);
  };

  const completeHandler = (data: IAddress) => {
    console.log("주소 data", data);
    const { address, zonecode } = data;
    setZonecode(zonecode);
    setAddress(address);
    setIsAddressModalOpen(false);
  };

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log("onChangeFile 호출되었습니다.");
    //index 가 0 = 첫번쨰, 1 = 두번쨰, 2= 세번째 사진
    event.stopPropagation();
    if (!event.target.files) return;
    const file = event.target.files[0] ?? null;
    const isValid = checkValidationFile(file);
    if (!isValid) return;

    const result = await uploadFile({ variables: { file } });
    console.log(result.data?.uploadFile.url);
    setImageUrl(result.data?.uploadFile.url ?? "");
    images[index].src = result.data?.uploadFile.url;
    console.log("변경후 images:::", images);
    setImages([...images]);
  };

  const handleImageClick = (index: number) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click(); // 해당 Input 요소 클릭
    }
  };

  const onDeleteImage = (index: number, e: ChangeEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    const updatedImages = [...images];
    updatedImages[index].src = ""; // 이미지 삭제 (URL 비우기)
    setImages(updatedImages);
  };

  return {
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
    onChangeYoutubeUrl,
    youtubeUrl,
    onChangeFile,
    handleImageClick,
    imageUrl,
    images,
    handleMouseEnter,
    handleMouseLeave,
    onDeleteImage,
    hoveredIndex,
  };
};
