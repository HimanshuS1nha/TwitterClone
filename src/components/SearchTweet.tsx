"use client";

import { Tweets } from "@prisma/client";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { formatDistanceToNowStrict } from "date-fns";
import LikeButton from "./LikeButton";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const SearchTweets = ({ tweet }: { tweet: Tweets }) => {
  const session = useSession();

  const { data } = useQuery({
    queryKey: ["getuser", "search", tweet.userId],
    queryFn: async () => {
      const { data } = await axios.post("/api/getuser", { id: tweet.userId });
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      }
    },
  });

  return (
    <>
      <div className="mx-3 mb-3">
        <div className="flex items-center gap-x-3">
          <Image
            src={data?.user?.image || "/user.jpg"}
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
            alt="USER"
          />
          <div className="flex flex-col">
            <div className="flex space-x-2 items-center">
              <Link
                href={`/profile/${tweet.userId}`}
                className="sm:text-lg font-semibold hover:text-blue-600"
              >
                {data?.user?.name}
              </Link>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm hidden sm:block">
                @{data?.user?.username}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
                {formatDistanceToNowStrict(new Date(tweet.createdAt))}
              </p>
            </div>
            <p className="text-sm sm:text-base">{tweet.content}</p>
          </div>
        </div>
        <div className="flex space-x-8 mt-2 mx-16">
          <Link
            href={`/tweet/${tweet.id}`}
            className="flex space-x-1 items-center cursor-pointer group"
          >
            <FaRegComment size={20} className="group-hover:text-blue-500" />
            <p className="group-hover:text-blue-500">
              {/* @ts-ignore  */}
              {tweet?.comments?.length}
            </p>
          </Link>
          <LikeButton
            tweet={tweet}
            userId={session?.data?.user.id!}
            key={tweet.likedBy.length}
            endpoint="liked"
          />
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-700 w-full mb-4" />
    </>
  );
};

export default SearchTweets;
