import { useState } from "react";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

import { CatImageResponse } from "./types";
export const useGetCatList = () => {
  const [page, setPage] = useState(0);
  const [cats, setCats] = useState<CatImageResponse[]>([]);
  const onClickSync = async () => {
    const result = await fetch(apiUrl + "&api_key=" + apiKey + "&page=" + page);
    const data: CatImageResponse[] = await result.json();
    console.log("먀-아", data);
    setCats((prev: CatImageResponse[]) => [...prev, ...data]);
  };

  return {
    cats,
    page,
    setPage,
    onClickSync,
  };
};
