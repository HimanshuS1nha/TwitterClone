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
      const { data } = await axios.post("/api/gettweetanduser", {
        id: comment.tweetId,
        userId: comment.userId,
      });
      return data;
    },
  });
  return (
    <>
      <div className="flex items-center gap-x-3">
        <Image
          src={data?.user?.image || "/user.jpg"}
          width={50}
          height={50}
          className="rounded-full w-[50px] h-[50px] -mt-3.5"
          alt="USER"
        />
        <div className="flex flex-col">
          <div className="flex space-x-2 items-center">
            <p className="sm:text-lg font-semibold">{data?.user?.name}</p>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm hidden sm:block">
              @{data?.user?.username}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
              {formatDistanceToNowStrict(new Date(comment.createdAt))}
            </p>
          </div>
          <p className="text-gray-500 text-sm">
            Replying to{" "}
            <span className="text-blue-500">@{data?.tweetUser?.username}</span>
          </p>
          <p className="text-sm sm:text-base">{comment.content}</p>
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-700 w-full mb-4" />
    </>
  );
};

export default ProfileComment;
