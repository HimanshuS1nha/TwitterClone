import { AuthOptions } from "@/libs/AuthOptions";
import { Comments } from "@prisma/client";
import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";
import { getServerSession } from "next-auth";
import Link from "next/link";

import LikeButton from "./LikeButton";
import prisma from "@/libs/db";

export const revalidate = 0;

const Comment = async ({
  comment,
  username,
}: {
  comment: Comments;
  username: string;
}) => {
  const session = await getServerSession(AuthOptions);
  const user = await prisma.users.findUnique({
    where: {
      id: comment.userId,
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
            className="rounded-full w-[50px] h-[50px] -mt-3.5"
            alt="USER"
          />
          <div className="flex flex-col">
            <div className="flex space-x-2 items-center">
              <Link
                href={`/profile/${comment.userId}`}
                className="sm:text-lg font-semibold hover:text-blue-600"
              >
                {user?.name}
              </Link>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm hidden sm:block">
                @{user?.username}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
                {formatDistanceToNowStrict(new Date(comment.createdAt))}
              </p>
            </div>
            <p className="text-gray-500 text-sm">
              Replying to <span className="text-blue-500">@{username}</span>
            </p>
            <p className="text-sm sm:text-base">{comment.content}</p>
          </div>
        </div>
        <div className="flex space-x-8 mt-2 mx-16">
          <LikeButton
            tweet={comment}
            userId={session?.user.id!}
            key={comment.likedBy.length}
            endpoint="comment/liked"
          />
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-700 w-full mb-4" />
    </>
  );
};

export default Comment;
