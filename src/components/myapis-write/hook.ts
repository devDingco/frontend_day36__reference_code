
"use client";
import { supabase } from "../../commons/libraries/supabase";
import { useState } from "react";
import { IMyApiWrite } from "./types";
import { FormInstance } from "antd/es/form";
import { useParams, useRouter } from "next/navigation";

export default function useMyApisWrite(form: FormInstance, isEdit: boolean) {
  const router = useRouter();
  const params = useParams(); // URL 파라미터에서 게시글 ID 추출용

  // 게시글 데이터를 저장하는 state
  // 실제 폼 데이터는 Ant Design Form에서 관리해요.
  const [data, setData] = useState<IMyApiWrite>({
    id: "",
    writer: "",
    contents: "",
    title: "",
  });

  const onClickSubmit = async () => {
    try {
      // Ant Design Form 유효성 검사 및 데이터 추출
      const formValues = await form.validateFields();
      
      // 추가 검증 (필수 필드 확인)
      if (!formValues.writer || !formValues.title || !formValues.contents) {
        alert("모든 필드를 입력해주세요.");
        return;
      }

      // Supabase에 새 게시글 삽입
      const { data: newBoard, error } = await supabase
        .from('board')          // board 테이블에
        .insert([{              // 데이터 삽입 (배열 형태)
          writer: formValues.writer,
          title: formValues.title,
          contents: formValues.contents
        }])
        .select()               // 삽입된 데이터 반환
        .single();              // 단일 객체로 반환

      // 에러 처리
      if (error) {
        console.error("등록 실패:", error);
        alert(`등록에 실패했습니다: ${error.message}`);
        return;
      }

      // 성공 처리
      alert("등록이 성공했습니다!");
      form.resetFields();     // 폼 초기화
      setData(() => ({        // 로컬 상태 초기화
        id: "",
        writer: "",
        contents: "",
        title: "",
      }));
      router.push("/myapis"); // 목록 페이지로 이동
    } catch (err) {
      // Ant Design Form 유효성 검사 실패는 조용히 처리
      if (err && typeof err === 'object' && 'errorFields' in err) {
        return; // 폼 유효성 검사 실패
      }
      console.error("등록 중 오류:", err);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  const onClickUpdate = async () => {
    // URL 파라미터에서 게시글 ID 추출 (예: /myapis/123/edit에서 123)
    const boardId = params.myapiId;
    
    // 게시글 ID 유효성 검사
    if (!boardId) {
      alert("유효하지 않은 게시글 ID입니다.");
      return;
    }

    try {
      // Ant Design Form 유효성 검사 및 데이터 추출
      const formValues = await form.validateFields();

      // 추가 검증 (필수 필드 확인)
      if (!formValues.writer || !formValues.title || !formValues.contents) {
        alert("모든 필드를 입력해주세요.");
        return;
      }

      // Supabase에서 게시글 업데이트
      const { data: updatedData, error } = await supabase
        .from('board')          // board 테이블에서
        .update({               // 다음 데이터로 업데이트
          writer: formValues.writer,
          title: formValues.title,
          contents: formValues.contents
        })
        .eq('id', boardId)      // id가 boardId와 같은 행
        .select();              // 업데이트된 데이터 반환

      // 에러 처리
      if (error) {
        console.error("게시글 수정 실패:", error);
        alert(`게시글 수정에 실패했습니다: ${error.message}`);
        return;
      }

      // 업데이트된 행이 없는 경우 처리 (ID가 존재하지 않거나 권한 없음)
      if (!updatedData || updatedData.length === 0) {
        alert("수정할 게시글을 찾을 수 없습니다.");
        return;
      }

      // 성공 처리
      alert("게시글이 성공적으로 수정되었습니다!");
      router.push("/myapis"); // 목록 페이지로 이동
    } catch (err) {
      // Ant Design Form 유효성 검사 실패는 조용히 처리
      if (err && typeof err === 'object' && 'errorFields' in err) {
        return; // 폼 유효성 검사 실패
      }
      console.error("게시글 수정 실패:", err);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  const getPreviousData = async () => {
    try {
      // URL 파라미터에서 게시글 ID 추출
      const boardId = params.myapiId;
      
      // 게시글 ID가 없으면 함수 종료 (새 글 작성 모드)
      if (!boardId) {
        return;
      }
      
      // Supabase에서 특정 게시글 조회
      const { data: singleData, error } = await supabase
        .from('board')          // board 테이블에서
        .select('*')            // 모든 컬럼 조회
        .eq('id', boardId)      // id가 boardId와 같은 행
        .single();              // 단일 객체로 반환

      // 에러 처리
      if (error) {
        console.error("게시글 가져오기 실패:", error);
        if (error.code === 'PGRST116') {
          // PGRST116: 조건에 맞는 데이터가 없는 경우 Supabase에서 해당 에러 코드를 반환해요 !
          alert("해당 게시글을 찾을 수 없습니다.");
        } else {
          alert(`게시글 가져오기에 실패했습니다: ${error.message}`);
        }
        return;
      }

      // 데이터가 있는 경우 폼에 설정
      if (singleData) {
        // Ant Design Form에 설정할 데이터 구성
        const boardData = {
          writer: singleData.writer || '',
          title: singleData.title || '',
          contents: singleData.contents || ''
        };
        
        // Ant Design Form에 기존 데이터 설정
        form.setFieldsValue(boardData);
        
        // 로컬 상태도 업데이트
        setData({ 
          id: String(singleData.id),
          ...boardData 
        });
      } else {
        alert("해당 게시글을 찾을 수 없습니다.");
      }
    } catch (err) {
      console.error("게시글 가져오기 실패:", err);
      alert("게시글 가져오기에 실패했습니다.");
    }
  };
  
  // ===== 훅 반환값 =====
  // 컴포넌트에서 사용할 데이터와 함수들을 반환
  return { 
    setData,            
    onClickSubmit,      
    getPreviousData,    
    onClickUpdate,      
  };
}
