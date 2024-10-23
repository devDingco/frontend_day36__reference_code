"use client";

import { useEffect } from "react";
import { useGetCatList } from "./hook";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";

export default function CatList() {
  const { page, setPage, onClickSync, cats } = useGetCatList();

  useEffect(() => {
    onClickSync();
  }, [page]);

  return (
    <div>
      <InfiniteScroll
        hasMore={true}
        loader={<Skeleton />}
        dataLength={cats.length ?? 0}
        next={() => setPage((prev) => prev + 1)}
      >
        {cats?.map((cat, index) => {
          return (
            <div key={cat.id}>
              <Image
                src={cat.url}
                alt={"고양이이미지" + index}
                width={cat.width}
                height={cat.height}
              />
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}
