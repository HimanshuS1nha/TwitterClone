"use client";

import { BsFillSunFill, BsFillMoonFill, BsArrowLeft } from "react-icons/bs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { BiSolidUserCircle } from "react-icons/bi";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Header = ({
  title,
  giveBottomSpace = true,
  showIcon = false,
}: {
  title: string;
  giveBottomSpace?: boolean;
  showIcon?: boolean;
}) => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const session = useSession();

  const Icon = theme === "dark" ? BsFillMoonFill : BsFillSunFill;

  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

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
    <>
      <div className="flex justify-between items-center px-3">
        {showIcon ? (
          <div className="mb-3 pt-2 mx-3 flex space-x-4 items-center">
            <Link
              href={"/"}
              className="inline-block text-blue-500 hover:text-blue-900 font-bold"
            >
              <BsArrowLeft size={24} className="font-bold" />
            </Link>
            <p className="font-bold text-xl">{title}</p>
          </div>
        ) : (
          <p className="font-bold text-xl mb-3 pt-2">{title}</p>
        )}
        <div className="flex gap-x-3 items-center">
          <div onClick={handleThemeChange} className="cursor-pointer">
            <Icon size={24} />
          </div>
          <Dropdown>
            <DropdownTrigger className="block lg:hidden">
              <button>
                {session.data?.user.image ? (
                  <Avatar src={session.data.user.image} />
                ) : (
                  <BiSolidUserCircle size={26} />
                )}
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
      </div>
      <hr
        className={`border-gray-300 dark:border-gray-700 w-full ${
          giveBottomSpace && "mb-4"
        }`}
      />
    </>
  );
};

export default Header;
