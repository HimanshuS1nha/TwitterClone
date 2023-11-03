"use client";

import { Comments } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";

const ProfileComment = ({ comment }: { comment: Comments }) => {
  const { data } = useQuery({
    queryKey: ["getcommentuser" + comment.tweetId],
    queryFn: async () => {
      const { data: userData } = await axios.post("/api/getuser", {
        id: comment.userId,
      });
      const { data: tweetData } = await axios.post("/api/gettweet", {
        id: comment.tweetId,
      });
      return { userData, tweetData };
    },
  });
  return (
    <>
      <div className="flex items-center gap-x-3">
        <Image
          src={data?.userData?.user?.image || "/user.jpg"}
          width={50}
          height={50}
          className="object-contain rounded-full w-[50px] h-[50px] -mt-3.5"
          alt="USER"
        />
        <div className="flex flex-col">
          <div className="flex space-x-2 items-center">
            <p className="sm:text-lg font-semibold">
              {data?.userData?.user?.name}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm hidden sm:block">
              @{data?.userData?.user?.username}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
              {formatDistanceToNowStrict(new Date(comment.createdAt))}
            </p>
          </div>
          <p className="text-gray-500 text-sm">
            Replying to{" "}
            <span className="text-blue-500">
              @{data?.tweetData?.user?.username}
            </span>
          </p>
          <p className="text-sm sm:text-base">{comment.content}</p>
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-700 w-full mb-4" />
    </>
  );
};

export default ProfileComment;
