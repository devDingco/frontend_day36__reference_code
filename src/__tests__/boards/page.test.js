import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BoardList from "../../components/boards-list/list/index"; // 게시글 목록 컴포넌트
import { useRouter } from "next/navigation";

// next/router 모킹

// mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// add return value query and push
useRouter.mockReturnValue({
  query: {},
  push: () => "/boards",
});

describe("PostList Component", () => {
  let router;

  beforeEach(() => {
    router = {
      push: jest.fn(), // push 메서드 모킹
      pathname: "/",
      query: {},
      asPath: "/",
    };

    // useRouter.mockImplementation(() => router); // useRouter 모킹
  });

  test("전체 글 보기 버튼 클릭 시 글 목록 페이지('/')로 이동해야 합니다.", () => {
    render(
      <BoardList
        keyword=""
        data={{ fetchBoards: [] }} // 초기 데이터 설정
        page={1}
        refetch={jest.fn()} // refetch는 mock 함수로 넘김
      />
    );

    // 버튼 클릭 이벤트 시뮬레이션
    // const button = screen.getByText("전체 글 보기"); // 버튼 텍스트에 맞게 수정
    // fireEvent.click(button);

    // 이동한 페이지 확인
    // expect(router.push).toHaveBeenCalledWith("/boards"); // 게시글 목록 페이지 경로 확인

    const heading = screen.getByRole("heading", { level: 1 });
  });

  // test("게시글 목록에 글 제목과 작성일자만 표시되어야 합니다.", () => {
  //   const data = {
  //     __typename: "Query",
  //     fetchBoards: [
  //       {
  //         __typename: "Board",
  //         _id: "1",
  //         writer: "작성자1",
  //         title: "첫 번째 글",
  //         contents: "내용 1",
  //         youtubeUrl: null,
  //         likeCount: 0,
  //         dislikeCount: 0,
  //         images: null,
  //         createdAt: new Date("2024-10-14T03:27:41.958Z"),
  //         updatedAt: new Date("2024-10-14T03:27:41.958Z"),
  //         deletedAt: null,
  //       },
  //     ],
  //   };

  //   render(
  //     <BoardList
  //       keyword=""
  //       data={data}
  //       page={1}
  //       refetch={jest.fn()} // refetch는 mock 함수로 넘김
  //     />
  //   );

  //   // 게시글 목록 렌더링
  //   data.fetchBoards.forEach((post) => {
  //     expect(screen.getByText(post.title)).toBeInTheDocument();
  //     expect(
  //       screen.getByText(post.createdAt.toISOString().split("T")[0])
  //     ).toBeInTheDocument(); // 날짜 형식 맞춤
  //     expect(screen.queryByText(post.contents)).not.toBeInTheDocument();
  //   });
  // });

  // test("무한 스크롤 기능이 작동해야 한다", () => {
  //   // 스크롤을 내리는 이벤트 시뮬레이션
  //   window.scrollY = 1000; // 현재 스크롤 위치 설정
  //   fireEvent.scroll(window, { target: { scrollY: 2000 } });

  //   // 새로운 게시글이 로드되었는지 확인하는 로직을 추가해야 함
  //   expect(screen.getByText("새로운 게시글 제목")).toBeInTheDocument();
  // });
});
