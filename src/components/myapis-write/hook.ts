"use client";
import { firebaseApp } from "../../commons/libraries/firebase";
import {
  collection,
  getDoc,
  getFirestore,
  deleteDoc,
  DocumentData,
  updateDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { Form } from "antd";
import { useState } from "react";
import { IMyApiWrite } from "./types";
import { FormInstance } from "antd/es/form";
import { useParams, useRouter } from "next/navigation";
export default function useMyApisWrite(form: FormInstance, isEdit: boolean) {
  const router = useRouter();
  const params = useParams();

  const [data, setData] = useState<IMyApiWrite>({
    id: "",
    writer: "",
    contents: "",
    title: "",
  });

  // 입력값이 없을경우 addDoc 실행하지 않음.
  const isSubmitable =
    data.writer !== "" && data.contents !== "" && data.title !== "";

  const onClickSubmit = async () => {
    if (isSubmitable === true) {
      try {
        const board = collection(getFirestore(firebaseApp), "board");
        const docRef = await addDoc(board, data);
        console.log("id?:::", docRef.id);
        alert("등록이 성공했습니다!");
        form.resetFields();
        setData(() => ({
          id: "",
          writer: "",
          contents: "",
          title: "",
        }));
        router.push("/myapis");
      } catch (err) {
        alert(err);
        console.error(err);
      }
    } else {
      return;
    }
  };

  const onClickUpdate = async () => {
    const documentId = params.myapiId;

    try {
      const db = getFirestore(firebaseApp);
      const docRef = doc(db, "board", documentId); // 수정할 문서의 참조 생성
      await updateDoc(docRef, data); // 문서 업데이트
      alert("문서가 성공적으로 수정되었습니다!");
      router.push("/myapis");
    } catch (err) {
      console.error("문서 수정 실패:", err);
      alert("문서 수정에 실패했습니다.");
    }
  };

  const updateWriter = (newWriter: string) => {
    setData((prevData) => ({
      ...prevData,
      writer: newWriter,
    }));
  };

  const updateTitle = (newTitle: string) => {
    setData((prevData) => ({
      ...prevData,
      title: newTitle,
    }));
  };

  const updateContents = (newContents: string) => {
    setData((prevData) => ({
      ...prevData,
      contents: newContents,
    }));
  };

  const getPreviousData = async () => {
    try {
      const documentId = params.myapiId;
      const db = getFirestore(firebaseApp);
      const docRef = doc(db, "board", documentId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const singleData = docSnapshot.data() as IMyApiWrite;
        setData({ ...singleData });
        form.setFieldsValue(singleData);
        console.log("singleData:::", singleData);
      } else {
        console.log("문서가 존재하지 않습니다.");
      }
    } catch (err) {
      console.error("문서 가져오기 실패:", err);
      alert("문서 가져오기에 실패했습니다.");
    }
  };
  return {
    data,
    setData,
    onClickSubmit,
    updateWriter,
    updateTitle,
    updateContents,
    isSubmitable,
    getPreviousData,
    onClickUpdate,
  };
}
