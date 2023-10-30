"use client";

import { IoMdMail } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { AiFillLock, AiOutlineIdcard } from "react-icons/ai";
import Image from "next/image";
import { BiSolidUser } from "react-icons/bi";
import { FaImagePortrait } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { BsImageFill } from "react-icons/bs";
import { useUploadThing } from "@/libs/uploadthing";

export default function SignupModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { startUpload } = useUploadThing("imageUploader");

  const [image, setImage] = useState<File[]>([]);
  const [bannerImage, setBannerImage] = useState<File[]>([]);

  const handleOpenChange = () => {
    reset();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      if (e.target.name === "image") {
        setImage(Array.from(e.target.files));
      } else {
        setBannerImage(Array.from(e.target.files));
      }
    }
  };

  const addUserValidator = z.object({
    name: z
      .string()
      .min(5, { message: "Name must be atleast 5 characters long" }),
    username: z
      .string()
      .min(5, { message: "Username must be atleast 5 characters long" }),
    email: z.string().email(),
    bio: z
      .string()
      .max(200, { message: "Bio must be atmost 200 characters long" }),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters long" }),
    cpassword: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters long" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      bio: "",
      password: "",
      cpassword: "",
    },
    resolver: zodResolver(addUserValidator),
  });

  const { mutate: handleSignup, isLoading } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (values: z.infer<typeof addUserValidator>) => {
      if (values.password !== values.cpassword) {
        toast.error("Passwords don't match");
        return null;
      }
      const imageUpload = await startUpload(image);
      const bannerImageUpload = await startUpload(bannerImage);

      const { data } = await axios.post("/api/signup", {
        name: values.name,
        email: values.email,
        username: values.username,
        password: values.password,
        bio: values.bio,
        image: imageUpload?.[0].url,
        bannerImage: bannerImageUpload?.[0].url,
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      reset();
      onClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      }
    },
  });

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        radius="full"
        className="w-[280px] py-5 bg-blue-400 font-bold hover:bg-blue-600"
      >
        Sign up with Email
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <Image
                src={"/logo.png"}
                alt="LOGO"
                width={40}
                height={40}
                className="object-contain mx-auto mb-3 mt-3"
              />
              <ModalHeader className="flex flex-col gap-1 text-blue-950 font-bold text-center text-3xl dark:text-white">
                Sign up
              </ModalHeader>
              <form onSubmit={handleSubmit((data) => handleSignup(data))}>
                <ModalBody>
                  <Input
                    autoFocus
                    endContent={
                      <BiSolidUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Username"
                    variant="bordered"
                    id="username"
                    {...register("username", { required: true })}
                    isRequired
                    isInvalid={errors.username ? true : false}
                    errorMessage={errors.username?.message}
                  />
                  <Input
                    endContent={
                      <AiOutlineIdcard className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Name"
                    variant="bordered"
                    id="name"
                    {...register("name", { required: true })}
                    isRequired
                    isInvalid={errors.name ? true : false}
                    errorMessage={errors.name?.message}
                  />
                  <Input
                    endContent={
                      <IoMdMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Email"
                    variant="bordered"
                    id="email"
                    {...register("email", { required: true })}
                    isRequired
                    isInvalid={errors.email ? true : false}
                    errorMessage={errors.email?.message}
                  />
                  <Input
                    endContent={
                      <ImProfile className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Bio"
                    variant="bordered"
                    id="bio"
                    {...register("bio")}
                    isInvalid={errors.bio ? true : false}
                    errorMessage={errors.bio?.message}
                  />
                  <Input
                    endContent={
                      <FaImagePortrait className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    name="image"
                    label="Profile Image"
                    id="image"
                    placeholder="Choose an image"
                    classNames={{
                      input: "file:rounded-full file:cursor-pointer pt-1",
                    }}
                    type="file"
                    accept="image/*"
                    variant="bordered"
                    isRequired
                    onChange={handleFileChange}
                  />
                  <Input
                    endContent={
                      <BsImageFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    name="bannerImage"
                    label="Banner Image"
                    id="bannerImage"
                    placeholder="Choose an image"
                    classNames={{
                      input: "file:rounded-full file:cursor-pointer pt-1",
                    }}
                    type="file"
                    accept="image/*"
                    variant="bordered"
                    onChange={handleFileChange}
                  />
                  <Input
                    endContent={
                      <AiFillLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Password"
                    type="password"
                    variant="bordered"
                    id="password"
                    {...register("password", { required: true })}
                    isRequired
                    isInvalid={errors.password ? true : false}
                    errorMessage={errors.password?.message}
                  />
                  <Input
                    endContent={
                      <AiFillLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Confirm Password"
                    type="password"
                    id="cpassword"
                    variant="bordered"
                    {...register("cpassword", { required: true })}
                    isRequired
                    isInvalid={errors.cpassword ? true : false}
                    errorMessage={errors.cpassword?.message}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                    radius="full"
                    disabled={isLoading}
                  >
                    Close
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    radius="full"
                    isLoading={isLoading}
                  >
                    Sign up
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
