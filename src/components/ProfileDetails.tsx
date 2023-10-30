"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsCalendar3 } from "react-icons/bs";
import Link from "next/link";

interface ProfileDetailsProps {
  name: string;
  username: string;
  id: string;
  bio: string;
  joiningDate: Date;
  noOfFollowers: number;
  noOfFollowing: number;
}

const ProfileDetails = ({
  name,
  username,
  bio,
  id,
  joiningDate,
  noOfFollowers,
  noOfFollowing,
}: ProfileDetailsProps) => {
  const router = useRouter();

  const joinedAt = new Date(joiningDate);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="flex flex-col m-7">
      <p className="text-lg font-bold">{name}</p>
      <p className="text-neutral-500 text-sm">@{username}</p>
      <p className="mt-2">{bio || "No bio added"}</p>
      <div className="flex space-x-4 mt-3 items-center text-neutral-500">
        <BsCalendar3 />
        <p>
          Joined in {months[joinedAt.getMonth()]} {joinedAt.getFullYear()}
        </p>
      </div>
      <div className="flex space-x-5 mt-3">
        <Link href={`/following/${id}`} className="flex space-x-2">
          <p className="font-bold">{noOfFollowing || 0}</p>
          <p className="text-neutral-500">Following</p>
        </Link>
        <Link href={`/followers/${id}`} className="flex space-x-2">
          <p className="font-bold">{noOfFollowers || 0}</p>
          <p className="text-neutral-500">Followers</p>
        </Link>
      </div>
    </div>
  );
};

export default ProfileDetails;
