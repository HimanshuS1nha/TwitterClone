"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const CreateTweet = () => {
  const session = useSession();
  const router = useRouter();

  const tweetValidator = z.object({
    tweet: z
      .string()
      .max(280, { message: "Tweet must be atmost 280 characters long" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tweet: "",
    },
    resolver: zodResolver(tweetValidator),
  });

  const { mutate: createTweet, isLoading } = useMutation({
    mutationKey: ["create-tweet"],
    mutationFn: async (values: z.infer<typeof tweetValidator>) => {
      const { data } = await axios.post("/api/create-tweet", {
        content: values.tweet,
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
    <>
      <form
        className="flex flex-col mx-3 mb-3"
        onSubmit={handleSubmit((data) => createTweet(data))}
      >
        <div className="flex space-x-1 items-center">
          <Image
            src={session.data?.user.image || "/user.jpg"}
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
            alt="USER"
          />
          <Input
            placeholder="What's happening"
            type="text"
            id="tweet"
            classNames={{
              inputWrapper: "bg-transparent",
            }}
            isRequired
            isClearable
            autoComplete="off"
            {...register("tweet", { required: true })}
            isInvalid={errors.tweet ? true : false}
            errorMessage={errors.tweet?.message}
          />
        </div>
        <div className="flex justify-end mx-3 mt-3">
          <Button
            type="submit"
            color="primary"
            radius="full"
            className="bg-blue-400 hover:bg-blue-600 font-semibold"
            isLoading={isLoading}
          >
            Tweet
          </Button>
        </div>
      </form>

      <hr className="border-gray-300 dark:border-gray-700 w-full mb-4" />
    </>
  );
};

export default CreateTweet;
