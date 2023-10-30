"use client";

import { Skeleton } from "@nextui-org/react";
import Image from "next/image";

const NotificationItemLoading = () => {
  return (
    <>
      <div className="flex flex-col px-5 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
        <div className="flex gap-x-6 items-start">
          <Image
            src={"/logo.png"}
            alt="LOGO"
            width={30}
            height={30}
            className="object-contain mt-1"
          />
          <div className="flex flex-col">
            <Skeleton className="w-8 h-8 rounded-full mb-2" />
            <Skeleton className="mb-4 font-semibold w-36 h-4" />
            <Skeleton className="text-neutral-600 dark:text-neutral-400" />
          </div>
        </div>
      </div>
      <hr className="border-gray-300 w-full mb-4" />
    </>
  );
};

export default NotificationItemLoading;
