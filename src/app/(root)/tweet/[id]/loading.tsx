"use client";

import Header from "@/components/Header";
import TweetLoading from "@/components/TweetLoading";
import { Skeleton } from "@nextui-org/react";

const TweetPageLoading = () => {
  return (
    <>
      <Header title="Tweet" showIcon />

      <TweetLoading />

      <div className="bg-gray-200 dark:bg-gray-800 -mt-5 py-2 px-3 flex gap-x-3 items-center mb-3">
        <Skeleton className="rounded-full w-[40px] h-[40px]" />
        <Skeleton className="w-full py-4 px-3 rounded-full" />
        <Skeleton className="w-24 py-5 rounded-full" />
      </div>

      {Array.from({ length: 4 }, (_, i) => i + 1).map((_, i) => {
        return <TweetLoading key={i} />;
      })}
    </>
  );
};

export default TweetPageLoading;
