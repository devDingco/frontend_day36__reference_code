# frontend_day36__reference_code
1. 공통
    - [ ]  완성된 day35 폴더를 활용하여 day36을 완성해 주세요.

```jsx
// 이미지 업로드를 위한 graphql 셋팅
// commons/settins/apollo-setting.tsx
// yarn add apollo-upload-client

"use client"

import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

interface IApolloUploadSetting {
    children: React.ReactNode
}
export default function ApolloUploadSetting(props: IApolloUploadSetting) {
    const uploadLink = createUploadLink({
        uri: "http://main-practice.codebootcamp.co.kr/graphql",
    });

    const client = new ApolloClient({
        link: ApolloLink.from([uploadLink]),
        cache: new InMemoryCache()
    })    

    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )
}
```

1. 게시글등록
    - [ ]  src/components/boards-write/index.tsx 경로의 게시글등록과 관련된 페이지 및 컴포넌트에 이미지 등록 기능을 추가해 보세요.
        - [ ]  네모난 사각형의 이미지 등록 아이콘 3개 중, 1개를 클릭하여 이미지를 등록할 수 있도록 만들어 주세요.
        - [ ]  이미지 선택시, GRAPHQL-API(uploadFile)을 사용하여 이미지가 서버에 자동 저장되고, 저장된 이미지를 네모난 사각형 위치에서 미리볼 수 있도록 만들어 주세요.
        - [ ]  미리보기는 클릭한 아이콘의 위치에 보여져야 합니다.(ex, 3개의 아이콘 중, 가운데 이미지 클릭 및 파일 첨부 시 가운데 미리보기 노출 →피그마 참고해주세요.)
            
            ![스크린샷 2024-10-16 오전 10.24.49.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/9c9b02bc-6cb6-4924-bf38-dad25e0fe77b/4ed32166-36b0-4ae7-b08a-9994e715fb86/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-16_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.24.49.png)
            
        - [ ]  이미지의 최대용량은 5MB로 제한해주세요. → 아래 사진 등록시 불가 alert 떠야 합니다.
            
            [5MB 이상 이미지.zip](https://prod-files-secure.s3.us-west-2.amazonaws.com/9c9b02bc-6cb6-4924-bf38-dad25e0fe77b/61d8d7a1-e246-4b60-8f05-a6ae36f7009a/5MB_%E1%84%8B%E1%85%B5%E1%84%89%E1%85%A1%E1%86%BC_%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.zip)
            
        - [ ]  이미지는 필수 입력사항은 아닙니다. 이미지를 등록하지 않아도 게시글 등록은 가능 해야 합니다.
        - [ ]  최종적으로, 게시글 등록하기를 클릭하면 GRAPHQL-API(createBoard)를 사용하여 이미지 주소 문자열을 배열에 담아 게시글과 함께 전송합니다.
        - [ ]  이미지 등록 완료 후 , 미리보기 이미지에 마우스  호버시 삭제 버튼이 보이고, 삭제버튼 클릭시 이미지 미리보기 가 삭제 되어야 합니다.
            
            ![스크린샷 2024-10-16 오전 10.26.54.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/9c9b02bc-6cb6-4924-bf38-dad25e0fe77b/9608b150-cf9c-4863-8c5a-9cd6239b39f1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-16_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.26.54.png)
            
2. 게시글수정
    - [ ]  src/app/boards/[boardId]/edit/page.tsx 경로의 게시글등록과 관련된 페이지 및 컴포넌트에 이미지 수정 기능을 추가해 보세요.
        - [ ]  게시글수정 페이지에 접속하는 경우, 기존에 등록되어있던 이미지를 GRAPHQL-API(fetchBoard)를 사용하여 불러옵니다.
        - [ ]  등록된 이미지의 순서에 맞게 네모난 사각형의 이미지 등록 아이콘 대신에 각각 미리보기를 그려줍니다.
        - [ ]  미리보기를 그릴 이미지가 없는 경우, 네모난 사각형의 이미지 등록 아이콘을 그려줍니다.
        - [ ]  이미지를 선택하여 변경하는 프로세스는 이미지 등록과 동일한 방식을 따릅니다.(선택시 GRAPHQL-API(uploadFile)을 사용하여 서버에 자동 저장, 이미지 클릭시 변경 가능)
        - [ ]  최종적으로, 게시글 수정하기를 클릭하면 GRAPHQL-API(updateBoard)를 사용하여 수정된 이미지 주소 문자열을 배열에 담아 전송합니다.
3. 게시글상세
    - [ ]  src/components/boards-detail/detail/index.tsx 경로의 게시글상세와 관련된 페이지 및 컴포넌트에 이미지 수정 기능을 추가해 보세요.
        - [ ]  GRAPHQL-API(fetchBoard)를 사용하여 게시글 조회할 때, 이미지를 함께 조회합니다.
        - [ ]  해당 이미지를 게시글 내용 윗부분에 배치하여 1개씩 세로로 보여줍니다.
        - [ ]  이미지가 없는 경우는 보여주지 않습니다.
4. 컴포넌트[리팩토링]
    - [ ]  게시글등록, 게시글수정, 게시글상세 컴포넌트의 파일을 보완해 주세요.
    => 타입에러가 감지되어 빨간 밑줄이 그어지는 부분에 타입스크립트를 적용하여 문제를 해결해 주세요.
