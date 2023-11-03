"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Comments, Tweets } from "@prisma/client";

const LikeButton = ({
  tweet,
  userId,
  endpoint,
}: {
  tweet: Tweets | Comments;
  userId: string;
  endpoint: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [likes, setLikes] = useState<number>(tweet.likedBy.length);
  const [isLiked, setIsLiked] = useState(tweet.likedBy.includes(userId));

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;
  const router = useRouter();

  const handleLike = async () => {
    try {
      if (isLiked) {
        setIsLiked(false);
        setLikes((prev) => (prev -= 1));
      } else {
        setIsLiked(true);
        setLikes((prev) => (prev += 1));
      }
      setIsLoading(true);
      await axios.post(`/api/${endpoint}`, { tweetId: tweet.id });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      }
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };
  return (
    <button
      className="flex space-x-1 items-center group cursor-pointer disabled:cursor-not-allowed"
      onClick={handleLike}
      disabled={isLoading}
    >
      <Icon
        size={20}
        className={`group-hover:text-red-500 ${isLiked ? "text-red-500" : ""}`}
      />
      <p
        className={`group-hover:text-red-500 ${isLiked ? "text-red-500" : ""}`}
      >
        {likes}
      </p>
    </button>
  );
};

export default LikeButton;
