"use client";

import { Users } from "@prisma/client";
import Link from "next/link";
import FollowButton from "./FollowButton";
import { useSession } from "next-auth/react";
import Image from "next/image";

const User = ({ user }: { user: Users }) => {
  const session = useSession();
  return (
    <>
      <div className="flex items-center gap-x-3 mx-3 mb-3 w-full">
        <Image
          src={user?.image || "/user.jpg"}
          width={50}
          height={50}
          className="rounded-full w-[50px] h-[50px]"
          alt="USER"
        />
        <div className="flex justify-between items-center w-full mr-5">
          <div className="flex space-x-2 items-center">
            <Link
              href={`/profile/${user.id}`}
              className="sm:text-lg font-semibold hover:text-blue-600"
            >
              {user?.name}
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm hidden sm:block">
              @{user?.username}
            </p>
          </div>
          <FollowButton
            id={user.id}
            followed={user.followers.includes(session.data?.user.id!)}
          />
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-700 w-full mb-4" />
    </>
  );
};

export default User;
