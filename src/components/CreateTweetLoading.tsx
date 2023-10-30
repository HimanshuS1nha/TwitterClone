"use client";

import { Skeleton } from "@nextui-org/react";

const CreateTweetLoading = () => {
  return (
    <>
      <div className="flex flex-col mx-3 mb-3">
        <div className="flex space-x-1 items-center">
          <Skeleton className="w-[50px] h-[50px] rounded-full" />
          <Skeleton className="w-full h-8 rounded-lg" />
        </div>
        <div className="flex justify-end mx-3 mt-3">
          <Skeleton className="w-24 py-5 rounded-full" />
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-700 w-full mb-4" />
    </>
  );
};

export default CreateTweetLoading;
