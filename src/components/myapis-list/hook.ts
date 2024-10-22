import { firebaseApp } from "../../commons/libraries/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  deleteDoc,
  DocumentData,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function useMyAppList() {
  const router = useRouter();
  const [data, setData] = useState<DocumentData[]>([
    {
      id: "",
      content: "",
      writer: "",
      title: "",
    },
  ]);

  const onClickFetch = async () => {
    try {
      const board = collection(getFirestore(firebaseApp), "board");
      const querySnapshot = await getDocs(board);

      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(docs);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickDelete = async (documentId: string) => {
    try {
      const db = getFirestore(firebaseApp);
      const docRef = doc(db, "board", documentId);
      await deleteDoc(docRef);
      alert("문서가 삭제되었습니다!");
      onClickFetch();
    } catch (err) {
      console.error("문서 삭제 실패:", err);
      alert("문서 삭제에 실패했습니다.");
    }
  };

  const onClickEdit = (documentId: string) => {
    router.push(`/myapis/${documentId}/edit`);
  };

  const onClickDetail = (documentId: string) => {
    router.push(`/myapis/${documentId}`);
  };
  return {
    data,
    setData,
    onClickFetch,
    onClickDelete,
    onClickEdit,
    onClickDetail,
  };
}
