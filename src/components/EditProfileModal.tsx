"use client";

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
import { IoMdMail } from "react-icons/io";
import { AiOutlineIdcard } from "react-icons/ai";
import Image from "next/image";
import { BiSolidUser } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { BsImageFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useUploadThing } from "@/libs/uploadthing";
import { useRouter } from "next/navigation";
import { ImProfile } from "react-icons/im";

export default function EditProfileModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const session = useSession();
  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();

  const [image, setImage] = useState<File[]>([]);
  const [bannerImage, setBannerImage] = useState<File[]>([]);

  const editprofileValidator = z.object({
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
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      bio: "",
    },
    resolver: zodResolver(editprofileValidator),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.name === "image") {
        setImage(Array.from(e.target.files));
      } else {
        setBannerImage(Array.from(e.target.files));
      }
    }
  };

  const { mutate: handleEditProfile, isLoading } = useMutation({
    mutationKey: ["editprofile"],
    mutationFn: async (values: z.infer<typeof editprofileValidator>) => {
      const imageFile = await startUpload(image);
      const bannerImageFile = await startUpload(bannerImage);
      const { data } = await axios.post("/api/editprofile", {
        name: values.name,
        username: values.username,
        email: values.email,
        bio: values.bio,
        image: imageFile?.[0]?.url,
        bannerImage: bannerImageFile?.[0]?.url,
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      reset();
      router.refresh();
      onClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      }
    },
  });

  useEffect(() => {
    setValue("username", session.data?.user.username!);
    setValue("name", session.data?.user.name!);
    setValue("email", session.data?.user.email!);
    setValue("bio", session.data?.user.bio!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        radius="full"
        className="bg-blue-400 font-semibold py-1 hover:bg-blue-600 float-right m-5"
      >
        Edit Profile
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <Image
                src={"/logo.png"}
                alt="LOGO"
                width={40}
                height={40}
                className="object-contain mx-auto mb-5 mt-3"
              />
              <ModalHeader className="flex flex-col gap-1 text-blue-950 font-bold text-center text-3xl dark:text-white">
                Edit Profile
              </ModalHeader>
              <form onSubmit={handleSubmit((data) => handleEditProfile(data))}>
                <ModalBody>
                  <Input
                    autoFocus
                    endContent={
                      <BiSolidUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Username"
                    placeholder="Username"
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
                    placeholder="Name"
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
                    placeholder="Email"
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
                    placeholder="Bio"
                    variant="bordered"
                    id="bio"
                    {...register("bio", { required: true })}
                    isRequired
                    isInvalid={errors.bio ? true : false}
                    errorMessage={errors.bio?.message}
                  />
                  <Input
                    endContent={
                      <Image
                        src={session.data?.user.image || "/user.jpg"}
                        width={35}
                        height={35}
                        alt="USER"
                        className="rounded-full w-[35px] h-[35px]"
                      />
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
                    onChange={handleFileChange}
                  />
                  <Input
                    endContent={
                      session.data?.user.bannerImage ? (
                        <Image
                          src={session.data?.user.bannerImage}
                          width={35}
                          height={35}
                          alt="USER"
                          className="w-[35px] h-[35px]"
                        />
                      ) : (
                        <BsImageFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      )
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
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                    disabled={isLoading}
                    radius="full"
                  >
                    Close
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    radius="full"
                    isLoading={isLoading}
                  >
                    Edit Profile
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
