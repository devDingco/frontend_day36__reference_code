"use client";
import { FetchBoardWithSearchesDocument } from "commons/graphql/graphql";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { ISearchBar } from "./types";
export const useSearchBar = ({
  keyword,
  page,
  prevDate,
  nextDate,
}: ISearchBar) => {
  const { data, refetch } = useQuery(FetchBoardWithSearchesDocument);
  console.log("data 변하니?", data);
  const router = useRouter();
  const getDebounce = _.debounce((value: string) => {
    console.log("야호");
    refetch({
      search: value,
      page: page,
      startDate: prevDate,
      endDate: nextDate,
    });
  }, 500);

  const onChangeSearch = () => {
    // setSearch(event.currentTarget.value);
    getDebounce();
    console.log(keyword, prevDate, nextDate);
  };

  const pageToNew = () => {
    router.push("/boards/new");
  };
  return {
    data,
    onChangeSearch,
    pageToNew,
  };
};
