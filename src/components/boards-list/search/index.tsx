import { Button, DatePicker, Flex, Input } from "antd";
import styles from "./styles.module.css";
import Image from "next/image";
import { CalendarOutlined, SearchOutlined } from "@ant-design/icons";
import { ISearchBar } from "./types";
import { useSearchBar } from "./hook";

export default function SearchBar({
  setKeyword,
  keyword,
  page,
  prevDate,
  setPrevDate,
  nextDate,
  setNextDate,
}: ISearchBar) {
  const IMAGE_SRC = {
    writeButton: {
      src: require("@assets/left_icon.png"),
      alt: "등록버튼",
    },
  };
  const { RangePicker } = DatePicker;

  const { data, onChangeSearch, pageToNew } = useSearchBar({
    setKeyword,
    keyword,
    page,
    prevDate,
    setPrevDate,
    nextDate,
    setNextDate,
  });

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.title}>트립토크 게시판</div>
        <Flex className={styles.menubody}>
          <div className={styles.menuContainer}>
            <Input
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              prefix={<SearchOutlined />}
              className={styles.searchbar}
              placeholder="제목을 검색해 주세요"
            />
            <Flex className={styles.datePickerContainer}>
              <div className={styles.datePicker}>
                <CalendarOutlined />
                <RangePicker
                  format={{
                    format: "YYYY-MM-DD",
                  }}
                  suffixIcon={null}
                  className={styles.dataPickerInput}
                  style={{ flex: 1 }}
                  placeholder={["YYYY.MM.DD", "YYYY.MM.DD"]}
                  onChange={(date: any) => {
                    date && (setPrevDate(date[0]), setNextDate(date[1]));
                  }}
                />
              </div>
            </Flex>
            <Button className={styles.searchButton} onClick={onChangeSearch}>
              검색
            </Button>
          </div>
          <div>
            <Button className={styles.newBoardButton}>
              <Image
                src={IMAGE_SRC.writeButton.src}
                alt={IMAGE_SRC.writeButton.alt}
              />
              트립토크 등록
            </Button>
          </div>
        </Flex>
      </div>
    </div>
  );
}
