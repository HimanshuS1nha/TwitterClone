"use client";

import Image from "next/image";
import FollowButton from "./FollowButton";

const SuggestionItem = ({
  name,
  username,
  image,
  userId,
  followed,
}: {
  name: string;
  username: string;
  image: string;
  userId: string;
  followed: boolean;
}) => {
  return (
    <div className="flex justify-between items-center mx-3 my-5">
      <div className="flex gap-x-1 items-center">
        <Image
          src={image || "/user.jpg"}
          width={40}
          height={40}
          className="rounded-full w-[40px] h-[40px]"
          alt="USER"
        />
        <div className="flex flex-col">
          <p className="font-bold text-sm">{name}</p>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            @{username}
          </p>
        </div>
      </div>
      <FollowButton id={userId} followed={followed} />
    </div>
  );
};

export default SuggestionItem;
