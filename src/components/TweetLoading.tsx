"use client";

import { Skeleton } from "@nextui-org/react";

const TweetLoading = () => {
  return (
    <>
      <div className="mx-3 mb-3">
        <div className="flex items-center gap-x-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-700 w-full mb-4" />
    </>
  );
};

export default TweetLoading;
