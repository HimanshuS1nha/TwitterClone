import prisma from "@/libs/db";
import { Notifications } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const Notification = async ({
  notification,
}: {
  notification: Notifications;
}) => {
  const user = await prisma.users.findUnique({
    where: {
      id: notification.notificationBy,
    },
  });
  return (
    <>
      <Link
        href={`/profile/${user?.id}`}
        className="flex flex-col px-5 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
      >
        <div className="flex gap-x-6 items-start">
          <Image
            src={"/logo.png"}
            alt="LOGO"
            width={30}
            height={30}
            className="object-contain mt-1"
          />
          <div className="flex flex-col">
            <Image
              src={user?.image || "/user.jpg"}
              alt="USER"
              width={200}
              height={200}
              className="w-8 h-8 rounded-full mb-2"
            />
            <p className="mb-4 font-semibold">{user?.name}</p>
            <p className="text-neutral-600 dark:text-neutral-400">
              {notification.content}
            </p>
          </div>
        </div>
      </Link>
      <hr className="border-gray-300 w-full mb-4" />
    </>
  );
};

export default Notification;
