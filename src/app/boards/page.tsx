"use client";

import BoardList from "components/boards-list/list";
import { Pagination } from "components/boards-list/pagination";
import { useEffect, useMemo, useRef, useState } from "react";

import { useQuery } from "@apollo/client";
import { FETCH_BOARDS } from "components/boards-list/list/queries";
import SearchBar from "components/boards-list/search";
import _ from "lodash";
export default function BoardsPage() {
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [prevDate, setPrevDate] = useState<Date | null>(null);
  const [nextDate, setNextDate] = useState<Date | null>(null);
  const { data, refetch } = useQuery(FETCH_BOARDS, {
    variables: {
      page: page,
      search: searchTerm,
      startDate: prevDate,
      endDate: nextDate,
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(keyword);
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword, prevDate, nextDate]);

  return (
    <>
      <SearchBar
        setKeyword={setKeyword}
        keyword={keyword}
        page={page}
        prevDate={prevDate}
        setPrevDate={setPrevDate}
        nextDate={nextDate}
        setNextDate={setNextDate}
      />
      <BoardList keyword={keyword} data={data} page={page} refetch={refetch} />
      <Pagination
        page={page}
        setPage={setPage}
        refetch={refetch}
        data={data}
        keyword={keyword}
      />
    </>
  );
}
