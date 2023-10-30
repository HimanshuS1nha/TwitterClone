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
  Link,
} from "@nextui-org/react";
import { IoMdMail } from "react-icons/io";
import { AiFillLock } from "react-icons/ai";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default function LoginModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const loginValidator = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters long" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginValidator),
  });

  const { mutate: handleLogin, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: z.infer<typeof loginValidator>) => {
      const isSignedIn = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (isSignedIn?.ok) {
        return true;
      } else {
        throw new Error("Invalid Credentials");
      }
    },
    onSuccess: () => {
      reset();
      toast.success("Signed in successfully");
      router.replace("/");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      } else if (error instanceof Error) {
        toast.error(error.message);
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
        Sign in
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
                Log in
              </ModalHeader>
              <form onSubmit={handleSubmit((data) => handleLogin(data))}>
                <ModalBody>
                  <Input
                    autoFocus
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
                      <AiFillLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Password"
                    type="password"
                    id="password"
                    variant="bordered"
                    {...register("password", { required: true })}
                    isRequired
                    isInvalid={errors.password ? true : false}
                    errorMessage={errors.password?.message}
                  />
                  <div className="flex py-2 px-1 justify-end">
                    <Link
                      color="primary"
                      href="#"
                      size="sm"
                      onPress={() => {
                        setValue("email", "demo@gmail.com");
                        setValue("password", "12345678");
                      }}
                    >
                      Use demo account?
                    </Link>
                  </div>
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
                    Sign in
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
