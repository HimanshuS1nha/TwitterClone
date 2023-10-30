import { AuthOptions } from "@/libs/AuthOptions";
import { Tweets } from "@prisma/client";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { formatDistanceToNowStrict } from "date-fns";
import LikeButton from "./LikeButton";
import { getServerSession } from "next-auth";
import Link from "next/link";

import prisma from "@/libs/db";

export const revalidate = 0;

const Tweet = async ({ tweet }: { tweet: Tweets }) => {
  const session = await getServerSession(AuthOptions);
  const user = await prisma.users.findUnique({
    where: {
      id: tweet.userId,
    },
  });
  return (
    <>
      <div className="mx-3 mb-3">
        <div className="flex items-center gap-x-3">
          <Image
            src={user?.image || "/user.jpg"}
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
                {user?.name}
              </Link>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm hidden sm:block">
                @{user?.username}
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
            userId={session?.user.id!}
            key={tweet.likedBy.length}
            endpoint="liked"
          />
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-700 w-full mb-4" />
    </>
  );
};

export default Tweet;
