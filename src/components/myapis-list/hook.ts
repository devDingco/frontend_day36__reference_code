import { supabase } from "../../commons/libraries/supabase";
import { useEffect, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";

interface IBoardData {
  id: string;             
  writer: string;          
  title: string;           
  contents: string;        
  created_at?: string;     
  updated_at?: string;     
}

export default function useMyAppList() {
  const router = useRouter();
  
  // 게시글 목록 데이터를 저장하는 state
  const [data, setData] = useState<IBoardData[]>([
    {
      id: "",
      contents: "",
      writer: "",
      title: "",
    },
  ]);

  const onClickFetch = async () => {
    try {
      // Supabase에서 데이터 조회
      const { data: boards, error } = await supabase
        .from('board')           // board 테이블 선택
        .select('*')             // 모든 컬럼 조회
        .order('created_at', { ascending: false }); // 최신순 정렬

      // 에러 처리
      if (error) {
        console.error('데이터 조회 실패:', error);
        alert(`데이터 조회에 실패했습니다: ${error.message}`);
        return;
      }

      // 성공 시 상태 업데이트
      setData(boards || []);
    } catch (err) {
      console.error('데이터 조회 중 오류:', err);
      alert('데이터 조회 중 오류가 발생했습니다.');
    }
  };

  const onClickDelete = async (
    boardId: string,
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    // 이벤트 버블링 방지 (부모 요소의 클릭 이벤트 실행 방지)
    event.stopPropagation();
    
    // 입력 데이터 유효성 검사
    if (!boardId) {
      alert("유효하지 않은 게시글 ID입니다.");
      return;
    }
    
    try {
      // Supabase에서 게시글 삭제
      const { error } = await supabase
        .from('board')        // board 테이블에서
        .delete()             // 삭제 작업
        .eq('id', boardId);   // id가 boardId와 같은 행

      // 에러 처리
      if (error) {
        console.error("게시글 삭제 실패:", error);
        alert(`게시글 삭제에 실패했습니다: ${error.message}`);
        return;
      }

      // 성공 시 사용자에게 알림 및 목록 새로고침
      alert("게시글이 삭제되었습니다!");
      onClickFetch(); // 목록을 다시 불러와서 UI 업데이트
    } catch (err) {
      console.error("게시글 삭제 실패:", err);
      alert("게시글 삭제에 실패했습니다.");
    }
  };
  
  const onClickEdit = (
    boardId: string,
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    // Next.js App Router 방식으로 동적 경로로 이동
    router.push(`/myapis/${boardId}/edit`);
  };

  const onClickDetail = (
    boardId: string,
    event: MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    router.push(`/myapis/${boardId}`);
  };

  // 컴포넌트에서 사용할 데이터와 함수들을 반환
  return {
    data,        
    setData,        
    onClickFetch,   
    onClickDelete,  
    onClickEdit,   
    onClickDetail,  
  };
}
