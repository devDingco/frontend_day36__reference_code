import { Dispatch, SetStateAction } from "react";

export interface ISearchBar {
  setKeyword: Dispatch<SetStateAction<string>>;
  keyword: string;
  page: number;
  prevDate: Date | null;
  setPrevDate: Dispatch<SetStateAction<Date | null>>;
  nextDate: Date | null;
  setNextDate: Dispatch<SetStateAction<Date | null>>;
}
