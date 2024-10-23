import { useQuery } from "@apollo/client";
import { FetchBoardsCountDocument } from "commons/graphql/graphql";
export default function usePagination(keyword: string) {
  const { data, refetch } = useQuery(FetchBoardsCountDocument, {
    variables: {
      search: keyword,
    },
  });
  return {
    refetch,
    data,
  };
}
