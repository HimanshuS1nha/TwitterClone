"use client";

import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const FollowButton = ({ id, followed }: { id: string; followed: boolean }) => {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(followed);

  const { mutate: handleFollow, isLoading } = useMutation({
    mutationKey: ["follow"],
    mutationFn: async (e: any) => {
      const { data } = await axios.post("/api/follow", { id });
      return data;
    },
    onMutate: () => {
      setIsFollowing((prev) => !prev);
    },
    onSettled: () => {
      router.refresh();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      }
    },
  });
  return (
    <>
      {isFollowing ? (
        <Button
          radius="full"
          className="text-sm px-3 hover:bg-gray-400 dark:hover:bg-gray-600 py-4 font-bold float-right"
          onPress={handleFollow}
          disabled={isLoading}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          radius="full"
          className="text-sm px-3 py-4 bg-blue-400 hover:bg-blue-600 text-white font-bold float-right"
          onPress={handleFollow}
          disabled={isLoading}
        >
          Follow
        </Button>
      )}
    </>
  );
};

export default FollowButton;
