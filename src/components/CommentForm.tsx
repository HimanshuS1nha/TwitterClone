"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";

const CommentForm = ({ image, id }: { image: string; id: string }) => {
  const router = useRouter();

  const commentValidator = z.object({
    comment: z
      .string()
      .max(280, { message: "Comment must not exceed 280 characters" }),
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      comment: "",
    },
    resolver: zodResolver(commentValidator),
  });

  const { mutate: handleComment, isLoading } = useMutation({
    mutationKey: ["comment"],
    mutationFn: async (values: z.infer<typeof commentValidator>) => {
      const { data } = await axios.post("/api/comment", {
        id,
        comment: values.comment,
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      reset();
      router.refresh();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      }
    },
  });
  return (
    <form
      className="bg-gray-200 dark:bg-gray-800 -mt-5 py-2 px-3 flex gap-x-3 items-center mb-3"
      onSubmit={handleSubmit((data) => handleComment(data))}
    >
      <Image
        src={image}
        alt="USER"
        width={40}
        height={40}
        className="rounded-full w-[40px] h-[40px]"
      />
      <Input
        type="text"
        label="Tweet your reply"
        size="sm"
        radius="full"
        className="w-[70%]"
        isRequired
        isClearable
        {...register("comment", { required: true })}
      />
      <Button
        className="text-sm px-3 py-4 bg-blue-400 hover:bg-blue-600 text-white font-bold"
        radius="full"
        type="submit"
        isLoading={isLoading}
      >
        Reply
      </Button>
    </form>
  );
};

export default CommentForm;
