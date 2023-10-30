"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Icons } from "@/constants/Sidebar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  User,
} from "@nextui-org/react";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="w-[25%] hidden lg:flex flex-col space-y-2 cursor-pointer h-full">
      <Image
        src={"/logo.png"}
        alt="LOGO"
        width={30}
        height={30}
        className="object-contain mt-4 mb-6 mx-6"
      />

      {Icons.map((icon) => {
        return (
          <Link
            key={icon.name}
            href={icon.href}
            className="flex space-x-6 items-center group hover:bg-blue-100 dark:hover:bg-blue-200 mx-4 p-3 rounded-full"
          >
            <icon.Icon
              size={26}
              className={`${
                pathname === icon.href
                  ? "text-blue-400 dark:hover:text-blue-600"
                  : ""
              } group-hover:text-blue-400 dark:group-hover:text-blue-600`}
            />
            <p
              className={`text-xl font-bold group-hover:text-blue-400 mt-1 ${
                pathname === icon.href
                  ? "text-blue-400 dark:hover:text-blue-600"
                  : ""
              }`}
            >
              {icon.name}
            </p>
          </Link>
        );
      })}

      <Button
        className="py-7 font-semibold text-lg w-[90%] mx-auto bg-blue-400 hover:bg-blue-600 text-white"
        radius="full"
        onPress={() => router.push("/create-tweet")}
      >
        Tweet
      </Button>

      <Dropdown>
        <DropdownTrigger>
          <button className="absolute w-[17%] bottom-2 flex justify-between items-center group hover:bg-blue-100 dark:hover:bg-blue-500 mx-4 p-3 rounded-full">
            <User
              name={session.data?.user.name || "Your Name Here"}
              classNames={{ name: "font-bold" }}
              description={
                <p className="text-blue-500 dark:text-white">
                  @{session.data?.user.username || "Your Username Here"}
                </p>
              }
              avatarProps={{
                src: session.data?.user.image || "/user.jpg",
                className: "h-10 w-10",
              }}
            />
            <p className="text-lg">...</p>
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="profile"
            onPress={() => router.push("/profile")}
            startContent={<AiOutlineUser />}
          >
            My Profile
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            className="text-danger"
            startContent={<FiLogOut />}
            onPress={handleLogout}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Sidebar;
