"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "./Header";

// import useEditProfileModal from "@/hooks/useEditProfileModal";

interface ProfileImageProps {
  bannerImage: string;
  image: string;
}

const ProfileImage = ({ bannerImage, image }: ProfileImageProps) => {
  //   const editProfileModal = useEditProfileModal();
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <>
      <Header title="Profile" giveBottomSpace={false} showIcon />

      <div
        className={`w-full h-60 ${
          bannerImage ? "" : "bg-neutral-200 dark:bg-neutral-800"
        } relative`}
      >
        {bannerImage && <Image src={bannerImage} fill alt="USER BANNER" />}
        <Image
          src={image || "/user.jpg"}
          alt="USER IMAGE"
          width={150}
          height={150}
          className="rounded-full border-4 border-white dark:border-black absolute -bottom-20 left-4 w-[150px] h-[150px]"
        />
      </div>
    </>
  );
};

export default ProfileImage;
