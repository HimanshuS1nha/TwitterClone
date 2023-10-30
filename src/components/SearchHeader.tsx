"use client";

import { Input } from "@nextui-org/react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { AiOutlineSearch } from "react-icons/ai";

type SearchHeaderProps = {
  onChange: (searchTerm: string) => void;
};

const SearchHeader = ({ onChange }: SearchHeaderProps) => {
  const session = useSession();
  return (
    <div className="flex space-x-1 items-center mx-3">
      <Image
        src={session.data?.user.image || "/user.jpg"}
        width={50}
        height={50}
        className="object-contain rounded-full w-[50px] h-[50px]"
        alt="USER"
      />
      <Input
        placeholder="Search Twitter"
        startContent={<AiOutlineSearch size={20} />}
        type="text"
        id="tweet"
        radius="full"
        classNames={{
          inputWrapper: "bg-gray-100 dark:bg-gray-900",
        }}
        isRequired
        autoComplete="off"
        isClearable
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchHeader;
