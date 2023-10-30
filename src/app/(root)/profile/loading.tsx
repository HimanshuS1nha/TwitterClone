"use client";

import { Skeleton, Tab, Tabs } from "@nextui-org/react";
import { BsCalendar3 } from "react-icons/bs";

import Header from "@/components/Header";
import TweetLoading from "@/components/TweetLoading";

const ProfilePageLoading = () => {
  return (
    <>
      <Header title="Profile" giveBottomSpace={false} showIcon />
      <div className={`w-full h-60 relative`}>
        <Skeleton className="w-full h-60" />
        <Skeleton className="rounded-full border-4 border-white dark:border-black absolute -bottom-20 left-4 w-[150px] h-[150px]" />
      </div>

      <Skeleton className="float-right m-5 w-24 py-5 rounded-full" />

      <div className="mt-20" />

      <div className="flex flex-col m-7">
        <Skeleton className="w-28 h-4" />
        <p className="flex items-center">
          @<Skeleton className="w-28 h-4" />
        </p>
        <Skeleton className="w-28 h-4 mt-2" />
        <div className="flex space-x-4 mt-3 items-center text-neutral-500">
          <BsCalendar3 />
          <p>
            Joined in <Skeleton className="w-28 h-4" />
          </p>
        </div>
        <div className="flex space-x-5 mt-3">
          <div className="flex space-x-2 items-center">
            <Skeleton className="w-6 h-6 rounded-full" />
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex space-x-2 items-center">
            <Skeleton className="w-6 h-6 rounded-full" />
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>

      <Tabs
        aria-label="Options"
        classNames={{
          base: "w-full",
          cursor: "w-full bg-blue-600",
          tabList: "w-full",
        }}
        variant="underlined"
      >
        <Tab key="tweets" title="Tweets">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((_, i) => {
            return <TweetLoading key={i} />;
          })}
        </Tab>
        <Tab key="comments" title="Replies">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((_, i) => {
            return <TweetLoading key={i} />;
          })}
        </Tab>
      </Tabs>
    </>
  );
};

export default ProfilePageLoading;
