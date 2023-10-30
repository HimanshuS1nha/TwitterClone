"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/constants/Sidebar";

const BottomBar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 flex lg:hidden justify-evenly w-full overflow-hidden bg-white dark:bg-black z-10">
      {Icons.map((icon) => {
        return (
          <Link
            key={icon.name}
            href={icon.href}
            className="flex flex-col items-center justify-center group hover:bg-blue-100 rounded-full sm:my-0 my-3"
          >
            <icon.Icon
              size={26}
              className={`${
                pathname === icon.href ? "text-blue-400" : ""
              } group-hover:text-blue-400`}
            />
            <p
              className={`sm:block hidden text-xl font-bold group-hover:text-blue-400 ${
                pathname === icon.href ? "text-blue-400" : ""
              }`}
            >
              {icon.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomBar;
